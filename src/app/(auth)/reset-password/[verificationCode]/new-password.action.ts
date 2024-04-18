"use server";
import { isWithinExpirationDate } from "oslo";
import { Argon2id } from "oslo/password";
import { sha256 } from "oslo/crypto";
import { encodeHex } from "oslo/encoding";
import z from "zod";
import { db } from "@/db/db";
import { eq } from "drizzle-orm";
import { passwordTable, passwordResetTable } from "@/db/schema";
import { revalidatePath } from "next/cache";

export async function checkValidToken(verificationToken: string) {
  const tokenHash = encodeHex(await sha256(new TextEncoder().encode(verificationToken)));
  const tokenExists = await db.query.passwordResetTable.findFirst({
    where: (passwordResetTable, { eq }) => eq(passwordResetTable.token, tokenHash),
  });
  if (!tokenExists) throw new Error("Invalid token");
  if (!isWithinExpirationDate(tokenExists.expiresAt)) throw new Error("Token expired");
  return tokenExists;
}

const updatePasswordSchema = z
  .object({
    password: z.string().min(8),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
type InputData = z.infer<typeof updatePasswordSchema>;

export const updatePassword = async (data: InputData, verificationCode: string) => {
  try {
    const { password, confirmPassword } = data;
    if (password !== confirmPassword) return { success: false, message: "Passwords do not match" };
    const tokenTable = await checkValidToken(verificationCode);

    const hashedPassword = await new Argon2id().hash(password);
    await db.transaction(async (db) => {
      await db
        .insert(passwordTable)
        .values({
          userId: tokenTable.userId,
          hash: hashedPassword,
        })
        .onConflictDoUpdate({
          target: passwordTable.userId,
          set: {
            hash: hashedPassword,
          },
        });
      await db.delete(passwordResetTable).where(eq(passwordResetTable.userId, tokenTable.userId));
    });
    return { success: true, message: "Password updated successfully" };
  } catch (e) {
    console.log(e);

    return { success: false, message: "An error occurred" };
  }
};
