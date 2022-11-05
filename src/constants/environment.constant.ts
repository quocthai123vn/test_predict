import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 8000;
const CONNECTION_STRING =
  process.env.CONNECTION_STRING ||
  "mongodb+srv://thai123:thaideptrai@cluster0.k0npc.mongodb.net/test";
const TEST_KEY = process.env.TEST_KEY || "";

export { PORT, CONNECTION_STRING, TEST_KEY };
