"use server";
import { Argon2id } from "oslo/password";
import { loginFormSchema } from "./formSchema";
import type { LoginFormInputs } from "./formSchema";
import { db } from "@/db/db";
import { eq, lt, gte, ne } from "drizzle-orm";
import { userTable, passwordTable } from "@/db/schema";
import { cookies } from "next/headers";
import { lucia } from "@/lib/auth";

const ERROR_MESSAGES = {
  USER_NOT_FOUND: "User not found",
  NO_PASSWORD_FOUND: "No password found. Maybe you logged in through Google. Reset your password for a new one.",
  ERROR_CREATING_USER: "Error creating user",
  INVALID_CREDENTIALS: "Invalid email or password",
};

export const login = async (data: LoginFormInputs) => {
  try {
    const { email, password } = loginFormSchema.parse(data);
    const query = await db
      .select({
        userId: userTable.id,
        email: userTable.email,
        passwordHash: passwordTable.hash,
      })
      .from(userTable)
      .fullJoin(passwordTable, eq(userTable.id, passwordTable.userId))
      .where(eq(userTable.email, email));
    const user = query[0];
    if (!query || query.length === 0 || !user || !user.userId) {
      return { success: false, message: ERROR_MESSAGES.USER_NOT_FOUND };
    }

    if (!user.passwordHash) {
      return { success: false, message: ERROR_MESSAGES.NO_PASSWORD_FOUND };
    }
    const isValidPassword = await new Argon2id().verify(user.passwordHash, password);
    if (!isValidPassword) {
      console.log(ERROR_MESSAGES.INVALID_CREDENTIALS);
      return { success: false, message: ERROR_MESSAGES.INVALID_CREDENTIALS };
    }
    const session = await lucia.createSession(user.userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
    return { success: true, message: "Logged in successfully" };
  } catch (e) {
    console.error(e);
    return { success: false, message: "Error creating user" };
  }
};
