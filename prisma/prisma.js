// This file is used to create a new PrismaClient instance with the Pulse extension enabled and export it as the default export for use globally. The Pulse extension is a new feature that allows you to track changes to your database in real-time. This is useful for building real-time applications or dashboards that need to display the latest data as soon as it changes.
import { PrismaClient } from '@prisma/client';
import { withPulse } from '@prisma/extension-pulse';

const prisma = new PrismaClient().$extends(
  withPulse({ apiKey: process.env.PULSE_API_KEY }),
);

export default prisma;
