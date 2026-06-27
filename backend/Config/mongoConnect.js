import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';

const mongoConnect = async () => {
  try {
    const url = process.env.MONGODB_URI;
    if (!url) {
      console.error('[MongoDB] MONGODB_URI is not set in environment variables');
      return;
    }

    const conn = await mongoose.connect(url);
    console.log(`[MongoDB] Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(`[MongoDB] Connection error: ${err.message}`);
  }
};

export default mongoConnect;
