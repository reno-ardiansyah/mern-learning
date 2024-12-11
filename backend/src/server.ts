import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDatabases from './infrastructure/database/mongoConnectDatabases';
import router from './interface/http/routes';
import morgan from 'morgan';
import fs from 'fs';
import path from 'path';

dotenv.config();

const app = express();

app.use(cors({
  origin: process.env.FE_BASE_URL || 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Create a write stream (in append mode) for logging to file
const accessLogStream = fs.createWriteStream(path.join(__dirname, '../access.log'), { flags: 'a' });

// Define a custom log format
const customFormat = '[:date[clf]] ":method ||||||||||||||||||||||||||||||| :status - :url" :res[content-length]';

// Setup the logger
app.use(morgan(customFormat, { stream: accessLogStream }));
// Also log to the console
app.use(morgan(customFormat));

connectDatabases().then(() => {
  console.log('Database connection successful.');
}).catch((error: any) => {
  console.error('Database connection failed:', error);
  process.exit(1);
});

app.use('/api/v1', router);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
