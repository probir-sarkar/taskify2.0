"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button, Input } from "@nextui-org/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createPasswordResetToken, sendResetPassword } from "./reset-password.action";

const resetPasswordSchema = z.object({
  email: z.string().email(),
});

type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;

const ResetPasswordForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
  });
  const router = useRouter();
  async function onSubmit(data: ResetPasswordInput) {
    const res = await sendResetPassword(data);
    console.log(res);

    // if (res.success) {
    //   toast.success(res.message, {
    //     position: "top-center",
    //   });
    //   router.replace("/dashboard");
    // } else {
    //   toast.error(res.message, {
    //     position: "top-center",
    //   });
    // }
  }
  return (
    <div className="">
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
        <Button fullWidth size="lg" radius="sm" color="primary" type="submit">
          Reset Password
        </Button>
      </form>
    </div>
  );
};

export default ResetPasswordForm;
