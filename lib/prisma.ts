// lib/prisma.ts
import "dotenv/config";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "../generated/prisma/client"; // your generated client

// Connection string from .env
const connectionString = process.env.DATABASE_URL!;

// Create adapter
const adapter = new PrismaBetterSqlite3({ url: connectionString });

// Avoid creating multiple clients in development
const globalForPrisma = global as unknown as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({ adapter });

// Attach to global so Next.js HMR doesn’t create multiple instances
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
