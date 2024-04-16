import { Lucia } from "lucia";
import { DrizzleSQLiteAdapter } from "@lucia-auth/adapter-drizzle";
import { db } from "@/db/db";
import { sessionTable, userTable } from "@/db/schema";
import type { UserTable } from "@/db/schema";
import { cache } from "react";
import { cookies } from "next/headers";
import type { Session, User } from "lucia";
import { Google } from "arctic";
const adapter = new DrizzleSQLiteAdapter(db, sessionTable, userTable);

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      // set to `true` when using HTTPS
      secure: process.env.NODE_ENV === "production",
    },
  },
  getUserAttributes: (attributes) => {
    return {
      // attributes has the type of DatabaseUserAttributes
      userId: attributes.id,
      email: attributes.email,
    };
  },
});

// IMPORTANT!
declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: UserTable;
  }
}

export const validateRequest = cache(
  async (): Promise<{ user: User; session: Session } | { user: null; session: null }> => {
    const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
    if (!sessionId) {
      return {
        user: null,
        session: null,
      };
    }

    const result = await lucia.validateSession(sessionId);
    // next.js throws when you attempt to set cookie when rendering page
    try {
      if (result.session && result.session.fresh) {
        const sessionCookie = lucia.createSessionCookie(result.session.id);
        cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
      }
      if (!result.session) {
        const sessionCookie = lucia.createBlankSessionCookie();
        cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
      }
    } catch {}
    return result;
  }
);

export const google = new Google(
  process.env.GOOGLE_CLIENT_ID!,
  process.env.GOOGLE_CLIENT_SECRET!,
  "http://localhost:3000/google/callback"
);
