"use client";

import { useSearchParams } from "next/navigation";
import Script from "next/script";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function PaymentPage() {
  const params = useSearchParams();

  const advanceAmount = Number(params.get("amount"));
  const totalAmount = Number(params.get("total"));
  const members = params.get("members");
  const name = params.get("name");
  const contact = params.get("contact");

  const handlePayment = async () => {
    const res = await fetch("/api/payment", {
      method: "POST",
      body: JSON.stringify({ amount: advanceAmount }),
    });

    const order = await res.json();

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
      theme: {
        color: "#0B1C2D",
      },
      handler: function (response: any) {
        alert("Payment Successful 🎉");
        console.log(response);
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />

      <section className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-center mb-4">
            Confirm Your Payment
          </h2>

          <div className="space-y-2 text-sm">
            <p>
              <strong>Guests:</strong> {members}
            </p>
            <p>
              <strong>Total Amount:</strong> ₹{totalAmount}
            </p>
            <p className="text-green-700 font-semibold">
              Advance (20%): ₹{advanceAmount}
            </p>
          </div>

          <button
            onClick={handlePayment}
            className="w-full mt-6 bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition"
          >
            Pay ₹{advanceAmount} Now
          </button>

          <p className="text-xs text-gray-500 text-center mt-3">
            Secure payment powered by Razorpay
          </p>
        </div>
      </section>
    </>
  );
}
