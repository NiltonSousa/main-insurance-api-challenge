import "tsconfig-paths/register";
import db from "@/main/common/database";

jest.setTimeout(10 * 60000);

beforeEach(async () => {
  // Delete all data
  await db.partner.deleteMany();
});
