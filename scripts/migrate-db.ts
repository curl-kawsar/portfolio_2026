import { ensureSchema } from "../lib/db";

async function main() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not set. Use .env.local or pass it in the environment.");
  }

  console.log("Running database migration...");
  await ensureSchema();
  console.log("Migration complete.");
}

main().catch((error) => {
  console.error("Migration failed:", error);
  process.exit(1);
});
