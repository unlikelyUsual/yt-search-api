import mongoose from "mongoose";
import Logger from "../util/Logger";

const logger = new Logger("Database");
export const connectDb = async () => {
  return await mongoose
    .connect(
      `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@127.0.0.1:27017/${process.env.MONGO_DB}?retryWrites=true&w=majority`
    )
    .then(() => {
      logger.log("successfully connected to the database");
    })
    .catch((err) => {
      logger.error("error connecting to the database", err);
      process.exit();
    });
};

export default connectDb;
