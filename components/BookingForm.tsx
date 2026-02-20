"use client";
import React, { useState, useEffect, useMemo } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import CheckAvailability from "./AvailabilityCalender";
import BookingConfirmation from "@/components/BookingConfirmation";

export default function VillaBookingFullScreen() {
  /* ===================== STATES ===================== */
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [adults, setAdults] = useState<number>(1);
  const [adultsInput, setAdultsInput] = useState<string>("1");

  const [kids, setKids] = useState<number>(0);
  const [kidsInput, setKidsInput] = useState<string>("0");

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

  const [pricing, setPricing] = useState<any>(null);

  const [advanceAmount, setAdvanceAmount] = useState(0);

  const today = new Date().toISOString().split("T")[0];

  const [apiError, setApiError] = useState("");

  // ===========================================================

  const PRICE_PER_PERSON = pricing?.pricePerPerson ?? 0;
  const ADVANCE_PERCENT = (pricing?.advancePercent ?? 0) / 100;

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

    const inDate = new Date(checkIn + "T00:00:00");
    const outDate = new Date(checkOut + "T00:00:00");

    const diff = outDate.getTime() - inDate.getTime();
    return Math.max(Math.ceil(diff / (1000 * 60 * 60 * 24)), 1);
  };

  /* ===================== PRICE LOGIC ===================== */
  const priceSummary = useMemo(() => {
    const members = Math.max(1, adults + kids);
    const nights = calcNights(checkIn, checkOut);

    const total = members * nights * PRICE_PER_PERSON;
    const advance = Math.round(total * ADVANCE_PERCENT);

    return { members, nights, total, advance };
  }, [adults, kids, checkIn, checkOut, PRICE_PER_PERSON, ADVANCE_PERCENT]);

  useEffect(() => {
    setTotalMembers(priceSummary.members);
    setTotalAmount(priceSummary.total);
    setAdvanceAmount(priceSummary.advance);
  }, [priceSummary]);

  /* ===================== SUBMIT ===================== */
  const handleNext = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // ❌ invalid mobile number safety
    setApiError("");

    if (!/^[6-9]\d{9}$/.test(contact)) {
      setApiError("Please enter a valid 10-digit Indian mobile number");
      return;
    }

    // ❌ invalid date safety
    if (new Date(checkOut + "T00:00:00") <= new Date(checkIn + "T00:00:00")) {
      setApiError("Check-out date must be after check-in");
      return;
    }

    // Extra safety checks
    if (totalMembers < 1) {
      setApiError("At least 1 guest is required");
      return;
    }

    if (advanceAmount <= 0) {
      setApiError("Invalid advance amount");
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
  // ==================== Pricing fetch ==================
  useEffect(() => {
    setApiError("");

    fetch("/api/config/pricing")
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then(setPricing)
      .catch(() => {
        setApiError("Unable to load pricing. Please refresh the page.");
      });
  }, []);

  // ================= Max guest fetch =========
  const MAX_GUESTS = pricing?.maxGuests ?? 12;

  useEffect(() => {
    if (adults + kids > MAX_GUESTS) {
      setApiError(`Maximum ${MAX_GUESTS} guests allowed`);
      setKids(0);
    }
  }, [adults, kids, MAX_GUESTS]);

  return (
    <section className="bg-gray-100 mb-5 md:mb-10" id="booking-section ">
      {/* ============================================ TOP ============================================ */}
      <div className="text-center px-2 py-3 md:py-6">
        <p className="text-2xl md:text-3xl font-semibold border-x-4 border-black mx-2">
          Book Your Luxury Stay
        </p>
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
            <p>₹{PRICE_PER_PERSON.toLocaleString("en-IN")} / per person only</p>
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
                    setApiError("");
                    setCheckIn(e.target.value);
                    setCheckOut("");
                  }}
                  className="w-full border-b-2 border-gray-950 focus:border-primaryBlue outline-none py-2"
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
                  className="w-full border-b-2 border-gray-950 focus:border-primaryBlue outline-none py-2"
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
                  max={MAX_GUESTS}
                  value={adultsInput}
                  onChange={(e) => {
                    const val = e.target.value;

                    // allow empty (backspace)
                    if (val === "") {
                      setAdultsInput("");
                      return;
                    }

                    // only numbers
                    if (!/^\d+$/.test(val)) return;

                    const num = Number(val);

                    if (num > MAX_GUESTS) return;

                    setAdultsInput(val);
                    setAdults(num);
                  }}
                  onBlur={() => {
                    // user left input empty
                    if (adultsInput === "" || Number(adultsInput) < 1) {
                      setAdults(1);
                      setAdultsInput("1");
                    }
                  }}
                  className="w-full border-b-2 border-gray-950 focus:border-primaryBlue outline-none py-2"
                />
              </div>
              <div className="flex-1">
                <label className="block font-medium mb-1 text-primaryBlue">
                  Kids
                </label>
                <input
                  type="number"
                  min={0}
                  max={MAX_GUESTS - adults}
                  value={kidsInput}
                  onChange={(e) => {
                    const val = e.target.value;

                    if (val === "") {
                      setKidsInput("");
                      return;
                    }

                    if (!/^\d+$/.test(val)) return;

                    const num = Number(val);
                    const maxKids = MAX_GUESTS - adults;

                    if (num > maxKids) return;

                    setKidsInput(val);
                    setKids(num);
                  }}
                  onBlur={() => {
                    if (kidsInput === "" || Number(kidsInput) < 0) {
                      setKids(0);
                      setKidsInput("0");
                    }
                  }}
                  className="w-full border-b-2 border-gray-950 focus:border-primaryBlue outline-none py-2"
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
                    setApiError("");
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
                      only
                    </span>
                  )}
                </span>
              </div>

              <p className="text-xs md:text-sm text-gray-700 mt-1">
                ₹{(totalAmount - advanceAmount).toLocaleString("en-IN")}{" "}
                remaining payable at check-in
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
            {apiError && (
              <div className="bg-red-100 text-red-700 p-2 rounded mt-2">
                {apiError}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={
                loading ||
                !pricing ||
                !checkIn ||
                !checkOut ||
                advanceAmount <= 0
              }
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
                {loading ? "Processing..." : "PROCEED →"}
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
              if (loading || !formData) return;
              setApiError("");
              setLoading(true);

              try {
                const res = await fetch("/api/bookings", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(formData),
                });

                if (!res.ok) throw new Error("Server error");
                const result = await res.json();

                if (result.bookingRef) {
                  // ✅ Pehle formData update karo
                  setFormData((prev) =>
                    prev ? { ...prev, bookingRef: result.bookingRef } : null,
                  );

                  // ✅ Phir step 2 set karo
                  setStep(2);
                } else {
                  setApiError("Booking failed. Please try again.");
                }
              } catch (err: any) {
                setApiError(
                  err.message ||
                    "Booking failed. Please try again in a moment.",
                );
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
