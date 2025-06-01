import SignInComponent from "@/app/_components/_auth/SignInComponent";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Machic – Electronics Store ECommerce - Login Page",
  description:
    "Sign in to your Machic account to access exclusive deals, track your orders, and manage your electronic purchases securely and easily.",
};

export default function SignInPage() {
  return <SignInComponent />;
}
