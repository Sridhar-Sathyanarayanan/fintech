import express, { Application, NextFunction, Request, Response, Router } from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app: Application = express();
const port = 3010;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// CORS configuration
const corsOptions = {
  origin: 'http://localhost:4200',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));

import mailRoutes from "./routes/mail.routes.js";

// Create router and set up routes
const router = Router();
mailRoutes(router);
app.use('/', router);

// Error handling middleware
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error('Server error:', err.message);
  res.status(500).json({
    status: 500,
    error: err.message || 'Internal Server Error'
  });
});

app.listen(port, () => {
  console.log(`Server is running on PORT ${port}`);
});
