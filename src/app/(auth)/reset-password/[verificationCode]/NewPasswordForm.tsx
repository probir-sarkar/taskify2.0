"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input } from "@nextui-org/react";
import { toast } from "sonner";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
// import { createPasswordResetToken, sendResetPassword } from "./reset-password.action";
import { FaCheck } from "react-icons/fa";
import { motion } from "framer-motion";
import { updatePassword } from "./new-password.action";
export const updatePasswordSchema = z
  .object({
    password: z.string().min(8),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type ResetPasswordInput = z.infer<typeof updatePasswordSchema>;

const NewPasswordForm = ({ verificationCode }: { verificationCode: string }) => {
  const [isPasswordChanged, setIsPasswordChanged] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordInput>({
    resolver: zodResolver(updatePasswordSchema),
  });
  async function onSubmit(data: ResetPasswordInput) {
    const res = await updatePassword(data, verificationCode);
    if (res.success) {
      toast.success(res.message, {
        position: "top-center",
      });
      setIsPasswordChanged(true);
      reset();
    } else {
      toast.error(res.message, {
        position: "top-center",
      });
    }
  }
  if (isPasswordChanged) {
    return (
      <div className="mt-8 space-y-8">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }}>
          <FaCheck size={64} className="mx-auto" />
        </motion.div>
        <p>
          Congratulations! Your password has been successfully updated. You can now log in using your new password. If
          you have any questions or concerns, feel free to reach out to our support team for assistance.
        </p>
      </div>
    );
  }
  return (
    <div className="mt-8">
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6">
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
          Update Password
        </Button>
      </form>
    </div>
  );
};

export default NewPasswordForm;
