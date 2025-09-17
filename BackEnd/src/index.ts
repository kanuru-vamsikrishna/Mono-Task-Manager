import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from './routes/auth.routes'

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 7000;
const MONGO_URI = process.env.MONGO_URI || "";

app.get("/", (req: Request, res: Response) => {
  res.send("Mono Task Manager BE running 🚀");
});

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on PORT: ${PORT}`));
  })
  .catch((err) => console.error("MongoDB connection error:", err));
