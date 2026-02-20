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
import { Instagram } from "lucide-react";
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
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import CenteredVillaAnimation, { MenuLottieIcon } from "./NavbarAnimation";

const navItems = [
  {
    label: "Home",
    href: "/",
    icon: Home,
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
];

export default function Navbar() {
  const [sheetOpen, setSheetOpen] = useState(false); // sidebar
  const [contactOpen, setContactOpen] = useState(false); // dropdown
  const pathname = usePathname();

  useEffect(() => {
    setSheetOpen(false);
  }, [pathname]);

  return (
    <>
      {/* ===================================================== TOP : DESKTOP ================================================= */}
      <div className="bg-gray-950 lg:bg-green-950 py-2">
        <div className="container-fluid mx-auto hidden md:flex justify-between items-center py-4 bg-green-800 rounded-full">
          {/* ============== Left Lottie Icon ========== */}
          <div className=" pl-6 pr-28 py-2 flex">
            <Link
              href="https://www.google.com/maps?q=YOUR+LOCATION"
              target="_blank"
              aria-label="Open location in Google Maps"
              className="hover:opacity-90  "
            >
              <span className=" flex  items-center gap-1 text-green-200">
                <MapPin size={24} />
                <span className="text-lg font-medium ">On-road Location</span>
              </span>

              <span className="flex items-center gap-1 text-xs pl-7 text-white">
                Google Maps
                <ArrowRight size={16} strokeWidth={3} />
              </span>
            </Link>
            <div className=" w-48 h-10 absolute -top-3 ml-32 -translate-y-1/2">
              <CenteredVillaAnimation />
            </div>
          </div>
          {/* =========== Right Email, Availability =========== */}
          <div className="flex items-center gap-2 bg-green-900 text-white py-2 px-4 rounded-full ">
            <Link
              href={"/"}
              className="flex items-center gap-2 tracking-wide text-white text-sm md:text-base py-2 px-3 font-medium   hover:scale-105 
             transition-transform duration-300 ease-in-out"
            >
              <Mail size={18} /> E-Mail here
            </Link>
            <p className="text-3xl items-center pb-2">|</p>
            <Link
              href={"/booking"}
              className="py-2 px-3 text-green-500 font-medium  hover:scale-105 
             transition-transform duration-300 ease-in-out"
            >
              Check Availability
            </Link>
            <p className="text-3xl items-center pb-2">|</p>
            <p className="text-white font-medium text-base">Call:</p>
            <Link
              href="tel:9587380255"
              className="flex items-center gap-2 text-white text-sm font-medium hover:scale-105 
             transition-transform duration-300 ease-in-out  py-1 px-2 "
            >
              <Phone size={18} />
              9587380255
            </Link>
            <Link
              href="tel:9001069033"
              className="flex items-center gap-2 text-white text-sm font-medium hover:scale-105 
             transition-transform duration-300 ease-in-out  py-1 px-2 "
            >
              <Phone size={18} />
              9001069033
            </Link>
          </div>
        </div>
      </div>
      {/* ===================================================== TOP : MOBILE ================================================= */}
      <div className="bg-linear-to-b from-green-950 via-green-900 to-white md:hidden">
        <div className="px-4 py-4 flex flex-col gap-4">
          {/* Price Section */}
          <div className="relative flex justify-between items-center w-full px-4 py-2 text-white bg-green-800 rounded-full shadow-lg shadow-green-950">
            <Link
              href="https://www.google.com/maps?q=YOUR+LOCATION"
              target="_blank"
              className=""
            >
              <span className=" flex  items-center gap-1 text-green-200">
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

            {/* Right animation */}
            <div className="absolute -right-8 top-9 -translate-y-1/2 w-48 h-40">
              <CenteredVillaAnimation />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 items-center">
            {/* LEFT: Email & Call Dropdown */}
            <div className="relative w-1/2">
              <button
                onClick={() => setContactOpen(!contactOpen)}
                className="w-full flex items-center justify-between 
               bg-white text-black 
               px-2 py-2 rounded-bl-xl rounded-sm font-medium text-sm
               shadow-md active:scale-95 transition border-b border-green-950"
              >
                {/* Left side: icons + text */}
                <span className="flex items-center gap-2">
                  <Mail size={16} />
                  <Phone size={16} />
                  <span className="font-bold text-primaryBlue tracking-wider">
                    Email & Call
                  </span>
                </span>

                {/* Right side: chevron */}
                {contactOpen ? (
                  <ChevronUp size={16} />
                ) : (
                  <ChevronDown size={16} />
                )}
              </button>

              {contactOpen && (
                <div
                  className="absolute left-0 top-full mt-2 w-full 
                 bg-white rounded-xl shadow-md shadow-black z-9999 overflow-hidden"
                >
                  <Link
                    href="mailto:thepushpaheritage0@gmail.com"
                    className="flex items-center gap-2 px-4 py-3 
                   text-sm font-medium text-primaryBlue hover:bg-gray-100"
                    onClick={() => setContactOpen(false)}
                  >
                    <Mail size={16} />
                    Email Villa
                  </Link>

                  <Link
                    href="tel:9587380255"
                    className="flex items-center gap-2 px-4 py-3 
                   text-sm font-bold text-primaryBlue hover:bg-gray-100"
                    onClick={() => setContactOpen(false)}
                  >
                    <Phone size={16} />
                    9587380255
                  </Link>

                  <Link
                    href="tel:9001069033"
                    className="flex items-center gap-2 px-4 py-3 
                   text-sm font-bold text-primaryBlue hover:bg-gray-100"
                    onClick={() => setContactOpen(false)}
                  >
                    <Phone size={16} />
                    9001069033
                  </Link>
                </div>
              )}
            </div>

            {/* =========== RIGHT: Availability)  ========== */}
            <Link
              href="/booking"
              className="w-1/2 text-center bg-white text-green-800
                       px-4 py-2 rounded-br-xl rounded-sm font-bold text-sm
                       shadow-md active:scale-95 transition z-20 tracking-wider border-b border-black"
            >
              Check Availability
            </Link>
          </div>
        </div>
      </div>
      {/* ===================================================== HEADER : DESKTOP & MOBILE ================================================= */}
      <header className="sticky top-0 z-50 w-full bg-white  text-primaryBlue shadow-md py-1 ">
        <div className="container-fluid mx-auto flex h-12.5 md:h-16 items-center justify-between overflow-hidden">
          {/* =========== LOGO (common)  ========== */}
          <div className="flex items-center gap-1 bg-white">
            <Image
              src="/homenew/logo-flower.jpeg"
              alt="Villa Logo"
              width={48}
              height={48}
              priority
              className="rounded-full w-16 md:w-20 h-16 md:h-20 object-cover object-center pt-1"
            />
            <span className="text-sm md:text-lg font-bold md:font-semibold tracking-wide text-yellow-700 ">
              The Pushpa Heritage
              <p className="text-xs md:text-sm text-orange-950 shadow-2xl rounded-l-full rounded-r-full">
                7-BHK | Big Pool | 2 Gardens
              </p>
            </span>
          </div>

          {/* ===================================== DESKTOP NAVIGATION ======================================= */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className="  flex items-center gap-2 text-base font-semibold text-black  bg-[linear-gradient(currentColor,currentColor)]  bg-no-repeat  bg-bottom-left  bg-size-[0%_2px]  transition-[background-size] duration-300 ease-out  hover:bg-size-[100%_2px]"
                >
                  <Icon size={16} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* ===================================== RIGHT : DESKTOP ========================================== */}
          <div className="hidden lg:flex items-center gap-4">
            {/* =========== WHATSAPP ========== */}
            <div className="relative flex items-center group">
              <Link
                href="https://wa.me/917983598967"
                target="_blank"
                aria-label="Chat on WhatsApp"
                className="flex items-center justify-center w-10 h-10 rounded-full 
               bg-linear-to-br from-green-500 to-green-600 
               text-white shadow-md hover:shadow-lg 
               transition-all duration-300"
              >
                <FaWhatsapp size={18} />
              </Link>
              <span
                className="absolute top-full mt-2 left-1/2 -translate-x-1/2
             scale-0 group-hover:scale-100 
             bg-black text-white text-xs px-3 py-1 
             rounded-md shadow-lg 
             transition-all duration-200 origin-top "
              >
                Chat on WhatsApp
              </span>
            </div>
            {/* =========== INSTAGRAM  ========== */}
            <div className="relative flex items-center group">
              <Link
                href="https://www.instagram.com/yourprofile"
                target="_blank"
                aria-label="Follow on Instagram"
                className="flex items-center justify-center w-10 h-10 rounded-full 
               bg-linear-to-br from-pink-500 to-purple-500 
               text-white shadow-md hover:shadow-lg 
               transition-all duration-300"
              >
                <Instagram size={20} />
              </Link>
              <span
                className="absolute top-full mt-2 left-1/2 -translate-x-1/2
               scale-0 group-hover:scale-100 
               bg-black text-white text-xs px-3 py-1 
               rounded-md shadow-lg 
               transition-all duration-200 origin-top"
              >
                Follow on Instagram
              </span>
            </div>
          </div>

          {/* ========================================= MOBILE : MENU ================================================ */}
          <div className="lg:hidden ">
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
                className="bg-black text-white"
                onInteractOutside={() => setSheetOpen(false)}
              >
                <SheetHeader className="bg-green-900  shadow shadow-gray-700 pb-10">
                  <SheetTitle className="sr-only pb-4">Navigation</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-6 mt-4 px-4">
                  {navItems.map((item) => {
                    const Icon = item.icon;

                    return (
                      <Link
                        key={item.label}
                        href={item.href}
                        className="flex items-center gap-2 text-sm font-medium text-white/90 hover:text-white transition"
                      >
                        <Icon size={18} />
                        <span>{item.label}</span>
                      </Link>
                    );
                  })}
                  <div className="items-center pt-4 border-t border-white/20">
                    {/* WhatsApp */}
                    <div className="bg-white px-2 py-2 rounded-full flex gap-2 items-center mb-2">
                      <Link
                        href="https://wa.me/917983598967"
                        target="_blank"
                        aria-label="Chat on WhatsApp"
                        className="flex items-center justify-center w-8 h-8 rounded-full 
                               bg-linear-to-br from-green-500 to-green-600 
                               text-white shadow-md hover:shadow-lg 
                               transition-all duration-300"
                      >
                        <FaWhatsapp size={18} />
                      </Link>
                      <p className="text-primaryBlue font-medium tracking-wide text-sm">
                        Chat On WhatsApp
                      </p>
                    </div>

                    {/*Instagram */}
                    <div className="bg-white px-2 py-2 rounded-full flex gap-2 items-center">
                      <Link
                        href="https://www.instagram.com/yourprofile"
                        target="_blank"
                        aria-label="Follow on Instagram"
                        className="flex items-center justify-center w-8 h-8 rounded-full 
                              bg-linear-to-br from-pink-500 to-purple-500 
                              text-white shadow-md hover:shadow-lg 
                              transition-all duration-300"
                      >
                        <Instagram size={16} />
                      </Link>
                      <p className="text-primaryBlue font-medium tracking-wide text-sm">
                        Follow For Updates
                      </p>
                    </div>
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
