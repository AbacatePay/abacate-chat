import { Router, Request, Response } from "express";
import { IChatModel } from "../interfaces/IChatModel";
import {
  StartChatSchema,
  ContinueChatSchema,
} from "./schemas/ChatControllerSchema";
import { validateSchema } from "./schemas/validateSchema";
import { RateLimitedStream } from "../pkg/stream/RateLimitedStream";
import { upload } from "../middlewares/multerConfig";
import { validateAudioOrMessage } from "./schemas/validateAudioOrMessage";
import { ITranscribeAudioModel } from "../interfaces/ITranscribeAudioModel";

export class ChatController {
  private router: Router;
  private chatService: IChatModel;
  private transcribeAudioService: ITranscribeAudioModel;

  constructor(
    chatService: IChatModel,
    transcribeAudioService: ITranscribeAudioModel
  ) {
    this.router = Router();
    this.chatService = chatService;
    this.transcribeAudioService = transcribeAudioService;
    this.setupRoutes();
  }

  private setupRoutes() {
    this.router.post(
      "/chat/create",
      upload.single("audio"),
      validateSchema(StartChatSchema),
      validateAudioOrMessage,
      async (req: Request, res: Response) => {
        await this.createChat(req, res);
      }
    );

    this.router.post(
      "/chat/continue",
      upload.single("audio"),
      validateSchema(ContinueChatSchema),
      validateAudioOrMessage,
      async (req: Request, res: Response) => {
        await this.continueChat(req, res);
      }
    );

    this.router.post("/thread/create", async (req: Request, res: Response) => {
      await this.createThread(req, res);
    });
  }

  getRouter() {
    return this.router;
  }

  private async createChat(req: Request, res: Response): Promise<void> {
    try {
      const data = req.body;

      const audioFile = req.file;

      let message: string = data.message?.trim() ?? "";

      if (audioFile) {
        message = await this.transcribeAudioService.transcribeAudio(
          audioFile.buffer
        );
      }

      if (data.stream !== false) {
        this.setStreamHeaders(res);
      }

      const result = await this.chatService.createChat(message, data.option);

      if (data.stream !== false) {
        // Send the threadId first
        res.write(
          `data: ${JSON.stringify({
            type: "threadId",
            threadId: result.threadId,
          })}\n\n`
        );

        this.sendStreamResponse(res, result.stream);
      } else {
        const s = await this.streamToString(result.stream);
        res.json({
          threadId: result.threadId,
          stream: undefined,
          content: s,
        });
      }
    } catch (error) {
      console.error("Error in createChat:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  private async continueChat(req: Request, res: Response): Promise<void> {
    try {
      const { threadId, message: messageBody, stream } = req.body;

      const audioFile = req.file;

      let message: string = messageBody?.trim() ?? "";

      if (audioFile) {
        message = await this.transcribeAudioService.transcribeAudio(
          audioFile.buffer
        );
      }

      const aiResponse = this.chatService.continueChat(threadId, message);
      if (stream !== false) {
        this.setStreamHeaders(res);
        await this.sendStreamResponse(res, aiResponse);
      } else {
        res.json({
          content: await this.streamToString(aiResponse),
        });
      }
    } catch (error) {
      console.error("Error in continueChat:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  private async createThread(req: Request, res: Response): Promise<void> {
    try {
      const threadId = await this.chatService.createThread();

      res.json({
        threadId: threadId,
      });
    } catch (error) {
      console.error("Error in continueChat:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  private async setStreamHeaders(res: Response) {
    // Set headers for SSE
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
  }

  private async sendStreamResponse(
    res: Response,
    stream: AsyncGenerator<string, void, unknown>
  ) {
    const rateLimitedStream = new RateLimitedStream(25); // 3 words per second
    for await (const chunk of rateLimitedStream.process(stream)) {
      res.write(
        `data: ${JSON.stringify({ type: "content", content: chunk })}\n\n`
      );
    }

    res.write("data: [DONE]\n\n");
    res.end();
  }

  private async streamToString(stream: AsyncGenerator<string, void, unknown>) {
    let s = "";
    for await (const chunk of stream) {
      s += chunk;
    }
    return s;
  }
}
