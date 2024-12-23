import swaggerJsdoc from "swagger-jsdoc";

// Swagger setup for API documentation
const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "eBuddy User API",
      version: "1.0.0",
      description: "API to manage eBuddy user data in Firestore",
    },
  },
  apis: ["./routes/*.ts"], // Specify where to find routes for Swagger documentation
  // apis: ["./swagger.yaml"], // Specify where to find routes for Swagger documentation
};

export const swaggerSpec = swaggerJsdoc(options);
