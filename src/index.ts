import { startApp } from "./configs/app.configs";
import { connectDatabase } from "./configs/database.config";

(async () => {
  try {
    await connectDatabase();
    startApp();
  } catch (error) {
    console.log("Sever error:", error);
  }
})();
