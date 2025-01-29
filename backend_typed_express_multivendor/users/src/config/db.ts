import { connect } from "mongoose";
import CONFIG from "../constants/config.constants.js";

const connectDB = async () => {
  try {
    if (!CONFIG.MONGO_DB_URI) {
      throw Error("INVALID MONGO DB URL!");
    }
    const connection = await connect(CONFIG.MONGO_DB_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    console.log(`MongoDB connected: ${connection.connection.host}`);
  } catch (error: unknown) {
    console.log(error);
    process.exit(1);
  }
};

export default connectDB;
