"use client";

import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { X, CreditCard, CheckCircle2, ClipboardCopy } from "lucide-react";
import { useRouter } from "next/navigation";

const [loading, setLoading] = useState(false);

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

  /* ============================================================
     RESPONSIVE DETECTION
  ============================================================ */
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

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
      {step === 1 && data && (
        <div className="grid md:grid-cols-3 gap-6">
          {/* ===== LEFT : TITLE + INFO ===== */}
          <div className="md:col-span-1 flex flex-col justify-between">
            <div>
              <p className="text-xl font-bold mb-2 text-center">
                Confirm Your Booking
              </p>

              <p className="text-sm text-center text-gray-600 mb-4">
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
              className={`mt-6 bg-black hover:bg-gray-700 transition text-white py-3 rounded-lg font-bold tracking-wide uppercase ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {loading ? "Sending..." : "Confirm & Send Request"}
            </button>
          </div>

          {/* ===== RIGHT : BOOKING DETAILS ===== */}
          <div className="md:col-span-2 border rounded-xl p-5 bg-gray-50">
            <p className="font-bold mb-4 text-lg">Check your details</p>

            <div className="grid grid-cols-2 gap-y-3 text-sm">
              <p className="text-gray-500 font-bold">Guest Name</p>
              <p className="font-medium">{data.name}</p>

              <p className="text-gray-500 font-bold">Phone</p>
              <p className="font-medium">{data.phone}</p>

              {data.email && (
                <>
                  <p className="text-gray-500 font-bold">Email</p>
                  <p className="font-medium">{data.email}</p>
                </>
              )}

              <p className="text-gray-500 font-bold">Check-in</p>
              <p className="font-medium">{data.checkIn}</p>

              <p className="text-gray-500 font-bold">Check-out</p>
              <p className="font-medium">{data.checkOut}</p>

              <p className="text-gray-500 font-bold">Guests</p>
              <p className="font-medium">{data.guests}</p>

              <p className="text-gray-500 font-bold">Nights</p>
              <p className="font-medium">{data.nights}</p>
            </div>

            <div className="border-t mt-5 pt-4 flex justify-between items-center">
              <span className="text-gray-600 font-medium">Total Amount</span>
              <span className="text-xl font-bold">
                ₹{data.totalAmount.toLocaleString("en-IN")}
              </span>
            </div>

            <p className="mt-3 text-xs text-gray-500">
              ℹ️ After sending the request, you will receive a response from the
              owner within <b>30 minutes</b>. The payment option will be
              unlocked once your booking is approved.
            </p>
          </div>
        </div>
      )}

      {/* STEP 2 — REQUEST SENT */}
      {step === 2 && (
        <div className="text-center py-10 space-y-5">
          <CheckCircle2 className="w-16 h-16 text-green-600 mx-auto" />
          <h2 className="text-2xl font-bold">Request Sent</h2>
          <p className="text-gray-600">
            Waiting for owner approval. Payment unlocks after approval.
          </p>

          <div className="flex justify-center items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg">
            <span className="font-mono">{data?.bookingRef}</span>
            <ClipboardCopy
              className="w-4 h-4 cursor-pointer"
              onClick={() => {
                navigator.clipboard.writeText(data?.bookingRef || "");
                saveBookingRef(data?.bookingRef);
              }}
            />
          </div>

          <button
            onClick={() =>
              window.open(`/check-booking?ref=${data?.bookingRef}`, "_blank")
            }
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
          >
            Check Status
          </button>
        </div>
      )}
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
              <Dialog.Title className="font-semibold text-lg">
                Booking
              </Dialog.Title>
              <button onClick={onClose}>
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            {Content}
          </Dialog.Panel>
        </div>
      </Dialog>
    </Transition>
  );
}
