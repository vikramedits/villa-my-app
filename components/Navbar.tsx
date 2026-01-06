"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, MessageCircle, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Home,
  Info,
  BedDouble,
  Wifi,
  GalleryHorizontal,
  MapPin,
  Phone,
} from "lucide-react";

const navItems = [
  {
    label: "Home",
    href: "/",
    icon: Home,
  },
  {
    label: "Why Choose Us",
    href: "/Why-Choose-Us",
    icon: Info,
  },
  {
    label: "Rooms",
    href: "/rooms",
    icon: BedDouble,
  },
  {
    label: "Amenities",
    href: "/amenities",
    icon: Wifi,
  },
  {
    label: "Images & Videos",
    href: "/gallery",
    icon: GalleryHorizontal,
  },
  {
    label: "Location",
    href: "/location",
    icon: MapPin,
  },
  {
    label: "Call",
    href: "/call",
    icon: Phone,
  },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-[#0B1C2D] text-white shadow-md border-b-2 border-white">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="Villa Logo"
            width={40}
            height={40}
            priority
          />
          <span className="text-lg font-semibold tracking-wide">name here</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.label}
                href={item.href}
                className="flex items-center gap-2 text-sm font-medium text-white/90 relative after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0
                        after:bg-white after:transition-all after:duration-300 hover:after:w-full"
              >
                <Icon size={16} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="hidden lg:flex items-center gap-4">
          {/* WhatsApp */}
          <Link
            href="https://wa.me/919783598967"
            target="_blank"
            aria-label="Chat on WhatsApp"
            className="rounded-md text-sm border-2 border-white py-1.5 px-4 hover:bg-white/10 transition flex items-center gap-2 bg-green-500"
          >
            <p>WhatsApp Chat:</p>
            <Phone size={18} />
          </Link>

          {/* Book Now */}
          <Button
            asChild
            className="bg-white text-[#0B1C2D] hover:bg-gray-100 font-semibold "
          >
            <Link href="/booking" className="">Book Villa Online</Link>
          </Button>
        </div>

        {/* Mobile Menu */}
        <div className="lg:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/10"
                aria-label="Open Menu"
              >
                <Menu />
              </Button>
            </SheetTrigger>

            <SheetContent side="right" className="bg-[#0B1C2D] text-white">
              <div className="flex flex-col gap-6 mt-8 px-2">
                {navItems.map((item) => {
                  const Icon = item.icon;

                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="flex items-center gap-2 text-sm font-medium text-white/90 hover:text-white transition"
                    >
                      <Icon size={16} />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
                <div className="items-center px-2 pt-4 border-t border-white/20">
                  <Link
                    href="https://wa.me/919783598967"
                    target="_blank"
                    aria-label="Chat on WhatsApp"
                    className="flex flex-row items-center rounded-lg justify-center gap-2w-fullrounded-2xl bg-green-500 px-4 py-2 text-sm font-medium text-whiteborder-2 border-white/20 
  "
                  >
                    <MessageCircle size={18} />
                    <span className="pl-2">Book By Whatsapp</span>
                  </Link>

                  <Button
                    asChild
                    className="bg-white text-[#0B1C2D] hover:bg-gray-100 w-full mt-3"
                  >
                    <Link href="/booking">Book Villa Online</Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
