"use client";

import { useSearchParams, useRouter } from "next/navigation";
import Script from "next/script";
import { useState, useEffect } from "react";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function PaymentPage() {
  const params = useSearchParams();
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  // Read params safely
  const advanceAmount = Number(params.get("amount"));
  const totalAmount = Number(params.get("total"));
  const members = params.get("members") || "N/A";
  const name = params.get("name") || "";
  const contact = params.get("contact") || "";

  const handlePayment = async () => {
    if (!advanceAmount || !totalAmount) {
      alert("Invalid payment details");
      return;
    }

    setLoading(true);

    try {
      // 1️⃣ Create Razorpay order via backend
      const res = await fetch("/api/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: advanceAmount }),
      });

      if (!res.ok) throw new Error("Failed to create order");

      const order = await res.json();

      // 2️⃣ Razorpay options
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: "INR",
        name: "The Pushpa Heritage",
        description: "Villa Booking Advance Payment",
        order_id: order.id,
        prefill: {
          name,
          contact,
        },
        theme: { color: "#0B1C2D" },
        handler: function (response: any) {
          // Payment success
          alert("Payment Successful 🎉");
          console.log("Razorpay response:", response);
          router.push(`/booking-success?ref=${params.get("ref")}`);
        },
        modal: {
          ondismiss: function () {
            setLoading(false);
          },
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (err) {
      console.error(err);
      alert("Payment failed. Try again!");
      setLoading(false);
    }
  };

  // Disable button if data missing
  const isDisabled = !advanceAmount || !totalAmount || loading;

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />

      <section className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-center mb-4">
            Confirm Your Payment
          </h2>

          <p className="text-center text-gray-600 mb-4">
            You are paying <b>20% advance</b> for your villa booking.
          </p>

          {/* Booking / Payment Info */}
          <div className="space-y-2 text-gray-700 text-sm">
            <p>
              <strong>Guest(s):</strong> {members}
            </p>
            <p>
              <strong>Total Amount:</strong> ₹{totalAmount.toLocaleString("en-IN")}
            </p>
            <p className="text-green-700 font-semibold">
              Advance (20%): ₹{advanceAmount.toLocaleString("en-IN")}
            </p>
          </div>

          {/* Pay Button */}
          <button
            onClick={handlePayment}
            disabled={isDisabled}
            className={`w-full mt-6 py-3 rounded-lg font-bold text-white ${
              isDisabled
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700 transition"
            }`}
          >
            {loading ? "Processing..." : `Pay ₹${advanceAmount.toLocaleString("en-IN")} Now`}
          </button>

          <p className="text-xs text-gray-500 text-center mt-3">
            Secure payment powered by Razorpay
          </p>

          {/* Optional: Go Back */}
          <button
            onClick={() => router.back()}
            className="w-full mt-3 py-2 rounded-lg font-semibold text-gray-700 border border-gray-300 hover:bg-gray-100 transition"
          >
            Go Back
          </button>
        </div>
      </section>
    </>
  );
}
