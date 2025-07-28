"use client";

import { resetPassword } from "@/actions/auth";
import { FormError } from "@/app/components/auth/Form-error";
import { FormSuccess } from "@/app/components/auth/Form-success";
import { Container, LoadingOverlay, Stack, TextInput } from "@mantine/core";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function NewPassword() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const email = sessionStorage.getItem("email");
    if (!email) {
      router.push("/forgot-password");
    }
  }, [router]);

  // handle new password
  const handleNewPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const email = sessionStorage.getItem("email");
      setLoading(true);
      setError(null);
      setSuccess(null);
      const formData = new FormData(e.currentTarget);
      const newpassword = formData.get("newpassword");
      const res = await resetPassword(email as string, newpassword as string);
      if (res?.error) {
        setError(res.error);
        return;
      } else {
        setSuccess(res?.success || null);
        sessionStorage.clear();
        if (res?.success) {
          router.push("/login");
        }
      }
    } catch (error) {
      setError("Something wrong!Try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="py-32  lg:px-10  min-h-[calc(100vh-90px)]">
      <Container>
        <LoadingOverlay
          visible={loading}
          overlayProps={{ radius: "sm", blur: 2 }}
        />
        <div className="w-full sm:w-2/3 md:w-2/5  mx-auto border py-5 px-5 sm:px-12 md:px-5">
          <p className="text-gray-500 font-inter text-sm text-center">
            Enter your New password.
          </p>

          <form className="space-y-4" onSubmit={handleNewPassword}>
            <Stack>
              <TextInput
                name="newpassword"
                label="New Password"
                placeholder="Enter your new password"
                type="text"
                // value={}
                onChange={(e) => {}}
              />
            </Stack>

            <FormError message={error} />
            <FormSuccess message={success} />

            <button
              type="submit"
              className="bg-red-600 hover:bg-red-700 w-full text-white font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline"
            >
              Reset Password
            </button>
          </form>
        </div>
      </Container>
    </div>
  );
}
