import { users, testResults, type User, type InsertUser, type TestResult, type InsertTestResult } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createTestResult(result: InsertTestResult): Promise<TestResult>;
  getTestResult(id: number): Promise<TestResult | undefined>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async createTestResult(insertResult: InsertTestResult): Promise<TestResult> {
    const [result] = await db
      .insert(testResults)
      .values(insertResult)
      .returning();
    return result;
  }

  async getTestResult(id: number): Promise<TestResult | undefined> {
    const [result] = await db.select().from(testResults).where(eq(testResults.id, id));
    return result || undefined;
  }
}

import { db } from "./db";
import { testResults } from "@shared/schema";
import { eq } from "drizzle-orm";
import type { InsertTestResult, TestResult } from "@shared/schema";

export class DatabaseStorage {
  async createTestResult(data: InsertTestResult): Promise<TestResult> {
    const [result] = await db.insert(testResults).values(data).returning();
    return result;
  }

  async getTestResult(id: number): Promise<TestResult | null> {
    const [result] = await db.select().from(testResults).where(eq(testResults.id, id));
    return result || null;
  }
}

export const storage = new DatabaseStorage();
