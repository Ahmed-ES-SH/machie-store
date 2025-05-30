"use client";

import Link from "next/link";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaYoutube,
  FaInstagram,
  FaTwitch,
} from "react-icons/fa";

interface SocialLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
}

function SocialLink({ href, icon, label }: SocialLinkProps) {
  return (
    <Link
      href={href}
      aria-label={label}
      className="w-8 h-8 flex items-center justify-center rounded-full bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors duration-200 "
    >
      {icon}
    </Link>
  );
}

export function FooterSocial() {
  return (
    <div className="flex space-x-2">
      {[
        {
          href: "https://facebook.com",
          icon: <FaFacebookF size={16} />,
          label: "Facebook",
        },
        {
          href: "https://twitter.com",
          icon: <FaTwitter size={16} />,
          label: "Twitter",
        },
        {
          href: "https://linkedin.com",
          icon: <FaLinkedinIn size={16} />,
          label: "LinkedIn",
        },
        {
          href: "https://youtube.com",
          icon: <FaYoutube size={16} />,
          label: "YouTube",
        },
        {
          href: "https://instagram.com",
          icon: <FaInstagram size={16} />,
          label: "Instagram",
        },
        {
          href: "https://twitch.tv",
          icon: <FaTwitch size={16} />,
          label: "Twitch",
        },
      ].map((social, index) => (
        <div
          key={index}
          className="flex items-center justify-center bg-gray-200 rounded-full h-12 w-12 hover:-translate-y-3 duration-300 cursor-pointer"
        >
          <SocialLink {...social} />
        </div>
      ))}
    </div>
  );
}
