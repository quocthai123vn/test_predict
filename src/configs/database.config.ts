import mongoose from "mongoose";
import { CONNECTION_STRING } from "../constants/environment.constant";

export const connectDatabase = () => {
  return new Promise((resolve, reject) => {
    if (!CONNECTION_STRING) {
      reject(console.log("Missing connection string"));
    }
    try {
      mongoose.connect(CONNECTION_STRING, () => {
        resolve(console.log("Connected database successfully"));
      });
    } catch (error) {
      reject(console.log(error));
    }
  });
};
