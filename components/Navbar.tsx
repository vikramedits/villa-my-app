"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { FaWhatsapp } from "react-icons/fa";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Calendar, FileText, Instagram, Users } from "lucide-react";
import {
  Home,
  Info,
  BedDouble,
  Wifi,
  GalleryHorizontal,
  MapPin,
  Phone,
  ArrowRight,
  Mail,
} from "lucide-react";
import CenteredVillaAnimation, { MenuLottieIcon } from "./NavbarAnimation";

const navItems = [
  { label: "Home", href: "/", icon: Home },
  { label: "Rooms", href: "/rooms", icon: BedDouble },
  { label: "Amenities", href: "/amenities", icon: Wifi },
  { label: "Images & Videos", href: "/gallery", icon: GalleryHorizontal },
  { label: "About Us", href: "/about-us", icon: Users },
  { label: "Blog", href: "/blog", icon: FileText },
];

export default function Navbar() {
  const [sheetOpen, setSheetOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (sheetOpen) {
      document.body.classList.add("menu-open");
    } else {
      document.body.classList.remove("menu-open");
    }
  }, [sheetOpen]);

  useEffect(() => {
    setSheetOpen(false);
  }, [pathname]);

  return (
    <>
      {/* ===================================================== TOP : DESKTOP ================================================= */}
      <div className="bg-gray-950 lg:bg-stone-100 py-2">
        <div className="container-fluid mx-auto hidden md:flex justify-between items-center py-4 bg-green-800 rounded-full shadow-md shadow-green-950">
          <div className=" pl-6 pr-28 py-2 flex">
            <Link
              href="https://www.google.com/maps?q=YOUR+LOCATION"
              target="_blank"
              aria-label="Open location in Google Maps"
              className="hover:opacity-90"
            >
              <span className="flex items-center gap-1 text-green-200">
                <MapPin size={24} />
                <span className="text-lg font-medium">On-road Location</span>
              </span>
              <span className="flex items-center gap-1 text-xs pl-7 text-white">
                Google Maps
                <ArrowRight size={16} strokeWidth={3} />
              </span>
            </Link>
          </div>
          <div className="flex items-center gap-2 bg-green-900 text-white py-2 px-4 rounded-full">
            <Link
              href="/"
              className="flex items-center gap-2 whitespace-nowrap tracking-wide text-white text-base py-2 px-3 font-medium hover:scale-105 transition-transform duration-300 ease-in-out"
            >
              <Mail size={18} className="shrink-0" />
              <span>E-Mail here</span>
            </Link>
            <p className="text-3xl items-center pb-2">|</p>
            <Link
              href="/booking"
              className="w-1/2 flex items-center justify-center gap-2 text-center bg-black text-white px-4 py-2 rounded-full font-bold text-sm shadow active:scale-95 transition tracking-wider whitespace-nowrap shadow-white/20"
            >
              <span>Check Availability</span>
              <Calendar className="w-4 h-4 shrink-0" />
            </Link>
            <p className="text-3xl items-center pb-2">|</p>
            <p className="text-white font-medium text-base">Call:</p>
            <Link
              href="tel:9587380255"
              className="flex items-center gap-2 text-white text-sm font-medium hover:scale-105 transition-transform duration-300 ease-in-out py-1 px-2"
            >
              <Phone size={18} />
              9587380255
            </Link>
            <Link
              href="tel:9001069033"
              className="flex items-center gap-2 text-white text-sm font-medium hover:scale-105 transition-transform duration-300 ease-in-out py-1 px-2"
            >
              <Phone size={18} />
              9001069033
            </Link>
          </div>
        </div>
      </div>

      {/* ===================================================== TOP : MOBILE ================================================= */}
      <div className="bg-stone-50 lg:hidden">
        <div className="container-fluid py-4 flex flex-col gap-4">
          <div className="relative flex justify-between items-center w-full px-4 py-2 text-white bg-green-800 rounded-full shadow-md shadow-green-950">
            <Link
              href="https://www.google.com/maps?q=YOUR+LOCATION"
              target="_blank"
            >
              <span className="flex items-center gap-1 text-green-200">
                <MapPin size={20} />
                <span className="text-base font-medium text-green-200">
                  On-road Location
                </span>
              </span>
              <span className="flex items-center gap-1 text-xs pl-7 text-white">
                Google Maps
                <ArrowRight size={16} strokeWidth={3} />
              </span>
            </Link>
            <Link
              href="/booking"
              className="w-1/2 flex items-center justify-center gap-2 text-center bg-black text-white px-4 py-2 rounded-full font-bold text-sm shadow active:scale-95 transition tracking-wider whitespace-nowrap shadow-white/20"
            >
              <span>Check Availability</span>
              <Calendar className="w-4 h-4 shrink-0" />
            </Link>
          </div>
        </div>
      </div>

      {/* ===================================================== HEADER : DESKTOP & MOBILE ================================================= */}
      <header className="sticky top-0 z-50 w-full bg-white text-primaryBlue shadow-md py-1">
        <div className="container-fluid mx-auto flex h-12.5 md:h-16 items-center justify-between overflow-hidden">
          {/* LOGO */}
          <Link href="/" className="flex items-center gap-1 bg-white">
            <Image
              src="/homenew/logo-flower.jpeg"
              alt="Villa Logo"
              width={48}
              height={48}
              priority
              className="rounded-full w-16 md:w-20 h-16 md:h-20 object-cover object-center pt-1"
            />
            <span className="text-xs md:text-lg font-boldonse font-light md:font-semibold tracking-wide text-yellow-700">
              The Pushpa Heritage
              <p className="text-xs md:text-sm font-ubuntu font-bold text-orange-950 shadow-2xl rounded-l-full rounded-r-full">
                7-BHK | Big Pool | 2 Gardens
              </p>
            </span>
          </Link>

          {/* DESKTOP NAVIGATION */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className="flex items-center gap-2 text-base font-semibold text-black bg-[linear-gradient(currentColor,currentColor)] bg-no-repeat bg-bottom-left bg-size-[0%_2px] transition-[background-size] duration-300 ease-out hover:bg-size-[100%_2px]"
                >
                  <Icon size={16} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* RIGHT : DESKTOP */}
          <div className="hidden lg:flex items-center gap-3">
            {/* WhatsApp */}
            <div className="relative group">
              <Link
                href="https://wa.me/917983598967"
                target="_blank"
                aria-label="Chat on WhatsApp"
                className="flex items-center gap-2 bg-green-500 hover:bg-green-600 active:scale-95 text-white pl-3 pr-4 py-2 rounded-full shadow-md hover:shadow-green-500/30 hover:shadow-lg transition-all duration-200"
              >
                <FaWhatsapp size={16} />
                <span className="text-xs font-ubuntu font-semibold tracking-wide">
                  WhatsApp
                </span>
              </Link>
              <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 z-50 whitespace-nowrap bg-gray-900 text-white text-[10px] font-ubuntu px-2.5 py-1 rounded-md opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all duration-200 pointer-events-none shadow-lg">
                Chat on WhatsApp
              </span>
            </div>

            {/* Instagram */}
            <div className="relative group">
              <Link
                href="https://www.instagram.com/yourprofile"
                target="_blank"
                aria-label="Follow on Instagram"
                className="flex items-center gap-2 bg-linear-to-br from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 active:scale-95 text-white pl-3 pr-4 py-2 rounded-full shadow-md hover:shadow-pink-500/30 hover:shadow-lg transition-all duration-200"
              >
                <Instagram size={16} />
                <span className="text-xs font-ubuntu font-semibold tracking-wide">
                  Instagram
                </span>
              </Link>
              <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 z-50 whitespace-nowrap bg-gray-900 text-white text-[10px] font-ubuntu px-2.5 py-1 rounded-md opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all duration-200 pointer-events-none shadow-lg">
                Follow on Instagram
              </span>
            </div>
          </div>

          {/* ========================================= MOBILE : MENU ================================================ */}
          <div className="lg:hidden">
            <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-white/10"
                  aria-label={sheetOpen ? "Close Menu" : "Open Menu"}
                >
                  <MenuLottieIcon open={sheetOpen} />
                </Button>
              </SheetTrigger>

              <SheetContent
                side="right"
                className="w-75 bg-gray-950 border-l border-gray-800/60 p-0 flex flex-col text-white"
                onInteractOutside={() => setSheetOpen(false)}
              >
                <SheetHeader className="sr-only">
                  <SheetTitle>Navigation</SheetTitle>
                </SheetHeader>

                {/* ── Sheet header with logo ── */}
                <div className="flex items-center gap-3 px-5 py-4 bg-green-950 border-b border-green-900/60 shrink-0">
                  <Image
                    src="/homenew/logo-flower.jpeg"
                    alt="Logo"
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-green-700 shadow-md"
                  />
                  <div className="leading-tight">
                    <p className="text-xs font-boldonse font-light text-white tracking-wide">
                      The Pushpa Heritage
                    </p>
                    <p className="text-[10px] font-ubuntu text-green-400/60 mt-0.5 tracking-wider">
                      Udaipur, Rajasthan
                    </p>
                  </div>
                </div>

                {/* ── Nav links ── */}
                <nav className="flex flex-col px-3 py-4 gap-0.5 flex-1">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.label}
                        href={item.href}
                        className={`
                          flex items-center gap-3 px-4 py-3 rounded-xl
                          text-sm font-ubuntu font-medium tracking-wide
                          transition-all duration-200
                          ${
                            isActive
                              ? "bg-green-900/40 text-green-300 border border-green-800/40"
                              : "text-gray-400 hover:bg-gray-800/70 hover:text-white"
                          }
                        `}
                      >
                        <Icon
                          size={17}
                          className={
                            isActive ? "text-green-400" : "text-gray-600"
                          }
                        />
                        <span>{item.label}</span>
                        {isActive && (
                          <span className="ml-auto w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                        )}
                      </Link>
                    );
                  })}
                </nav>

                {/* ── Phone numbers ── */}
                <div className="px-4 py-3 border-t border-gray-800/60 shrink-0">
                  <p className="text-[10px] font-ubuntu text-gray-600 uppercase tracking-widest mb-2 px-1">
                    Call us
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {["9587380255", "9001069033"].map((num) => (
                      <Link
                        key={num}
                        href={`tel:${num}`}
                        className="flex items-center justify-center gap-1.5 bg-gray-800/80 hover:bg-gray-700 text-gray-300 hover:text-white py-2.5 rounded-xl text-[11px] font-ubuntu tracking-wide transition-all duration-200 active:scale-95"
                      >
                        <Phone size={11} />
                        {num}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* ── Footer CTAs ── */}
                <div className="px-4 pb-6 pt-3 space-y-2.5 shrink-0">
                  <Link
                    href="/booking"
                    className="flex items-center justify-center gap-2 w-full bg-green-700 hover:bg-green-600 active:scale-[0.98] text-white py-3.5 rounded-xl font-barlow font-bold text-sm tracking-widest uppercase transition-all duration-200 shadow-lg shadow-green-950/50"
                  >
                    <Calendar size={15} />
                    Book Your Stay
                  </Link>
                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      href="https://wa.me/917983598967"
                      target="_blank"
                      className="flex items-center justify-center gap-2 bg-gray-800/80 hover:bg-green-900/50 border border-gray-700/50 hover:border-green-800/50 text-white py-2.5 rounded-xl text-xs font-ubuntu font-medium tracking-wide transition-all duration-200 active:scale-95"
                    >
                      <FaWhatsapp size={14} className="text-green-400" />
                      WhatsApp
                    </Link>
                    <Link
                      href="https://www.instagram.com/yourprofile"
                      target="_blank"
                      className="flex items-center justify-center gap-2 bg-gray-800/80 hover:bg-pink-900/40 border border-gray-700/50 hover:border-pink-800/30 text-white py-2.5 rounded-xl text-xs font-ubuntu font-medium tracking-wide transition-all duration-200 active:scale-95"
                    >
                      <Instagram size={14} className="text-pink-400" />
                      Instagram
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
    </>
  );
}
