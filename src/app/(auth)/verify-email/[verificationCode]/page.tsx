import { ThemeSwitcher } from "@/components/common/ThemeSwitcher";
import Link from "next/link";
import { unstable_noStore as noStore } from "next/cache";
import { verifyEmail } from "../verify-email.action";
import { ImHappy } from "react-icons/im";
import { Button } from "@nextui-org/react";

const EmailVerifiedPage = async ({ params }: { params: { verificationCode: string } }) => {
  noStore();
  const { verificationCode } = params;
  await verifyEmail(verificationCode);
  return (
    <main className=" dark:bg-slate-900 bg-sky-50 min-h-screen flex flex-col justify-center items-center ">
      <ThemeSwitcher />
      <div className="mx-auto max-w-xl w-full rounded-xl shadow-md bg-white dark:bg-slate-950 p-8 mt-4 grid gap-6  ">
        <ImHappy size={96} className="mx-auto" />
        <h1 className="text-3xl font-semibold text-center">Email verified</h1>
        <p className="text-center ">Your email has been successfully verified. You can now login to your account.</p>

        <Button size="lg" color="primary" fullWidth>
          <Link href="/login" className=" ">
            Back to Login
          </Link>
        </Button>
      </div>
    </main>
  );
};

export default EmailVerifiedPage;
