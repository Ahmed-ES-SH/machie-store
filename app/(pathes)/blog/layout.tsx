import BlogSidebar from "@/app/_components/_website/_blog/BlogSidebar";
import React from "react";

interface layoutProps {
  children: React.ReactNode;
}

export default function BlogLayout({ children }: layoutProps) {
  return (
    <>
      <div className="c-container mt-8  flex items-start gap-4 ">
        {children}
        <BlogSidebar />
      </div>
    </>
  );
}
