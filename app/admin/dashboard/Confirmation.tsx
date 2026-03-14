"use client";

import { useState, useMemo } from "react";
import jsPDF from "jspdf";
import {
  Calendar,
  Download,
  Home,
  IndianRupee,
  MessageSquareHeart,
  Moon,
  Sandwich,
  TicketCheck,
  User,
  Users,
} from "lucide-react";

const MEAL_OPTIONS = [
  { value: "none", label: "No Meals Included" },
  { value: "breakfast", label: "Breakfast Only" },
  { value: "dinner", label: "Dinner Only" },
  { value: "lunch", label: "Lunch Only" },
  { value: "breakfast_lunch", label: "Breakfast + Lunch" },
  { value: "breakfast_dinner", label: "Breakfast + Dinner" },
  { value: "all", label: "Breakfast + Lunch + Dinner (Full Board)" },
  { value: "high_tea", label: "High Tea Included" },
  { value: "custom", label: "Custom (Specify Below)" },
];

const defaultData = {
  guestName: "",
  company: "",
  phone: "",
  address: "",
  idType: "Aadhaar",
  idNumber: "",
  checkIn: "",
  checkOut: "",
  checkInTime: "12:00",
  checkOutTime: "11:00",
  totalGuests: "",
  maleGuests: "",
  femaleGuests: "",
  childGuests: "",
  baseGuests: "12",
  tariff: "",
  extraPrice: "1500",
  advance: "",
  advanceMode: "Bank Transfer",
  kitchenCharge: "1500",
  mealPlan: "none",
  breakfastMenu: "",
  lunchMenu: "",
  dinnerMenu: "",
  highTeaMenu: "",
  customMealNote: "",
  mealCostPerDay: "",
  extraAddons: "",
  extraAddonsAmount: "",
  specialRequests: "",
  bookingRef: `TPH-${Date.now().toString().slice(-6)}`,
};

const inputCls =
  "w-full bg-white border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all placeholder-gray-400";
const labelCls =
  "block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5";
const cardHeaderCls =
  "flex items-center gap-3 px-5 py-3.5 bg-gray-50 border-b border-gray-100";

