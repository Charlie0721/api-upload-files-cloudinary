import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
// class Database {


//   constructor() {
//     this.connect();
//   }
//   connect() {
//     const MONGODB_URL = process.env.MONGODB_URL;
//     if (!MONGODB_URL) {
//       throw new Error('Environment variable not found MONGODB_URL');
//     }
//     mongoose
//       .connect(MONGODB_URL)
//       .then(() => {
//         console.log('Connected to MongoDB database');
//       })
//       .catch((error) => {
//         console.error('Connection error: ', error);
//       });
//   }
// }

// export default new Database();



class Database {
  constructor() {
    this.connect();
  }

  connect() {
    const { MONGODB_URL, MONGOHOST, MONGOPASSWORD, MONGOPORT, MONGOUSER } = process.env;

    if (!MONGODB_URL || !MONGOHOST || !MONGOPASSWORD || !MONGOPORT || !MONGOUSER) {
      throw new Error('Environment variables not found');
    }

    const connectionOptions = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      auth: {
        user: MONGOUSER,
        password: MONGOPASSWORD,
      },
      host: MONGOHOST,
      port: MONGOPORT,
    };

    mongoose
      .connect(MONGODB_URL, connectionOptions)
      .then(() => {
        console.log('Connected to MongoDB database');
      })
      .catch((error) => {
        console.error('Connection error:', error);
      });
  }
}

export default new Database();