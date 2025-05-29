"use client";
import VariablesProvider from "@/app/context/VariablesContext";
import React, { ReactNode } from "react";

type ClientLayoutProps = {
  children: ReactNode;
};

export default function ClientLayout({ children }: ClientLayoutProps) {
  return (
    <>
      <VariablesProvider>{children}</VariablesProvider>
    </>
  );
}
