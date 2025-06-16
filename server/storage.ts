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

  async getStatistics() {
    const results = await db.select().from(testResults);

    const totalTests = results.length;
    const maleCount = results.filter(r => r.gender === 'male').length;
    const femaleCount = results.filter(r => r.gender === 'female').length;
    const tetoCount = results.filter(r => r.resultType === 'teto').length;
    const egenCount = results.filter(r => r.resultType === 'egen').length;

    const tetoMale = results.filter(r => r.gender === 'male' && r.resultType === 'teto').length;
    const tetoFemale = results.filter(r => r.gender === 'female' && r.resultType === 'teto').length;
    const egenMale = results.filter(r => r.gender === 'male' && r.resultType === 'egen').length;
    const egenFemale = results.filter(r => r.gender === 'female' && r.resultType === 'egen').length;

    return {
      totalTests,
      genderDistribution: {
        male: maleCount,
        female: femaleCount
      },
      typeDistribution: {
        teto: tetoCount,
        egen: egenCount
      },
      genderTypeDistribution: {
        tetoMale,
        tetoFemale,
        egenMale,
        egenFemale
      }
    };
  }
}

export const storage = new DatabaseStorage();