"use client";

import { Player } from '@lottiefiles/react-lottie-player';

export default function CenteredVillaAnimation() {
  return (
    <div className="w-full overflow-hidden flex justify-center items-center py-4">
      {/* Mobile animation wrapper */}
      <div className="w-40 h-40 hover:scale-110 transition-transform duration-500">
        <Player
          autoplay
          loop
          src="https://assets10.lottiefiles.com/packages/lf20_x62chJ.json"
          style={{ width: '100%', height: '100%' }}
        />
      </div>
    </div>
  );
}
