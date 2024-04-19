import { Resend } from "resend";
import { ResetPasswordEmail } from "../emails/reset-password";
import VerifyEmail from "@/emails/verify-email";

export const resend = new Resend(process.env.RESEND_API_KEY);

export const sendResetPasswordEmail = async (email: string, userFirstname: string, resetPasswordLink: string) => {
  return resend.emails.send({
    to: email,
    from: "taskify@probir.dev",
    subject: "Reset your password - Taskify!",
    react: ResetPasswordEmail({ userFirstname, resetPasswordLink }),
    reply_to: "me@probirsarkar.com",
  });
};

export const sendVerifyEmailEmail = async (email: string, userFirstname: string, verifyEmailLink: string) => {
  return resend.emails.send({
    to: email,
    from: "taskify@probir.dev",
    subject: "Verify your email address - Taskify!",
    react: VerifyEmail({ userFirstname, verifyEmailLink, email }),
    reply_to: "me@probirsarkar.com",
  });
};
