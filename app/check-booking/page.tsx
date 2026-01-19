"use client";
import { useState, useEffect } from "react";
import { ClipboardCopy, X } from "lucide-react";

export default function CheckBooking() {
  const [ref, setRef] = useState("");
  const [phone, setPhone] = useState("");
  const [bookingDetails, setBookingDetails] = useState<any>(null);
  const [showRefCard, setShowRefCard] = useState(false);
  const [openDetails, setOpenDetails] = useState(false); // bottom sheet open

  // 🔹 Load last booking ref & phone (if saved) and show card & sheet automatically
  useEffect(() => {
    const savedRef = localStorage.getItem("lastBookingRef");
    const savedPhone = localStorage.getItem("lastBookingPhone"); // optional

    if (savedRef) {
      setRef(savedRef);
      if (savedPhone) setPhone(savedPhone);

      // Fetch booking details automatically
      fetch(`/api/bookings/status?ref=${savedRef}&phone=${savedPhone || ""}`)
        .then((res) => res.json())
        .then((data) => {
          if (data?.bookingRef) {
            setBookingDetails(data);
            setShowRefCard(true);
            setOpenDetails(true); // open bottom sheet automatically
          }
        });
    }
  }, []);

  // 🔹 Handle Check Status click
  const handleCheck = async () => {
    if (!ref || !phone) {
      alert("Please enter booking reference and phone number");
      return;
    }

    const res = await fetch(`/api/bookings/status?ref=${ref}&phone=${phone}`);
    const data = await res.json();

    if (data?.bookingRef) {
      setBookingDetails(data);
      setShowRefCard(true);
      setOpenDetails(true); // open bottom sheet
      localStorage.setItem("lastBookingRef", data.bookingRef);
      localStorage.setItem("lastBookingPhone", phone); // save phone for auto-fill next time
    } else {
      setBookingDetails(null);
      setOpenDetails(false);
      alert("No booking found with this reference and phone.");
    }
  };

  // 🔹 Copy reference to clipboard
  const handleCopyRef = () => {
    if (bookingDetails?.bookingRef) {
      navigator.clipboard.writeText(bookingDetails.bookingRef);
      alert("Booking reference copied!");
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-20 p-6 bg-white shadow-lg rounded-2xl">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center md:text-left">
        Check Your Booking Status
      </h2>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Left Side - Form */}
        <div className="flex-1 bg-gray-50 p-6 rounded-xl shadow-inner">
          <input
            type="text"
            placeholder="Booking Reference"
            value={ref}
            onChange={(e) => setRef(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-lg mb-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <input
            type="text"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-lg mb-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />

          <button
            onClick={handleCheck}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-all duration-200"
          >
            Check Status
          </button>

          <div className="border-b border-gray-300 my-4"></div>

          {/* Reference Card Trigger */}
          {bookingDetails?.bookingRef && (
            <div className="text-center">
              <button
                onClick={() => setShowRefCard((prev) => !prev)}
                className="bg-gray-100 hover:bg-gray-200 px-6 py-2 rounded-lg font-semibold transition"
              >
                Your Reference ID
              </button>
            </div>
          )}

          {/* Animated Reference Card */}
          {showRefCard && bookingDetails?.bookingRef && (
            <div className="mt-4 bg-white shadow-lg border border-gray-200 p-4 rounded-lg transition-all duration-300">
              <div
                className="flex items-center justify-center space-x-2 bg-gray-100 px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-200"
                onClick={handleCopyRef}
              >
                <span className="font-mono font-semibold text-gray-800">
                  {bookingDetails.bookingRef}
                </span>
                <ClipboardCopy className="w-5 h-5 text-gray-600" />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Sheet / Booking Details */}
{openDetails && bookingDetails && (
  <div
    className="fixed inset-0 flex items-end md:items-center justify-center z-50 bg-black/50"
  >
    <div
      className={`
        bg-white shadow-xl rounded-2xl p-6 w-full max-w-md
        transform transition-transform duration-300 ease-out
        ${openDetails ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}
      `}
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Booking Details</h3>
        <button
          onClick={() => setOpenDetails(false)}
          className="text-gray-500 hover:text-gray-700"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-2 text-sm">
        <p><span className="font-semibold">Name:</span> {bookingDetails.name || "-"}</p>
        <p><span className="font-semibold">Phone:</span> {bookingDetails.phone || "-"}</p>
        <p><span className="font-semibold">Email:</span> {bookingDetails.email || "-"}</p>
        <p><span className="font-semibold">Check-in:</span> {bookingDetails.checkIn ? new Date(bookingDetails.checkIn).toLocaleDateString("en-IN") : "-"}</p>
        <p><span className="font-semibold">Check-out:</span> {bookingDetails.checkOut ? new Date(bookingDetails.checkOut).toLocaleDateString("en-IN") : "-"}</p>
        <p><span className="font-semibold">Guests:</span> {bookingDetails.guests || "-"}</p>
        <p><span className="font-semibold">Nights:</span> {bookingDetails.nights || "-"}</p>
        <p><span className="font-semibold">Total:</span> ₹{bookingDetails.totalAmount?.toLocaleString("en-IN") || "-"}</p>
        <p>
          <span className="font-semibold">Status:</span>{" "}
          <span className={`${
            bookingDetails.status === "Approved"
              ? "text-green-600"
              : bookingDetails.status === "Cancelled"
                ? "text-red-600"
                : "text-yellow-600"
          }`}>
            {bookingDetails.status || "Pending"}
          </span>
        </p>
      </div>
    </div>
  </div>
)}

    </div>
  );
}
