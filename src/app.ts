import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import mongoose from 'mongoose';
import routes from './routes';
import { errorHandler } from './middleware/errorHandler';
import path from 'path';

const app = express();

const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/soyirilabs';

let cachedConnection: typeof mongoose | null = null;

async function connectDB() {
  if (cachedConnection && mongoose.connection.readyState === 1) return cachedConnection;
  try {
    const conn = await mongoose.connect(mongoURI, { bufferCommands: false });
    cachedConnection = conn;
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
}

const dbMiddleware = async (_req: express.Request, _res: express.Response, next: express.NextFunction) => {
  await connectDB();
  next();
};

app.use(dbMiddleware);

app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));

app.use(cors({
  origin: process.env.CORS_ORIGIN?.split(',') || ['http://localhost:3000', 'http://localhost:5173'],
  credentials: true,
}));

app.use(morgan('dev'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: parseInt(process.env.RATE_LIMIT_MAX || '100'),
  message: { success: false, message: 'Too many requests, please try again later.' },
});
app.use('/api', limiter);

app.use('/api', routes);

app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

app.use(errorHandler);

app.get('/', (_req, res) => {
  res.json({ success: true, message: 'Soyiri Labs API', version: '1.0.0', endpoints: ['/api/projects', '/api/services', '/api/testimonials', '/api/blog', '/api/contact', '/api/auth', '/api/homepage', '/api/company'] });
});

app.use((_req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

export default app;
