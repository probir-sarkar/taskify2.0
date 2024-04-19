"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button, Input } from "@nextui-org/react";
import { loginFormResolver } from "./formSchema";
import type { LoginFormInputs } from "./formSchema";
import { login } from "./actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";

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
      router.replace("/");
    } else {
      toast.error(res.message, {
        position: "top-center",
      });
    }
  }
  return (
    <div className="">
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6">
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
        <div className="space-y-2">
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
          <div className="text-right ">
            <Link href="/reset-password" className="underline ">
              Forgot Password?
            </Link>
          </div>
        </div>
        <Button className="mt-2" fullWidth size="lg" radius="sm" color="primary" type="submit">
          Log In
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
