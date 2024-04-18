import { ThemeSwitcher } from "@/components/common/ThemeSwitcher";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import NewPasswordForm from "./NewPasswordForm";
import { checkValidToken } from "./new-password.action";
import { unstable_noStore as noStore } from "next/cache";

const ChangePassword = async ({ params }: { params: { verificationCode: string } }) => {
  noStore();
  const { verificationCode } = params;
  await checkValidToken(verificationCode);
  return (
    <main className=" dark:bg-slate-900 bg-sky-50 min-h-screen flex flex-col justify-center items-center ">
      <ThemeSwitcher />
      <div className="mx-auto max-w-xl w-full rounded-xl shadow-md bg-white dark:bg-slate-950 p-8 mt-4  ">
        <h1 className="text-3xl font-semibold text-center">Update Password</h1>
        <p className="text-center ">Please fill in your new password below:</p>
        <div className="">
          <NewPasswordForm verificationCode={verificationCode} />
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

export default ChangePassword;
