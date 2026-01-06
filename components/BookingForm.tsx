"use client";
import { useState } from "react";

export default function BookingForm() {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);

  const nights =
    checkIn && checkOut
      ? (new Date(checkOut).getTime() - new Date(checkIn).getTime()) /
        86400000
      : 0;

  const total = nights * 8000;

  async function sendWhatsApp() {
    const res = await fetch("/api/whatsapp", {
      method: "POST",
      body: JSON.stringify({ checkIn, checkOut, guests, total }),
    });
    const data = await res.json();
    window.open(data.url, "_blank");
  }

  return (
    <div className="space-y-4">
      <input type="date" onChange={(e) => setCheckIn(e.target.value)} className="text-blue-950"/>
      <input type="date" onChange={(e) => setCheckOut(e.target.value)} className="text-blue-950" />
      <input
      placeholder="Number of guests"
        type="number"
        min={1}
        value={guests}
        onChange={(e) => setGuests(+e.target.value)}
      />
      <p className="font-semibold">Total: ₹{total}</p>

      <button
        onClick={sendWhatsApp}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Send Booking Request
      </button>
    </div>
  );
}
