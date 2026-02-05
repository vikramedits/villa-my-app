"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, MessageCircle, X } from "lucide-react";

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
  Mail,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

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

  return (
    <>
      {/* ===================================================== TOP : DESKTOP ================================================= */}
      <div className=" bg-gray-950">
        <div className="container-fluid mx-auto hidden md:flex justify-between items-center py-4">
          <div>
            <p className="text-white font-normal tracking-wide text-xs md:text-sm">
              Prices Sarting From{" "}
            </p>
            <p className="text-white font-medium text-sm md:text-xl">
              1,500/Person*
            </p>
            <p className="text-white tracking-wide text-xs md:text-sm ">
              (one night)
            </p>
          </div>
          <div className="flex items-center gap-2 bg-white py-2 px-4 rounded-bl-4xl rounded-sm">
            <Link
              href={"/"}
              className="flex items-center gap-2 tracking-wide text-primaryBlue text-sm md:text-base py-2 px-3 font-medium border-b border-primaryBlue rounded-xl  hover:scale-105 
             transition-transform duration-300 ease-in-out"
            >
              <Mail size={18} /> E-Mail here
            </Link>
            <p className="text-3xl items-center pb-2">|</p>
            <Link
              href={"/booking"}
              className="py-2 px-3 text-primaryBlue font-medium border-b border-primaryBlue rounded-xl hover:scale-105 
             transition-transform duration-300 ease-in-out"
            >
              Check Availability
            </Link>
            <p className="text-3xl items-center pb-2">|</p>
            <p className="text-primaryBlue font-medium text-base">Call:</p>
            <Link
              href="tel:9587380255"
              className="flex items-center gap-2 text-primaryBlue text-sm font-medium hover:scale-105 
             transition-transform duration-300 ease-in-out border-2 border-white py-1 px-2 rounded"
            >
              <Phone size={18} />
              9587380255
            </Link>
            <Link
              href="tel:9001069033"
              className="flex items-center gap-2 text-primaryBlue text-sm font-medium hover:scale-105 
             transition-transform duration-300 ease-in-out border-2 border-white py-1 px-2 rounded"
            >
              <Phone size={18} />
              9001069033
            </Link>
          </div>
        </div>
      </div>
      {/* ===================================================== TOP : MOBILE ================================================= */}
      <div className="bg-gray-950 md:hidden">
        <div className="px-4 py-4 flex flex-col gap-4">
          {/* Price Section */}
          <div>
            <p className="text-white text-xs tracking-wide">
              Prices Starting From
            </p>
            <p className="text-white font-semibold text-xl">₹1,500 / Person*</p>
            <p className="text-white text-xs tracking-wide">(one night)</p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center">
            {/* LEFT: Email & Call Dropdown */}
            <div className="relative w-1/2">
              <button
                onClick={() => setContactOpen(!contactOpen)}
                className="w-full flex items-center justify-between 
               bg-white text-primaryBlue 
               px-2 py-2 rounded-bl-xl rounded-sm font-medium text-sm
               shadow-sm active:scale-95 transition"
              >
                {/* Left side: icons + text */}
                <span className="flex items-center gap-2">
                  <Mail size={16} />
                  <Phone size={16} />
                  <span className="font-bold text-primaryBlue">Email & Call</span>
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
                 bg-white rounded-xl shadow-lg z-9999 overflow-hidden"
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
            </div>``

            {/* =========== RIGHT: Availability)  ========== */}
            <Link
              href="/booking"
              className="w-1/2 text-center bg-white text-green-700
                       px-4 py-2 rounded-br-xl rounded-sm font-bold text-sm
                       shadow-md active:scale-95 transition"
            >
              Check Availability
            </Link>
          </div>
        </div>
      </div>
       {/* ===================================================== HEADER : DESKTOP & MOBILE ================================================= */}
      <header className="sticky top-0 z-50 w-full bg-white text-primaryBlue shadow-md">
        <div className="container-fluid mx-auto flex h-12 md:h-16 items-center justify-between">
          {/* =========== LOGO (common)  ========== */}
          <div className="flex items-center gap-3 py-1 px-3 bg-white">
            <Image
              src="/homenew/villa-logo.jpeg"
              alt="Villa Logo"
              width={48}
              height={48}
              priority
              className="rounded-xs w-8 md:w-12 h-8 md:h-12 object-cover"
            />
            <span className="text-sm md:text-lg font-bold md:font-semibold tracking-wide text-primaryBlue ">
              The Pushpa Heritage
              <p className="text-xs md:text-sm text-black shadow-2xl rounded-l-full rounded-r-full">
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
                  className="  flex items-center gap-2 text-base font-semibold text-primaryBlue  bg-[linear-gradient(currentColor,currentColor)]  bg-no-repeat  bg-bottom-left  bg-size-[0%_2px]  transition-[background-size] duration-300 ease-out  hover:bg-size-[100%_2px]"
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
                <Phone size={20} />
              </Link>
              <span
                className="absolute top-full mt-2 left-1/2 -translate-x-1/2
             scale-0 group-hover:scale-100 
             bg-black text-white text-xs px-3 py-1 
             rounded-md shadow-lg 
             transition-all duration-200 origin-top"
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
          <div className="lg:hidden">
            <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-primaryBlue hover:bg-white/10"
                  aria-label="Open Menu"
                >
                  <Menu size={28} />
                </Button>
              </SheetTrigger>

              <SheetContent side="right" className="bg-primaryBlue text-white">
                <SheetHeader>
                  <SheetTitle>
                    <span className="sr-only">Navigation Menu</span>
                  </SheetTitle>
                </SheetHeader>
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
                    {/* WhatsApp */}
                    <div className="bg-white px-2 py-2 rounded-sm flex gap-2 items-center mb-2">
                      <Link
                        href="https://wa.me/917983598967"
                        target="_blank"
                        aria-label="Chat on WhatsApp"
                        className="flex items-center justify-center w-8 h-8 rounded-full 
                               bg-linear-to-br from-green-500 to-green-600 
                               text-white shadow-md hover:shadow-lg 
                               transition-all duration-300"
                      >
                        <Phone size={16} />
                      </Link>
                      <p className="text-primaryBlue font-medium tracking-wide text-sm">
                        Chat On WhatsApp
                      </p>
                    </div>

                    {/*Instagram */}
                    <div className="bg-white px-2 py-2 rounded-sm flex gap-2 items-center">
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
                        Follow On Instagram
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
