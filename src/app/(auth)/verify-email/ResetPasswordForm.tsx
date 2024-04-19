"use client";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button, Input } from "@nextui-org/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { sendVerifyEmail } from "./verify-email.action";
import { FaCheck } from "react-icons/fa";
import { motion } from "framer-motion";
const resetPasswordSchema = z.object({
  email: z.string().email(),
});

type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;

const VerifyEmailForm = () => {
  const [isEmailSent, setIsEmailSent] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
  });
  async function onSubmit(data: ResetPasswordInput) {
    const res = await sendVerifyEmail(data);
    if (res.success) {
      toast.success(res.message, {
        position: "top-center",
      });
      setIsEmailSent(true);
      reset();
    } else {
      toast.error(res.message, {
        position: "top-center",
      });
    }
  }
  if (isEmailSent) {
    return (
      <div className="mt-8 space-y-8">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }}>
          <FaCheck size={64} className="mx-auto" />
        </motion.div>
        <p>
          Success! We&apos;ve sent an email to your registered email address with instructions on how to verify your
          account. Please check your inbox and follow the link provided. If you don&apos;t see the email in your inbox,
          be sure to check your spam folder.
        </p>
      </div>
    );
  }
  return (
    <div className="mt-16">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
        <Button isLoading={isSubmitting} fullWidth size="lg" radius="sm" color="primary" type="submit">
          Send Verification Email
        </Button>
      </form>
    </div>
  );
};

export default VerifyEmailForm;
