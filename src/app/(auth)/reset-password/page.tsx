import { ThemeSwitcher } from "@/components/common/ThemeSwitcher";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { FiArrowUpRight } from "react-icons/fi";
import ResetPasswordForm from "./ResetPasswordForm";

const ResetPasswordPage = () => {
  return (
    <main className=" dark:bg-slate-900 bg-sky-50 min-h-screen flex flex-col justify-center items-center ">
      <ThemeSwitcher />
      <div className="mx-auto max-w-xl w-full rounded-xl shadow-md bg-white dark:bg-slate-950 p-8 mt-4  ">
        <h1 className="text-3xl font-semibold text-center">Reset Password</h1>
        <p className="text-center mb-16">Enter your email address to reset your password</p>
        <div className="">
          <ResetPasswordForm />
        </div>
        <div className="mt-8">
          <p className="text-center">
            Remember Password?{" "}
            <Link href="/login" className="underline inline-flex items-center ">
              Login <FiArrowUpRight />
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
};

export default ResetPasswordPage;
