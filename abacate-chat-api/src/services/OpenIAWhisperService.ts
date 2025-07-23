import OpenAI from "openai";
import { ITranscribeAudioModel } from "../interfaces/ITranscribeAudioModel";
import ffmpeg from "fluent-ffmpeg";
import tmp from "tmp-promise";
import { promises as fs } from "fs";
import ffmpegPath from "@ffmpeg-installer/ffmpeg";
import { Readable } from "stream";

ffmpeg.setFfmpegPath(ffmpegPath.path);

export class OpenIAWhisperService implements ITranscribeAudioModel {
  private openai: OpenAI;

  constructor(openai: OpenAI) {
    this.openai = openai;
  }

  async transcribeAudio(
    audioBuffer: Buffer,
    language?: string
  ): Promise<string> {
    const otimizedAudioBuffer = await this.optimizeAudioBuffer(
      audioBuffer,
      "ogg"
    );

    // Convert the optimized audio buffer to a Blob for OpenAI API
    const file = new File([otimizedAudioBuffer], "audio.ogg", {
      type: "audio/ogg",
    });

    try {
      const whisperResponse = await this.openai.audio.transcriptions.create({
        model: "whisper-1",
        language,
        file,
        response_format: "json",
      });
      return whisperResponse.text;
    } catch (error) {
      console.error("Error in transcription:", error);
      throw new Error(`Transcription failed: ${error.message}`);
    }
  }

  /**
   * Optimizes an audio buffer by removing silences, adjusting sample rate, and compressing.
   */
  async optimizeAudioBuffer(
    inputBuffer: Buffer,
    outputFormat = "ogg"
  ): Promise<Buffer> {
    if (!["ogg", "mp3"].includes(outputFormat)) {
      throw new Error("Invalid output format. Use 'ogg' or 'mp3'");
    }

    // For files larger than 10MB, error out to prevent performance issues.
    if (inputBuffer.length > 10 * 1024 * 1024) {
      throw new Error("Input buffer size exceeds 10MB limit.");
    }

    return this.optimizeAudioBufferWithStream(inputBuffer, outputFormat);
  }

  private async optimizeAudioBufferWithStream(
    inputBuffer: Buffer,
    outputFormat: string
  ): Promise<Buffer> {
    return new Promise<Buffer>((resolve, reject) => {
      const inputStream = new Readable({
        read() {
          this.push(inputBuffer);
          this.push(null);
        },
      });

      const chunks: Buffer[] = [];

      const ffmpegProcess = ffmpeg(inputStream)
        .audioFilters("silenceremove=1:0:-50dB")
        .audioFrequency(16000)
        .format(outputFormat)
        .on("error", reject)
        .pipe();

      ffmpegProcess.on("data", (chunk: Buffer) => chunks.push(chunk));
      ffmpegProcess.on("end", () => resolve(Buffer.concat(chunks)));
      ffmpegProcess.on("error", reject);
    });
  }
}
