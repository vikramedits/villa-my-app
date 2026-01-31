"use client";

import { useState } from "react";
import { BOOKINGS } from "./data";

export default function RecentBookings() {
  const [openId, setOpenId] = useState<number | null>(null);

  return (
    <div className="bg-white text-slate-800 rounded-2xl p-6 shadow-sm">
      <div className="flex justify-between mb-6">
        <h2 className="font-semibold text-lg">Recent Bookings</h2>
        <span className="text-sm text-red-500 cursor-pointer">View all</span>
      </div>

      <div className="space-y-4">
        {BOOKINGS.map((b) => {
          const isOpen = openId === b.id;

          return (
            <div
              key={b.id}
              className="border rounded-xl overflow-hidden transition"
            >
              {/* TOP ROW */}
              <div
                onClick={() => setOpenId(isOpen ? null : b.id)}
                className="p-4 flex justify-between items-center cursor-pointer hover:bg-gray-50"
              >
                <div>
                  <p className="font-semibold">{b.name}</p>
                  <p className="text-sm text-gray-500">
                    {b.checkIn} → {b.checkOut} • {b.nights} Nights
                  </p>
                </div>

                <div className="text-right">
                  <p
                    className={`text-sm font-semibold ${
                      b.status === "Successful"
                        ? "text-green-600"
                        : b.status === "Pending"
                          ? "text-yellow-600"
                          : "text-red-600"
                    }`}
                  >
                    {b.status}
                  </p>
                  <p className="font-medium">₹{b.amount}</p>
                </div>
              </div>

              {/* EXPANDED DETAILS */}
              {isOpen && (
                <div className="bg-gray-50 px-6 py-4 text-sm grid grid-cols-1 md:grid-cols-2 gap-3">
                  <p>
                    <b>Group:</b> {b.groupName}
                  </p>
                  <p>
                    <b>Guests:</b> {b.guests}
                  </p>
                  <p>
                    <b>Phone:</b> {b.phone}
                  </p>
                  <p>
                    <b>Email:</b> {b.email}
                  </p>
                  <p>
                    <b>Booked On:</b> {b.createdAt}
                  </p>
                  <p>
                    <b>Notes:</b> {b.notes}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
