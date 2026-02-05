import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookingCTAGuard from "@/components/BookingCTAGuard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Villa Booking",
  description: "Luxury villa booking with online payment",
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="">
          {children}
        </main>

        <Footer />
        <BookingCTAGuard />
      </body>
    </html>
  );
}
