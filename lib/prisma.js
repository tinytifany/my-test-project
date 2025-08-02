// lib/prisma.js
import { PrismaClient } from '@prisma/client';

let prisma;

// Pastikan PrismaClient hanya dibuat sekali, terutama untuk Next.js hot-reloading
if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export default prisma;