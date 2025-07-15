import { Request, Response, NextFunction } from "express";

export const validateAudioOrMessage = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const hasMessage = req.body.message && req.body.message.trim().length > 0;
  const hasAudio = req.file && req.file.buffer;

  if (!hasMessage && !hasAudio) {
    res.status(400).json({
      error: "Validation error",
      details: ["Either 'message' or 'audio' must be provided."],
    });
    return;
  }

  next();
};
