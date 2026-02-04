"use client";

import { useState, useEffect } from "react";
import { ClipboardCopy, X } from "lucide-react";

export default function CheckBooking() {
  const [ref, setRef] = useState("");
  const [phone, setPhone] = useState("");
  const [bookingDetails, setBookingDetails] = useState<any>(null);
  const [openDetails, setOpenDetails] = useState(false);

  /* ================= LOAD LAST BOOKING ================= */
  useEffect(() => {
    const savedRef = localStorage.getItem("lastBookingRef");
    const savedPhone = localStorage.getItem("lastBookingPhone");

    if (savedRef) setRef(savedRef);
    if (savedPhone) setPhone(savedPhone);
  }, []);

  /* ================= FETCH BOOKING ================= */
  const fetchBooking = async (bookingRef: string, phone: string) => {
    try {
      const res = await fetch(
        `/api/bookings/status?ref=${bookingRef}&phone=${phone}`,
      );

      if (!res.ok) throw new Error("Failed");

      const data = await res.json();

      if (!data?.bookingRef) {
        alert("No booking found");
        return;
      }

      setBookingDetails(data);
      setOpenDetails(true);

      // ✅ save only after valid response
      localStorage.setItem("lastBookingRef", data.bookingRef);
      localStorage.setItem("lastBookingPhone", phone);
    } catch {
      alert("Something went wrong");
    }
  };

  /* ================= CHECK BUTTON ================= */
  const handleCheck = () => {
    if (!ref || !phone) {
      alert("Enter booking reference and phone");
      return;
    }

    // 🔥 clear old data first
    setBookingDetails(null);
    setOpenDetails(false);

    // ✅ remove previous bookingRef for same phone
    const savedPhone = localStorage.getItem("lastBookingPhone");
    if (savedPhone === phone) {
      localStorage.removeItem("lastBookingRef");
      localStorage.removeItem("lastBookingPhone");
    }

    fetchBooking(ref, phone);
  };

  /* ================= COPY REF ================= */
  const handleCopyRef = () => {
    navigator.clipboard.writeText(bookingDetails.bookingRef);
    alert("Reference copied");
  };

  return (
    <div className="max-w-3xl mx-auto mt-20 p-6 bg-white rounded-2xl shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Check Booking Status
      </h2>

      {/* FORM */}
      <div className="space-y-4">
        <input
          value={ref}
          onChange={(e) => {
            setRef(e.target.value);
            // agar user phone same hai, purani ref hata do
            if (phone && localStorage.getItem("lastBookingPhone") === phone) {
              localStorage.removeItem("lastBookingRef");
            }
          }}
          placeholder="Booking Reference"
          className="w-full border p-3 rounded-lg"
        />

        <input
          value={phone}
          onChange={(e) => {
            setPhone(e.target.value);
            // purani bookingRef remove if phone change matches
            if (localStorage.getItem("lastBookingPhone") === e.target.value) {
              localStorage.removeItem("lastBookingRef");
              localStorage.removeItem("lastBookingPhone");
            }
          }}
          placeholder="Phone Number"
          className="w-full border p-3 rounded-lg"
        />

        <button
          onClick={handleCheck}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
        >
          Check Status
        </button>
      </div>

      {/* BOTTOM SHEET */}
      {openDetails && bookingDetails && (
        <div className="fixed inset-0 bg-black/50 flex items-end md:items-center justify-center z-50">
          <div className="bg-white w-full max-w-md rounded-t-2xl md:rounded-2xl p-6">
            {/* HEADER */}
            <div className="flex justify-between mb-4">
              <h3 className="text-lg font-bold">Booking Details</h3>
              <button onClick={() => setOpenDetails(false)}>
                <X />
              </button>
            </div>

            {/* DETAILS */}
            <div className="space-y-2 text-sm">
              <p>
                <b>Name:</b> {bookingDetails.name}
              </p>
              <p>
                <b>Phone:</b> {bookingDetails.phone}
              </p>
              <p>
                <b>Check-in:</b> {bookingDetails.checkIn}
              </p>
              <p>
                <b>Check-out:</b> {bookingDetails.checkOut}
              </p>
              <p>
                <b>Guests:</b> {bookingDetails.guests}
              </p>
              <p>
                <b>Nights:</b> {bookingDetails.nights}
              </p>
              <p>
                <b>Total:</b> ₹
                {bookingDetails.totalAmount.toLocaleString("en-IN")}
              </p>

              <p>
                <b>Status:</b>{" "}
                <span
                  className={`font-bold ${
                    bookingDetails.status === "APPROVED"
                      ? "text-green-600"
                      : bookingDetails.status === "PAID"
                        ? "text-green-700"
                        : "text-yellow-600"
                  }`}
                >
                  {bookingDetails.status}
                </span>
              </p>
            </div>

            {/* COPY REF */}
            <div
              onClick={handleCopyRef}
              className="mt-4 flex justify-center items-center gap-2 bg-gray-100 py-2 rounded-lg cursor-pointer"
            >
              <span className="font-mono">{bookingDetails.bookingRef}</span>
              <ClipboardCopy size={16} />
            </div>

            {/* 🔓 PAYMENT BUTTON */}
            {bookingDetails.status === "APPROVED" && (
              <button
                onClick={() =>
                  (window.location.href = `/payment?ref=${bookingDetails.bookingRef}`)
                }
                className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-bold"
              >
                Pay Now
              </button>
            )}

            {/* ✅ PAID MESSAGE */}
            {bookingDetails.status === "PAID" && (
              <p className="mt-4 text-center text-green-700 font-semibold">
                🎉 Payment Completed
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
