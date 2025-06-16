import type { Express } from "express";
import { createServer, type Server } from "http";
import rateLimit from "express-rate-limit";
import { storage } from "./storage";
import { insertTestResultSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // 테스트 결과 저장에 대한 엄격한 제한
  const testSubmitLimiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5분
    max: 3, // 테스트 제출 제한
    message: { error: "테스트 제출이 너무 많습니다. 잠시 후 다시 시도해주세요." },
    standardHeaders: true,
    legacyHeaders: false,
  });

  // API 엔드포인트에 더 엄격한 제한
  const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15분
    max: 20, // API 요청 제한
    message: { error: "API 요청이 너무 많습니다. 잠시 후 다시 시도해주세요." },
    standardHeaders: true,
    legacyHeaders: false,
  });
  
  app.post("/api/test-results", testSubmitLimiter, async (req, res) => {
    try {
      // 입력 데이터 크기 제한 검증
      if (JSON.stringify(req.body).length > 10000) {
        return res.status(413).json({ error: "요청 데이터가 너무 큽니다." });
      }

      // 필수 필드 존재 확인
      if (!req.body || typeof req.body !== 'object') {
        return res.status(400).json({ error: "잘못된 데이터 형식입니다." });
      }

      console.log("Received test result data:", req.body);
      const validatedData = insertTestResultSchema.parse(req.body);
      
      // 추가 비즈니스 로직 검증
      if (validatedData.answers && validatedData.answers.length > 20) {
        return res.status(400).json({ error: "답변 수가 제한을 초과했습니다." });
      }

      const result = await storage.createTestResult(validatedData);
      res.json(result);
    } catch (error) {
      console.error("Test result validation error:", error);
      if (error instanceof Error) {
        res.status(400).json({ 
          error: "잘못된 테스트 결과 데이터", 
          details: error.message 
        });
      } else {
        res.status(500).json({ error: "서버 내부 오류가 발생했습니다." });
      }
    }
  });

  app.get("/api/test-results/:id", apiLimiter, async (req, res) => {
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

  app.get("/api/statistics", apiLimiter, async (req, res) => {
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
