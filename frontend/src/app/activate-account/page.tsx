import { Suspense } from "react";
import ActivateAccount from "./ActivateAccount";

import LoadingSplash from "@/components/LoadingSplash";

export default function ActivateAccountPage() {
  return (
    <Suspense fallback={<LoadingSplash />}>
      <ActivateAccount />
    </Suspense>
  );
}