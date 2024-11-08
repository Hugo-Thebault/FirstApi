import { PrismaClient } from '@prisma/client';

let client = new PrismaClient();
console.log("[DEBUG] Connected to DB");

export const prisma = client;