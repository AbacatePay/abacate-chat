import Joi from "joi";

// Schema definitions
export const StartChatSchema = Joi.object({
  message: Joi.string().optional(),
  audio: Joi.any().optional(),
  stream: Joi.boolean().optional(),
  option: Joi.string().optional(),
});

export const ContinueChatSchema = Joi.object({
  threadId: Joi.string().required(),
  audio: Joi.any().optional(),
  message: Joi.string().optional(),
  stream: Joi.boolean(),
});
