import { neon } from "@neondatabase/serverless";
import { getLoveForImage } from "@/lib/galleryLoveUtils";

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
      await sql`
        CREATE TABLE IF NOT EXISTS love_count (
          id INTEGER PRIMARY KEY CHECK (id = 1),
          count INTEGER NOT NULL DEFAULT 0
        )
      `;
      await sql`
        INSERT INTO love_count (id, count)
        VALUES (1, 0)
        ON CONFLICT (id) DO NOTHING
      `;
      await sql`
        CREATE TABLE IF NOT EXISTS love_votes (
          visitor_id VARCHAR(64) PRIMARY KEY,
          created_at TIMESTAMPTZ DEFAULT NOW()
        )
      `;
      await sql`
        CREATE TABLE IF NOT EXISTS gallery_loves (
          image_key VARCHAR(255) NOT NULL,
          visitor_id VARCHAR(64) NOT NULL,
          created_at TIMESTAMPTZ DEFAULT NOW(),
          PRIMARY KEY (image_key, visitor_id)
        )
      `;
      await sql`
        CREATE TABLE IF NOT EXISTS gallery_love_counts (
          image_key VARCHAR(255) PRIMARY KEY,
          count INTEGER NOT NULL DEFAULT 0
        )
      `;
      await sql`
        CREATE TABLE IF NOT EXISTS blog_posts (
          id SERIAL PRIMARY KEY,
          slug VARCHAR(255) UNIQUE NOT NULL,
          title VARCHAR(500) NOT NULL,
          excerpt TEXT,
          content TEXT NOT NULL,
          published BOOLEAN DEFAULT FALSE,
          published_at TIMESTAMPTZ,
          created_at TIMESTAMPTZ DEFAULT NOW(),
          updated_at TIMESTAMPTZ DEFAULT NOW()
        )
      `;
      await sql`
        CREATE INDEX IF NOT EXISTS blog_posts_published_idx
        ON blog_posts (published, published_at DESC)
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

export async function getLoveCount() {
  await ensureSchema();
  const sql = getSql();
  const rows = await sql`SELECT count FROM love_count WHERE id = 1`;
  return Number(rows[0]?.count ?? 0);
}

export async function getVisitorLoved(visitorId: string) {
  await ensureSchema();
  const sql = getSql();
  const rows = await sql`
    SELECT visitor_id FROM love_votes WHERE visitor_id = ${visitorId}
  `;
  return rows.length > 0;
}

export async function toggleLove(visitorId: string) {
  await ensureSchema();
  const sql = getSql();

  const inserted = await sql`
    INSERT INTO love_votes (visitor_id)
    VALUES (${visitorId})
    ON CONFLICT (visitor_id) DO NOTHING
    RETURNING visitor_id
  `;

  if (inserted.length === 0) {
    const count = await getLoveCount();
    return { count, loved: true, alreadyLoved: true };
  }

  const rows = await sql`
    UPDATE love_count
    SET count = count + 1
    WHERE id = 1
    RETURNING count
  `;

  return {
    count: Number(rows[0]?.count ?? 0),
    loved: true,
    alreadyLoved: false,
  };
}

export type GalleryLoveImage = {
  count: number;
  loved: boolean;
};

function visitorLovedKey(lovedSet: Set<string>, imageKey: string): boolean {
  if (lovedSet.has(imageKey)) return true;
  const lower = imageKey.toLowerCase();
  for (const key of lovedSet) {
    if (key.toLowerCase() === lower) return true;
  }
  return false;
}

export async function getGalleryLoveState(visitorId?: string) {
  await ensureSchema();
  const sql = getSql();

  const countRows = await sql`
    SELECT image_key, count FROM gallery_love_counts
  `;
  const lovedRows = visitorId
    ? await sql`
        SELECT image_key FROM gallery_loves
        WHERE visitor_id = ${visitorId}
      `
    : [];

  const lovedSet = new Set(
    lovedRows.map((row) => String(row.image_key))
  );

  const images: Record<string, GalleryLoveImage> = {};
  let total = 0;

  for (const row of countRows) {
    const key = String(row.image_key);
    const count = Number(row.count);
    images[key] = { count, loved: visitorLovedKey(lovedSet, key) };
    total += count;
  }

  for (const key of lovedSet) {
    if (!images[key]) {
      images[key] = { count: 0, loved: true };
    }
  }

  return { total, images };
}

export async function toggleGalleryLove(visitorId: string, imageKey: string) {
  await ensureSchema();
  const sql = getSql();

  const already = await sql`
    SELECT image_key FROM gallery_loves
    WHERE visitor_id = ${visitorId}
      AND LOWER(image_key) = LOWER(${imageKey})
    LIMIT 1
  `;

  if (already.length > 0) {
    const state = await getGalleryLoveState(visitorId);
    const current = getLoveForImage(state.images, imageKey) ?? {
      count: 0,
      loved: true,
    };
    return {
      total: state.total,
      image: current,
      alreadyLoved: true,
    };
  }

  const inserted = await sql`
    INSERT INTO gallery_loves (image_key, visitor_id)
    VALUES (${imageKey}, ${visitorId})
    ON CONFLICT DO NOTHING
    RETURNING image_key
  `;

  if (inserted.length === 0) {
    const state = await getGalleryLoveState(visitorId);
    const current = state.images[imageKey] ?? { count: 0, loved: true };
    return {
      total: state.total,
      image: current,
      alreadyLoved: true,
    };
  }

  const countRows = await sql`
    INSERT INTO gallery_love_counts (image_key, count)
    VALUES (${imageKey}, 1)
    ON CONFLICT (image_key)
    DO UPDATE SET count = gallery_love_counts.count + 1
    RETURNING count
  `;

  const state = await getGalleryLoveState(visitorId);

  return {
    total: state.total,
    image: {
      count: Number(countRows[0]?.count ?? 0),
      loved: true,
    },
    alreadyLoved: false,
  };
}

export type BlogPost = {
  id: number;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string;
  published: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

export async function getPublishedBlogPosts() {
  await ensureSchema();
  const sql = getSql();
  const rows = await sql`
    SELECT id, slug, title, excerpt, content, published, published_at, created_at, updated_at
    FROM blog_posts
    WHERE published = TRUE
    ORDER BY published_at DESC NULLS LAST, created_at DESC
  `;
  return rows as BlogPost[];
}

export async function getPublishedBlogPostBySlug(slug: string) {
  await ensureSchema();
  const sql = getSql();
  const rows = await sql`
    SELECT id, slug, title, excerpt, content, published, published_at, created_at, updated_at
    FROM blog_posts
    WHERE slug = ${slug} AND published = TRUE
    LIMIT 1
  `;
  return (rows[0] as BlogPost | undefined) ?? null;
}

export async function getAllBlogPosts() {
  await ensureSchema();
  const sql = getSql();
  const rows = await sql`
    SELECT id, slug, title, excerpt, content, published, published_at, created_at, updated_at
    FROM blog_posts
    ORDER BY updated_at DESC
  `;
  return rows as BlogPost[];
}

export async function getBlogPostById(id: number) {
  await ensureSchema();
  const sql = getSql();
  const rows = await sql`
    SELECT id, slug, title, excerpt, content, published, published_at, created_at, updated_at
    FROM blog_posts
    WHERE id = ${id}
    LIMIT 1
  `;
  return (rows[0] as BlogPost | undefined) ?? null;
}

export async function insertBlogPost(data: {
  slug: string;
  title: string;
  excerpt?: string | null;
  content: string;
  published?: boolean;
}) {
  await ensureSchema();
  const sql = getSql();
  const published = data.published ?? false;
  const rows = await sql`
    INSERT INTO blog_posts (slug, title, excerpt, content, published, published_at)
    VALUES (
      ${data.slug},
      ${data.title},
      ${data.excerpt ?? null},
      ${data.content},
      ${published},
      ${published ? new Date().toISOString() : null}
    )
    RETURNING id, slug, title, excerpt, content, published, published_at, created_at, updated_at
  `;
  return rows[0] as BlogPost;
}

export async function updateBlogPost(
  id: number,
  data: {
    slug?: string;
    title?: string;
    excerpt?: string | null;
    content?: string;
    published?: boolean;
  }
) {
  await ensureSchema();
  const sql = getSql();
  const existing = await getBlogPostById(id);
  if (!existing) return null;

  const slug = data.slug ?? existing.slug;
  const title = data.title ?? existing.title;
  const excerpt =
    data.excerpt !== undefined ? data.excerpt : existing.excerpt;
  const content = data.content ?? existing.content;
  const published =
    data.published !== undefined ? data.published : existing.published;

  let publishedAt = existing.published_at;
  if (published && !existing.published) {
    publishedAt = new Date().toISOString();
  } else if (!published) {
    publishedAt = null;
  }

  const rows = await sql`
    UPDATE blog_posts
    SET
      slug = ${slug},
      title = ${title},
      excerpt = ${excerpt},
      content = ${content},
      published = ${published},
      published_at = ${publishedAt},
      updated_at = NOW()
    WHERE id = ${id}
    RETURNING id, slug, title, excerpt, content, published, published_at, created_at, updated_at
  `;
  return (rows[0] as BlogPost | undefined) ?? null;
}

export async function deleteBlogPost(id: number) {
  await ensureSchema();
  const sql = getSql();
  const rows = await sql`
    DELETE FROM blog_posts
    WHERE id = ${id}
    RETURNING id
  `;
  return rows.length > 0;
}
