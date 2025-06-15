import { users, testResults, type User, type InsertUser, type TestResult, type InsertTestResult } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createTestResult(result: InsertTestResult): Promise<TestResult>;
  getTestResult(id: number): Promise<TestResult | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private testResults: Map<number, TestResult>;
  private currentUserId: number;
  private currentTestResultId: number;

  constructor() {
    this.users = new Map();
    this.testResults = new Map();
    this.currentUserId = 1;
    this.currentTestResultId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createTestResult(insertResult: InsertTestResult): Promise<TestResult> {
    const id = this.currentTestResultId++;
    const result: TestResult = { 
      ...insertResult, 
      id,
      createdAt: new Date()
    };
    this.testResults.set(id, result);
    return result;
  }

  async getTestResult(id: number): Promise<TestResult | undefined> {
    return this.testResults.get(id);
  }
}

export const storage = new MemStorage();
