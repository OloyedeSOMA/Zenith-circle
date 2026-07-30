"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

import { useActivateAccount } from "@/hooks/useAuth";

import LoadingSplash from "@/components/LoadingSplash";
import StatusModal from "@/components/StatusModal";

export default function ActivateAccount() {
  const router = useRouter();

  const searchParams = useSearchParams();

  const id = searchParams.get("id");
  const token = searchParams.get("token");

  const { mutate, isPending } = useActivateAccount();

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id || !token) {
      setError("Invalid activation link.");
      return;
    }

    mutate(
      { id, token },
      {
        onSuccess: () => {
          setSuccess(true);
        },
        onError: (err: any) => {
          setError(err.message || "Unable to activate account.");
        },
      }
    );
  }, [id, token, mutate]);

  if (isPending) {
    return <LoadingSplash />;
  }

  return (
    <>
      <StatusModal
        open={success}
        type="success"
        message="Account activated successfully."
        buttonText="Login"
        onButtonClick={() => router.push("/login")}
        onClose={() => setSuccess(false)}
      />

      <StatusModal
        open={!!error}
        type="error"
        message={error}
        buttonText="Resend Link"
        onButtonClick={() => router.push("/resend-activation")}
        onClose={() => setError("")}
      />
    </>
  );
}