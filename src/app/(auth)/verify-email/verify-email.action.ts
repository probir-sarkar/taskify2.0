"use server";
import { checkExistingUser } from "@/db/db-queries";
import { sendVerifyEmailEmail } from "@/lib/resend";
import { createEmailVerificationLink } from "@/app/(auth)/signup/actions";
import { db } from "@/db/db";
import { eq } from "drizzle-orm";
import { emailVerificationTable, userTable } from "@/db/schema";
import { isWithinExpirationDate } from "oslo";

export async function sendVerifyEmail(data: { email: string }) {
  try {
    const { email } = data;

    // Check if user exists
    const user = await checkExistingUser(email);
    if (!user) {
      return { success: false, message: "User not found" };
    }

    // Check if user is already verified
    if (user.emailVerified) {
      return { success: false, message: "User already verified" };
    }

    // Create email verification link
    const verificationLink = await createEmailVerificationLink(user.id, email);

    // Send verification email asynchronously
    await sendVerifyEmailEmail(email, user.name || "User", verificationLink);

    return { success: true, message: "Email verification link has been sent" };
  } catch (error) {
    console.error("An error occurred:", error);
    return { success: false, message: "An error occurred" };
  }
}

export async function verifyEmail(verificationCode: string) {
  if (!verificationCode) throw new Error("No verification link provided");
  const tokenExists = await db
    .select()
    .from(emailVerificationTable)
    .where(eq(emailVerificationTable.id, verificationCode));

  if (!tokenExists?.[0]?.expiresAt || !isWithinExpirationDate(tokenExists[0].expiresAt)) {
    throw new Error("Invalid or expired verification link");
  }
  const user = await db.select().from(userTable).where(eq(userTable.id, tokenExists[0].userId));
  if (!user?.[0]?.id || user[0].email !== tokenExists[0].email) {
    throw new Error("Invalid verification link");
  }
  if (user[0].emailVerified) {
    throw new Error("Email already verified");
  }
  const update = await db.transaction(async (db) => {
    await db.update(userTable).set({ emailVerified: true }).where(eq(userTable.id, user[0].id));
    await db.delete(emailVerificationTable).where(eq(emailVerificationTable.id, verificationCode));
    return true;
  });
  if (update) {
    return { success: true, message: "Email verified successfully" };
  }
  throw new Error("An error occurred");
}
