"use client";

import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { X, CreditCard, CheckCircle2, ClipboardCopy } from "lucide-react";
import { useRouter } from "next/navigation";

/* ============================================================
   TYPES
============================================================ */
interface BookingData {
  name: string;
  phone: string;
  email?: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  nights: number;

  totalAmount: number;
  advanceAmount: number; // ✅ ADD THIS

  bookingRef?: string;
  status?: "PENDING" | "APPROVED" | "PAYMENT_PENDING" | "PAID";
}

interface Props {
  open: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void> | void;
  data: BookingData | null;
  step: number;
  setStep: (val: number) => void;
}

/* ============================================================
   COMPONENT
============================================================ */
export default function BookingConfirmation({
  open,
  onClose,
  onConfirm,
  data,
  step,
  setStep,
}: Props) {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);

  const [loading, setLoading] = useState(false);

  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 min in seconds

  /* ============================================================
     RESPONSIVE DETECTION
  ============================================================ */
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // ======================== auto copy =====================

  useEffect(() => {
    if (step === 2 && data?.bookingRef) {
      // Try auto copy (may fail on some mobiles)
      try {
        navigator.clipboard?.writeText(data.bookingRef);
      } catch (e) {
        // silently fail — fallback button exists
      }
    }
  }, [step, data?.bookingRef]);

  // =================== 30 minutes timmer effect ======================

  useEffect(() => {
    if (step !== 2) return;

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
  }, [step]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  /* ============================================================
     LOCAL STORAGE
  ============================================================ */
  const saveBookingRef = (ref?: string) => {
    if (typeof window !== "undefined" && ref) {
      localStorage.setItem("lastBookingRef", ref);
    }
  };

  /* ============================================================
     FUTURE: STATUS → STEP AUTO MAPPING
  ============================================================ */
  /*
  useEffect(() => {
    if (!data?.status) return;
    switch (data.status) {
      case "PENDING":
        setStep(2);
        break;
      case "APPROVED":
        setStep(3);
        break;
      case "PAID":
        setStep(4);
        break;
    }
  }, [data?.status]);
  */

  /* ============================================================
     FUTURE: POLLING / SOCKET
  ============================================================ */
  /*
  useEffect(() => {
    const interval = setInterval(fetchBookingStatus, 10000);
    return () => clearInterval(interval);
  }, []);
  */

  /* ============================================================
     SHARED CONTENT
  ============================================================ */
  const Content = (
    <div className="p-6">
      {/* STEP 1 — CONFIRM */}
      <Transition
        appear
        show={step === 1 && !!data}
        unmount
        enter="transition-all duration-300 ease-out"
        enterFrom="opacity-0 translate-y-4"
        enterTo="opacity-100 translate-y-0"
        leave="transition-all duration-300 ease-in"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-10"
      >
        <div className="grid md:grid-cols-3 gap-6">
          {/* ===== LEFT : TITLE + INFO ===== */}
          <div className="md:col-span-1 flex flex-col justify-between">
            <div>
              <p className="text-xl font-bold mb-2 text-center md:text-start">
                Confirm Your Booking
              </p>

              <p className="text-sm text-center md:text-start text-gray-600 mb-4">
                Please review your booking details carefully before sending the
                request.
              </p>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-sm text-yellow-800">
                🔒 <b className="uppercase">Note</b>
                <br />
                You will be able to pay only after the owner approves your
                booking request.
              </div>
            </div>

            <button
              onClick={async () => {
                if (!data) return;
                setLoading(true);
                try {
                  await onConfirm();
                  setStep(2);
                } catch (err) {
                  console.error(err);
                  alert("Failed to send request. Try again.");
                } finally {
                  setLoading(false);
                }
              }}
              disabled={loading || !data}
              className={`mt-6 bg-black hover:bg-white hover:text-black hover:shadow-md cursor-pointer transition text-lg md:text-sm text-white py-3 rounded-lg md:rounded-sm font-bold md:font-medium tracking-wide uppercase ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {loading ? "Sending..." : "Confirm & Send Request"}
            </button>
          </div>

          {/* ===== RIGHT : BOOKING DETAILS ===== */}
          <div className="md:col-span-2 border rounded-xl p-5 bg-gray-50">
            <p className="font-bold mb-4 text-lg">Check your details</p>

            <div className="grid grid-cols-2 gap-y-3 text-sm">
              <p className="text-gray-500 font-bold">Guest Name</p>
              <p className="font-medium">{data?.name}</p>

              <p className="text-gray-500 font-bold">Phone</p>
              <p className="font-medium">{data?.phone}</p>

              {data?.email && (
                <>
                  <p className="text-gray-500 font-bold">Email</p>
                  <p className="font-medium">{data?.email}</p>
                </>
              )}

              <p className="text-gray-500 font-bold">Check-in</p>
              <p className="font-medium">{data?.checkIn}</p>

              <p className="text-gray-500 font-bold">Check-out</p>
              <p className="font-medium">{data?.checkOut}</p>

              <p className="text-gray-500 font-bold">Guests</p>
              <p className="font-medium">{data?.guests}</p>

              <p className="text-gray-500 font-bold">Nights</p>
              <p className="font-medium">{data?.nights}</p>
            </div>

            <div className="border-t mt-5 pt-4 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">Total Amount</span>
                <span className="font-bold">
                  ₹{data?.totalAmount?.toLocaleString("en-IN") ?? "--"}
                </span>
              </div>

              <div className="flex justify-between items-center text-green-700">
                <span className="font-medium">Payable Now (20% Advance)</span>
                <span className="text-xl font-bold">
                  ₹{data?.advanceAmount?.toLocaleString("en-IN") ?? "--"}
                </span>
              </div>

              <p className="text-xs text-gray-500">
                Remaining ₹
                {data?.totalAmount != null && data?.advanceAmount != null
                  ? (data.totalAmount - data.advanceAmount).toLocaleString(
                      "en-IN",
                    )
                  : "--"}{" "}
                payable at check-in
              </p>
            </div>

            <p className="mt-3 text-xs text-gray-500">
              ℹ️ After sending the request, you will receive a response from the
              owner within <b>30 minutes</b>. The payment option will be
              unlocked once your booking is approved.
            </p>
          </div>
        </div>
      </Transition>

      {/* STEP 2 — REQUEST SENT */}
      <Transition key="step-2" appear show={step === 2} unmount>
        <Transition.Child
          enter="transition-all duration-300 ease-out delay-400"
          enterFrom="opacity-0 translate-y-4"
          enterTo="opacity-100 translate-y-0"
          leave="transition-all duration-200 ease-in"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-4"
        >
          <div className="text-center pb-4 space-y-5">
            <CheckCircle2 className="w-16 h-16 text-green-600 mx-auto" />

            <p className="text-2xl font-bold">Booking Request Sent</p>

            <p className="text-gray-600 text-sm">
              Your request has been sent to the property owner.
            </p>

            {/* TIMER */}
            <div className="md:flex md:gap-4 md:justify-between">
              <div className="md:w-1/2 bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-yellow-800 text-sm font-medium">
                ⏳ Owner usually responds within <b>30 minutes</b> <br />
                Time remaining: <b>{formatTime(timeLeft)}</b>
              </div>
              <p className="md:w-1/2 hidden md:block text-start text-base font-medium text-blue-800 bg-blue-50 border border-blue-200 rounded-lg px-3 py-2">
                Payment 💳 will be unlocked instantly after the owner approves
                your booking!
              </p>
            </div>

            {/* BOOKING INFO */}

            <div className="">
              <div className="flex justify-center">
                <div className="bg-gray-100 rounded-lg p-4 text-left space-y-2 w-full max-w-md">
                  <p className="text-xs text-gray-500 font-semibold uppercase">
                    Your Booking Details
                  </p>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Booking ID</span>
                    <span className="font-mono font-bold">
                      {data?.bookingRef}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      Mobile Number (password)
                    </span>
                    <span className="font-medium">{data?.phone}</span>
                  </div>

                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(data?.bookingRef || "");
                      saveBookingRef(data?.bookingRef);
                    }}
                    className="w-full mt-2 bg-black text-white py-2 rounded-lg flex items-center justify-center gap-2"
                  >
                    <ClipboardCopy className="w-4 h-4" />
                    Copy Booking ID
                  </button>

                  <p className="text-xs text-gray-500 mt-1">
                    (Booking ID copied automatically if supported)
                  </p>
                </div>
              </div>

              <p className="block md:hidden mt-3 text-start text-base font-medium text-blue-800 bg-blue-50 border border-blue-200 rounded-lg px-3 py-2">
                Payment 💳 will be unlocked instantly after the owner approves
                your booking!
              </p>

              <button
                onClick={() =>
                  window.open(
                    `/check-booking?ref=${data?.bookingRef}`,
                    "_blank",
                  )
                }
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-sm animate-textPulse tracking-wider mt-10 "
              >
                Check Booking Status & PAY ➜
              </button>
            </div>
            {/* ================= What you can do next ======================= */}
            {/* <div className="md:w-1/2 mt-4 md:mt-0 border-l-4 border-blue-500 pl-4 text-sm">
              <p className="font-medium text-gray-900 mb-1">
                What next - Check this!
              </p>
              <p className="text-gray-600 mb-2">
                Your booking request has been sent. You may explore the property
                details while waiting for approval.
              </p>

              <ul className="space-y-1 text-gray-700 text-center">
                <li>• View our luxury amenities</li>
                <li>• View photos and videos of the property</li>
                <li>• Check location and nearby places</li>
              </ul>
              <p className="mt-4 text-xs text-gray-500">
                Thank you for your patience. We’ll take care of the rest.
              </p>
            </div> */}
          </div>
        </Transition.Child>
      </Transition>
    </div>
  );

  /* ============================================================
     MOBILE = BOTTOM SHEET
  ============================================================ */
  if (isMobile) {
    return (
      <Transition appear show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          onClose={() => {
            // ❌ accidental close prevent
            // sirf explicit buttons se close hoga
          }}
        >
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
            <div
              className="fixed inset-0 bg-black/40"
              onClick={onClose} // overlay tap = close
            />
          </Transition.Child>

          {/* Bottom Sheet */}
          <div className="fixed inset-x-0 bottom-0 z-50">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-out duration-300"
              enterFrom="translate-y-full"
              enterTo="translate-y-0"
              leave="transform transition ease-in duration-200"
              leaveFrom="translate-y-0"
              leaveTo="translate-y-full"
            >
              <Dialog.Panel className="bg-white rounded-t-2xl shadow-2xl max-h-[92vh] overflow-y-auto">
                {/* ===== HEADER ===== */}
                <div className="flex items-center justify-between px-4 pb-3 pt-5 border-b sticky top-0 bg-white z-10 shadow-md">
                  {/* BACK BUTTON */}
                  <button
                    onClick={() => {
                      if (step > 1) {
                        setStep(step - 1);
                      } else {
                        onClose();
                      }
                    }}
                    className="text-lg font-bold text-gray-600 hover:text-black"
                  >
                    Back
                  </button>

                  {/* CLOSE */}
                  <button onClick={onClose}>
                    <X className="w-6 h-6 text-gray-600 font-bold" />
                  </button>
                </div>

                {/* ===== CONTENT ===== */}
                <div className="pb-6">{Content}</div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    );
  }

  /* ============================================================
     DESKTOP = DIALOG
  ============================================================ */
  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <div className="fixed inset-0 bg-black/40" />

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-3xl rounded-2xl bg-white shadow-xl overflow-hidden">
            <div className="flex justify-between items-center px-6 py-4 border-b">
              {/* LEFT SIDE */}
              <div className="flex items-center gap-4">
                <button
                  onClick={() => {
                    if (step > 1) {
                      setStep(step - 1); // slide 2 → slide 1
                    } else {
                      onClose(); // slide 1 → close modal
                    }
                  }}
                  className="text-sm font-semibold text-gray-600 hover:text-black transition"
                >
                  ← Back
                </button>
              </div>

              <Dialog.Title className="font-semibold text-lg">
                Booking
              </Dialog.Title>

              {/* RIGHT SIDE */}
              <button onClick={onClose}>
                <X className="w-5 h-5 text-gray-500 hover:text-black transition" />
              </button>
            </div>

            {Content}
          </Dialog.Panel>
        </div>
      </Dialog>
    </Transition>
  );
}
