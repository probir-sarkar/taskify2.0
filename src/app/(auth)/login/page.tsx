import Image from "next/image";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { Input } from "@nextui-org/react";
const LoginPage = () => {
  return (
    <main className="bg-sky-50 min-h-screen flex justify-center items-center ">
      <div className="mx-auto max-w-xl w-full rounded-xl shadow-md bg-white p-8 text-center ">
        <h1 className="text-3xl font-semibold">Login</h1>
        <p>Join Today</p>
        <Link href="/google" className="w-full rounded-md p-2 border flex justify-center items-center gap-2 bg-sky-50">
          <FcGoogle size={32} /> Login with Google
        </Link>
        {/* or continue with */}
        <div className="flex gap-2 w-full items-center my-4">
          <div className="h-[1px] bg-gray-200 w-full" />
          <p className="whitespace-nowrap">Or Continue with</p>
          <div className="h-[1px] bg-gray-200 w-full" />
        </div>
        <div className=""></div>
      </div>
    </main>
  );
};

export default LoginPage;
