import express, { Application, NextFunction, Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app: Application = express();

const port = 3010;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function (req: Request, res: Response, next: NextFunction) {
  res.set("Access-Control-Allow-Origin", "*");
  res.set(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.set(
    "Access-Control-Allow-Origin",
    "POST, GET, PUT, PATCH, DELETE, OPTIONS"
  );
  next();
});

// CORS configuration
const corsOptions = {
  origin: 'http://localhost:4200',  // Allow only the front-end origin
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],  // Specify allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'],  // Specify allowed headers
};

app.use(cors(corsOptions));

import mailRoutes from "./routes/mail.routes.ts";
mailRoutes(app);

app.listen(port, () => {
  console.log(`Server is running on PORT ${port}`);
});
