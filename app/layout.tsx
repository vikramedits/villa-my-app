import "./globals.css";
import { Metadata } from "next";
import ClientLayout from "./ClientLayout";
import { Dosis, Ubuntu } from "next/font/google";

const ubuntu = Ubuntu({
  subsets: ["latin"],
  variable: "--font-ubuntu",
  weight: ["300","400","500","700"],
  style: ["normal","italic"]
});
export const metadata: Metadata = {
  title: "My Villa Booking",
  description: "Luxury villa booking with online payment",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}