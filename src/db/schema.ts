import { sql } from "drizzle-orm";
import { integer, sqliteTable, text, index } from "drizzle-orm/sqlite-core";
import { generateId } from "lucia";

export const userTable = sqliteTable("user", {
  id: text("id")
    .notNull()
    .primaryKey()
    .$defaultFn(() => generateId(15))
    .unique(),
  email: text("email").notNull().unique(),
  emailVerified: integer("email_verified", { mode: "boolean" }).notNull().default(true),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
  photo: text("photo"),
  name: text("name"),
});

export const passwordTable = sqliteTable("password", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id, { onDelete: "cascade" })
    .unique(),
  hash: text("hash").notNull(),
});

export const sessionTable = sqliteTable("session", {
  id: text("id").notNull().primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id, { onDelete: "cascade" }),
  expiresAt: integer("expires_at").notNull(),
});

export const passwordResetTable = sqliteTable("password_reset_token", {
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id, { onDelete: "cascade" }),
  token: text("token").notNull().unique(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
  expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
});

export type UserTable = typeof userTable.$inferSelect;
export type PasswordTable = typeof passwordTable.$inferSelect;
export type SessionTable = typeof sessionTable.$inferSelect;
export type PasswordResetTable = typeof passwordResetTable.$inferSelect;
