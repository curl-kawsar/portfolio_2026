import { neon } from "@neondatabase/serverless";

export type ContactMessage = {
  id: number;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  read: boolean;
  created_at: string;
};

function getSql() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error("DATABASE_URL is not set");
  }
  return neon(url);
}

let schemaReady: Promise<void> | null = null;

export async function ensureSchema() {
  if (!schemaReady) {
    schemaReady = (async () => {
      const sql = getSql();
      await sql`
        CREATE TABLE IF NOT EXISTS contact_messages (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL,
          subject VARCHAR(500),
          message TEXT NOT NULL,
          read BOOLEAN DEFAULT FALSE,
          created_at TIMESTAMPTZ DEFAULT NOW()
        )
      `;
    })();
  }
  await schemaReady;
}

export async function insertContactMessage(data: {
  name: string;
  email: string;
  subject?: string;
  message: string;
}) {
  await ensureSchema();
  const sql = getSql();
  const rows = await sql`
    INSERT INTO contact_messages (name, email, subject, message)
    VALUES (${data.name}, ${data.email}, ${data.subject ?? null}, ${data.message})
    RETURNING id, name, email, subject, message, read, created_at
  `;
  return rows[0] as ContactMessage;
}

export async function getContactMessages() {
  await ensureSchema();
  const sql = getSql();
  const rows = await sql`
    SELECT id, name, email, subject, message, read, created_at
    FROM contact_messages
    ORDER BY created_at DESC
  `;
  return rows as ContactMessage[];
}

export async function updateContactMessageRead(id: number, read: boolean) {
  await ensureSchema();
  const sql = getSql();
  const rows = await sql`
    UPDATE contact_messages
    SET read = ${read}
    WHERE id = ${id}
    RETURNING id, name, email, subject, message, read, created_at
  `;
  return (rows[0] as ContactMessage | undefined) ?? null;
}

export async function deleteContactMessage(id: number) {
  await ensureSchema();
  const sql = getSql();
  const rows = await sql`
    DELETE FROM contact_messages
    WHERE id = ${id}
    RETURNING id
  `;
  return rows.length > 0;
}
