import { connect } from 'mongoose';

const dbUrl = 'mongodb://127.0.0.1:27017';

const connectDB = async () => {
  try {
    await connect(dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
  }
};

export { connectDB }; 
