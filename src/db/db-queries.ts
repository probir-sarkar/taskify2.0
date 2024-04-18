"use server";
import z from "zod";
import { db } from "./db";
import { userTable, passwordTable } from "./schema";
import type { UserTable } from "./schema";
import { eq } from "drizzle-orm";

export const checkExistingUser = async (email: string): Promise<UserTable | false> => {
  try {
    const query = await db.select().from(userTable).where(eq(userTable.email, email));
    const user: UserTable = query[0];
    if (user && user.email === email) {
      return user;
    }
    return false;
  } catch (e) {
    console.log(e);
    return false;
  }
};
