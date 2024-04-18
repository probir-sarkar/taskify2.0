import { db } from "@/db/db";
import { isWithinExpirationDate } from "oslo";
import { sha256 } from "oslo/crypto";
import { encodeHex } from "oslo/encoding";

async function checkValidToken(verificationToken: string) {
  const tokenHash = encodeHex(await sha256(new TextEncoder().encode(verificationToken)));
  const tokenExists = await db.query.passwordResetTable.findFirst({
    where: (passwordResetTable, { eq }) => eq(passwordResetTable.token, tokenHash),
  });
  if (!tokenExists) throw new Error("Invalid token");
  if (!isWithinExpirationDate(tokenExists.expiresAt)) throw new Error("Token expired");
  return true;
}

const ChangePassword = async ({ params }: { params: { verificationCode: string } }) => {
  const { verificationCode } = params;
  const isValidToken = await checkValidToken(verificationCode);
  return <></>;
};

export default ChangePassword;
