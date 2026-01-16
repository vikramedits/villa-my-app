"use client";

import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { X } from "lucide-react";

interface BookingData {
  name: string;
  phone: string;
  email?: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  nights: number;
  totalAmount: number;
}

interface Props {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  data: BookingData | null; // ✅ Allow null to prevent crash
}

export default function BookingConfirmation({
  open,
  onClose,
  onConfirm,
  data,
}: Props) {
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
            <Dialog.Panel
              className="w-full max-w-3xl rounded-2xl bg-white shadow-xl overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b">
                <Dialog.Title className="text-lg font-semibold">
                  Confirm Your Booking
                </Dialog.Title>
                <button onClick={onClose}>
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              {/* Content */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                {/* LEFT / TOP CARD */}
                <div className="rounded-xl border p-4 bg-gray-50">
                  <h3 className="font-semibold mb-3">Booking Summary</h3>

                  {data ? (
                    <ul className="text-sm space-y-2">
                      <li><b>Name:</b> {data.name}</li>
                      <li><b>Phone:</b> {data.phone}</li>
                      {data.email && <li><b>Email:</b> {data.email}</li>}
                      <li><b>Check‑in:</b> {data.checkIn}</li>
                      <li><b>Check‑out:</b> {data.checkOut}</li>
                      <li><b>Guests:</b> {data.guests}</li>
                      <li><b>Nights:</b> {data.nights}</li>
                      <li className="pt-2 text-base font-bold">
                        Total: ₹{data.totalAmount.toLocaleString("en-IN")}/-
                      </li>
                    </ul>
                  ) : (
                    <p className="text-gray-500">Loading booking details...</p>
                  )}
                </div>

                {/* RIGHT / BOTTOM SECTION */}
                <div className="flex flex-col justify-between">
                  <div className="space-y-3 text-sm">
                    <p className="font-medium text-green-700">
                      Status: Pending Approval
                    </p>
                    <p className="text-gray-600">
                      Your booking request will be reviewed by the villa owner.
                      Payment will be enabled after confirmation.
                    </p>
                    <ul className="list-disc pl-5 text-gray-600">
                      <li>No payment required now</li>
                      <li>Approval usually within a few hours</li>
                      <li>You will be notified once approved</li>
                    </ul>
                  </div>

                  <div className="mt-6 flex flex-col gap-3">
                    <button
                      onClick={onConfirm}
                      className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold"
                      disabled={!data} // ✅ Disable confirm if data not ready
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
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
