"use client";

import { Room } from "@/app/data/rooms-data";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Props = {
  room: Room;
  onClickAction: () => void;
  style?: React.CSSProperties;
};

export default function RoomCard({ room, onClickAction, style }: Props) {
  // ====================================================================================
  const ref = useRef<HTMLDivElement | null>(null); 
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true); // animation ON
          observer.disconnect(); // ek baar hi animation
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);
  // ====================================================================================

  return (
    <div
      ref={ref}
      className={`min-w-60 md:min-w-0 bg-white rounded-md shadow-lg overflow-hidden cursor-pointer transition-all duration-700 ease-out hover:shadow-xl
        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
      `}
      onClick={onClickAction}
      style={style}
    >
      <div className="relative w-full h-96">
        {room.media[0].type === "video" ? (
          <video
            src={room.media[0].src}
            muted
            loop
            autoPlay
            playsInline
            className="w-full h-full object-cover"
          />
        ) : (
          <Image
            src={room.media[0].src}
            alt={room.name}
            fill
            className="object-cover"
          />
        )}
      </div>
      <div className="p-4">
        <p className="text-lg font-semibold">{room.name}</p>
        <p className="text-sm text-gray-500">{room.view}</p>
        <span className="inline-flex items-center gap-1 bg-yellow-100 text-yellow-600 px-2 py-1 rounded-full text-sm font-semibold">
          {/* Star SVG */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 fill-current"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.447a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.538 1.118l-3.37-2.447a1 1 0 00-1.176 0l-3.37 2.447c-.783.57-1.838-.197-1.538-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.037 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z" />
          </svg>
          {room.rating.toFixed(1)}
        </span>
      </div>
    </div>
  );
}
