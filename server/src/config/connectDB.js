
import mongoose from "mongoose";


const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);

    console.log(`MongoDB Connected`);
  } catch (e) {
    console.log(`Error: ${e.message}`);
  }
};

export default connectDB;