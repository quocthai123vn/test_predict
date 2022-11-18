import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 8000;
const CONNECTION_STRING =
  process.env.CONNECTION_STRING ||
  "mongodb+srv://javisngo:nuke2022@cluster0.2n6ntzi.mongodb.net/?retryWrites=true&w=majority";
const TEST_KEY = process.env.TEST_KEY || "";

export { PORT, CONNECTION_STRING, TEST_KEY };
