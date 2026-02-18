"use client";

import { usePathname } from "next/navigation";
import MobileBookNowCTA from "./MobileBookNowCTA";

export default function BookingCTAGuard() {
  const pathname = usePathname();

  const cleanPath = pathname?.replace(/\/$/, "") || "/";

  const SHOW_ON = ["/", "/gallery", "/rooms", "/amenities"];

  const shouldShow = SHOW_ON.includes(cleanPath);

  if (!shouldShow) return null;

  return <MobileBookNowCTA />;
}
