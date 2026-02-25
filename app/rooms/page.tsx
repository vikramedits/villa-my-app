"use client";

import { useState } from "react";
import { roomsData } from "../data/rooms-data";
import RoomCard from "@/components/RoomCard";
import RoomMediaViewer from "@/components/RoomMediaViewer";

export default function RoomsPage() {
  const [activeRoomId, setActiveRoomId] = useState<number | null>(null);

  const activeRoom = roomsData.find((r) => r.id === activeRoomId) || null;

  return (
    <div className="container-fluid pb-6 md:pb-12">
      <div className="text-center my-5 lg:my-10">
        <p className="text-2xl md:text-4xl font-semibold text-gray-700 tracking-wide pb-1 lg:pb-2">
          7 Rooms
        </p>

        <p className="text-sm md:text-lg text-gray-500">
          Experience unparalleled comfort and breathtaking views in each of our
          meticulously designed rooms.
        </p>
        <div className="w-20 h-0.5 bg-green-800 mx-auto mt-3"></div>
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
