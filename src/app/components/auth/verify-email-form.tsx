/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { newVerification } from "@/actions/new-verification";
import CardWrapper from "@/app/components/auth/card-wrapper";
import { FormError } from "@/app/components/auth/Form-error";
import { FormSuccess } from "@/app/components/auth/Form-success";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const VerifyEmailForm = () => {
  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<string | undefined>(undefined);
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const onSubmit = useCallback(() => {
    if (success || error) {
      return;
    }

    if (!token) {
      setError("No token provided");
      return;
    }

    newVerification(token)
      .then((data: any) => {
        if (data.success) {
          setSuccess(data.success);
        }
        if (data.error) {
          setError(data.error);
        }
      })
      .catch((error: any) => {
        setError("An unexpected error occurred");
      });
  }, [token, success, error]);

  useEffect(() => {
    onSubmit();
  }, []);

  return (
    <CardWrapper
      headerLabel="Confirming your email address"
      title="Confirming now..."
      backButtonHref="/login"
      backButtonLabel="Back to login"
    >
      <div className="flex items-center w-full justify-center">
        {!success && !error && <p>Please Wait</p>}
        <FormSuccess message={success} />
        {!success && <FormError message={error} />}
      </div>
    </CardWrapper>
  );
};

export default VerifyEmailForm;
