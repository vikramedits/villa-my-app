"use client";

import dynamic from "next/dynamic";
import type { ComponentType } from "react";

const Player = dynamic(
  () =>
    import("@lottiefiles/react-lottie-player").then(
      (mod) => mod.Player as ComponentType<any>
    ),
  { ssr: false }
);

/* 🔵 Default export */
export default function CenteredVillaAnimation() {
  return (
    <div className="w-full overflow-hidden flex justify-center items-center py-4">
      <div className="w-40 h-36 hover:scale-110 transition-transform duration-500">
        <Player
          autoplay
          loop
          src="https://assets10.lottiefiles.com/packages/lf20_x62chJ.json"
          style={{ width: "90%", height: "90%" }}
        />
      </div>
    </div>
  );
}

/* 🔵 Named export */

function MenuLottieIcon({ open }: { open: boolean }) {
  return (
    <div className="w-8 h-8 flex flex-col justify-between pb-1">
      <span
        className={`block h-1 w-full bg-current rounded-md transition-transform duration-300 ${
          open ? "rotate-45 translate-y-2" : ""
        }`}
      />
      <span
        className={`block h-1.5 w-1/2 mx-auto bg-current rounded-md transition-opacity duration-300 ${
          open ? "opacity-0" : "opacity-100"
        }`}
      />
      <span
        className={`block h-1 w-full bg-current rounded-md transition-transform duration-300 ${
          open ? "-rotate-45 -translate-y-2" : ""
        }`}
      />
    </div>
  );
}
export { MenuLottieIcon };