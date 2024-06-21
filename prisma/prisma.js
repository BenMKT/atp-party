// create a new PrismaClient instance and export it as the default export for use globally as a best practice to avoid creating multiple instances of PrismaClient in your application mitigating performance issues.
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default prisma;
