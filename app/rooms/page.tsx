"use client";

import { useState } from "react";
import { roomsData } from "../data/rooms-data";
import RoomCard from "@/components/RoomCard";
import RoomMediaViewer from "@/components/RoomMediaViewer";

export default function RoomsPage() {
  const [activeRoomId, setActiveRoomId] = useState<number | null>(null);

  const activeRoom = roomsData.find((r) => r.id === activeRoomId) || null;

  return (
    <div className="container-fluid py-6 md:py-12">
      <div className="text-center mb-6 md:mb-12 border-b border-gray-200 pb-2 mt-2 md:mt-8">
        <p className="text-lg md:text-3xl font-bold mb-1 md:mb-2">
          7 Luxury Bedrooms
        </p>
        <p className="text-sm md:text-lg text-gray-500">
          Experience unparalleled comfort and breathtaking views in each of our
          meticulously designed rooms.
        </p>
      </div>

      {/* Rooms Grid / Scroll */}
      <div className="grid md:grid-cols-4 grid-cols-1 gap-6 pb-4">
        {roomsData.map((room, index) => (
          <RoomCard
            key={room.id}
            room={room}
            onClickAction={() => setActiveRoomId(room.id)}
            style={{ transitionDelay: `${index * 50}ms` }}
          />
        ))}
      </div>

      {/* Media Viewer (modal/dialog or sheet) */}
      {activeRoom && (
        <RoomMediaViewer
          room={activeRoom}
          onCloseAction={() => setActiveRoomId(null)}
        />
      )}
    </div>
  );
}
