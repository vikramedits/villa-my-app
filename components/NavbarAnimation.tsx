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
    <div
      className={`w-6 h-6 flex flex-col justify-between transform transition-transform duration-200 ease-in-out
        ${open ? "scale-125" : "scale-100"}`}
    >
      <span className={`h-1 w-full bg-current rounded block transition-all duration-300 ${open ? "rotate-45 translate-y-2" : ""}`} />
      <span className={`h-1 w-full bg-current rounded block transition-all duration-300 ${open ? "opacity-0" : ""}`} />
      <span className={`h-1 w-full bg-current rounded block transition-all duration-300 ${open ? "-rotate-45 -translate-y-2" : ""}`} />
    </div>
  );
}

export { MenuLottieIcon };
