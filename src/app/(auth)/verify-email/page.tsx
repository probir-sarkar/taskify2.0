import { ThemeSwitcher } from "@/components/common/ThemeSwitcher";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { FiArrowUpRight } from "react-icons/fi";
import ResetPasswordForm from "./ResetPasswordForm";

const VerifyEmailPage = () => {
  return (
    <main className=" dark:bg-slate-900 bg-sky-50 min-h-screen flex flex-col justify-center items-center ">
      <ThemeSwitcher />
      <div className="mx-auto max-w-xl w-full rounded-xl shadow-md bg-white dark:bg-slate-950 p-8 mt-4  ">
        <h1 className="text-3xl font-semibold text-center">Verify Email</h1>
        <p className="text-center ">Please fill in your email address. We will send you a link to reset</p>
        <div className="">
          <ResetPasswordForm />
        </div>
        <div className="mt-8">
          <p className="text-center">
            Already verified your email?{" "}
            <Link href="/login" className="underline inline-flex items-center ">
              Login <FiArrowUpRight />
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
};

export default VerifyEmailPage;
