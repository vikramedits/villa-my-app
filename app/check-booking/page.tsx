"use client";

import { useState, useEffect } from "react";
import { Camera, ClipboardCopy, MapPin, X } from "lucide-react";
import { toast } from "react-hot-toast"; // optional: for toast notification
import {
  User,
  Calendar,
  Users,
  CreditCard,
  CheckCircle2,
  Clock,
} from "lucide-react";
import BookingAction from "@/components/BookingAction";

interface BookingDetails {
  bookingRef: string;
  name: string;
  phone: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  nights: number;
  totalAmount: number;
  advanceAmount: number;
  status: "PENDING" | "APPROVED" | "PAID";
}

export default function CheckBooking() {
  const [ref, setRef] = useState("");
  const [phone, setPhone] = useState("");
  const [bookingDetails, setBookingDetails] = useState<BookingDetails | null>(
    null,
  );
  const [openDetails, setOpenDetails] = useState(false);
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 min countdown

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
      if (!res.ok) {
        if (res.status === 404) alert("No booking found");
        else alert("Server error, try again later");
        return;
      }

      const data = await res.json();

      if (!data?.bookingRef) {
        alert("No booking found");
        return;
      }

      setBookingDetails(data);
      setOpenDetails(true);

      // ⏱️ Start timer only once for PENDING booking
      if (data.status === "PENDING") {
        if (!localStorage.getItem("bookingTimerStart")) {
          localStorage.setItem("bookingTimerStart", Date.now().toString());
        }
      }

      // ✅ Payment done → clear timer
      if (data.status === "PAID") {
        localStorage.removeItem("bookingTimerStart");
      }

      // ✅ Save valid booking
      localStorage.setItem("lastBookingRef", data.bookingRef);
      localStorage.setItem("lastBookingPhone", phone);

      // reset timer
      // Instead of resetting 30 min, calculate remaining time from localStorage
      const savedStart = localStorage.getItem("bookingTimerStart");
      if (savedStart) {
        const elapsed = Math.floor((Date.now() - Number(savedStart)) / 1000); // seconds
        setTimeLeft(Math.max(30 * 60 - elapsed, 0));
      } else {
        setTimeLeft(30 * 60); // fallback for old bookings
      }
    } catch (err) {
      console.error(err);
      alert("Network error, check your connection");
    }
  };

  /* ================= CHECK BUTTON ================= */
  const handleCheck = async () => {
    const trimmedRef = ref.trim();
    const trimmedPhone = phone.trim();

    if (!trimmedRef || !trimmedPhone) {
      alert("Enter both Booking Reference and Phone Number");
      return;
    }

    if (!/^\d{10}$/.test(trimmedPhone)) {
      alert("Enter a valid 10-digit phone number");
      return;
    }

    setLoading(true);

    // ✅ For new booking, start timer from localStorage or fallback 30min
    const savedStart = localStorage.getItem("bookingTimerStart");
    if (savedStart) {
      const elapsed = Math.floor((Date.now() - Number(savedStart)) / 1000);
      setTimeLeft(Math.max(30 * 60 - elapsed, 0));
    } else {
      setTimeLeft(30 * 60);
    }

    setBookingDetails(null);
    setOpenDetails(false);

    try {
      await fetchBooking(trimmedRef, trimmedPhone);
    } finally {
      setLoading(false);
    }
  };

  /* ================= COPY REF ================= */
  const handleCopyRef = () => {
    if (!bookingDetails) return;
    try {
      navigator.clipboard.writeText(bookingDetails.bookingRef);
      toast ? toast.success("Booking ID copied!") : alert("Booking ID copied!");
    } catch {
      alert("Booking ID copied!");
    }
  };

  /* ================= TIMER ================= */
  useEffect(() => {
    if (!bookingDetails || bookingDetails.status !== "PENDING") return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [bookingDetails]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  /* ================= POLLING ================= */
  useEffect(() => {
    if (!bookingDetails) return;
    if (bookingDetails.status === "PAID") return; // payment ho gaya toh band

    const interval = setInterval(() => {
      fetchBooking(bookingDetails.bookingRef, bookingDetails.phone);
    }, 10000);

    return () => clearInterval(interval);
  }, [bookingDetails]);

  /* ================= RENDER ================= */
  return (
    <div className="container-fluid my-5 md:my-10 container mx-auto px-4">
      <p className="text-xl font-bold mb-5 md:mb-8 text-center  text-gray-950 ">
        Check Booking Status
      </p>

      {/* FORM */}
      <div className="space-y-4 max-w-md mx-auto">
        <input
          value={ref}
          onChange={(e) => setRef(e.target.value)}
          placeholder="Booking Reference"
          className="w-full border p-3 rounded-lg"
        />
        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Phone Number"
          className="w-full border p-3 rounded-lg"
        />

        <button
          onClick={handleCheck}
          disabled={loading}
          className={`w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          {loading ? "Checking..." : "Check Status"}
        </button>
      </div>

      {/* Status */}
      <div className="my-5 md:my-10">
        {bookingDetails && (
          <p className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-gray-600" />
            <span className="font-medium">Status:</span>
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
        )}
      </div>

      {/* ===== Booking Action on Main Page ===== */}
      {bookingDetails && (
        <div className="max-w-md mx-auto my-6">
          <BookingAction
            status={bookingDetails.status}
            timeLeft={timeLeft}
            advanceAmount={bookingDetails.advanceAmount}
            bookingRef={bookingDetails.bookingRef}
          />
        </div>
      )}

      {/* ================= What you can do next ======================= */}
      <div className="md:w-1/2 mt-4 md:mt-0 border-l-4 border-blue-500 pl-4 text-sm space-y-3">
        <div className="flex items-center gap-2 mb-2">
          <CheckCircle2 className="w-5 h-5 text-blue-500" />
          <p className="font-semibold text-gray-900 text-base">
            Next Steps for You
          </p>
        </div>

        <p className="text-gray-600">
          Your booking is pending. Meanwhile, here’s what you can do:
        </p>

        <ul className="space-y-2 text-gray-700">
          <li className="flex items-center gap-2">
            <User className="w-4 h-4 text-blue-500" /> View our luxury amenities
          </li>
          <li className="flex items-center gap-2">
            <Camera className="w-4 h-4 text-blue-500" /> Explore photos & videos
            of the property
          </li>
          <li className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-blue-500" /> Check location & nearby
            places
          </li>
        </ul>

        <button className="mt-4 w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-semibold">
          Explore Property
        </button>

        <p className="mt-4 text-xs text-gray-500">
          👍 Sit back and relax. The owner will respond within <b>30 minutes</b>
          .
        </p>
      </div>

      {/* DETAILS MODAL / BOTTOM SHEET */}
      {openDetails && bookingDetails && (
        <div className="fixed inset-0 bg-black/50 flex items-end md:items-center justify-center z-50">
          <div className="bg-white w-full max-w-md rounded-t-2xl md:rounded-2xl p-6 relative">
            {/* HEADER */}
            <div className="flex justify-between mb-4">
              <h3 className="text-lg font-bold">Booking Details</h3>
              <button onClick={() => setOpenDetails(false)}>
                <X />
              </button>
            </div>

            {/* DETAILS */}
            <div className="space-y-3 text-sm">
              {/* Name */}
              <p className="flex items-center gap-2">
                <User className="w-4 h-4 text-gray-600" />
                <span className="font-medium">Name:</span> {bookingDetails.name}
              </p>
              {/* Phone */}
              <p className="flex items-center gap-2">
                <ClipboardCopy className="w-4 h-4 text-gray-600" />
                <span className="font-medium">Phone:</span>{" "}
                {bookingDetails.phone}
              </p>
              {/* Check-in */}
              <p className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-600" />
                <span className="font-medium">Check-in:</span>{" "}
                {bookingDetails.checkIn}
              </p>
              {/* Check-out */}
              <p className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-600" />
                <span className="font-medium">Check-out:</span>{" "}
                {bookingDetails.checkOut}
              </p>
              {/* Guests & Nights */}
              <p className="flex items-center gap-2">
                <Users className="w-4 h-4 text-gray-600" />
                <span className="font-medium">Guests:</span>{" "}
                {bookingDetails.guests} |
                <span className="font-medium">Nights:</span>{" "}
                {bookingDetails.nights}
              </p>
              {/* Total Amount */}
              <p className="flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-gray-600" />
                <span className="font-medium">Total:</span> ₹
                {bookingDetails.totalAmount.toLocaleString("en-IN")}
              </p>
              {/* Status */}
              <p className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-gray-600" />
                <span className="font-medium">Status:</span>
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
              {/* ===== Booking Action (Sheet) ===== */}
              <div className="mt-4">
                <BookingAction
                  status={bookingDetails.status}
                  timeLeft={timeLeft}
                  advanceAmount={bookingDetails.advanceAmount}
                  bookingRef={bookingDetails.bookingRef}
                />
              </div>
            </div>

            {/* COPY REF */}
            <div
              onClick={handleCopyRef}
              className="mt-4 flex justify-center items-center gap-2 bg-gray-100 py-2 rounded-lg cursor-pointer"
            >
              <span className="font-mono">{bookingDetails.bookingRef}</span>
              <ClipboardCopy size={16} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
