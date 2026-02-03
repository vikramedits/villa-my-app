"use client";

import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { X, CreditCard } from "lucide-react";
import { useRouter } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { ClipboardCopy } from "lucide-react";

interface BookingData {
  name: string;
  phone: string;
  email?: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  nights: number;
  totalAmount: number;
  bookingRef?: string;
  status?: "PENDING" | "APPROVED" | "PAYMENT_PENDING" | "PAID";
}

interface Props {
  open: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void> | void;
  data: BookingData | null;
  step: number; // parent step
  setStep: (val: number) => void; // parent step setter
}

export default function BookingConfirmation({
  open,
  onClose,
  onConfirm,
  data,
  step,
  setStep,
}: Props) {
  const router = useRouter();

  // ✅ Helper for safe localStorage usage
  const saveBookingRef = (ref?: string) => {
    if (typeof window !== "undefined" && ref) {
      localStorage.setItem("lastBookingRef", ref);
    }
  };

  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        {/* Overlay */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/40" />
        </Transition.Child>

        {/* Wrapper */}
        <div className="fixed inset-0 flex items-end md:items-center justify-center p-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-6 md:scale-95"
            enterTo="opacity-100 translate-y-0 md:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 md:scale-100"
            leaveTo="opacity-0 translate-y-6 md:scale-95"
          >
            <Dialog.Panel className="w-full max-w-3xl rounded-2xl bg-white shadow-xl overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b">
                <Dialog.Title className="text-lg font-semibold">
                  {step === 1 && "Confirm Your Booking"}
                  {step === 2 && "Request Sent"}
                  {step === 3 && "Booking Approved"}
                  {step === 4 && "Payment Pending"} {/* future */}
                </Dialog.Title>
                <button onClick={onClose}>
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              {/* CONTENT */}
              <div className="p-6">
                {/* 🟢 STEP 1 – REVIEW BOOKING */}
                {step === 1 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="rounded-xl border p-4 bg-gray-50">
                      <h3 className="font-semibold mb-3">Booking Summary</h3>

                      {data ? (
                        <ul className="text-sm space-y-2">
                          <li>
                            <b>Name:</b> {data.name}
                          </li>
                          <li>
                            <b>Phone:</b> {data.phone}
                          </li>
                          {data.email && (
                            <li>
                              <b>Email:</b> {data.email}
                            </li>
                          )}
                          <li>
                            <b>Check-in:</b> {data.checkIn}
                          </li>
                          <li>
                            <b>Check-out:</b> {data.checkOut}
                          </li>
                          <li>
                            <b>Guests:</b> {data.guests}
                          </li>
                          <li>
                            <b>Nights:</b> {data.nights}
                          </li>
                          <li className="pt-2 text-base font-bold">
                            Total: ₹{data.totalAmount.toLocaleString("en-IN")}/-
                          </li>
                        </ul>
                      ) : (
                        <p className="text-gray-500">
                          Loading booking details...
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col justify-between">
                      <div className="space-y-3 text-sm">
                        <p className="font-medium text-green-700">
                          Status: Pending Approval
                        </p>
                        <p className="text-gray-600">
                          Your booking request will be reviewed by the villa
                          owner. Payment will be enabled after confirmation.
                        </p>
                        <ul className="list-disc pl-5 text-gray-600">
                          <li>No payment required now</li>
                          <li>Approval usually within 30 minutes</li>
                          <li>You will be notified once approved</li>
                        </ul>
                      </div>

                      <div className="mt-6 flex flex-col gap-3">
                        <button
                          onClick={async () => {
                            if (!data) return;
                            await onConfirm();
                            setStep(2); // move to Request Sent
                          }}
                          disabled={!data}
                          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold"
                        >
                          Confirm & Send Request
                        </button>
                        <button
                          onClick={onClose}
                          className="w-full border py-3 rounded-lg font-medium"
                        >
                          Edit Details
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* 🟡 STEP 2 – REQUEST SENT */}
                {step === 2 && (
                  <div
                    className="
                                flex flex-col items-center justify-center text-center
                                py-12 space-y-6 max-w-2xl mx-auto
                               transition-all duration-500 ease-out
                                opacity-100 scale-100
                              "
                  >
                    {/* ✅ Animated Success Circle */}
                   {/* ✅ Success Animation */}
<div className="relative w-28 h-28 flex items-center justify-center">
  <svg
    className="absolute w-full h-full"
    viewBox="0 0 100 100"
  >
    {/* Grey background ring */}
    <circle
      cx="50"
      cy="50"
      r="30"
      stroke="#e5e7eb"
      strokeWidth="6"
      fill="none"
    />

    {/* Green animated progress ring */}
    <circle
      cx="50"
      cy="50"
      r="30"
      stroke="#16a34a"
      strokeWidth="6"
      fill="none"
      strokeLinecap="round"
      className="progress-ring"
      transform="rotate(-90 50 50)"
    />
  </svg>

  {/* Tick icon */}
  <CheckCircle2 className="w-12 h-12 text-green-600 tick-animate" />
</div>


                    <h2 className="text-2xl font-bold text-gray-800">
                      Request Sent Successfully!
                    </h2>

                    <p className="text-gray-600 max-w-md">
                      Thank you for your booking request. You can check your
                      booking status anytime below.
                    </p>

                    {/* Reference ID */}
                    <div className="flex items-center justify-center space-x-2 bg-gray-100 px-4 py-2 rounded-lg">
                      <span className="font-mono font-semibold text-gray-800">
                        {data?.bookingRef || "N/A"}
                      </span>
                      <ClipboardCopy
                        className="w-5 h-5 text-gray-600 cursor-pointer hover:text-gray-800"
                        onClick={() => {
                          if (data?.bookingRef) {
                            navigator.clipboard.writeText(data.bookingRef);
                            alert("Booking reference copied!");
                            saveBookingRef(data.bookingRef);
                          }
                        }}
                      />
                    </div>

                    {/* Buttons */}
                    <div className="flex w-full max-w-md gap-2 mt-6">
                      <button
                        onClick={() => setStep(1)}
                        className="w-1/2 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-3 rounded-lg font-semibold transition"
                      >
                        Back
                      </button>

                      <button
                        onClick={() => {
                          window.open(
                            `/check-booking?ref=${data?.bookingRef}`,
                            "_blank",
                          );
                          saveBookingRef(data?.bookingRef);
                        }}
                        className="w-1/2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-semibold transition"
                      >
                        Check Status
                      </button>
                    </div>
                  </div>
                )}

                {/* 🔵 STEP 3 – PAYMENT ENABLED (Future) */}
                {step === 3 && (
                  <div className="flex flex-col items-center justify-center text-center py-12 space-y-4">
                    <CreditCard className="w-16 h-16 text-blue-600" />
                    <h2 className="text-xl font-bold">Booking Approved!</h2>
                    <p className="text-gray-600">
                      Your booking has been approved. You can now proceed to
                      payment.
                    </p>

                    <button
                      onClick={() => router.push("/payment")}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold"
                    >
                      Go to Payment Page
                    </button>
                  </div>
                )}

                {/* 🔵 STEP 4 – PAYMENT PENDING / PAID (future use) */}
                {/* 
                  🔹 Future: show detailed payment status, amount breakdown
                  🔹 Can integrate Razorpay / Stripe
                  🔹 Add backend API call to confirm payment success
                  🔹 Optional: receipt download
                */}
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
