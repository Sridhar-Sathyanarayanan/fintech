import express, { Application, NextFunction, Request, Response, Router } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { environmentConfig, logConfig, getCorsOrigins } from "./config/index.js";

const app: Application = express();
const port = environmentConfig.server.port;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// CORS configuration
const corsOptions = {
  origin: getCorsOrigins(),
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

app.use(cors(corsOptions));

import mailRoutes from "./routes/mail.routes.js";
import marketRoutes from "./routes/market.routes.js";
import configRoutes from "./routes/config.routes.js";

// Create router and set up routes
const router = Router();
mailRoutes(router);

// Mail routes
app.use('/api/mail', router);

// Market data routes
app.use('/api/market', marketRoutes);

// Configuration routes
app.use('/api/config', configRoutes);

// Health check endpoint for AWS Elastic Beanstalk
app.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: environmentConfig.server.nodeEnv,
    uptime: process.uptime()
  });
});

// Root endpoint
app.get('/', (_req: Request, res: Response) => {
  res.status(200).json({
    name: 'AMKRTech API',
    version: '1.0.0',
    status: 'running',
    endpoints: {
      health: '/health',
      mail: '/api/mail',
      market: '/api/market',
      config: '/api/config'
    }
  });
});

// Error handling middleware
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error('Server error:', err.message);
  res.status(500).json({
    status: 500,
    error: err.message || 'Internal Server Error'
  });
});

app.listen(port, () => {
  logConfig();
  console.log(`✓ API Routes: /api/mail, /api/market, /api/config`);
  console.log(`✓ Server: http://localhost:${port}`);
});
