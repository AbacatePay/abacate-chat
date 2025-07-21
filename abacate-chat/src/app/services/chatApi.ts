export interface ChatMessage {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
}



export interface StreamChunk {
  type: "threadId" | "content";
  threadId?: string;
  content?: string;
}

type StreamCallback = (chunk: StreamChunk) => void;

class ChatApiService {
  private baseUrl: string;

  constructor(endpoint: string = "http://localhost:3001/api") {
    this.baseUrl = endpoint;
  }

  async handleStream(
    response: Response,
    onChunk: StreamCallback,
    onDone: () => void
  ) {
    const reader = response.body!.getReader();
    const decoder = new TextDecoder();
    let buffer = "";

    while (true) {
      const { done, value } = await reader.read();

      if (done) {
        break;
      }

      // Decode the chunk and add it to our buffer
      buffer += decoder.decode(value, { stream: true });

      // Process complete lines from the buffer
      let lineIndex;
      while ((lineIndex = buffer.indexOf("\n")) >= 0) {
        const line = buffer.slice(0, lineIndex).trim();
        buffer = buffer.slice(lineIndex + 1);

        if (line.startsWith("data: ")) {
          const data = line.slice(6); // Remove 'data: ' prefix

          if (data === "[DONE]") {
            onDone();
            return;
          }

          try {
            const chunk: StreamChunk = JSON.parse(data);
            onChunk(chunk);
          } catch (error) {
            console.error("Error parsing SSE data:", error);
          }
        }
      }
    }
  }

  async sendMessageStream(
    threadId: string | undefined,
    message: string,
    onChunk: StreamCallback,
    onDone: () => void
  ): Promise<() => void> {
    const abortController = new AbortController();

    const body: { message: string; threadId?: string } = { message };
    let route = "create";
    if (threadId) {
      body.threadId = threadId;
      route = "continue";
    }

    // Start the fetch request with proper headers for SSE
    const response = await fetch(`${this.baseUrl}/chat/${route}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "text/event-stream",
      },
      body: JSON.stringify(body),
      signal: abortController.signal,
    });

    try {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      if (!response.body) {
        throw new Error("Response body is null");
      }

      this.handleStream(response, onChunk, onDone);
    } catch (error) {
      console.error("Stream error:", error);
    }

    // Return cleanup function
    return () => {
      abortController.abort();
    };
  }
}

export const chatApiService = new ChatApiService(
  process.env.NEXT_PUBLIC_CHAT_API_URL
);
