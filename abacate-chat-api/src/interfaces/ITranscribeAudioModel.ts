export interface ITranscribeAudioModel {
  transcribeAudio(audioBuffer: Buffer, language?: string): Promise<string>;
  optimizeAudioBuffer(
    inputBuffer: Buffer,
    outputFormat: string
  ): Promise<Buffer>;
}
