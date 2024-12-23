import "module-alias/register";
import { swaggerSpec } from "@config/swaggerConfig";
import authRoutes from "@routes/authRoutes";
import userRoutes from "@routes/userRoutes";
import bodyParser from "body-parser";
import cors from "cors";
import "dotenv/config";
import express, { Express } from "express";
import fs from "fs";
import swaggerUi from "swagger-ui-express";
import YAML from "yaml";

const file = fs.readFileSync("./config/swaggerDocument.yaml", "utf8");
const swaggerDocument = YAML.parse(file);

// Create express app instance
const app: Express = express();

app
  .use(
    cors({
      origin: "http://localhost:3000",
      methods: ["GET", "POST", "PUT", "DELETE"], // permission method
      allowedHeaders: ["Content-Type", "Authorization"], // permission header
    })
  ) // CORS configuration
  .use(bodyParser.json()) // Parse incoming request bodies
  .use("/api/users", userRoutes) // Register routes
  .use("/api/auth", authRoutes) // Auth routes
  .use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument, swaggerSpec)
  ); // Serve Swagger UI documentation

// Start server
const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
