import { Resend } from "resend";
import { ResetPasswordEmail } from "../emails/reset-password";

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
