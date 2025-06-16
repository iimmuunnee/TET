import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertTestResultSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  
  app.post("/api/test-results", async (req, res) => {
    try {
      console.log("Received test result data:", req.body);
      const validatedData = insertTestResultSchema.parse(req.body);
      const result = await storage.createTestResult(validatedData);
      res.json(result);
    } catch (error) {
      console.error("Test result validation error:", error);
      if (error instanceof Error) {
        res.status(400).json({ 
          message: "Invalid test result data", 
          details: error.message 
        });
      } else {
        res.status(400).json({ message: "Invalid test result data" });
      }
    }
  });

  app.get("/api/test-results/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid result ID" });
      }
      
      const result = await storage.getTestResult(id);
      if (!result) {
        return res.status(404).json({ message: "Test result not found" });
      }
      
      res.json(result);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/statistics", async (req, res) => {
    try {
      const stats = await storage.getStatistics();
      res.json(stats);
    } catch (error) {
      console.error("Statistics error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
