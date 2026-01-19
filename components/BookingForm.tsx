"use client";
import React, { useState, useEffect } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import CheckAvailability from "./AvailabilityCalender";
import BookingConfirmation from "@/components/BookingConfirmation";

export default function VillaBookingFullScreen() {
  const PRICE_PER_PERSON = 1500;

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [adults, setAdults] = useState(1);
  const [kids, setKids] = useState(0);
  const [totalMembers, setTotalMembers] = useState(1);
  const [groupName, setGroupName] = useState("");
  const [contact, setContact] = useState("");
  const [showTooltip, setShowTooltip] = useState(false);
  const [showAvailability, setShowAvailability] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);

  const [openConfirm, setOpenConfirm] = useState(false);
  const [formData, setFormData] = useState<any>(null);
  const [step, setStep] = useState(1);

  useEffect(() => {
    const members = Number(adults) + Number(kids);
    setTotalMembers(members);
    setTotalAmount(members * PRICE_PER_PERSON);
  }, [adults, kids]);

  const handleNext = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = {
      name: groupName,
      phone: contact,
      email: "", // optional, baad me add kar sakte ho
      checkIn,
      checkOut,
      guests: totalMembers,
      nights: 1, // abhi simple, baad me date diff se calculate karenge
      totalAmount,
    };

    setFormData(data); // 👈 form data save
    setOpenConfirm(true); // 👈 confirmation modal open
  };

  return (
    <section className="bg-gray-100">
      {/* ============================================ TOP ============================================ */}
      <div className="text-center py-3 md:py-6">
        <h2 className="texprimaryBlue text-lg md:text-2xl font-medium tracking-wide">
          Book Your Luxury Stay
        </h2>
        <p className="text-sm md:text-base tracking-wide">
          Fill in your details below to reserve your villa with 20% advance
          payment.
        </p>
      </div>
      {/* ======================================== DESKTOP: LEFT 30%, RIGHT 70% & MOBILE: COLOUMN ========================================== */}
      <div className="container-fluid flex flex-col md:flex-row md:gap-3 ">
        {/* ========== LEFT=========== */}
        <div className="md:w-5/12 w-full bg-gray-50 pb-3">
          {/* ========== mobile toggle =========== */}
          <div className="md:hidden mb-4">
            <button
              onClick={() => setShowAvailability(!showAvailability)}
              className="w-full bg-green-900 text-white py-2 rounded-lg font-medium"
            >
              {showAvailability ? "Hide Availability" : "Check Availability"}
            </button>
          </div>

          {/* ========== Show availability only if desktop or toggle is true  =========== */}
          {(showAvailability || window.innerWidth >= 768) && (
            <CheckAvailability />
          )}
        </div>
        {/* ========== RIGHT=========== */}

        <div className="md:w-7/12 w-full bg-white p-3 md:p-6 shadow-xl flex flex-col justify-between rounded-sm rounded-b-3xl border-b-4 border-primaryBlue">
          <p className="text-center mb-3 md:mb-6 text-black text-lg md:text-xl font-bold md:font-medium border-b-2 border-primaryBlue rounded-xl tracking-wide">
            Enter details to confirm{" "}
          </p>
          {/* ========== Top advance info =========== */}
          <div className="bg-yellow-100 text-yellow-900 p-2 md:p-4 rounded-lg text-start font-medium text-sm md:text-lg tracking-wide">
            <p> Pay 20% advance to confirm your luxurious stay</p>
            <p> ₹1500 / per person only</p>
          </div>

          <form onSubmit={handleNext} className="my-3 md:my-6">
            {/* ========== Check-in & Check-out =========== */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label className="block font-medium mb-1 text-primaryBlue">
                  Check-in Date
                </label>
                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="w-full border rounded p-3"
                  required
                />
              </div>
              <div className="flex-1">
                <label className="block font-medium mb-1 text-primaryBlue">
                  Check-out Date
                </label>
                <input
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full border rounded p-3"
                  required
                />
              </div>
            </div>

            {/* ========== Adults & Kids =========== */}
            <div className="flex flex-col md:flex-row gap-4 mt-2 md:mt-4">
              <div className="flex-1">
                <label className="block font-medium mb-1 text-primaryBlue">
                  Adults
                </label>
                <input
                  type="number"
                  min={1}
                  value={adults}
                  onChange={(e) => setAdults(Number(e.target.value))}
                  className="w-full border rounded p-3"
                  required
                />
              </div>
              <div className="flex-1">
                <label className="block font-medium mb-1 text-primaryBlue">
                  Kids
                </label>
                <input
                  type="number"
                  min={0}
                  value={kids}
                  onChange={(e) => setKids(Number(e.target.value))}
                  className="w-full border rounded p-3"
                  required
                />
              </div>
              <div className="flex-1">
                <label className="block font-medium mb-1 text-primaryBlue">
                  Total Members
                </label>
                <input
                  type="number"
                  value={totalMembers}
                  readOnly
                  className="w-full border rounded p-3 bg-gray-100"
                />
              </div>
            </div>

            {/* ========== Group Name & Contact =========== */}
            <div className="flex flex-col md:flex-row gap-4 mt-2 md:mt-4">
              <div className="flex-1">
                <label className="block font-medium mb-1 text-primaryBlue">
                  Guest Group Name
                </label>
                <input
                  type="text"
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                  className="w-full border rounded p-3"
                  placeholder="Ex: Sharma Family"
                  required
                />
              </div>
              <div className="flex-1">
                <label className="block font-medium mb-1 text-primaryBlue">
                  Contact Number
                </label>
                <input
                  type="tel"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  className="w-full border rounded p-3"
                  placeholder="+91 9876543210"
                  required
                />
              </div>
            </div>

            {/* ========== Tooltip trigger =========== */}
            <div className="relative mt-2 md:mt-4">
              <button
                type="button"
                className="flex items-center gap-2 text-blue-600 font-medium"
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
                onClick={() => setShowTooltip(!showTooltip)}
              >
                Check-in / Check-out Info
                <AiOutlineInfoCircle size={24} />
              </button>
              {showTooltip && (
                <div className="absolute z-10 top-10 left-0 p-4 bg-gray-100 border rounded shadow-md text-gray-700 text-sm w-full md:w-80">
                  Check-in time: after 12:00 PM <br />
                  Check-out time: 11:00 AM <br />
                  Flexible check-in/check-out available
                </div>
              )}
            </div>

            <p className="text-sm text-gray-500 mt-2">
              *Please carry ID proof at check-in
            </p>

            {/* ========== Submit button =========== */}
            <button
              type="submit"
              className="w-full flex items-center justify-between
                        bg-green-900 text-white font-semibold
                        py-4 px-6 rounded-lg
                        hover:bg-green-700 transition
                        mt-2 md:mt-4"
            >
              {/* LEFT: Total Amount */}
              <span className="text-lg font-bold">
                ₹{totalAmount.toLocaleString("en-IN")}/-
              </span>

              {/* RIGHT: Reserve Booking */}
              <span className="flex items-center gap-2 text-sm md:text-base">
                RESERVE YOUR BOOKING →
              </span>
            </button>
          </form>
          <BookingConfirmation
            open={openConfirm}
            data={formData}
            step={step}
            setStep={setStep}
            onClose={() => setOpenConfirm(false)}
            onConfirm={async () => {
              if (!formData) return;

              try {
                const res = await fetch("/api/bookings", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(formData),
                });

                const result = await res.json(); // { bookingRef: "BP12AB34" }

                if (result.bookingRef) {
                  // ✅ update formData with bookingRef
                  setFormData({ ...formData, bookingRef: result.bookingRef });
                  setStep(2); // Step 2 modal show hoga
                } else {
                  alert("Booking failed, please try again");
                }
              } catch (err) {
                console.error(err);
                alert("Something went wrong, please try again");
              }
            }}
          />
        </div>
      </div>
    </section>
  );
}
