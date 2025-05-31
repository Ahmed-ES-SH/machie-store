"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface BrandLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

function BrandLink({ href, children, className }: BrandLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "text-xs text-muted-foreground hover:text-foreground transition-colors duration-200",
        className
      )}
    >
      {children}
    </Link>
  );
}

export function BrandLinks() {
  const links = [
    { name: "Apple", href: "/apple" },
    { name: "Apple Watch", href: "/apple-watch" },
    { name: "Beats", href: "/beats" },
    { name: "Camera", href: "/camera" },
    { name: "Game Controller", href: "/game-controller" },
    { name: "HD", href: "/hd" },
    { name: "HTC", href: "/htc" },
    { name: "HTC One", href: "/htc-one" },
    { name: "iMac", href: "/imac" },
    { name: "iPad", href: "/ipad" },
    { name: "iPad 4 16Gb", href: "/ipad-4-16gb" },
    { name: "iPad Mini", href: "/ipad-mini" },
    { name: "Keyboard", href: "/keyboard" },
    { name: "Lenovo", href: "/lenovo" },
    { name: "M8", href: "/m8" },
    { name: "Mackbook Pro M1", href: "/macbook-pro-m1" },
    { name: "Mouse", href: "/mouse" },
    { name: "Samsung", href: "/samsung" },
    { name: "Samsung Galaxy M11", href: "/samsung-galaxy-m11" },
    { name: "Samsung Galaxy M31", href: "/samsung-galaxy-m31" },
    { name: "Samsung Galaxy S5 - 64gb", href: "/samsung-galaxy-s5" },
    { name: "Samsung Galaxy Tab 4", href: "/samsung-galaxy-tab-4" },
    { name: "Wireless Speaker", href: "/wireless-speaker" },
  ];

  return (
    <div className="flex flex-wrap gap-x-3 gap-y-2">
      {links.map((link, index) => (
        <div key={link.name} className="flex items-center">
          <BrandLink href={"#"}>{link.name}</BrandLink>
          {index < links.length - 1 && (
            <span className="text-muted-foreground ml-3">|</span>
          )}
        </div>
      ))}
    </div>
  );
}
