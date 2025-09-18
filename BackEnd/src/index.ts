// src/index.ts
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";

import { appRouter } from "./routes";
import { openApiDocument } from "./openapi";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Mount the router
app.use("/api/v1", appRouter);

// ✅ Swagger docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openApiDocument));

app.get("/", (req, res) => res.send("Mono Task Manager BE running 🚀"));

const PORT = process.env.PORT || 7000;
const MONGO_URI = process.env.MONGO_URI || "";

mongoose
  .connect(MONGO_URI)
  .then(() => app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`)))
  .catch((err) => console.error("MongoDB connection error:", err));
