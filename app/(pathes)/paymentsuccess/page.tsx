import Loading from "@/app/_components/_global/Loading";
import PaymentSuccess from "@/app/_components/_website/_payment/PaymentSuccess";
import React, { Suspense } from "react";

export default function SuccessPayment() {
  return (
    <Suspense fallback={<Loading />}>
      <PaymentSuccess />
    </Suspense>
  );
}
