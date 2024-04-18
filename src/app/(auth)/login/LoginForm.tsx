"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button, Input } from "@nextui-org/react";
import { loginFormResolver } from "./formSchema";
import type { LoginFormInputs } from "./formSchema";
import { login } from "./actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: loginFormResolver,
  });
  const router = useRouter();
  async function onSubmit(data: LoginFormInputs) {
    const res = await login(data);
    if (res.success) {
      toast.success(res.message, {
        position: "top-center",
      });
      router.replace("/dashboard");
    } else {
      toast.error(res.message, {
        position: "top-center",
      });
    }
  }
  return (
    <div className="">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
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
        <Button fullWidth size="lg" radius="sm" color="primary" type="submit">
          Log In
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
