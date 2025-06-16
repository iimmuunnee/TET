import { Request, Response, NextFunction } from 'express';

// XSS 방어를 위한 입력 sanitization
export function sanitizeInput(req: Request, res: Response, next: NextFunction) {
  if (req.body) {
    req.body = sanitizeObject(req.body);
  }
  if (req.query) {
    req.query = sanitizeObject(req.query);
  }
  if (req.params) {
    req.params = sanitizeObject(req.params);
  }
  next();
}

function sanitizeObject(obj: any): any {
  if (typeof obj === 'string') {
    return obj
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/<[^>]*>/g, '')
      .trim();
  }
  
  if (Array.isArray(obj)) {
    return obj.map(sanitizeObject);
  }
  
  if (obj && typeof obj === 'object') {
    const sanitized: any = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        sanitized[key] = sanitizeObject(obj[key]);
      }
    }
    return sanitized;
  }
  
  return obj;
}

// SQL Injection 방어를 위한 파라미터 검증
export function validateParams(req: Request, res: Response, next: NextFunction) {
  for (const key in req.params) {
    const value = req.params[key];
    
    // ID 파라미터는 숫자만 허용
    if (key === 'id' && !/^\d+$/.test(value)) {
      return res.status(400).json({ error: '잘못된 ID 형식입니다.' });
    }
    
    // 특수 문자나 SQL 키워드 검사
    if (typeof value === 'string' && containsSqlInjection(value)) {
      return res.status(400).json({ error: '잘못된 요청 형식입니다.' });
    }
  }
  next();
}

function containsSqlInjection(input: string): boolean {
  const sqlPatterns = [
    /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|UNION)\b)/i,
    /(\b(OR|AND)\s+\d+\s*=\s*\d+)/i,
    /(--|\/\*|\*\/)/,
    /(\bCONCAT\s*\()/i,
    /(\bCAST\s*\()/i
  ];
  
  return sqlPatterns.some(pattern => pattern.test(input));
}

// 요청 크기 제한
export function limitRequestSize(maxSize: number = 1024 * 1024) {
  return (req: Request, res: Response, next: NextFunction) => {
    const contentLength = parseInt(req.get('content-length') || '0');
    
    if (contentLength > maxSize) {
      return res.status(413).json({ 
        error: '요청 크기가 제한을 초과했습니다.' 
      });
    }
    
    next();
  };
}

// 의심스러운 요청 패턴 감지
export function detectSuspiciousActivity(req: Request, res: Response, next: NextFunction) {
  const userAgent = req.get('User-Agent') || '';
  const suspiciousPatterns = [
    /sqlmap/i,
    /nikto/i,
    /nmap/i,
    /burp/i,
    /\bbot\b/i,
    /crawler/i,
    /scanner/i
  ];
  
  // 의심스러운 User-Agent 감지
  if (suspiciousPatterns.some(pattern => pattern.test(userAgent))) {
    console.warn(`Suspicious User-Agent detected: ${userAgent} from IP: ${req.ip}`);
    return res.status(403).json({ error: '접근이 거부되었습니다.' });
  }
  
  // 비정상적으로 많은 파라미터
  if (Object.keys(req.query).length > 20) {
    console.warn(`Too many query parameters from IP: ${req.ip}`);
    return res.status(400).json({ error: '요청 파라미터가 너무 많습니다.' });
  }
  
  next();
}