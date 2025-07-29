"use client";
import { signUpUserWithCredentials } from "@/actions/auth";
import { useSignupFrom } from "@/hooks/useSignupFrom";
import Toast from "@/lib/Toast";
import {
  Divider,
  LoadingOverlay,
  PasswordInput,
  Stack,
  TextInput,
} from "@mantine/core";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import Container from "../shared/Container";
import { FormError } from "./Form-error";
import { FormSuccess } from "./Form-success";
import { GithubLogin } from "./GithubLogin";
import { GoogleButton } from "./GoogleLogin";

export default function SignupApp() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const signupForm = useSignupFrom();
  const handleSignup = async () => {
    const { email, password } = signupForm.values;
    setIsSubmitting(true);
    setError(null);
    setSuccess(null);
    const res = await signUpUserWithCredentials(email, password);
    setIsSubmitting(false);
    if (res?.error) {
      console.log(res?.error);
      setError(res?.error);
      toast.error(res.error);
      setIsSubmitting(false);
    }
    if (res?.message) {
      setSuccess(res.message);
      toast.success(res.message);
      setIsSubmitting(false);
    }
    setIsSubmitting(false);
  };
  return (
    <Container>
      <Toast />
      <>
        <LoadingOverlay
          visible={isSubmitting}
          overlayProps={{ radius: "sm", blur: 2 }}
        />
        <div className="w-full sm:w-2/3 md:w-2/5  mx-auto border py-5 px-5 sm:px-12 md:px-5">
          <p className="text-gray-500 font-inter text-sm text-center">
            Đăng ký
          </p>
          <div className="flex gap-3">
            <GoogleButton />
            <GithubLogin />
          </div>
          <Divider
            label="Hoặc tiếp tục với Email"
            labelPosition="center"
            my="sm"
          />
          <form
            onSubmit={signupForm.onSubmit(() => handleSignup())}
            className="space-y-4"
          >
            <Stack>
              <TextInput
                name="email"
                label="Email"
                placeholder="Nhập email của bạn"
                type="email"
                value={signupForm.values.email}
                onChange={(e) =>
                  signupForm.setFieldValue("email", e.currentTarget.value)
                }
                error={signupForm.errors.email && signupForm.errors.email}
              />
              <PasswordInput
                name="password"
                label="Mật khẩu"
                placeholder="Nhập mật khẩu của bạn"
                type="password"
                value={signupForm.values.password}
                onChange={(e) =>
                  signupForm.setFieldValue("password", e.currentTarget.value)
                }
                error={signupForm.errors.password && signupForm.errors.password}
              />

              <PasswordInput
                name="confirmPassword"
                label="Xác nhận mật khẩu"
                placeholder="Nhập lại mật khẩu của bạn"
                type="password"
                value={signupForm.values.confirmPassword}
                onChange={(e) =>
                  signupForm.setFieldValue(
                    "confirmPassword",
                    e.currentTarget.value
                  )
                }
                error={
                  signupForm.errors.confirmPassword &&
                  signupForm.errors.confirmPassword
                }
              />
            </Stack>

            <div className="flex justify-between text-sm text-blue-500 my-4 ">
              <Link
                href={"/login"}
                className="text-right hover:underline hover:text-green-700 "
              >
                Đã có tài khoản? Đăng nhập
              </Link>
              <Link
                href={"/forgot-password"}
                className="text-right hover:underline hover:text-green-700 "
              >
                Quên mật khẩu?
              </Link>
            </div>
            <FormSuccess message={success} />
            <FormError message={error} />
            <button
              type="submit"
              className="bg-red-600 hover:bg-red-700 w-full text-white font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline"
            >
              Đăng ký
            </button>
          </form>
          <Link
            href={"/create-provider"}
            className="text-sm text-blue-500 hover:underline hover:text-green-700"
          >
            Bạn muốn cho thuê xe? Tạo tài khoản nhà cung cấp.
          </Link>
        </div>
      </>
    </Container>
  );
}
