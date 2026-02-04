"use client";

import React, { useEffect, useState } from "react";
import {
  AiOutlineCheck,
  AiOutlineClose,
  AiOutlineClockCircle,
} from "react-icons/ai";

/* ===================== TYPES ===================== */
type BookingStatus = "PENDING" | "APPROVED" | "DENIED";

type Booking = {
  id: string;
  name: string;
  phone: string;
  email?: string;
  checkIn: string; // ISO date string
  checkOut: string; // ISO date string
  guests: number;
  nights: number;
  totalAmount: number;
  bookingRef?: string;
  status: BookingStatus;
};

/* ===================== COMPONENT ===================== */
const AcceptBooking = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [activeTab, setActiveTab] = useState<"current" | "previous">("current");
  const [loading, setLoading] = useState(true);

  /* ===================== FETCH BOOKINGS =====================
     👉 FUTURE API INTEGRATION:
     Replace mockData with:
     fetch("/api/bookings")
       .then(res => res.json())
       .then(data => setBookings(data))
       .catch(err => console.error(err))
  ============================================================ */
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
        status: "PENDING",
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
        status: "APPROVED",
      },
    ];

    setBookings(mockData);
    setLoading(false);
  }, []);

  /* ===================== UPDATE STATUS =====================
     👉 FUTURE API CALL:
     await fetch(`/api/bookings/${id}`, {
       method: "PATCH",
       headers: { "Content-Type": "application/json" },
       body: JSON.stringify({ status })
     })

/* ===================== UPDATE STATUS ===================== */
  const updateStatus = async (id: string, status: BookingStatus) => {
    try {
      await fetch("/api/bookings/update-status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookingId: id, status }),
      });

      setBookings((prev) =>
        prev.map((b) => (b.id === id ? { ...b, status } : b)),
      );
    } catch {
      alert("Failed to update booking");
    }
  };

  /* ===================== FILTER LOGIC ===================== */
  const today = new Date();

  const currentBookings = bookings.filter((b) => new Date(b.checkOut) >= today);

  const previousBookings = bookings.filter((b) => new Date(b.checkOut) < today);

  const displayedBookings =
    activeTab === "current" ? currentBookings : previousBookings;

  const statusLabel: Record<BookingStatus, string> = {
    PENDING: "Pending",
    APPROVED: "Accepted",
    DENIED: "Denied",
  };

  /* ===================== UI ===================== */
  if (loading) {
    return <p className="text-center text-gray-500">Loading bookings...</p>;
  }

  return (
    <>
      {/* Title */}
      <p className="text-center text-lg md:text-2xl font-semibold text-gray-900 my-2">
        Manage Bookings
      </p>
      <p className="border-b-2 border-gray-700 w-10 mx-auto"></p>
      <section className="px-2 md:px-8 pt-4 md:pt-6">
        {/* Tabs */}
        <div className="flex justify-center mb-6 gap-4">
          {["current", "previous"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-5 py-2 rounded-full transition ${
                activeTab === tab
                  ? "bg-gray-900 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              {tab === "current" ? "Current" : "Previous"}
            </button>
          ))}
        </div>

        {/* Booking Cards */}
        {displayedBookings.length === 0 ? (
          <p className="text-center text-gray-500">No bookings found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {displayedBookings.map((booking) => (
              <div
                key={booking.id}
                className={`bg-gray-950 text-white rounded-lg border-l-4 p-5
                ${
                  booking.status === "APPROVED"
                    ? "border-green-500"
                    : booking.status === "DENIED"
                      ? "border-red-500"
                      : "border-yellow-500"
                }`}
              >
                <p className="text-lg font-semibold mb-2">{booking.name}</p>

                <p className="text-sm text-gray-300">
                  Ref: {booking.bookingRef}
                </p>
                <p className="text-sm text-gray-300">Phone: {booking.phone}</p>
                <p className="text-sm text-gray-300">
                  Check-in: {booking.checkIn}
                </p>
                <p className="text-sm text-gray-300">
                  Check-out: {booking.checkOut}
                </p>

                <p className="mt-2 font-medium">
                  Total: ₹{booking.totalAmount.toLocaleString("en-IN")}
                </p>

                <p className="mt-2 font-semibold">
                  Status: {statusLabel[booking.status]}
                </p>

                {/* Actions only for CURRENT bookings */}
                {activeTab === "current" && (
                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => updateStatus(booking.id, "APPROVED")}
                      disabled={booking.status === "APPROVED"}
                      className="flex-1 bg-green-500 hover:bg-green-600 py-2 rounded-md disabled:opacity-50"
                    >
                      <AiOutlineCheck className="inline mr-1" />
                      Accept
                    </button>

                    <button
                      onClick={() => updateStatus(booking.id, "DENIED")}
                      disabled={booking.status === "DENIED"}
                      className="flex-1 bg-red-500 hover:bg-red-600 py-2 rounded-md disabled:opacity-50"
                    >
                      <AiOutlineClose className="inline mr-1" />
                      Deny
                    </button>

                    <button
                      onClick={() => updateStatus(booking.id, "PENDING")}
                      disabled={booking.status === "PENDING"}
                      className="flex-1 bg-yellow-500 hover:bg-yellow-600 py-2 rounded-md disabled:opacity-50"
                    >
                      <AiOutlineClockCircle className="inline mr-1" />
                      Wait
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
};

export default AcceptBooking;
