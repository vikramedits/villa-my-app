"use client";
import React, { useEffect, useState } from "react";

type BlockedDate = {
  date: string; // or Date
};

export default function CheckAvailability() {
  const [blockedDates, setBlockedDates] = useState<BlockedDate[]>([]);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [available, setAvailable] = useState<boolean | null>(null);

  // 1️⃣ Fetch blocked dates on load
  useEffect(() => {
    fetch("/api/bookings") // backend GET endpoint
      .then((res) => res.json())
      .then((data) => {
        setBlockedDates(data);
      });
  }, []);

  // 2️⃣ Check availability
  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkIn || !checkOut) return alert("Select both dates");

    const start = new Date(checkIn);
    const end = new Date(checkOut);

    let conflict = false;
    let current = new Date(start);

    while (current <= end) {
      if (
        blockedDates.find(
          (b) => new Date(b.date).toDateString() === current.toDateString()
        )
      ) {
        conflict = true;
        break;
      }
      current.setDate(current.getDate() + 1);
    }

    setAvailable(!conflict);
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-2">Check Availability</h3>
      <form onSubmit={handleCheck} className="flex gap-2 flex-wrap">
        <input
          type="date"
          value={checkIn}
          onChange={(e) => setCheckIn(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="date"
          value={checkOut}
          onChange={(e) => setCheckOut(e.target.value)}
          className="border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-green-900 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Check
        </button>
      </form>

      {available !== null && (
        <p
          className={`mt-2 font-medium flex items-center gap-2 ${
            available ? "text-green-700" : "text-red-600"
          }`}
        >
          {available ? (
            <>
              Dates Available ✅
              <span className="text-xs font-normal text-green-700/80">
                (Please fill the booking details below)
              </span>
            </>
          ) : (
            "Dates Not Available ❌"
          )}
        </p>
      )}
    </div>
  );
}

// ------------------------------------------------------------------------------------iske niche very first code hai ---------
// import { connectDB } from "@/lib/db";
// import Booking from "@/models/Booking";
// import { NextResponse } from "next/server";

// // GET blocked dates
// export async function GET() {
//   await connectDB();
//   const bookings = await Booking.find({}).select("checkIn checkOut");

//   const dates: { date: Date }[] = [];

//   bookings.forEach((b) => {
//     let current = new Date(b.checkIn);
//     while (current <= b.checkOut) {
//       dates.push({ date: new Date(current) });
//       current.setDate(current.getDate() + 1);
//     }
//   });

//   return NextResponse.json(dates);
// }

// // POST block date manually
// export async function POST(req: Request) {
//   const { date } = await req.json();

//   await connectDB();
//   await Booking.create({
//     checkIn: date,
//     checkOut: date,
//     paid: true,
//   });

//   return NextResponse.json({ success: true });
// }
