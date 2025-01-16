// create a new PrismaClient instance and export it as the default export for use globally as a best practice to avoid creating multiple instances of PrismaClient in your application mitigating performance issues.
import { PrismaClient } from '@prisma/client';

const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = prisma;
} 

export default prisma;
