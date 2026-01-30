"use client";

import { usePathname } from "next/navigation";
import MobileBookNowCTA from "./MobileBookNowCTA";

export default function BookingCTAGuard() {
  const pathname = usePathname();

  // 👉 JIN PAGES PAR CTA CHAHIYE
  const SHOW_ON = ["/", "/gallery", "/rooms", "/amenities"];

  if (!SHOW_ON.includes(pathname)) return null;

  return <MobileBookNowCTA />;
}
