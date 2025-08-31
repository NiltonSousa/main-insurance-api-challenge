import "tsconfig-paths/register";
import db from "@/main/common/database";

jest.setTimeout(10 * 60000);

beforeEach(async () => {
  // Delete all data
  await db.policy.deleteMany();
  await db.quote.deleteMany();
  await db.partner.deleteMany();
});
