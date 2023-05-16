import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
class Database {
  constructor() {
    this.connect();
  }

  connect() {
    const { MONGO_URL, MONGOHOST, MONGOPASSWORD, MONGOPORT, MONGOUSER } = process.env;
    const connectionString = `mongodb://${MONGOUSER}:${MONGOPASSWORD}@${MONGOHOST}:${MONGOPORT}/${MONGO_URL}`;

    if (!connectionString) {
      throw new Error('Environment variable not found');
    }

    mongoose
      .connect(connectionString)
      .then(() => {
        console.log('Connected to MongoDB database');
      })
      .catch((error) => {
        console.error('Connection error: ', error);
      });
  }
}

export default new Database();

