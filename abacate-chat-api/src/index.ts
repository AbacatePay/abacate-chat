import "dotenv/config";
import express, { Express, Request, Response } from "express";
import { ChatController } from "./controllers/ChatController";
import { ItzamChatService } from "./services/ItzamChatService";
import { Itzam } from "itzam";
import cors from "cors";
import { config } from "./config/env";
import OpenAIApi from "openai";
import { OpenIAWhisperService } from "./services/OpenIAWhisperService";

const app: Express = express();
const port = 3001;

app.use(express.json());
app.use(cors({}));

// Initialize chat service and controller
const itzamClient = new Itzam(config.itzam.apiKey);
const openIA = new OpenAIApi({ apiKey: config.openIA.apiKey });
const itzamService = new ItzamChatService(itzamClient, "abacatepay");
const transcribeAudioService = new OpenIAWhisperService(openIA);
const chatController = new ChatController(itzamService);

// Set up chat routes
app.use("/api", chatController.getRouter());

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
