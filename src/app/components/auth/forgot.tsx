"use client";
import { Container, LoadingOverlay, Stack, TextInput } from "@mantine/core";

import { forgotPassword, verifyToken } from "@/actions/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FormError } from "./Form-error";
import { FormSuccess } from "./Form-success";

export default function Forgot() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // send email to user
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      setSuccess(null);
      const formData = new FormData(e.currentTarget);
      const email = formData.get("email");
      if (!email) {
        setError("Email is required");
        return;
      }
      const res = await forgotPassword(email as string);
      if (res?.error) {
        setError(res.error);
        return;
      } else {
        sessionStorage.setItem("email", email as string);
        setSuccess(res?.success || null);
      }
    } catch (error) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // verify otp
  const handleVerify = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      setLoading(true);
      setError(null);
      setSuccess(null);
      const formData = new FormData(e.currentTarget);
      const otp = formData.get("otp");
      if (!otp) {
        setError("Otp is required");
        return;
      }
      const otpValue = otp?.toString() || "";
      if (otpValue.length < 6) {
        setError("Otp must be 6 digits");
        return;
      }
      const res = await verifyToken(otp as string);
      if (res?.error) {
        setError(res.error);
        return;
      } else {
        setSuccess(res?.success || null);

        if (res?.success) {
          router.push("/new-password");
        }
      }
    } catch (error) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Container>
      <LoadingOverlay
        visible={loading}
        overlayProps={{ radius: "sm", blur: 2 }}
      />

      <div className="w-full sm:w-2/3 md:w-2/5  mx-auto border py-5 px-5 sm:px-12 md:px-5">
        {success ? (
          <>
            <p className="text-gray-500 font-inter text-sm text-center">
              Otp has been sent to your email address.
            </p>

            <form className="space-y-4" onSubmit={handleVerify}>
              <Stack>
                <TextInput
                  name="otp"
                  label="Otp"
                  placeholder="Enter your otp"
                  type="text"
                  // value={}
                  onChange={(e) => {}}
                />
                <span>Otp expire after 5 mins</span>
              </Stack>

              <FormError message={error} />
              <FormSuccess message={success} />

              <button
                type="submit"
                className="bg-red-600 hover:bg-red-700 w-full text-white font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline"
              >
                Verify Otp
              </button>
            </form>
          </>
        ) : (
          <>
            <p className="text-gray-500 font-inter text-sm text-center">
              Enter your email address and we will send you a link to reset your
              password.
            </p>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <Stack>
                <TextInput
                  name="email"
                  label="Email"
                  placeholder="Enter your email"
                  type="email"
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
                Send reset link
              </button>
            </form>
          </>
        )}
      </div>
    </Container>
  );
}
