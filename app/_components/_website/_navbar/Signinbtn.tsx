"use client";
import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";
import { AiOutlineUser } from "react-icons/ai";

export default function SignInBtn() {
  const { user } = useUser();
  return (
    <>
      {user ? (
        <UserButton
          appearance={{
            elements: {
              userButtonAvatarBox: {
                width: "32px",
                height: "32px",
              },
              userButtonPopoverCard: {
                zIndex: "999999",
                marginTop: "15px",
                marginLeft: "auto",
              },
            },
          }}
        />
      ) : (
        <Link
          href={"/signin"}
          className="flex items-center gap-2 cursor-pointer max-xl:hidden"
          id="user"
        >
          <AiOutlineUser className="size-7 text-icon-color" />
          <div className="flex flex-col items-start">
            <p className="text-[11px] text-icon-color">Sign in</p>
            <p className="text-[13px] font-semibold">Account</p>
          </div>
        </Link>
      )}
    </>
  );
}
