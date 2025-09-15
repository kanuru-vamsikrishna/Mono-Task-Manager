import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 7000;

app.get("/", (req: Request, res: Response) => {
  res.send("Mono Task Manager BE running 🚀");
});

app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT} 🚀`);
});
