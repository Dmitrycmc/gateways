import { config } from 'dotenv';

export const getDbUri = (): string => {
  config();
  const { USERNAME, PASSWORD } = process.env;
  return `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.hb0m5.mongodb.net/?retryWrites=true&w=majority`;
};
