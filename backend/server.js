import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import usersRouter from "./routes/usersRouter.js";
import passport from "./controllers/passport.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Debug middleware - log every request
app.use((req, res, next) => {
  console.log('Method:', req.method, 'URL:', req.url);
  console.log('Content-Type:', req.get('Content-Type'));
  console.log('Body:', req.body);
  next();
});

app.use(passport.initialize());
app.use(cookieParser());

app.use("/", usersRouter);

app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`My Express app - listening on port ${PORT}!`);
});
