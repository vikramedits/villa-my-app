"use client";

import { usePathname } from "next/navigation";
import MobileBookNowCTA from "./MobileBookNowCTA";

export default function BookingCTAGuard() {
  const pathname = usePathname();

  const SHOW_ON = ["/", "/gallery", "/rooms", "/amenities"];

  const shouldShow = SHOW_ON.some(
    (route) => pathname === route || pathname.startsWith(route + "/")
  );

  if (!shouldShow) return null;

  return <MobileBookNowCTA />;
}