export default function BookingConfirmation() {
  const [data, setData] = useState(defaultData);
  const [generated, setGenerated] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString("en-IN", {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const calculate = () => {
    const checkIn = data.checkIn ? new Date(data.checkIn) : null;
    const checkOut = data.checkOut ? new Date(data.checkOut) : null;
    let duration = 0;
    if (checkIn && checkOut) {
      const diff = checkOut.getTime() - checkIn.getTime();
      duration = Math.ceil(diff / (1000 * 60 * 60 * 24));

duration = Math.max(Math.ceil(diff / (1000 * 60 * 60 * 24)), 0);
    }
    const tariff = parseFloat(data.tariff) || 0;
    const guests = parseInt(data.totalGuests) || 0;
    const baseGuests = parseInt(data.baseGuests) || 12;
    const extraGuests = guests > baseGuests ? guests - baseGuests : 0;
    const extraPrice = parseFloat(data.extraPrice) || 0;
    const extraCost = extraGuests * extraPrice;
    const stayCost = tariff * duration;
    const kitchenCharge = parseFloat(data.kitchenCharge) || 0;
    const kitchenCost = kitchenCharge * duration;
    const mealCostPerDay = parseFloat(data.mealCostPerDay) || 0;
    const mealCost = mealCostPerDay * duration;
    const addonCost = Number(data.extraAddonsAmount) || 0;
    const total = stayCost + extraCost + kitchenCost + mealCost + addonCost;
    const advance = Number(data.advance) || 0;
    const balance = total - advance;
    return {
      duration,
      extraGuests,
      extraCost,
      stayCost,
      kitchenCost,
      mealCost,
      addonCost,
      total,
      balance,
    };
  };

  const getMealLabel = () =>
    MEAL_OPTIONS.find((m) => m.value === data.mealPlan)?.label ||
    "No Meals Included";

  const getMealDetails = () => {
    const lines = [];
    if (
      ["breakfast", "breakfast_lunch", "breakfast_dinner", "all"].includes(
        data.mealPlan,
      ) &&
      data.breakfastMenu
    )
      lines.push({ label: "Breakfast", value: data.breakfastMenu });
    if (
      ["lunch", "breakfast_lunch", "all"].includes(data.mealPlan) &&
      data.lunchMenu
    )
      lines.push({ label: "Lunch", value: data.lunchMenu });
    if (
      ["dinner", "breakfast_dinner", "all"].includes(data.mealPlan) &&
      data.dinnerMenu
    )
      lines.push({ label: "Dinner", value: data.dinnerMenu });
    if (data.mealPlan === "high_tea" && data.highTeaMenu)
      lines.push({ label: "High Tea", value: data.highTeaMenu });
    if (data.mealPlan === "custom" && data.customMealNote)
      lines.push({ label: "Details", value: data.customMealNote });
    return lines;
  };

  /* ───────────────────────── PDF GENERATION ───────────────────────── */
  const generatePDF = () => {
    const calc = calculate();
    const pdf = new jsPDF({ unit: "mm", format: "a4" });
    const W = 210;
    const M = 16;
    const CW = W - M * 2;
    let y = 0;

    const today = new Date().toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });

    const checkPage = (needed = 20) => {
      if (y + needed > 272) {
        pdf.addPage();
        pdf.setFillColor(15, 15, 15);
        pdf.rect(0, 0, W, 16, "F");
        pdf.setFillColor(185, 28, 28);
        pdf.rect(0, 0, 5, 16, "F");
        pdf.setFillColor(212, 175, 55);
        pdf.rect(5, 0, W - 5, 0.8, "F");
        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(10);
        pdf.setTextColor(255, 255, 255);
        pdf.text("THE PUSHPA HERITAGE", M + 4, 10);
        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(9);
        pdf.setTextColor(130, 130, 130);
        pdf.text(`Ref: ${data.bookingRef}`, W - M, 10, { align: "right" });
        y = 24;
      }
    };

    /* ── FIRST PAGE HEADER ── */
    pdf.setFillColor(15, 15, 15);
    pdf.rect(0, 0, W, 64, "F");
    pdf.setFillColor(185, 28, 28);
    pdf.rect(0, 0, 5, 64, "F");
    pdf.setFillColor(212, 175, 55);
    pdf.rect(5, 0, W - 5, 1.2, "F");
    pdf.setFillColor(212, 175, 55);
    pdf.rect(0, 63, W, 0.8, "F");

    // Property name — bigger
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(27);
    pdf.setTextColor(255, 255, 255);
    pdf.text("THE PUSHPA HERITAGE", M + 4, 22);

    // Tagline — bigger
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(10);
    pdf.setTextColor(212, 175, 55);
    pdf.text(
      "7 - B H K   L U X U R Y   V I L L A     |     E X C L U S I V E   H O M E   S T A Y",
      M + 4,
      33,
    );

    // Divider
    pdf.setDrawColor(50, 50, 50);
    pdf.setLineWidth(0.3);
    pdf.line(M + 4, 38, W - M, 38);

    // Ref + date — bigger
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(10);
    pdf.setTextColor(255, 255, 255);
    pdf.text(`REF: ${data.bookingRef}`, M + 4, 46);
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(9);
    pdf.setTextColor(255, 255, 255);
    pdf.text(`Issued: ${today}`, W - M, 46, { align: "right" });

    // Badge — bigger
    pdf.setFillColor(185, 28, 28);
    pdf.roundedRect(M, 49, CW, 11, 2, 2, "F");
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(11);
    pdf.setTextColor(255, 255, 255);
    pdf.text("BOOKING CONFIRMATION", W / 2, 56.5, { align: "center" });

    y = 76;

    /* ── SALUTATION ── */
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(13);
    pdf.setTextColor(15, 15, 15);
    const guestLabel = data.company
      ? `${data.guestName} & Team — ${data.company}`
      : data.guestName || "Valued Guest";
    pdf.text(`Dear ${guestLabel},`, M, y);
    y += 8;
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(11);
    pdf.setTextColor(80, 80, 80);
    const intro = pdf.splitTextToSize(
      "We are delighted to confirm your reservation at The Pushpa Heritage (7-BHK Villa). Please review the details below and retain this document for your records.",
      CW,
    );
    pdf.text(intro, M, y);
    y += intro.length * 6.2 + 10;

    /* ── SECTION HEADER helper ── */
    const secHeader = (title) => {
      checkPage(18);
      pdf.setFillColor(245, 245, 245);
      pdf.rect(M, y, CW, 11, "F");
      pdf.setFillColor(185, 28, 28);
      pdf.rect(M, y, 4, 11, "F");
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(10);
      pdf.setTextColor(30, 30, 30);
      pdf.text(title.toUpperCase(), M + 9, y + 7.5);
      y += 16;
    };

    /* ── ROW helper ── */
    const row = (label, value) => {
      if (value === undefined || value === null || String(value).trim() === "")
        return;
      checkPage(11);
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(10);
      pdf.setTextColor(130, 130, 130);
      pdf.text(String(label), M + 5, y);
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(10);
      pdf.setTextColor(20, 20, 20);
      const valLines = pdf.splitTextToSize(String(value), CW - 72);
      pdf.text(valLines, W - M - 2, y, { align: "right" });
      y += Math.max(valLines.length * 6.2, 9);
      pdf.setDrawColor(240, 240, 240);
      pdf.setLineWidth(0.2);
      pdf.line(M + 5, y - 0.5, W - M - 2, y - 0.5);
    };

    const gap = (n = 5) => {
      y += n;
    };

    const hairline = (r = 200, g = 200, b = 200) => {
      pdf.setDrawColor(r, g, b);
      pdf.setLineWidth(0.4);
      pdf.line(M, y, W - M, y);
      y += 5;
    };

    /* ═══════════════ SECTIONS ═══════════════ */

    secHeader("Guest Information");
    row("Guest Name", data.guestName);
    if (data.company) row("Company / Group", data.company);
    if (data.phone) row("Mobile Number", data.phone);
    if (data.address) row("Address", data.address);
    if (data.idType) row("Confirmation ID", data.idType);
    if (data.idNumber) row("ID Number", data.idNumber);
    gap();

    secHeader("Stay Details");
    if (data.checkIn)
      row("Check-In", `${formatDate(data.checkIn)} at ${data.checkInTime}`);
    if (data.checkOut)
      row("Check-Out", `${formatDate(data.checkOut)} at ${data.checkOutTime}`);
    if (calc.duration > 0)
      row(
        "Duration",
        `${calc.duration} Night${calc.duration !== 1 ? "s" : ""}`,
      );
    if (data.totalGuests) row("Total Guests", `${data.totalGuests} Guests`);
    if (data.maleGuests) row("Male", data.maleGuests);
    if (data.femaleGuests) row("Female", data.femaleGuests);
    if (data.childGuests) row("Children", data.childGuests);
    gap();

    secHeader("Meal Plan");
    row("Plan Selected", getMealLabel());
    if (data.mealPlan === "none") {
      checkPage(16);
      pdf.setFont("helvetica", "italic");
      pdf.setFontSize(10);
      pdf.setTextColor(130, 130, 130);
      const note = pdf.splitTextToSize(
        "Meals are not included. Food & beverages can be ordered separately at the villa (chargeable).",
        CW - 6,
      );
      pdf.text(note, M + 5, y);
      y += note.length * 6.2 + 3;
    } else {
      getMealDetails().forEach(({ label, value }) => row(label, value));
      if (data.mealCostPerDay)
        row("Meal Charge", `Rs. ${data.mealCostPerDay} per day`);
    }
    gap();

    secHeader("Billing Summary");
    if (data.tariff)
      row(
        "Tariff",
        `Rs. ${Number(data.tariff).toLocaleString("en-IN")} per night`,
      );
    if (calc.stayCost > 0)
      row(
        `Stay Cost  (${calc.duration} night${calc.duration !== 1 ? "s" : ""})`,
        `Rs. ${calc.stayCost.toLocaleString("en-IN")}`,
      );
    if (calc.extraGuests > 0)
      row(
        `Extra Guests  (${calc.extraGuests} × Rs. ${data.extraPrice})`,
        `Rs. ${calc.extraCost.toLocaleString("en-IN")}`,
      );
    if (calc.mealCost > 0)
      row("Meal Cost", `Rs. ${calc.mealCost.toLocaleString("en-IN")}`);
    if (calc.kitchenCost > 0)
      row("Kitchen Charges", `Rs. ${calc.kitchenCost.toLocaleString("en-IN")}`);
    if (data.extraAddons && calc.addonCost > 0)
      row(data.extraAddons, `Rs. ${calc.addonCost.toLocaleString("en-IN")}`);

    gap(3);
    hairline(210, 210, 210);

    /* ── Combined Summary Card ── */
    checkPage(58);

    pdf.setFillColor(245, 245, 245);
    pdf.roundedRect(M, y, CW, 54, 3, 3, "F");

    pdf.setFillColor(185, 28, 28);
    pdf.roundedRect(M, y, 5, 54, 2, 2, "F");

    // Total Amount
    pdf.setFillColor(15, 15, 15);
    pdf.roundedRect(M + 9, y + 5, CW - 14, 14, 2, 2, "F");
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(12);
    pdf.setTextColor(255, 255, 255);
    pdf.text("TOTAL AMOUNT", M + 14, y + 14);
    pdf.text(`Rs. ${calc.total.toLocaleString("en-IN")}`, M + CW - 9, y + 14, {
      align: "right",
    });

    // Advance
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(10);
    pdf.setTextColor(110, 110, 110);
    pdf.text("Advance Received", M + 14, y + 28);
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(10);
    pdf.setTextColor(40, 40, 40);
    pdf.text(
      `Rs. ${(Number(data.advance) || 0).toLocaleString("en-IN")}`,
      M + CW - 9,
      y + 28,
      { align: "right" },
    );
    if (data.advanceMode) {
      pdf.setFont("helvetica", "italic");
      pdf.setFontSize(9);
      pdf.setTextColor(160, 160, 160);
      pdf.text(`via ${data.advanceMode}`, M + CW - 9, y + 34, {
        align: "right",
      });
    }

    pdf.setDrawColor(220, 220, 220);
    pdf.setLineWidth(0.3);
    pdf.line(M + 11, y + 38, W - M - 5, y + 38);

    // Balance
    pdf.setFillColor(185, 28, 28);
    pdf.roundedRect(M + 9, y + 41, CW - 14, 10, 1.5, 1.5, "F");
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(10);
    pdf.setTextColor(255, 255, 255);
    pdf.text("BALANCE PAYABLE AT CHECK-IN", M + 14, y + 47.5);
    pdf.text(
      `Rs. ${calc.balance.toLocaleString("en-IN")}`,
      M + CW - 9,
      y + 47.5,
      { align: "right" },
    );

    y += 58;

    if (Number(data.baseGuests)) {
      y += 6; // margin top
      pdf.setFillColor(255, 243, 243);
      pdf.roundedRect(M, y - 4, CW, 12, 2, 2, "F");
      pdf.setDrawColor(185, 28, 28);
      pdf.setLineWidth(0.4);
      pdf.roundedRect(M, y - 4, CW, 12, 2, 2, "S");
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(10);
      pdf.setTextColor(185, 28, 28);
      pdf.text(
        `* Extra charge of Rs. ${data.extraPrice}/person applies above ${data.baseGuests} guests.`,
        M + 5,
        y + 3,
      );
      y += 16;
    }

    /* ── Special Requests ── */
    if (data.specialRequests) {
      gap(2);
      secHeader("Special Requests");
      const reqLines = pdf.splitTextToSize(data.specialRequests, CW - 6);
      checkPage(reqLines.length * 6.2 + 6);
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(11);
      pdf.setTextColor(50, 50, 50);
      pdf.text(reqLines, M + 5, y);
      y += reqLines.length * 6.2 + 5;
    }

    /* ── Notes ── */
    gap(2);
    secHeader("Important Information");

    const noteBlock = (heading, body) => {
      const bodyLines = pdf.splitTextToSize(body, CW - 10);
      checkPage(bodyLines.length * 6.5 + 22);
      // Heading — bold, black, clean
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(12);
      pdf.setTextColor(15, 15, 15);
      pdf.text(heading, M + 5, y + 7);
      y += 13;
      // Red underline
      pdf.setDrawColor(185, 28, 28);
      pdf.setLineWidth(0.6);
      pdf.line(M + 5, y - 2, M + 65, y - 2);
      // Body
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(11);
      pdf.setTextColor(40, 40, 40);
      pdf.text(bodyLines, M + 5, y + 4);
      y += bodyLines.length * 6.5 + 10;
    };

    noteBlock(
      "Battery Backup",
      "The villa is equipped with inverter battery backup (up to 4 hours) in case of power cuts. Kindly cooperate as backup supports only essential power needs.",
    );
    noteBlock(
      "ID Proof Required",
      "All guests must carry any one valid government-issued photo ID at check-in — Aadhaar, Passport, Voter ID, or Driving Licence.",
    );
    noteBlock(
      "Cancellation Policy",
      "Bookings are generally non-refundable. However, in case of a serious or unavoidable circumstance, cancellation requests may be considered at the discretion of the management. Please contact us as soon as possible in such situations.",
    );

    /* ── Closing ── */
    gap(4);
    checkPage(40);
    hairline(220, 220, 220);

    pdf.setFont("helvetica", "italic");
    pdf.setFontSize(11);
    pdf.setTextColor(70, 70, 70);
    const closing = pdf.splitTextToSize(
      "We look forward to hosting you and ensuring a warm, comfortable, and memorable stay. Please feel free to reach out for any special arrangements or assistance.",
      CW,
    );
    pdf.text(closing, M, y);
    y += closing.length * 6.2 + 10;

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(11);
    pdf.setTextColor(120, 120, 120);
    pdf.text("Warm Regards,", M, y);
    y += 7;
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(14);
    pdf.setTextColor(15, 15, 15);
    pdf.text("Shiv Singh & Vikram Singh", M, y);
    y += 7;
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(11);
    pdf.setTextColor(185, 28, 28);
    pdf.text("The Pushpa Heritage", M, y);
    y += 6;
    pdf.setFontSize(11);
    pdf.setTextColor(110, 110, 110);
    pdf.text("+91 9587380255  |  +91 9783598967", M, y);

    /* ── FOOTER ── */
    const fY = 283;
    pdf.setFillColor(15, 15, 15);
    pdf.rect(0, fY, W, 14, "F");
    pdf.setFillColor(185, 28, 28);
    pdf.rect(0, fY, W, 1.2, "F");
    pdf.setFillColor(212, 175, 55);
    pdf.rect(0, fY + 1.2, W, 0.4, "F");
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(8);
    pdf.setTextColor(255, 255, 255);
    pdf.text(
      `Ref: ${data.bookingRef}  ·  Issued: ${today}  ·  The Pushpa Heritage`,
      M,
      fY + 9,
    );
    pdf.text("Computer-generated — no signature required.", W - M, fY + 9, {
      align: "right",
    });

    pdf.save(`BookingConfirmation_${data.bookingRef}.pdf`);
    setGenerated(true);
  };

  const calc = useMemo(
    () => calculate(),
    [
      data.checkIn,
      data.checkOut,
      data.tariff,
      data.totalGuests,
      data.kitchenCharge,
      data.mealCostPerDay,
      data.extraPrice,
      data.advance,
      data.extraAddonsAmount,
      data.mealPlan,
    ],
  );
  const showMealFields = data.mealPlan !== "none";
  const showBreakfast = [
    "breakfast",
    "breakfast_lunch",
    "breakfast_dinner",
    "all",
  ].includes(data.mealPlan);
  const showLunch = ["lunch", "breakfast_lunch", "all"].includes(data.mealPlan);
  const showDinner = ["dinner", "breakfast_dinner", "all"].includes(
    data.mealPlan,
  );
  const showHighTea = data.mealPlan === "high_tea";
  const showCustom = data.mealPlan === "custom";

  return (
    <div
      className="min-h-screen bg-gray-50"
      style={{ fontFamily: "'Segoe UI', system-ui, sans-serif" }}
    >
      {/* ── Sticky Header ── */}
      <div className="sticky top-0 z-50 bg-gray-950 border-b-2 border-red-700 shadow-xl">
        <div className="max-w-3xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-red-700 rounded-lg flex items-center justify-center text-lg shrink-0">
              <Home />
            </div>
            <div>
              <p className="text-white font-bold text-sm tracking-tight leading-tight">
                The Pushpa Heritage
              </p>
              <p className="text-gray-500 text-[9px] uppercase tracking-widest">
                Booking Confirmation Generator
              </p>
            </div>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-lg px-3 py-1.5 text-right">
            <p className="text-gray-500 text-[9px] uppercase tracking-widest">
              Ref No
            </p>
            <p className="text-red-400 font-bold text-sm font-mono">
              {data.bookingRef}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-7 space-y-4">
        {/* ── Guest Information ── */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className={cardHeaderCls}>
            <span className="text-base">
              <User />
            </span>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              Guest Information
            </span>
          </div>
          <div className="p-5 grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Guest Name *</label>
              <input
                name="guestName"
                value={data.guestName}
                onChange={handleChange}
                placeholder="Full Name"
                className={inputCls}
              />
            </div>
            <div>
              <label className={labelCls}>Company / Group</label>
              <input
                name="company"
                value={data.company}
                onChange={handleChange}
                placeholder="Optional"
                className={inputCls}
              />
            </div>
            <div>
              <label className={labelCls}>Mobile Number</label>
              <input
                name="phone"
                value={data.phone}
                onChange={handleChange}
                placeholder="+91 XXXXX XXXXX"
                className={inputCls}
              />
            </div>
            <div>
              <label className={labelCls}>Address</label>
              <input
                name="address"
                value={data.address}
                onChange={handleChange}
                placeholder="City, State"
                className={inputCls}
              />
            </div>
            <div>
              <label className={labelCls}>ID Type</label>
              <select
                name="idType"
                value={data.idType}
                onChange={handleChange}
                className={inputCls}
              >
                {[
                  "Aadhaar",
                  "Passport",
                  "Voter ID",
                  "Driving Licence",
                  "PAN Card",
                ].map((v) => (
                  <option key={v}>{v}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelCls}>ID Number</label>
              <input
                name="idNumber"
                value={data.idNumber}
                onChange={handleChange}
                placeholder="XXXX-XXXX-XXXX"
                className={inputCls}
              />
            </div>
          </div>
        </div>

        {/* ── Stay Details ── */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className={cardHeaderCls}>
            <span className="text-base">
              <Calendar />
            </span>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              Stay Details
            </span>
          </div>
          <div className="p-5 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>Check-In Date *</label>
                <input
                  type="date"
                  name="checkIn"
                  value={data.checkIn}
                  onChange={handleChange}
                  className={inputCls}
                />
              </div>
              <div>
                <label className={labelCls}>Check-In Time</label>
                <input
                  type="time"
                  name="checkInTime"
                  value={data.checkInTime}
                  onChange={handleChange}
                  className={inputCls}
                />
              </div>
              <div>
                <label className={labelCls}>Check-Out Date *</label>
                <input
                  type="date"
                  name="checkOut"
                  value={data.checkOut}
                  onChange={handleChange}
                  className={inputCls}
                />
              </div>
              <div>
                <label className={labelCls}>Check-Out Time</label>
                <input
                  type="time"
                  name="checkOutTime"
                  value={data.checkOutTime}
                  onChange={handleChange}
                  className={inputCls}
                />
              </div>
            </div>
            {calc.duration > 0 && (
              <div className="inline-flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 text-sm font-semibold px-4 py-2 rounded-lg">
                <Moon /> {calc.duration} Night{calc.duration !== 1 ? "s" : ""}
              </div>
            )}
          </div>
        </div>

        {/* ── Guest Count ── */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className={cardHeaderCls}>
            <span className="text-base">
              <Users />
            </span>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              Guest Count
            </span>
          </div>
          <div className="p-5 space-y-4">
            <div className="grid grid-cols-4 gap-3">
              {[
                { label: "Total *", name: "totalGuests" },
                { label: "Male", name: "maleGuests" },
                { label: "Female", name: "femaleGuests" },
                { label: "Children", name: "childGuests" },
              ].map((f) => (
                <div key={f.name}>
                  <label className={labelCls}>{f.label}</label>
                  <input
                    type="number"
                    name={f.name}
                    value={data[f.name]}
                    onChange={handleChange}
                    placeholder="0"
                    className={inputCls}
                  />
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>Base Guest Limit</label>
                <input
                  name="baseGuests"
                  value={data.baseGuests}
                  onChange={handleChange}
                  className={inputCls}
                />
              </div>
              <div>
                <label className={labelCls}>Extra Guest Rate (Rs./pax)</label>
                <input
                  name="extraPrice"
                  value={data.extraPrice}
                  onChange={handleChange}
                  className={inputCls}
                />
              </div>
            </div>
            {calc.extraGuests > 0 && (
              <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-2.5 text-red-700 text-sm font-medium">
                ⚠️ {calc.extraGuests} extra guest
                {calc.extraGuests > 1 ? "s" : ""} — Rs.{" "}
                {calc.extraCost.toLocaleString("en-IN")} additional
              </div>
            )}
          </div>
        </div>

        {/* ── Meal Plan ── */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className={cardHeaderCls}>
            <span className="text-base">
              <Sandwich />{" "}
            </span>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              Meal Plan
            </span>
          </div>
          <div className="p-5 space-y-4">
            <div>
              <label className={labelCls}>Select Meal Plan</label>
              <select
                name="mealPlan"
                value={data.mealPlan}
                onChange={handleChange}
                className={inputCls}
              >
                {MEAL_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
            {data.mealPlan === "none" && (
              <p className="text-xs text-gray-500 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 leading-relaxed">
                Beverages and food items will be available at the villa and can
                be ordered separately (chargeable).
              </p>
            )}
            {showMealFields && (
              <div className="grid grid-cols-2 gap-4">
                {showBreakfast && (
                  <div>
                    <label className={labelCls}>Breakfast Menu</label>
                    <input
                      name="breakfastMenu"
                      value={data.breakfastMenu}
                      onChange={handleChange}
                      placeholder="e.g. Paratha, Tea, Juice"
                      className={inputCls}
                    />
                  </div>
                )}
                {showLunch && (
                  <div>
                    <label className={labelCls}>Lunch Menu</label>
                    <input
                      name="lunchMenu"
                      value={data.lunchMenu}
                      onChange={handleChange}
                      placeholder="e.g. Dal, Rice, Sabzi, Roti"
                      className={inputCls}
                    />
                  </div>
                )}
                {showDinner && (
                  <div>
                    <label className={labelCls}>Dinner Menu</label>
                    <input
                      name="dinnerMenu"
                      value={data.dinnerMenu}
                      onChange={handleChange}
                      placeholder="e.g. Paneer, Rice, Dessert"
                      className={inputCls}
                    />
                  </div>
                )}
                {showHighTea && (
                  <div>
                    <label className={labelCls}>High Tea Menu</label>
                    <input
                      name="highTeaMenu"
                      value={data.highTeaMenu}
                      onChange={handleChange}
                      placeholder="e.g. Tea, Snacks, Biscuits"
                      className={inputCls}
                    />
                  </div>
                )}
                {showCustom && (
                  <div className="col-span-2">
                    <label className={labelCls}>Custom Meal Details</label>
                    <input
                      name="customMealNote"
                      value={data.customMealNote}
                      onChange={handleChange}
                      placeholder="Describe meal arrangement..."
                      className={inputCls}
                    />
                  </div>
                )}
                <div>
                  <label className={labelCls}>Meal Charge / Day (Rs.)</label>
                  <input
                    name="mealCostPerDay"
                    value={data.mealCostPerDay}
                    onChange={handleChange}
                    placeholder="0"
                    className={inputCls}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── Billing ── */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className={cardHeaderCls}>
            <span className="text-base">
              <IndianRupee />
            </span>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              Billing
            </span>
          </div>
          <div className="p-5 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>Tariff / Night (Rs.) *</label>
                <input
                  type="number"
                  name="tariff"
                  value={data.tariff}
                  onChange={handleChange}
                  className={inputCls}
                />
              </div>
              <div>
                <label className={labelCls}>Advance Received (Rs.)</label>
                <input
                  type="number"
                  name="advance"
                  value={data.advance}
                  onChange={handleChange}
                  className={inputCls}
                />
              </div>
              <div>
                <label className={labelCls}>Kitchen Charge / Day (Rs.)</label>
                <input
                  name="kitchenCharge"
                  value={data.kitchenCharge}
                  onChange={handleChange}
                  className={inputCls}
                />
              </div>
              <div>
                <label className={labelCls}>Payment Mode</label>
                <select
                  name="advanceMode"
                  value={data.advanceMode}
                  onChange={handleChange}
                  className={inputCls}
                >
                  {[
                    "Bank Transfer",
                    "UPI",
                    "Cash",
                    "Cheque",
                    "Credit/Debit Card",
                  ].map((v) => (
                    <option key={v}>{v}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelCls}>Extra Add-on (Label)</label>
                <input
                  name="extraAddons"
                  value={data.extraAddons}
                  onChange={handleChange}
                  placeholder="e.g. Bonfire, Decoration"
                  className={inputCls}
                />
              </div>
              <div>
                <label className={labelCls}>Add-on Amount (Rs.)</label>
                <input
                  type="number"
                  name="extraAddonsAmount"
                  value={data.extraAddonsAmount}
                  onChange={handleChange}
                  placeholder="0"
                  className={inputCls}
                />
              </div>
            </div>

            {/* Live Billing Summary */}
            <div className="bg-gray-950 rounded-xl overflow-hidden">
              <div className="px-5 py-3 border-b border-gray-800 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                  Live Summary
                </span>
              </div>
              <div className="px-5 py-4 space-y-1">
                {[
                  {
                    label: `Stay Cost (${calc.duration} nights × Rs. ${data.tariff || 0})`,
                    value: calc.stayCost,
                    show: true,
                  },
                  {
                    label: `Extra Guests (${calc.extraGuests} pax)`,
                    value: calc.extraCost,
                    show: calc.extraGuests > 0,
                  },
                  {
                    label: "Meal Cost",
                    value: calc.mealCost,
                    show: calc.mealCost > 0,
                  },
                  {
                    label: "Kitchen Charges",
                    value: calc.kitchenCost,
                    show: calc.kitchenCost > 0,
                  },
                  {
                    label: data.extraAddons || "Add-on",
                    value: calc.addonCost,
                    show: calc.addonCost > 0,
                  },
                ]
                  .filter((r) => r.show)
                  .map((r, i) => (
                    <div
                      key={i}
                      className="flex justify-between text-sm text-gray-400 py-1.5 border-b border-gray-900"
                    >
                      <span>{r.label}</span>
                      <span>
                        Rs. {(r.value || 0).toLocaleString("en-IN")}
                      </span>{" "}
                    </div>
                  ))}
                <div className="flex justify-between items-center pt-3 pb-1 border-t border-gray-700">
                  <span className="text-white font-bold text-base">
                    Total Amount
                  </span>
                  <span className="text-white font-bold text-base">
                    Rs. {(calc.total || 0).toLocaleString("en-IN")}{" "}
                  </span>
                </div>
                <div className="flex justify-between text-sm text-gray-500 py-1">
                  <span>Advance Paid ({data.advanceMode})</span>
                  <span>
                    Rs. {(Number(data.advance) || 0).toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="flex justify-between items-center bg-red-700 rounded-lg px-4 py-3 mt-2">
                  <span className="text-white font-bold text-sm">
                    Balance at Check-in
                  </span>
                  <span className="text-white font-bold text-base">
                    Rs. {(calc.balance || 0).toLocaleString("en-IN")}{" "}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Special Requests ── */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className={cardHeaderCls}>
            <span className="text-base">
              <MessageSquareHeart />{" "}
            </span>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              Special Requests
            </span>
          </div>
          <div className="p-5">
            <textarea
              name="specialRequests"
              value={data.specialRequests}
              onChange={handleChange}
              placeholder="Any special arrangements, dietary needs, decoration requests, etc."
              rows={3}
              className={inputCls + " resize-none"}
            />
          </div>
        </div>

        {/* ── Download Button ── */}
        <button
          onClick={generatePDF}
          className="w-full bg-gray-950 hover:bg-red-700 border-2 border-red-700 text-white font-bold py-4 rounded-xl text-xs uppercase tracking-widest transition-all duration-200 shadow-lg flex items-center justify-center gap-3"
        >
          <span className="text-base">
            <Download />
          </span>
          Download Booking Confirmation PDF
        </button>

        {generated && (
          <div className="flex justify-center gap-2 items-center py-3 px-4 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm font-semibold">
            <TicketCheck /> PDF downloaded — {data.bookingRef}
          </div>
        )}
      </div>
    </div>
  );
}
