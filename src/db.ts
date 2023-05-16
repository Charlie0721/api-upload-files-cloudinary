import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
class Database {


  constructor() {
    this.connect();
  }
  connect() {
    const MONGODB_URI = process.env.MONGODB_URI+"/upload_manifests";
    if (!MONGODB_URI) {
      throw new Error('Environment variable not found MONGODB_URI');
    }
    mongoose
      .connect(MONGODB_URI)
      .then(() => {
        console.log('Connected to MongoDB database');
      })
      .catch((error) => {
        console.error('Connection error: ', error);
      });
  }
}

export default new Database();
