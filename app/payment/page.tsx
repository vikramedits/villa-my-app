"use client";

import { useSearchParams, useRouter } from "next/navigation";
import Script from "next/script";
import { useEffect, useState } from "react";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function PaymentPage() {
  const params = useSearchParams();
  const router = useRouter();

  const [booking, setBooking] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true); // 👈 important
  const [error, setError] = useState<string | null>(null);

  /* ================= FETCH BOOKING SAFELY ================= */
  useEffect(() => {
    const ref = params.get("ref");

    // ⛔ params not ready yet
    if (ref === null) return;

    // ⛔ missing ref
    if (!ref) {
      setError("Invalid payment link");
      setFetching(false);
      return;
    }

    const fetchBooking = async () => {
      try {
        const res = await fetch(`/api/bookings/by-ref?ref=${ref}`);

        if (!res.ok) {
          throw new Error("Booking not found");
        }

        const data = await res.json();
        setBooking(data);
      } catch (err) {
        console.error(err);
        setError("Booking not found or expired");
      } finally {
        setFetching(false);
      }
    };

    fetchBooking();
  }, [params]);

  /* ================= HANDLE PAYMENT ================= */
  const handlePayment = async () => {
    if (!booking) return;

    setLoading(true);

    try {
      // 1️⃣ Create Razorpay order
      const res = await fetch("/api/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bookingRef: booking.bookingRef,
          amount: booking.advanceAmount,
        }),
      });

      if (!res.ok) throw new Error("Order creation failed");

      const order = await res.json();

      // 2️⃣ Razorpay Checkout
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: "INR",
        name: "The Pushpa Heritage",
        description: "Villa Booking Advance Payment",
        order_id: order.id,
        prefill: {
          name: booking.name,
          contact: booking.phone,
        },
        theme: { color: "#0B1C2D" },

        handler: async function (response: any) {
          // 3️⃣ Mark booking as PAID
          await fetch("/api/bookings/mark-paid", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              bookingRef: booking.bookingRef,
              paymentId: response.razorpay_payment_id,
            }),
          });

          router.replace(`/booking-success?ref=${booking.bookingRef}`);
        },

        modal: {
          ondismiss: () => setLoading(false),
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (err) {
      console.error(err);
      alert("Payment failed. Please try again.");
      setLoading(false);
    }
  };

  /* ================= LOADING STATE ================= */
  if (fetching) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600 font-medium">
          Loading booking details…
        </p>
      </div>
    );
  }

  /* ================= ERROR STATE ================= */
  if (error || !booking) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-red-600 font-semibold">
          {error ?? "Something went wrong"}
        </p>
        <button
          onClick={() => router.replace("/")}
          className="px-4 py-2 rounded-lg bg-blue-600 text-white"
        >
          Go Home
        </button>
      </div>
    );
  }

  /* ================= UI ================= */
  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />

      <section className=" container-fluid flex items-center justify-center bg-gray-100 p-4">
        <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6">
          <p className="text-2xl font-bold text-center mb-4">
            Confirm Your Payment
          </p>

          <p className="text-center text-gray-600 mb-4">
            Pay <b>30% advance</b> to confirm your booking
          </p>

          {/* BOOKING DETAILS */}
          <div className="space-y-2 text-sm text-gray-700">
            <p>
              <strong>Name:</strong> {booking.name}
            </p>
            <p>
              <strong>Guests:</strong> {booking.guests}
            </p>
            <p>
              <strong>Total Amount:</strong>{" "}
              ₹{booking.totalAmount?.toLocaleString("en-IN") ?? "0"}
            </p>
            <p className="text-green-700 font-semibold">
              Advance Payable: ₹
              {booking.advanceAmount?.toLocaleString("en-IN") ?? "0"}
            </p>
          </div>

          {/* PAY BUTTON */}
          <button
            onClick={handlePayment}
            disabled={loading}
            className={`w-full mt-6 py-3 rounded-lg font-bold text-white ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {loading
              ? "Processing..."
              : `Pay ₹${booking.advanceAmount?.toLocaleString("en-IN")} Now`}
          </button>

          <p className="text-xs text-gray-500 text-center mt-3">
            🔒 Secure payment powered by Razorpay
          </p>

          <button
            onClick={() => router.back()}
            className="w-full mt-3 py-2 rounded-lg border text-gray-700 hover:bg-gray-100"
          >
            Go Back
          </button>
        </div>
      </section>
    </>
  );
}
