import express from 'express';
import dotenv from 'dotenv';
import connectDatabases from './infrastructure/database/mongoConnectDatabases';
import router from './interface/http/routes';

dotenv.config();

const app = express();

app.use(express.json());

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
