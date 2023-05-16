import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
class Database {


  constructor() {
    this.connect();
  }
  connect() {
    const MONGODB_URL = process.env.MONGODB_URL;
    if (!MONGODB_URL) {
      throw new Error('Environment variable not found MONGODB_URI');
    }
    mongoose
      .connect(MONGODB_URL)
      .then(() => {
        console.log('Connected to MongoDB database');
      })
      .catch((error) => {
        console.error('Connection error: ', error);
      });
  }
}

export default new Database();
