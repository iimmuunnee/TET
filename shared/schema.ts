import { pgTable, text, serial, integer, jsonb, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const testResults = pgTable("test_results", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(), // user's name
  gender: text("gender").notNull(), // 'male' or 'female'
  answers: jsonb("answers").notNull(), // array of answer objects
  resultType: text("result_type").notNull(), // 'teto' or 'egen'
  tetoScore: integer("teto_score").notNull(),
  egenScore: integer("egen_score").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertTestResultSchema = createInsertSchema(testResults).omit({
  id: true,
  createdAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type TestResult = typeof testResults.$inferSelect;
export type InsertTestResult = z.infer<typeof insertTestResultSchema>;
