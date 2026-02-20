"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookingCTAGuard from "@/components/BookingCTAGuard";

interface ClientLayoutProps {
  children: ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const pathname = usePathname();

  // Pages jaha footer/navbar hide karna hai
  const hideFooter = ["/login", "/signup"].includes(pathname);
  const hideNavbar = ["/login", "/signup"].includes(pathname);

  return (
    <>
      {!hideNavbar && <Navbar />}
      <main>{children}</main>
      {!hideFooter && <Footer />}
      <BookingCTAGuard />
    </>
  );
}