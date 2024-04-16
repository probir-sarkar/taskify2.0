"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button, Input } from "@nextui-org/react";
import { signupFormResolver } from "./formSchema";
import type { SignupFormInputs } from "./formSchema";

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignupFormInputs>({
    resolver: signupFormResolver,
  });
  function onSubmit(data: SignupFormInputs) {
    console.log(data);
  }
  return (
    <div className="">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
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
        <Button fullWidth size="lg" radius="sm" color="primary" type="submit">
          Sign Up
        </Button>
      </form>
    </div>
  );
};

export default SignUpForm;
