import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import seedData from './seedData';

const runSeed = async (): Promise<void> => {
  const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/soyirilabs';

  try {
    await mongoose.connect(mongoURI);
    console.log('MongoDB connected for seeding...');
    await seedData();
    console.log('Seeding complete!');
  } catch (error) {
    console.error('Seeding failed:', error);
  } finally {
    await mongoose.connection.close();
    process.exit(0);
  }
};

runSeed();
