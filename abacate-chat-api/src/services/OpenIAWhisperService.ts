import OpenAI from "openai";
import { ITranscribeAudioModel } from "../interfaces/ITranscribeAudioModel";
import ffmpeg from "fluent-ffmpeg";
import tmp from "tmp-promise";
import { promises as fs } from "fs";

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

    const whisperResponse = await this.openai.audio.transcriptions.create({
      model: "whisper-1",
      language,
      file,
      response_format: "json",
    });

    return whisperResponse.text;
  }

  /**
   * Optimizes an audio buffer by removing silences, adjusting sample rate, and compressing.
   */
  async optimizeAudioBuffer(
    inputBuffer: Buffer,
    outputFormat = "ogg"
  ): Promise<Buffer> {
    if (!["ogg", "mp3"].includes(outputFormat)) {
      throw new Error("Formato de saída inválido. Use 'ogg' ou 'mp3'.");
    }

    const inputTmp = await tmp.file({ postfix: ".wav" });
    const outputTmp = await tmp.file({ postfix: `.${outputFormat}` });

    try {
      await fs.writeFile(inputTmp.path, inputBuffer);

      await new Promise<void>((resolve, reject) => {
        ffmpeg(inputTmp.path)
          .audioFilters("silenceremove=1:0:-50dB")
          .audioFrequency(16000)
          .format(outputFormat)
          .output(outputTmp.path)
          .on("end", (_stdout: string | null, _stderr: string | null) =>
            resolve()
          )
          .on("error", reject)
          .run();
      });

      const outputBuffer = await fs.readFile(outputTmp.path);

      return outputBuffer;
    } finally {
      await inputTmp.cleanup();
      await outputTmp.cleanup();
    }
  }
}
