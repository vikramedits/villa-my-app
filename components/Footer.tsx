import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, Instagram, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-primaryBlue text-white mt-12">
      {/* ================= MAIN GRID ================= */}
      <div className="container mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* ================= LOGO & ABOUT ================= */}
        <div className="flex flex-col items-start gap-4">
          <Image
            src="/homenew/villa-logo.jpeg"
            alt="Villa Logo"
            width={80}
            height={80}
            className="rounded-md"
          />
          <h2 className="text-2xl font-bold">The Pushpa Heritage</h2>
          <p className="text-sm text-white/80">
            7-BHK Luxury Villa with Big Pool, 2 Gardens, Private Chef & Premium
            Amenities.
          </p>

          {/* Payment & Trust Badges */}
          <div className="flex gap-3 mt-3">
            <Image src="/icons/visa.png" alt="Visa" width={45} height={25} />
            <Image
              src="/icons/mastercard.png"
              alt="Mastercard"
              width={45}
              height={25}
            />
            <Image src="/icons/upi.png" alt="UPI" width={45} height={25} />
            <Image
              src="/icons/tripadvisor.png"
              alt="TripAdvisor"
              width={45}
              height={25}
            />
          </div>
        </div>

        {/* ================= QUICK LINKS ================= */}
        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
          <Link href="/" className="text-white/80 hover:text-white transition">
            Home
          </Link>
          <Link
            href="/rooms"
            className="text-white/80 hover:text-white transition"
          >
            Rooms
          </Link>
          <Link
            href="/gallery"
            className="text-white/80 hover:text-white transition"
          >
            Gallery
          </Link>
          <Link
            href="/booking"
            className="text-white/80 hover:text-white transition"
          >
            Booking
          </Link>
          <Link
            href="/about"
            className="text-white/80 hover:text-white transition"
          >
            About
          </Link>
          <Link
            href="/policies"
            className="text-white/80 hover:text-white transition"
          >
            Policies
          </Link>
        </div>

        {/* ================= CONTACT ================= */}
        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-semibold mb-2">Contact</h3>
          <Link
            href="mailto:thepushpaheritage0@gmail.com"
            className="text-white/80 hover:text-white flex items-center gap-2"
          >
            <Mail size={16} /> Email Villa
          </Link>
          <Link
            href="tel:9587380255"
            className="text-white/80 hover:text-white flex items-center gap-2"
          >
            <Phone size={16} /> 9587380255
          </Link>
          <Link
            href="tel:9001069033"
            className="text-white/80 hover:text-white flex items-center gap-2"
          >
            <Phone size={16} /> 9001069033
          </Link>

          {/* Social Icons */}
          <div className="flex gap-3 mt-3">
            <Link
              href="https://wa.me/917983598967"
              target="_blank"
              className="flex items-center justify-center w-10 h-10 rounded-full bg-green-500 hover:bg-green-600 shadow-lg transition-transform transform hover:scale-110"
            >
              <Phone size={20} />
            </Link>
            <Link
              href="https://www.instagram.com/yourprofile"
              target="_blank"
              className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 shadow-lg transition-transform transform hover:scale-110"
            >
              <Instagram size={20} />
            </Link>
            <Link
              href="https://www.youtube.com/channel/yourchannel"
              target="_blank"
              className="flex items-center justify-center w-10 h-10 rounded-full bg-red-600 shadow-lg transition-transform transform hover:scale-110"
            >
              <Youtube size={20} />
            </Link>
          </div>
        </div>

        {/* ================= NEWSLETTER ================= */}
        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-semibold mb-2">Subscribe</h3>
          <p className="text-white/80 text-sm">
            Get villa offers & latest updates directly in your inbox
          </p>
          <form className="flex flex-col gap-2 w-full">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2 rounded-full text-black w-full focus:outline-none"
            />
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-full transition-transform transform hover:scale-105"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* ================= COPYRIGHT ================= */}
      <div className="border-t border-white/20 mt-6 py-4 text-center text-white/60 text-sm">
        © {new Date().getFullYear()} The Pushpa Heritage. All Rights Reserved.
        Designed by YourName
      </div>
    </footer>
  );
}
