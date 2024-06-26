"use server";
import { TimeSpan, createDate } from "oslo";
import { sha256 } from "oslo/crypto";
import { encodeHex } from "oslo/encoding";
import { generateId } from "lucia";
import { db } from "@/db/db";
import { passwordResetTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { checkExistingUser } from "@/db/db-queries";
import { sendResetPasswordEmail } from "@/lib/resend";

export async function createPasswordResetToken(userId: string): Promise<string> {
  await db.delete(passwordResetTable).where(eq(passwordResetTable.userId, userId));
  const tokenId = generateId(40);
  const tokenHash = encodeHex(await sha256(new TextEncoder().encode(tokenId)));
  await db.insert(passwordResetTable).values({
    token: tokenHash,
    userId,
    expiresAt: createDate(new TimeSpan(2, "h")),
  });
  return tokenId;
}

export async function sendResetPassword(data: { email: string }) {
  try {
    const { email } = data;
    const user = await checkExistingUser(email);
    if (!user) {
      return { success: false, message: "User not found" };
    }
    const verificationToken = await createPasswordResetToken(user.id);
    const verificationLink = process.env.NEXT_PUBLIC_SITE_URL + "/reset-password/" + verificationToken;
    await sendResetPasswordEmail(email, user.name || "User", verificationLink);

    return { success: true, message: "Password reset link sent" };
  } catch (e) {
    return { success: false, message: "An error occurred" };
  }
}
