"use client";

import { Player } from "@lottiefiles/react-lottie-player";


/* 🔵 Existing component — NO CHANGE */
export default function CenteredVillaAnimation() {
  return (
    <div className="w-full overflow-hidden flex justify-center items-center py-4">
      <div className="w-40 h-40 hover:scale-110 transition-transform duration-500">
        <Player
          autoplay
          loop
          src="https://assets10.lottiefiles.com/packages/lf20_x62chJ.json"
          style={{ width: "100%", height: "100%" }}
        />
      </div>
    </div>
  );
}

 


// ============== Mobile Menu Hanmburger =============
interface MenuLottieIconProps {
  open: boolean;
}

export function MenuLottieIcon({ open }: MenuLottieIconProps) {
  return (
    <div
      className={`w-6 h-6 flex flex-col justify-between transform transition-transform duration-200 ease-in-out
        ${open ? "scale-125" : "scale-100"}`}
    >
      {/* Top line */}
      <span
        className={`h-1 w-full bg-current rounded block transition-all duration-300 ease-in-out ${
          open ? "rotate-45 translate-y-2" : ""
        }`}
      />
      {/* Middle line */}
      <span
        className={`h-1 w-full bg-current rounded block transition-all duration-300 ease-in-out ${
          open ? "opacity-0" : ""
        }`}
      />
      {/* Bottom line */}
      <span
        className={`h-1 w-full bg-current rounded block transition-all duration-300 ease-in-out ${
          open ? "-rotate-45 -translate-y-2" : ""
        }`}
      />
    </div>
  );
}
