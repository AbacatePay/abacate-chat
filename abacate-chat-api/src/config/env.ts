export const getRequiredEnvVar = (key: string): string => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Required environment variable ${key} is missing`);
  }
  return value;
};

export const config = {
  itzam: {
    apiKey: getRequiredEnvVar("ITZAM_API_KEY"),
  },
  openIA: {
    apiKey: getRequiredEnvVar("OPENAI_API_KEY"),
  },
} as const;
