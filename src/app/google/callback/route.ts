import { google, lucia } from "@/lib/auth";
import { cookies } from "next/headers";
import { OAuth2RequestError } from "arctic";
import { db } from "@/db/db";
import { eq, lt, gte, ne } from "drizzle-orm";
import { userTable } from "@/db/schema";

export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const codeVerifier = cookies().get("google_oauth_codeVerifier")?.value ?? null;
  if (!code || !state || !codeVerifier) {
    return new Response("Invalid request", {
      status: 400,
    });
  }
  try {
    const tokens = await google.validateAuthorizationCode(code, codeVerifier);
    const response = await fetch("https://openidconnect.googleapis.com/v1/userinfo", {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`,
      },
    });
    const user = await response.json();
    const { id, email, picture } = user;
    const existingUser = await db
      .selectDistinct({ email: userTable.email, userId: userTable.id })
      .from(userTable)
      .where(eq(userTable.email, email));

    if (!existingUser || existingUser.length === 0) {
      const createUser = await db
        .insert(userTable)
        .values({
          email,
          photo: picture,
        })
        .returning({ userId: userTable.id, email: userTable.email });

      const session = await lucia.createSession(createUser[0].userId, {});
      const sessionCookie = lucia.createSessionCookie(session.id);
      cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
      return new Response(null, {
        status: 302,
        headers: {
          Location: "/",
        },
      });
    }
    const session = await lucia.createSession(existingUser[0].userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
    return new Response(null, {
      status: 302,
      headers: {
        Location: "/",
      },
    });
  } catch (e) {
    console.log(e);

    // the specific error message depends on the provider
    if (e instanceof OAuth2RequestError) {
      // invalid code
      return new Response(null, {
        status: 400,
      });
    }
    return new Response(null, {
      status: 500,
    });
  }
}
