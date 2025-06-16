import express, { type Request, Response, NextFunction } from "express";
import rateLimit from "express-rate-limit";
import slowDown from "express-slow-down";
import helmet from "helmet";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";

const app = express();

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", "https://www.googletagmanager.com", "https://www.google-analytics.com", "https://pagead2.googlesyndication.com", "https://partner.googleadservices.com", "https://replit.com"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https:", "https://www.google-analytics.com", "https://www.googletagmanager.com"],
      connectSrc: ["'self'", "https://www.google-analytics.com", "https://region1.google-analytics.com"],
      frameSrc: ["'self'", "https://googleads.g.doubleclick.net", "https://tpc.googlesyndication.com"]
    }
  }
}));

// Rate limiting - 통합된 설정
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15분
  max: 100, // 일반 요청 제한
  message: { error: "요청이 너무 많습니다. 잠시 후 다시 시도해주세요." },
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

// 테스트 결과 저장에 대한 제한
const testSubmitLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5분
  max: 3, // 테스트 제출 제한
  message: { error: "테스트 제출이 너무 많습니다. 잠시 후 다시 시도해주세요." },
  standardHeaders: true,
  legacyHeaders: false,
});

// Slow down middleware - 점진적 지연
const speedLimiter = slowDown({
  windowMs: 15 * 60 * 1000, // 15분
  delayAfter: 50, // 50회 요청 후 지연 시작
  delayMs: 500 // 500ms씩 지연 증가
});

// Apply middleware
app.use(limiter);
app.use(speedLimiter);

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: false, limit: '10mb' }));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // ALWAYS serve the app on port 5000
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = 5000;
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true,
  }, () => {
    log(`serving on port ${port}`);
  });
})();
