import Image from "next/image";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@nextui-org/react";
import { FiArrowUpRight } from "react-icons/fi";
import LoginForm from "./LoginForm";
import { ThemeSwitcher } from "@/components/common/ThemeSwitcher";

const LoginPage = () => {
  return (
    <main className=" dark:bg-slate-900 bg-sky-50 min-h-screen flex flex-col justify-center items-center ">
      <ThemeSwitcher />
      <div className="mx-auto max-w-xl w-full rounded-xl shadow-md bg-white dark:bg-slate-950 p-8 mt-4  ">
        <h1 className="text-3xl font-semibold text-center">Log In</h1>
        <p className="text-center mb-8">Login to your existing account</p>
        <Button fullWidth variant="flat" size="lg" radius="sm">
          <Link href="/google" className="flex justify-center items-center gap-2">
            <FcGoogle size={24} /> Login with Google
          </Link>
        </Button>
        {/* or continue with */}
        <div className="flex gap-2 w-full items-center my-4">
          <div className="h-[1px] bg-gray-200 w-full" />
          <p className="whitespace-nowrap">Or Continue with</p>
          <div className="h-[1px] bg-gray-200 w-full" />
        </div>
        <div className="">
          <LoginForm />
        </div>
        <div className="mt-8">
          <p className="text-center">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="underline inline-flex items-center ">
              Sign Up <FiArrowUpRight />
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
