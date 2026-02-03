import Link from "next/link";
import Image from "next/image";
import { Instagram, Youtube, Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-primaryBlue text-white ">
      {/* ================= TOP GRID ================= */}
      <div className="container mx-auto px-4 py-12 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 gap-10">
        {/* Company */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Company</h3>
          <ul className="space-y-2 text-white/80 text-sm">
            <li>
              <Link href="/about" className="hover:text-white transition">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/career" className="hover:text-white transition">
                Career
              </Link>
            </li>
            <li>
              <Link href="/media" className="hover:text-white transition">
                Media
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white transition">
                Get in Touch
              </Link>
            </li>
            <li>
              <Link href="/reviews" className="hover:text-white transition">
                Customer Stories
              </Link>
            </li>
            <li>
              <Link href="/blog" className="hover:text-white transition">
                Blog
              </Link>
            </li>
          </ul>
        </div>

        {/* Explore Villa */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Explore Villa</h3>
          <ul className="space-y-2 text-white/80 text-sm">
            <li>
              <Link href="/rooms" className="hover:text-white transition">
                Rooms
              </Link>
            </li>
            <li>
              <Link href="/gallery" className="hover:text-white transition">
                Gallery
              </Link>
            </li>
            <li>
              <Link href="/booking" className="hover:text-white transition">
                Booking
              </Link>
            </li>
            <li>
              <Link href="/amenities" className="hover:text-white transition">
                Amenities
              </Link>
            </li>
            <li>
              <Link href="/location" className="hover:text-white transition">
                Location
              </Link>
            </li>
            <li>
              <Link href="/policies" className="hover:text-white transition">
                Policies
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* ================= TRUST STRIP ================= */}
      <div className="border-t border-b border-white/20 py-6 flex flex-col items-center gap-4">
        <p className="text-sm tracking-wide text-white/70">Trusted By</p>
        <div className="flex gap-6 items-center">
          <Image src="/icons/visa.png" alt="Visa" width={50} height={30} />
          <Image
            src="/icons/mastercard.png"
            alt="Mastercard"
            width={50}
            height={30}
          />
          <Image src="/icons/upi.png" alt="UPI" width={50} height={30} />
          <Image
            src="/icons/tripadvisor.png"
            alt="TripAdvisor"
            width={50}
            height={30}
          />
        </div>
      </div>

      {/* ================= SOCIAL + CONTACT ================= */}
      <div className="py-8 text-center space-y-4">
        <p className="text-sm text-white/70">Follow Us</p>
        <div className="flex justify-center gap-5">
          <Link
            href="https://wa.me/917983598967"
            target="_blank"
            className="hover:scale-110 transition"
          >
            <Phone />
          </Link>
          <Link
            href="https://www.instagram.com/yourprofile"
            target="_blank"
            className="hover:scale-110 transition"
          >
            <Instagram />
          </Link>
          <Link
            href="https://www.youtube.com/channel/yourchannel"
            target="_blank"
            className="hover:scale-110 transition"
          >
            <Youtube />
          </Link>
          <Link
            href="mailto:thepushpaheritage0@gmail.com"
            className="hover:scale-110 transition"
          >
            <Mail />
          </Link>
        </div>
      </div>

      {/* ================= COPYRIGHT ================= */}
      <div className="border-t border-white/20 py-4 text-center text-sm text-white/60">
        © {new Date().getFullYear()} The Pushpa Heritage. All Rights Reserved.
      </div>
    </footer>
  );
}
