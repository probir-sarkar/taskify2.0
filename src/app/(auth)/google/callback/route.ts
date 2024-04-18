import { google, lucia } from "@/lib/auth";
import { cookies } from "next/headers";
import { OAuth2RequestError } from "arctic";
import { db } from "@/db/db";
import { eq } from "drizzle-orm";
import { userTable } from "@/db/schema";

export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const codeVerifier = cookies().get("google_oauth_codeVerifier")?.value ?? null;

  if (!code || !state || !codeVerifier) return new Response("Invalid request", { status: 400 });

  try {
    const tokens = await google.validateAuthorizationCode(code, codeVerifier);
    const response = await fetch("https://openidconnect.googleapis.com/v1/userinfo", {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`,
      },
    });
    const user = await response.json();
    const { email, picture, name, email_verified } = user;
    const emailVerified = email_verified === "true";

    let dbUser = await db
      .select({ userId: userTable.id, emailVerified: userTable.emailVerified })
      .from(userTable)
      .where(eq(userTable.email, email));

    if (!dbUser || dbUser.length === 0) {
      dbUser = await db
        .insert(userTable)
        .values({ email, photo: picture, name, emailVerified })
        .returning({ userId: userTable.id, emailVerified: userTable.emailVerified });
    }
    if (!dbUser[0].emailVerified && emailVerified) {
      await db.update(userTable).set({ emailVerified: true }).where(eq(userTable.id, dbUser[0].userId));
    } else if (!dbUser[0].emailVerified && !emailVerified) {
      return new Response(
        "Email not verified. Please verify your Gmail account or log in through email using your password. Thank you. ",
        { status: 403 }
      );
    }
    const session = await lucia.createSession(dbUser[0].userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
    return new Response(null, { status: 302, headers: { Location: "/" } });
  } catch (e) {
    if (e instanceof OAuth2RequestError) {
      return new Response("Invalid authorization code", { status: 400 });
    }
    return new Response("Internal Server Error", { status: 500 });
  }
}
