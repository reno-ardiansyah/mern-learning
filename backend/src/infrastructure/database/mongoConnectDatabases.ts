import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs/promises';

dotenv.config();

const connectDatabases = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log('Connected to MongoDB');

    const modelsPath = path.join(__dirname, '..', 'orm');

    try {
      const files = await fs.readdir(modelsPath);

      files.forEach((file: string) => {
        if (file.endsWith('.ts') || file.endsWith('.js')) {
          require(path.join(modelsPath, file));
        }
      });
    } catch (err: any) {
      console.error(`Error reading models directory: ${err.message}`);
    }
  } catch (error: any) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

export default connectDatabases;
