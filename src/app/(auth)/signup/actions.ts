"use server";
import { Argon2id } from "oslo/password";
import { signupFormSchema } from "./formSchema";
import type { SignupFormInputs } from "./formSchema";
import { db } from "@/db/db";
import { eq, lt, gte, ne } from "drizzle-orm";
import { userTable, passwordTable, emailVerificationTable } from "@/db/schema";
import { createJWT, validateJWT, parseJWT } from "oslo/jwt";
import { HMAC } from "oslo/crypto";
import { TimeSpan, createDate } from "oslo";
import { generateId } from "lucia";
import { sendVerifyEmailEmail } from "@/lib/resend";

export const signup = async (data: SignupFormInputs) => {
  try {
    const { name, email, password } = signupFormSchema.parse(data);
    const passwordHash = await new Argon2id().hash(password);
    const existingUser = await db
      .select({
        email: userTable.email,
      })
      .from(userTable)
      .where(eq(userTable.email, email));
    if (existingUser && existingUser.length > 0) {
      return { success: false, message: "User already exists" };
    }
    const user = await db.transaction(async (tx) => {
      const user = await tx
        .insert(userTable)
        .values({
          name,
          email,
        })
        .returning({
          userId: userTable.id,
        });
      await tx.insert(passwordTable).values({
        userId: user[0].userId,
        hash: passwordHash,
      });
      return user;
    });
    await sendVerifyEmailEmail(email, name, await createEmailVerificationLink(user[0].userId, email));
    return { success: true, message: "User created successfully" };
  } catch (e) {
    console.error(e);
    return { success: false, message: "Error creating user" };
  }
};

export async function createEmailVerificationLink(userId: string, email: string): Promise<string> {
  // optionally invalidate all existing tokens
  await db.delete(emailVerificationTable).where(eq(emailVerificationTable.userId, userId));
  const tokenId = generateId(40);
  await db
    .insert(emailVerificationTable)
    .values({
      id: tokenId,
      userId: userId,
      email: email,
      expiresAt: createDate(new TimeSpan(2, "h")),
    })
    .returning({
      tokenId: emailVerificationTable.id,
    });
  const verificationLink = process.env.NEXT_PUBLIC_SITE_URL + "/verify-email/" + tokenId;
  return verificationLink;
}
