"use client";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button, Input } from "@nextui-org/react";
import { signupFormResolver } from "./formSchema";
import type { SignupFormInputs } from "./formSchema";
import { signup } from "./actions";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { FaCheck } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";

const SignUpForm = () => {
  const [accountCreated, setAccountCreated] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormInputs>({
    resolver: signupFormResolver,
  });
  async function onSubmit(data: SignupFormInputs) {
    const res = await signup(data);
    if (res.success) {
      toast.success(res.message, {
        position: "top-center",
      });
      setAccountCreated(true);
    } else {
      toast.error(res.message, {
        position: "top-center",
      });
    }
  }
  if (accountCreated) {
    return (
      <div className="mt-8 space-y-8">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }}>
          <FaCheck size={64} className="mx-auto" />
        </motion.div>
        <p>
          Congratulations on successfully creating your account! To get started, please log in using your email and
          password. <br />
          <br /> Before you can access your account, you&apos;ll need to verify your email address. We&apos;ve sent you
          an email with further instructions. Please check your inbox and follow the steps to complete the verification
          process.
          <br />
          <br /> If you don&apos;t see the email in your inbox, please check your spam or junk folder.
          <br />
          <br /> Click the link below to navigate to the login page.
        </p>
      </div>
    );
  }
  return (
    <div className="">
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

      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6 mt-8">
        <Input
          {...register("name", { required: true })}
          isInvalid={!!errors.name}
          errorMessage={errors.name?.message}
          label="Name"
          type="text"
          variant="flat"
          labelPlacement="outside"
          placeholder="John Doe"
          radius="sm"
          size="lg"
        />
        <Input
          {...register("email", { required: true })}
          label="Email"
          type="email"
          isInvalid={!!errors.email}
          errorMessage={errors.email?.message}
          variant="flat"
          labelPlacement="outside"
          placeholder="example@example.com"
          radius="sm"
          size="lg"
        />
        <Input
          {...register("password", { required: true })}
          label="Password"
          type="password"
          isInvalid={!!errors.password}
          errorMessage={errors.password?.message}
          variant="flat"
          labelPlacement="outside"
          placeholder="*********"
          radius="sm"
          size="lg"
        />
        <Input
          {...register("confirmPassword", { required: true })}
          label="Confirm Password"
          type="password"
          isInvalid={!!errors.confirmPassword}
          errorMessage={errors.confirmPassword?.message}
          variant="flat"
          labelPlacement="outside"
          placeholder="*********"
          radius="sm"
          size="lg"
        />
        <Button isLoading={isSubmitting} fullWidth size="lg" radius="sm" color="primary" type="submit">
          Sign Up
        </Button>
      </form>
    </div>
  );
};

export default SignUpForm;
