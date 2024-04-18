"use server";
import { Argon2id } from "oslo/password";
import { signupFormSchema } from "./formSchema";
import type { SignupFormInputs } from "./formSchema";
import { db } from "@/db/db";
import { eq, lt, gte, ne } from "drizzle-orm";
import { userTable, passwordTable } from "@/db/schema";
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
    await db.transaction(async (tx) => {
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
    return { success: true, message: "User created successfully" };
  } catch (e) {
    console.error(e);
    return { success: false, message: "Error creating user" };
  }
};
