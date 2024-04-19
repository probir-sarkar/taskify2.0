"use client"; // Error components must be Client Components
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { TbFaceIdError } from "react-icons/tb";

export default function Error({ error }: { error: Error }) {
  return (
    <div className="dark:bg-slate-900 bg-sky-50 min-h-screen flex flex-col justify-center items-center">
      <div className="flex flex-col items-center gap-5 max-w-2xl">
        <TbFaceIdError size={128} />
        <h1 className="text-4xl font-semibold capitalize text-center">{error.message}</h1>
        <p className="text-center">
          It appears that the link provided for verifying your email has expired or is no longer valid. Please request a
          new one by visiting the email verification page, or click the link below to navigate directly to the page.
        </p>
        <Link href="/verify-email">
          <Button className="" size="lg" color="primary" variant="ghost">
            Verify Email
          </Button>
        </Link>
      </div>
    </div>
  );
}
