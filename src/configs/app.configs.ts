import express from "express";
import os from "os";
import cors from "cors";
import { corsOptions } from "./cors.config";
import rootRouter from "../routes/root.routes";
import { PORT } from "../constants/environment.constant";

(<any>process.env.UV_THREADPOOL_SIZE) = os.cpus().length;

const app = express();

app.use(cors(corsOptions));

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

//Route configuration
app.use("/", rootRouter);

export const startApp = () => {
  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
};
