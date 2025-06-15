
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "@shared/schema";

// For development, we'll use a mock database
// In production, you would use your actual database URL
const connectionString = process.env.DATABASE_URL || "mock://localhost";

let db: ReturnType<typeof drizzle>;

if (connectionString === "mock://localhost") {
  // Mock database for development
  const mockNeon = (() => {
    const mockDb = {
      testResults: [] as any[],
      nextId: 1
    };

    return (query: string, params?: any[]) => {
      console.log("Mock DB Query:", query, params);
      
      if (query.includes("INSERT INTO")) {
        const newResult = {
          id: mockDb.nextId++,
          ...params?.[0],
          createdAt: new Date()
        };
        mockDb.testResults.push(newResult);
        return Promise.resolve([newResult]);
      }
      
      if (query.includes("SELECT")) {
        const id = params?.[0];
        const result = mockDb.testResults.find(r => r.id === id);
        return Promise.resolve(result ? [result] : []);
      }
      
      return Promise.resolve([]);
    };
  })();
  
  db = drizzle(mockNeon as any, { schema });
} else {
  const sql = neon(connectionString);
  db = drizzle(sql, { schema });
}

export { db };
