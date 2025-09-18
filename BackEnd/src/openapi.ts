// src/openapi.ts
import { generateOpenApi } from "@ts-rest/open-api";
import { extendZodWithOpenApi } from "@anatine/zod-openapi";
import { z } from "zod";
import { apiContract } from "./contracts";

extendZodWithOpenApi(z);

export const openApiDocument = generateOpenApi(apiContract, {
  openapi: "3.0.0",
  info: { title: "Mono Task Manager API", version: "1.0.0" },
  servers: [{ url: "http://localhost:7000/api", description: "local" }],
});
