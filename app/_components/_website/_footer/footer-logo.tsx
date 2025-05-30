"use client";
import Link from "next/link";
import Img from "../../_global/Img";

export function FooterLogo() {
  return (
    <Link
      href="/"
      className="flex items-center hover:opacity-90 transition-opacity duration-200"
    >
      <Img src="/logo.png" className="w-32" />
    </Link>
  );
}
