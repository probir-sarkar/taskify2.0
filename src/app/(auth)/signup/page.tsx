import Image from "next/image";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@nextui-org/react";
import { FiArrowUpRight } from "react-icons/fi";
import SignUpForm from "./SignUpForm";
import { ThemeSwitcher } from "@/components/common/ThemeSwitcher";

const LoginPage = () => {
  return (
    <main className=" dark:bg-slate-900 bg-sky-50 min-h-screen flex flex-col justify-center items-center ">
      <ThemeSwitcher />
      <div className="mx-auto max-w-xl w-full rounded-xl shadow-md bg-white dark:bg-slate-950 p-8 mt-4  ">
        <h1 className="text-3xl font-semibold text-center">Sign Up</h1>
        <p className="text-center mb-8">Create a new account here!</p>
        <Button fullWidth variant="flat" size="lg" radius="sm">
          <Link href="/google" className="flex justify-center items-center gap-2">
            <FcGoogle size={24} /> Login with Google
          </Link>
        </Button>
        {/* or continue with */}
        <div className="flex gap-2 w-full items-center mt-4 mb-16">
          <div className="h-[1px] bg-gray-200 w-full" />
          <p className="whitespace-nowrap">Or Continue with</p>
          <div className="h-[1px] bg-gray-200 w-full" />
        </div>
        <div className="">
          <SignUpForm />
        </div>
        <div className="mt-8">
          <p className="text-center">
            Already have an account?{" "}
            <Link href="/login" className="underline inline-flex items-center ">
              Login <FiArrowUpRight />
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;