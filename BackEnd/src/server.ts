import express from "express";
import fs from "fs";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import { createExpressEndpoints } from "@ts-rest/express";
import { apiContract } from "./contracts";
import { appRouter } from "./routes";
import { openApiDocument } from "./openapi";

const envFile = `.env.${process.env.NODE_ENV || "local"}`;

if (fs.existsSync(envFile)) {
  dotenv.config({ path: envFile });
  console.log(`✅ Loaded environment: ${envFile}`);
} else {
  dotenv.config({ path: ".env.local" });
  console.log(`⚠️ ${envFile} not found. Using fallback: .env.local`);
}

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  credentials: true,
}));

app.options("*", cors());

app.use(express.json());

const apiRouter = express.Router();
// First we have to create express router and then mount with ts-rest otherwise it will fail.
createExpressEndpoints(apiContract, appRouter, apiRouter);

// Mount router with base path
app.use("/api/v1", apiRouter);

// ✅ Swagger docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openApiDocument));

app.get("/", (req, res) => res.send("Mono Task Manager BE running 🚀"));

const PORT = process.env.PORT || 7000;
const MONGO_URI = process.env.MONGO_URI || "";

mongoose
  .connect(MONGO_URI)
  .then(() => app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`)))
  .catch((err) => console.error("MongoDB connection error:", err));
