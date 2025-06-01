import Loading from "@/app/_components/_global/Loading";
import PaymentFailed from "@/app/_components/_website/_payment/PaymentFailed";
import React, { Suspense } from "react";

export default function PaymentFailedPage() {
  return (
    <Suspense fallback={<Loading />}>
      <PaymentFailed />
    </Suspense>
  );
}
