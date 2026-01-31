"use client";

import React, { useEffect, useState } from "react";
import {
  AiOutlineCheck,
  AiOutlineClose,
  AiOutlineClockCircle,
} from "react-icons/ai";

type Booking = {
  id: string;
  name: string;
  phone: string;
  email?: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  nights: number;
  totalAmount: number;
  bookingRef?: string;
  status: "waiting" | "accepted" | "denied";
};

const AcceptBooking = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [activeTab, setActiveTab] = useState<"current" | "previous">("current");

  useEffect(() => {
    const mockData: Booking[] = [
      {
        id: "1",
        name: "Sharma Family",
        phone: "+91 9876543210",
        email: "sharma@example.com",
        checkIn: "2026-02-10",
        checkOut: "2026-02-12",
        guests: 4,
        nights: 2,
        totalAmount: 6000,
        bookingRef: "BP12AB34",
        status: "waiting",
      },
      {
        id: "2",
        name: "Verma Group",
        phone: "+91 9123456780",
        email: "verma@example.com",
        checkIn: "2026-01-20",
        checkOut: "2026-01-22",
        guests: 6,
        nights: 2,
        totalAmount: 9000,
        bookingRef: "BP56CD78",
        status: "accepted",
      },
    ];
    setBookings(mockData);
  }, []);

  const updateStatus = (id: string, status: Booking["status"]) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status } : b))
    );
  };

  // Filter bookings based on tab
  const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
  const currentBookings = bookings.filter((b) => b.checkOut >= today);
  const previousBookings = bookings.filter((b) => b.checkOut < today);

  const displayedBookings =
    activeTab === "current" ? currentBookings : previousBookings;

  return (
    <section className="pt-4 md:pt-6">
      {/* Title */}
      <p className="mt-0 mb-3 md:mb-5 text-center text-xl md:text-2xl tracking-wider uppercase text-gray-900 shadow-md pb-2 md:pb-3 font-bold md:font-medium rounded-2xl leading-tight">
        Manage Bookings
      </p>

      {/* Tabs */}
      <div className="flex justify-center mb-4 md:mb-6 gap-4">
        <button
          onClick={() => setActiveTab("current")}
          className={`px-5 py-2 rounded-full font-medium transition ${
            activeTab === "current"
              ? "bg-gray-900 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
        >
          Current
        </button>
        <button
          onClick={() => setActiveTab("previous")}
          className={`px-5 py-2 rounded-full font-medium transition ${
            activeTab === "previous"
              ? "bg-gray-900 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
        >
          Previous
        </button>
      </div>

      {/* Booking list */}
      {displayedBookings.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">No bookings available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {displayedBookings.map((booking) => (
            <div
              key={booking.id}
              className={`bg-gray-950 rounded-lg shadow-md border-l-4 p-5 flex flex-col justify-between
                ${
                  booking.status === "accepted"
                    ? "border-green-500"
                    : booking.status === "denied"
                    ? "border-red-500"
                    : "border-yellow-500"
                }`}
            >
              <div>
                <p className="text-xl font-semibold mb-2 uppercase">{booking.name}</p>
                {booking.bookingRef && (
                  <p className="text-sm text-gray-300 mb-1">Booking Ref: {booking.bookingRef}</p>
                )}
                {booking.email && (
                  <p className="text-sm text-gray-300 mb-1">Email: {booking.email}</p>
                )}
                <p className="text-sm text-gray-300 mb-1">Phone: {booking.phone}</p>
                <p className="text-sm text-gray-300 mb-1">Check-in: {booking.checkIn}</p>
                <p className="text-sm text-gray-300 mb-1">Check-out: {booking.checkOut}</p>
                <p className="text-sm text-gray-300 mb-1">Guests: {booking.guests}</p>
                <p className="text-sm text-gray-300 mb-1">Nights: {booking.nights}</p>
                <p className="text-sm text-gray-300 mb-3 font-medium">
                  Total: ₹{booking.totalAmount.toLocaleString("en-IN")}
                </p>

                <p
                  className={`font-semibold mb-3 ${
                    booking.status === "accepted"
                      ? "text-green-600"
                      : booking.status === "denied"
                      ? "text-red-600"
                      : "text-yellow-600"
                  }`}
                >
                  Status: {booking.status.toUpperCase()}
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => updateStatus(booking.id, "accepted")}
                  className="flex-1 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white py-2 rounded-md transition"
                >
                  <AiOutlineCheck size={20} /> Accept
                </button>
                <button
                  onClick={() => updateStatus(booking.id, "denied")}
                  className="flex-1 flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white py-2 rounded-md transition"
                >
                  <AiOutlineClose size={20} /> Deny
                </button>
                <button
                  onClick={() => updateStatus(booking.id, "waiting")}
                  className="flex-1 flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-white py-2 rounded-md transition"
                >
                  <AiOutlineClockCircle size={20} /> Wait
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default AcceptBooking;
