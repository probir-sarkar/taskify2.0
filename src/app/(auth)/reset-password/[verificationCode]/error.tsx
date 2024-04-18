"use client"; // Error components must be Client Components

import { ThemeSwitcher } from "@/components/common/ThemeSwitcher";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { useEffect } from "react";
import { TbFaceIdError } from "react-icons/tb";

export default function Error({ error }: { error: Error }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="dark:bg-slate-900 bg-sky-50 min-h-screen flex flex-col justify-center items-center">
      <div className="flex flex-col items-center gap-5 max-w-2xl">
        <TbFaceIdError size={128} />
        <h1 className="text-4xl font-semibold capitalize text-center">{error.message}</h1>
        <p className="text-center">
          It appears that the link provided for resetting your password has expired or is no longer valid. Please
          request a new one by visiting the password reset page, or click the link below to navigate directly to the
          page.
        </p>
        <Link href="/reset-password">
          <Button className="" size="lg" color="primary" variant="ghost">
            Reset Password
          </Button>
        </Link>
      </div>
    </div>
  );
}
