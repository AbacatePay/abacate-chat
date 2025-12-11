import multer from "multer";

// This file configures multer for handling audio file uploads in memory.
const storage = multer.memoryStorage();

export const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB supported
  },
  fileFilter: (_, file, cb) => {
    const allowedMimeTypes = [
      "audio/mp3",
      "audio/mpeg",
      "audio/wav",
      "audio/x-wav",
      "audio/wave",
      "audio/webm",
    ];

    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      console.warn(`Rejected file upload with mimetype: ${file.mimetype}`);
      const error = new multer.MulterError(
        "LIMIT_UNEXPECTED_FILE",
        file.fieldname
      );
      cb(error);
    }
  },
});
