"use client";

import React, { useEffect, useState } from "react";
import {
  AiOutlineCheck,
  AiOutlineClose,
  AiOutlineClockCircle,
} from "react-icons/ai";

/* ===================== TYPES ===================== */
type BookingStatus = "PENDING" | "APPROVED" | "CANCELLED";

type Booking = {
  _id: string;
  name: string;
  phone: string;
  email?: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  nights: number;
  totalAmount: number;
  bookingRef: string;
  status: BookingStatus;
};
/* ===================== COMPONENT ===================== */
const AcceptBooking = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [activeTab, setActiveTab] = useState<"current" | "previous">("current");
  const [loading, setLoading] = useState(true);
  const [updatingBookingId, setUpdatingBookingId] = useState<string | null>(
    null,
  );
  const [deleteDialog, setDeleteDialog] = useState<{
    _id: string;
    name: string;
  } | null>(null);

  const [confirmAction, setConfirmAction] = useState<{
    _id: string;
    status: BookingStatus;
  } | null>(null);

  /* ===================== FETCH BOOKINGS =====================
     👉 FUTURE API INTEGRATION:
     Replace mockData with:
     fetch("/api/bookings")
       .then(res => res.json())
       .then(data => setBookings(data))
       .catch(err => console.error(err))
  ============================================================ */
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch("/api/bookings");

        if (!res.ok) {
          throw new Error("Failed to fetch bookings");
        }

        const data = await res.json();
        setBookings(data.bookings ?? data);
      } catch (err) {
        console.error(err);
        setBookings([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  /* ===================== UPDATE STATUS =====================
     👉 FUTURE API CALL:
     await fetch(`/api/bookings/${id}`, {
       method: "PATCH",
       headers: { "Content-Type": "application/json" },
       body: JSON.stringify({ status })
     })

/* ===================== UPDATE STATUS ===================== */
  const updateStatus = async (_id: string, status: BookingStatus) => {
    try {
      setUpdatingBookingId(_id); // Disable buttons
      const res = await fetch("/api/bookings/update-status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookingId: _id, status }),
      });
      if (!res.ok) throw new Error("Update failed");
      setBookings((prev) =>
        prev.map((b) => (b._id === _id ? { ...b, status } : b)),
      );
      // TODO: Toast success
    } catch {
      // TODO: Toast error
    } finally {
      setUpdatingBookingId(null);
    }
  };

  /* ===================== FILTER LOGIC ===================== */
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const currentBookings = bookings.filter((b) => {
    const checkOut = new Date(b.checkOut);
    checkOut.setHours(0, 0, 0, 0);
    return checkOut >= today;
  });

  const previousBookings = bookings.filter((b) => {
    const checkOut = new Date(b.checkOut);
    checkOut.setHours(0, 0, 0, 0);
    return checkOut < today;
  });

  const displayedBookings =
    activeTab === "current" ? currentBookings : previousBookings;

  const statusLabel = {
    PENDING: "Pending",
    APPROVED: "Accepted",
    CANCELLED: "Denied",
  };

  /* ===================== UI ===================== */
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="animate-pulse bg-gray-700 h-48 rounded-lg"
          ></div>
        ))}
      </div>
    );
  }

  return (
    <>
      <p className="text-center text-lg md:text-2xl font-semibold text-gray-900 my-2">
        Manage Bookings
      </p>
      <p className="border-b-2 border-gray-700 w-10 mx-auto"></p>
      <section className="px-2 md:px-8 pt-4 md:pt-6">
       {/* ========== Tabs ========== */}
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
        {/* =================== Booking Cards =================== */}
        {displayedBookings.length === 0 ? (
          <p className="text-center text-gray-500">No bookings found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
            {displayedBookings.map((booking) => (
              <div
                key={booking._id}
                className={`relative  bg-gray-950 text-white rounded-lg border-l-4 p-5 
                           ${
                             booking.status === "APPROVED"
                               ? "border-green-500"
                               : booking.status === "CANCELLED"
                                 ? "border-red-500"
                                 : "border-yellow-500"
                           }`}
              >
                {/* ================= 3-dot delete button ================== */}
                <button
                  className="absolute top-2 right-2 cursor-pointer"
                  onClick={() =>
                    setDeleteDialog({ _id: booking._id, name: booking.name })
                  }
                >
                  <svg
                    className="w-6 h-6 text-gray-400 hover:text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <circle cx="5" cy="12" r="2" />
                    <circle cx="12" cy="12" r="2" />
                    <circle cx="19" cy="12" r="2" />
                  </svg>
                </button>

                <p className="text-lg font-semibold mb-2">{booking.name}</p>

                <p className="text-sm text-gray-300">
                  ID: {booking.bookingRef}
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

                {/* ========================== CURRENT bookings ============================= */}
                {activeTab === "current" && (
                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() =>
                        setConfirmAction({
                          _id: booking._id,
                          status: "APPROVED",
                        })
                      }
                      disabled={booking.status === "APPROVED"}
                      className="flex-1 bg-green-500 hover:bg-green-600 py-2 rounded-md disabled:opacity-50 cursor-pointer"
                    >
                      <AiOutlineCheck className="inline mr-1" />
                      Accept
                    </button>

                    <button
                      onClick={() =>
                        setConfirmAction({
                          _id: booking._id,
                          status: "CANCELLED",
                        })
                      }
                      disabled={booking.status === "CANCELLED"}
                      className="flex-1 bg-red-500 hover:bg-red-600 py-2 rounded-md disabled:opacity-50 cursor-pointer"
                    >
                      <AiOutlineClose className="inline mr-1" />
                      Deny
                    </button>

                    <button
                      onClick={() => updateStatus(booking._id, "PENDING")}
                      disabled={booking.status !== "PENDING"}
                      className="flex-1 bg-yellow-500 hover:bg-yellow-600 py-2 rounded-md disabled:opacity-50 cursor-pointer"
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
        {/* ================= Accept confirmation ================= */}
        {confirmAction && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-80">
              <p className="text-gray-800">
                Are you sure you want to{" "}
                <b>{confirmAction.status.toLowerCase()}</b> this booking?
              </p>

              <div className="flex justify-end gap-3 mt-4">
                <button
                  onClick={() => {
                    updateStatus(confirmAction._id, confirmAction.status);
                    setConfirmAction(null);
                  }}
                  className="px-4 py-2 bg-green-600 text-white rounded cursor-pointer"
                >
                  Yes
                </button>
                <button
                  onClick={() => setConfirmAction(null)}
                  className="px-4 py-2 bg-gray-300 rounded cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
        {/* ================= delete confirmation ================= */}
        {deleteDialog && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-96">
              <p className="text-gray-800">
                Are you sure you want to delete booking{" "}
                <b>{deleteDialog.name}</b> permanently?
              </p>

              <div className="flex justify-end gap-3 mt-4">
                <button
                  onClick={() => setDeleteDialog(null)}
                  className="px-4 py-2 bg-gray-300 rounded cursor-pointer" 
                >
                  Cancel
                </button>

                <button
                  onClick={async () => {
                    await fetch("/api/bookings/delete", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ bookingId: deleteDialog._id }),
                    });

                    setBookings((prev) =>
                      prev.filter((b) => b._id !== deleteDialog._id),
                    );

                    setDeleteDialog(null);
                  }}
                  className="px-4 py-2 bg-red-600 text-white rounded cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default AcceptBooking;
