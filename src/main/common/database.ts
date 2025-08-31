import { PrismaClient } from "@prisma/client";

const db = new PrismaClient({
  log: ["info", "warn", { emit: "event", level: "error" }],
});

export default db;
