import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import ClientLayout from "./_components/_global/ClientLayout";
import "./globals.css";
import Navbar from "./_components/_global/Navbar";
import MobailSideBar from "./_components/_website/_navbar/MobileSidebar";
import { Toaster } from "sonner";
import { ClerkProvider } from "@clerk/nextjs";
import { Footer } from "./_components/_website/_footer/footer";

const RobotoFont = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Machic – Electronics Store ECommerce",
  description:
    "Shop the latest smartphones, laptops, and electronic accessories at Machic. Premium quality, exclusive deals, and fast, secure shipping.",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${RobotoFont.variable} antialiased`}>
        <ClerkProvider>
          <ClientLayout>
            <Navbar />
            <MobailSideBar />
            <Toaster richColors position="top-center" />
            <div className="min-h-screen">{children}</div>
            <Footer />
          </ClientLayout>
        </ClerkProvider>
      </body>
    </html>
  );
}
