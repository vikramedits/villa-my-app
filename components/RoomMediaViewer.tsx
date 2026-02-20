"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useEffect, useState } from "react";
import { Room } from "@/app/data/rooms-data";
import { Navigation, Pagination } from "swiper/modules";

type Props = {
  room: Room;
  onCloseAction: () => void;
};

export default function RoomMediaViewer({ room, onCloseAction }: Props) {
  const [isMobile, setIsMobile] = useState(false);
  const [isVisible, setIsVisible] = useState(false); // for animation

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    // trigger the animation after mount
    setIsVisible(true);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    // wait for animation before actually closing
    setTimeout(onCloseAction, 300);
  };

  return (
    <div
      className={`container-fluid fixed inset-0 z-50 flex items-center justify-center bg-black/70 transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      onClick={handleClose} // tap outside to close
    >
      <div
        className={`relative w-full max-w-2xl bg-transparent shadow-lg overflow-hidden
          transform transition-all duration-300
          ${isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"}
          ${isMobile ? "absolute bottom-0 h-4/5 rounded-lg" : "rounded-3xl md:max-h-[90vh]"}
        `}
        onClick={(e) => e.stopPropagation()} // prevent close when clicking inside
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-20 text-black bg-gray-200 p-2 rounded-full hover:bg-gray-300"
        >
          ✕
        </button>

        {/* Swiper */}
        <Swiper
          modules={[Navigation, Pagination]}
          navigation
          pagination={{ clickable: true }}
          spaceBetween={10}
          slidesPerView={1}
        >
          {room.heroImages.map((media, idx) => (
            <SwiperSlide key={idx}>
              <div
                className={`relative w-full ${isMobile ? "h-[70vh]" : "h-[60vh] md:h-[70vh]"}`}
              >
                {media.type === "video" ? (
                  <video
                    src={media.src}
                    muted
                    loop
                    autoPlay
                    playsInline
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Image
                    src={media.src}
                    alt={room.name}
                    fill
                    className="object-cover rounded-xl"
                  />
                )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
