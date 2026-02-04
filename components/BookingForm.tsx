"use client";
import React, { useState, useEffect } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import CheckAvailability from "./AvailabilityCalender";
import BookingConfirmation from "@/components/BookingConfirmation";

export default function VillaBookingFullScreen() {
  const PRICE_PER_PERSON = 1500;
  const ADVANCE_PERCENT = 0.2; // 20%

  /* ===================== STATES ===================== */
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
  const [loading, setLoading] = useState(false);

  const [advanceAmount, setAdvanceAmount] = useState(0);

  const today = new Date().toISOString().split("T")[0];

  /* ===================== RESPONSIVE SAFE ===================== */
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /* ===================== HELPERS ===================== */
  const calcNights = (checkIn: string, checkOut: string) => {
    if (!checkIn || !checkOut) return 1;
    const inDate = new Date(checkIn);
    const outDate = new Date(checkOut);
    const diff = outDate.getTime() - inDate.getTime();
    return Math.max(Math.ceil(diff / (1000 * 60 * 60 * 24)), 1);
  };

  /* ===================== PRICE LOGIC ===================== */
  useEffect(() => {
    const members = Math.max(1, Number(adults) + Number(kids));

    const nights = calcNights(checkIn, checkOut);

    const total = members * nights * PRICE_PER_PERSON;
    const advance = Math.round(total * ADVANCE_PERCENT);

    setTotalMembers(members);
    setTotalAmount(total);
    setAdvanceAmount(advance);
  }, [adults, kids, checkIn, checkOut]);

  /* ===================== SUBMIT ===================== */
  const handleNext = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // ❌ invalid mobile number safety
    if (!/^[6-9]\d{9}$/.test(contact)) {
      alert("Please enter a valid 10-digit Indian mobile number");
      return;
    }

    // ❌ invalid date safety
    if (new Date(checkOut) <= new Date(checkIn)) {
      alert("Check-out date must be after check-in");
      return;
    }

    // Extra safety checks
if (totalMembers < 1) {
  alert("At least 1 guest required");
  return;
}

if (advanceAmount <= 0) {
  alert("Advance amount must be greater than 0");
  return;
}


    const nights = calcNights(checkIn, checkOut);

    const data = {
      name: groupName,
      phone: contact,
      checkIn,
      checkOut,
      guests: totalMembers,
      nights,

      pricePerPerson: PRICE_PER_PERSON,
      totalAmount,
      advanceAmount,
      advancePercent: 20,

      /*
        ⚠️ IMPORTANT:
        Backend must re-calculate:
        nights & totalAmount
        Never trust client amount
      */
    };

    setFormData(data);
    setOpenConfirm(true);
  };

  return (
    <section className="bg-gray-100" id="booking-section">
      {/* ============================================ TOP ============================================ */}
      <div className="text-center py-3 md:py-6">
        <h2 className="text-primaryBlue text-lg md:text-2xl font-medium tracking-wide">
          Book Your Luxury Stay
        </h2>
        <p className="text-sm md:text-base tracking-wide">
          Fill in your details below to reserve your villa with 20% advance
          payment.
        </p>
      </div>

      <div className="container-fluid flex flex-col md:flex-row md:gap-3 ">
        {/* ========== LEFT=========== */}
        <div className="md:w-5/12 w-full bg-gray-50 pb-3">
          <div className="md:hidden mb-4">
            <button
              onClick={() => setShowAvailability(!showAvailability)}
              className="w-full bg-green-800 text-white py-2 rounded-lg font-medium"
            >
              {showAvailability ? "Hide Availability" : "Check Availability"}
            </button>
          </div>

          {(showAvailability || isDesktop) && <CheckAvailability />}
        </div>

        {/* ========== RIGHT=========== */}
        <div className="md:w-7/12 w-full bg-white p-3 md:p-6 shadow-xl flex flex-col justify-between rounded-sm rounded-b-3xl border-b-4 border-primaryBlue">
          <p className="text-center mb-3 md:mb-6 text-black text-lg md:text-xl font-bold md:font-medium border-b-2 border-primaryBlue rounded-xl tracking-wide">
            Enter details to confirm{" "}
          </p>

          <div className="bg-yellow-100 text-yellow-900 p-2 md:p-4 rounded-lg text-start font-medium text-sm md:text-lg tracking-wide">
            <p> Pay 20% advance to confirm your luxurious stay</p>
            <p> ₹1500 / per person only</p>
          </div>

          <form onSubmit={handleNext} className="my-3 md:my-6">
            {/* Dates */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label className="block font-medium mb-1 text-primaryBlue">
                  Check-in Date
                </label>
                <input
                  type="date"
                  value={checkIn}
                  min={today}
                  onChange={(e) => {
                    setCheckIn(e.target.value);
                    setCheckOut("");
                  }}
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
                  min={checkIn || today}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full border rounded p-3"
                  required
                />
              </div>
            </div>

            {/* Members */}
            <div className="flex flex-col md:flex-row gap-4 mt-2 md:mt-4">
              <div className="flex-1">
                <label className="block font-medium mb-1 text-primaryBlue">
                  Adults
                </label>
                <input
                  type="number"
                  min={1}
                  value={adults}
                  onChange={(e) =>
                    setAdults(Math.max(1, Number(e.target.value)))
                  }
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
                  onChange={(e) => setKids(Math.max(0, Number(e.target.value)))}
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

            {/* Group + Contact */}
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
                  inputMode="numeric"
                  pattern="[0-9]{10}"
                  maxLength={10}
                  value={contact}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, ""); // remove non-numbers
                    if (value.length <= 10) {
                      setContact(value);
                    }
                  }}
                  className="w-full border rounded p-3"
                  placeholder="WhatsApp number"
                  required
                />
              </div>
            </div>
            {/* ================= Payable Amount Summary ================= */}
            <div className="mt-3 md:mt-4 bg-gray-50 border rounded-lg p-3 md:p-4">
              <p className="text-xs md:text-sm text-gray-500 mb-1">
                {calcNights(checkIn, checkOut)} night stay
              </p>

              <div className="flex justify-between text-lg md:text-base text-gray-900 font-bold">
                <span>Total Stay Amount</span>
                <span>₹{totalAmount.toLocaleString("en-IN")}</span>
              </div>

              <div className="flex justify-between items-center text-sm md:text-base text-green-700 mt-1">
                <span>Advance (20%)</span>
                <span className="flex items-center gap-2 font-bold">
                  ₹{advanceAmount.toLocaleString("en-IN")}
                  {advanceAmount < totalAmount && (
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                      Pay Now
                    </span>
                  )}
                </span>
              </div>

              <p className="text-xs md:text-sm text-gray-500 mt-1">
                ₹{(totalAmount - advanceAmount).toLocaleString("en-IN")} payable
                at check-in
              </p>
            </div>

            {/* Tooltip */}
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

            {/* Submit */}
            <button
              type="submit"
              disabled={loading || !checkIn || !checkOut || advanceAmount <= 0}
              className="w-full flex items-center justify-between
                        bg-black text-white font-semibold
                        py-4 px-6 rounded-lg
                        hover:bg-gray-700 transition
                        mt-2 md:mt-4 "
            >
              <span className="text-lg font-bold animate-textPulse ">
                ₹{advanceAmount.toLocaleString("en-IN")}/-
              </span>

              <span className="flex items-center gap-2 text-sm md:text-base">
                {loading ? "Processing..." : "PAY 20% ADVANCE →"}
              </span>
            </button>
          </form>

          <BookingConfirmation
            open={openConfirm}
            data={formData}
            step={step}
            setStep={setStep}
            onClose={() => {
              setOpenConfirm(false);
              setStep(1);
              setFormData(null);
            }}
            onConfirm={async () => {
              if (loading || !formData) return; // 👈 YEH LINE ADD KARI

              setLoading(true);

              try {
                /*
      🔐 API /api/bookings
      Backend MUST:
      - Recalculate nights
      - Recalculate total price
      - Prevent duplicate booking
      - Return bookingRef
    */
                const res = await fetch("/api/bookings", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(formData),
                });

                if (!res.ok) throw new Error("Server error");
                const result = await res.json();

                if (result.bookingRef) {
                  setFormData({ ...formData, bookingRef: result.bookingRef });
                  setStep(2);
                } else {
                  alert("Booking failed, try again");
                }
              } catch (err) {
                console.error(err);
                alert("Something went wrong");
              } finally {
                setLoading(false);
              }
            }}
          />
        </div>
      </div>
    </section>
  );
}
