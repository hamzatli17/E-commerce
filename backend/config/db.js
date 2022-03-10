import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

/**
 * https://github.com/Automattic/mongoose/issues/2280#issuecomment-338510055
 * mongoose.connection.readyState == 0; // not connected
 * mongoose.connection.readyState == 1; // connected
 */

const connectDB = async () => {
  switch (mongoose.connection.readyState) {
    case 0:
      try {
        const con = await mongoose.connect(process.env.MONGO_URI, {
          useUnifiedTopology: true,
          useNewUrlParser: true,
          //useCreateIndex: true,
        });
        console.log(`MongoDB connected: ${con.connection.host}`);
      } catch (error) {
        console.error(`Error: ${error.message}`);
      }
      break;
    case 1:
      // do nothing
      break;
    default:
      break;
  }
};

export default connectDB;
