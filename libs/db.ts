import mongoose from 'mongoose';

async function dbConnect() {
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  mongoose.connection.on('connected', () => {
    console.log('connected to mongo DB');
  });
  mongoose.connection.on('connected', () => {
    console.log('connected to mongo DB');
  });

  return mongoose.connect(process.env.MONGODB_ENDPOINT);
}

export default dbConnect;
