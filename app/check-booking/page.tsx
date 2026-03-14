"use client";

import { useState, useEffect, useRef } from "react";
import {
  Calendar,
  Users,
  CreditCard,
  CheckCircle2,
  Clock,
  ArrowRight,
  Copy,
  Check,
  Search,
  AlertCircle,
  Wifi,
  WifiOff,
  MapPin,
  Phone,
  Shield,
  Home,
  Moon,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

/* ============================================================
   TYPES
============================================================ */
interface BookingDetails {
  bookingRef: string;
  name: string;
  phone: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  nights: number;
  totalAmount: number;
  advanceAmount: number;
  status: "PENDING" | "APPROVED" | "PAID";
}

/* ============================================================
   HELPERS
============================================================ */
const fmtDate = (d: string) =>
  new Date(d).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

const fmtINR = (n: number) => `₹${n.toLocaleString("en-IN")}`;

/* ============================================================
   STATUS BADGE
============================================================ */
function StatusBadge({ status }: { status: BookingDetails["status"] }) {
  const map = {
    PENDING: {
      label: "Pending",
      dot: "bg-amber-400",
      cls: "bg-amber-50 border-amber-200 text-amber-800",
    },
    APPROVED: {
      label: "Approved",
      dot: "bg-green-500",
      cls: "bg-green-50 border-green-200 text-green-800",
    },
    PAID: {
      label: "Confirmed",
      dot: "bg-emerald-500",
      cls: "bg-emerald-50 border-emerald-200 text-emerald-800",
    },
  };
  const s = map[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-semibold tracking-wide ${s.cls}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${s.dot} animate-pulse`} />
      {s.label}
    </span>
  );
}

/* ============================================================
   CONFIRMED RECEIPT — PAID status, no redirect
============================================================ */
function ConfirmedReceipt({
  booking,
  onReset,
}: {
  booking: BookingDetails;
  onReset: () => void;
}) {
  const [copied, setCopied] = useState(false);
  const remaining = booking.totalAmount - booking.advanceAmount;

  const handleCopy = () => {
    navigator.clipboard.writeText(booking.bookingRef).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      {/* Success banner */}
      <div className="relative overflow-hidden rounded-2xl bg-emerald-700 px-5 py-6 text-white">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />
        <div className="relative flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-white/15 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-emerald-200 mb-0.5">
              Payment confirmed
            </p>
            <p className="text-xl font-black tracking-tight">Your stay is booked!</p>
            <p className="text-sm text-emerald-100 mt-1">
              Welcome,{" "}
              <span className="font-semibold capitalize">
                {booking.name.split(" ")[0]}
              </span>
              . We&apos;re excited to host you.
            </p>
          </div>
        </div>
      </div>

      {/* Booking ID */}
      <div className="bg-gray-950 rounded-2xl px-5 py-4">
        <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-gray-400 mb-1">
          Booking ID
        </p>
        <div className="flex items-center justify-between">
          <p className="font-mono font-black text-white text-lg tracking-widest">
            {booking.bookingRef}
          </p>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 text-xs font-semibold text-gray-400 hover:text-white transition-colors px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-green-400" />
                <span className="text-green-400">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                Copy
              </>
            )}
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Save this ID — you&apos;ll need it at check-in
        </p>
      </div>

      {/* Stay details */}
      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 mb-0.5">
              Guest name
            </p>
            <p className="font-bold text-gray-900 capitalize">{booking.name}</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 mb-0.5">
              Mobile
            </p>
            <p className="font-mono text-sm text-gray-700">{booking.phone}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-px bg-gray-100">
          <div className="bg-white px-5 py-3">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 mb-0.5">Check-in</p>
            <p className="font-bold text-gray-900 text-sm">{fmtDate(booking.checkIn)}</p>
            <p className="text-[10px] text-gray-400 mt-0.5">After 12:00 PM</p>
          </div>
          <div className="bg-white px-5 py-3">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 mb-0.5">Check-out</p>
            <p className="font-bold text-gray-900 text-sm">{fmtDate(booking.checkOut)}</p>
            <p className="text-[10px] text-gray-400 mt-0.5">Before 11:00 AM</p>
          </div>
          <div className="bg-white px-5 py-3">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 mb-0.5">Guests</p>
            <p className="font-bold text-gray-900 text-sm flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-gray-400" />
              {booking.guests} guests
            </p>
          </div>
          <div className="bg-white px-5 py-3">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 mb-0.5">Duration</p>
            <p className="font-bold text-gray-900 text-sm flex items-center gap-1.5">
              <Moon className="w-3.5 h-3.5 text-gray-400" />
              {booking.nights} nights
            </p>
          </div>
        </div>

        <div className="px-5 py-4 space-y-2 border-t border-gray-100">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 mb-2">
            Payment summary
          </p>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Total stay amount</span>
            <span className="font-semibold text-gray-900">{fmtINR(booking.totalAmount)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              Advance paid (20%)
            </span>
            <span className="font-bold text-emerald-700">{fmtINR(booking.advanceAmount)}</span>
          </div>
          <div className="flex justify-between items-center pt-2 border-t border-dashed border-gray-200">
            <span className="text-sm font-semibold text-gray-700">Due at check-in</span>
            <span className="text-base font-black text-gray-900">{fmtINR(remaining)}</span>
          </div>
        </div>
      </div>

      {/* Property info */}
      <div className="bg-white border border-gray-200 rounded-2xl px-5 py-4 space-y-3">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
          Property details
        </p>
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center shrink-0">
            <Home className="w-4 h-4 text-green-700" />
          </div>
          <div>
            <p className="font-bold text-gray-900 text-sm">The Pushpa Heritage Villa</p>
            <p className="text-xs text-gray-500 mt-0.5">Luxury villa · Private pool · Full property</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
            <MapPin className="w-4 h-4 text-blue-600" />
          </div>
          {/* ⚠️ Replace with actual address */}
          <p className="text-sm text-gray-700 leading-relaxed">
            Village Road, Near Lake View, Banswara, Rajasthan — 327001
          </p>
        </div>
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center shrink-0">
            <Phone className="w-4 h-4 text-green-700" />
          </div>
          <div>
            {/* ⚠️ Replace with actual WhatsApp number */}
            <p className="text-sm text-gray-700 font-semibold">+91 98XXX XXXXX</p>
            <p className="text-xs text-gray-400">WhatsApp for directions</p>
          </div>
        </div>
      </div>

      {/* Check-in instructions */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl px-5 py-4">
        <p className="text-xs font-bold text-amber-800 uppercase tracking-wider mb-3">
          Important at check-in
        </p>
        <ul className="space-y-2">
          {[
            "Carry original government-issued photo ID",
            `Pay remaining ${fmtINR(remaining)} in cash at check-in`,
            "Check-in time: 12:00 PM onwards",
            "Check-out time: 11:00 AM sharp",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2 text-xs text-amber-800">
              <span className="w-1 h-1 rounded-full bg-amber-500 mt-1.5 shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Privacy note */}
      <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-gray-100">
        <Shield className="w-4 h-4 text-gray-400 shrink-0" />
        <p className="text-xs text-gray-500">
          This receipt is private — accessible only with your Booking ID and mobile number.
        </p>
      </div>

      {/* Check another booking */}
      <button
        onClick={onReset}
        className="w-full py-3 rounded-xl border border-gray-200 bg-white text-gray-600 text-sm font-semibold hover:bg-gray-50 transition-all active:scale-[0.98]"
      >
        Check another booking
      </button>
    </div>
  );
}

/* ============================================================
   BOOKING STATUS CARD — PENDING or APPROVED
============================================================ */
function BookingCard({
  booking,
  timeLeft,
  onGoToPayment,
}: {
  booking: BookingDetails;
  timeLeft: number;
  onGoToPayment: () => void;
}) {
  const [copied, setCopied] = useState(false);
  const mm = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const ss = String(timeLeft % 60).padStart(2, "0");
  const remaining = booking.totalAmount - booking.advanceAmount;

  const handleCopy = () => {
    navigator.clipboard.writeText(booking.bookingRef).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
      {/* Header */}
      <div className="bg-gray-950 px-5 py-4 flex items-center justify-between">
        <div>
          <p className="text-[10px] font-semibold tracking-[0.18em] uppercase text-gray-400 mb-0.5">
            Booking ID
          </p>
          <p className="font-mono font-bold text-white tracking-wider text-sm">
            {booking.bookingRef}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <StatusBadge status={booking.status} />
          <button
            onClick={handleCopy}
            className="text-gray-400 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/10"
            title="Copy booking ID"
          >
            {copied ? (
              <Check className="w-4 h-4 text-green-400" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* Guest row */}
      <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">Guest</p>
          <p className="font-bold text-gray-900 capitalize">{booking.name}</p>
        </div>
        <p className="text-sm text-gray-400 font-mono">{booking.phone}</p>
      </div>

      {/* Dates grid */}
      <div className="grid grid-cols-2 gap-px bg-gray-100">
        <div className="bg-white px-5 py-3">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 mb-0.5">Check-in</p>
          <p className="font-semibold text-gray-900 text-sm">{fmtDate(booking.checkIn)}</p>
        </div>
        <div className="bg-white px-5 py-3">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 mb-0.5">Check-out</p>
          <p className="font-semibold text-gray-900 text-sm">{fmtDate(booking.checkOut)}</p>
        </div>
        <div className="bg-white px-5 py-3">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 mb-0.5">Guests</p>
          <p className="font-semibold text-gray-900 text-sm flex items-center gap-1">
            <Users className="w-3.5 h-3.5 text-gray-400" />
            {booking.guests}
          </p>
        </div>
        <div className="bg-white px-5 py-3">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 mb-0.5">Nights</p>
          <p className="font-semibold text-gray-900 text-sm flex items-center gap-1">
            <Moon className="w-3.5 h-3.5 text-gray-400" />
            {booking.nights}
          </p>
        </div>
      </div>

      {/* Amount */}
      <div className="px-5 py-4 border-t border-gray-100 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Total amount</span>
          <span className="font-semibold text-gray-900">{fmtINR(booking.totalAmount)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Due at check-in</span>
          <span className="font-semibold text-gray-500">{fmtINR(remaining)}</span>
        </div>
        <div className="flex justify-between items-center pt-1 border-t border-dashed border-gray-200">
          <span className="text-sm font-bold text-gray-900">Advance to pay (20%)</span>
          <span className="text-lg font-black text-green-700">{fmtINR(booking.advanceAmount)}</span>
        </div>
      </div>

      {/* CTA */}
      <div className="px-5 pb-5 space-y-3">
        {booking.status === "PENDING" && (
          <>
            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-amber-50 border border-amber-200">
              <Clock className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-amber-800">Awaiting owner approval</p>
                <p className="text-xs text-amber-700 mt-0.5">Usually within 30 minutes</p>
              </div>
              {timeLeft > 0 && (
                <span className="font-mono text-xs font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-lg shrink-0">
                  {mm}:{ss}
                </span>
              )}
            </div>
            <button
              disabled
              className="w-full py-3 rounded-xl bg-gray-100 text-gray-400 text-sm font-semibold flex items-center justify-center gap-2 cursor-not-allowed"
            >
              <CreditCard className="w-4 h-4" />
              Payment unlocks after approval
            </button>
          </>
        )}

        {booking.status === "APPROVED" && (
          <>
            <div className="flex items-center gap-2 p-3 rounded-xl bg-green-50 border border-green-200">
              <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
              <p className="text-xs font-semibold text-green-800">
                Approved! Pay advance now to confirm your stay.
              </p>
            </div>
            <button
              onClick={onGoToPayment}
              className="w-full py-3.5 rounded-xl bg-green-700 hover:bg-green-800 active:scale-[0.98] transition-all text-white text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-green-200"
            >
              <CreditCard className="w-4 h-4" />
              Pay {fmtINR(booking.advanceAmount)} Now
              <ArrowRight className="w-4 h-4" />
            </button>
          </>
        )}
      </div>
    </div>
  );
}

/* ============================================================
   SEARCH FORM — extracted as component for reuse
============================================================ */
function SearchForm({
  refInput,
  phoneInput,
  loading,
  error,
  booking,
  formMinimized,
  setFormMinimized,
  setRefInput,
  setPhoneInput,
  setError,
  onSubmit,
}: {
  refInput: string;
  phoneInput: string;
  loading: boolean;
  error: string;
  booking: BookingDetails | null;
  formMinimized: boolean;
  setFormMinimized: (v: boolean) => void;
  setRefInput: (v: string) => void;
  setPhoneInput: (v: string) => void;
  setError: (v: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden mb-5 lg:mb-0">

      {/* ── MOBILE: slim minimized bar (only shown when booking loaded + minimized) ── */}
      {booking && formMinimized && (
        <button
          type="button"
          onClick={() => setFormMinimized(false)}
          className="lg:hidden w-full flex items-center justify-between px-4 py-3 text-left"
        >
          <div className="flex items-center gap-2.5">
            <Search className="w-4 h-4 text-gray-400" />
            <div>
              <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Booking ID</p>
              <p className="text-sm font-mono font-bold text-gray-900 tracking-wider">{refInput}</p>
            </div>
          </div>
          <ChevronDown className="w-5 h-5 text-gray-400" />
        </button>
      )}

      {/* ── Full form (always on desktop, toggle on mobile) ── */}
      <div className={`${booking && formMinimized ? "hidden lg:block" : "block"}`}>
        {/* Header — only show when booking loaded, acts as collapse trigger on mobile */}
        {booking && (
          <button
            type="button"
            onClick={() => setFormMinimized(true)}
            className="lg:hidden w-full flex items-center justify-between px-5 pt-4 pb-2 text-left"
          >
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
              Search again
            </p>
            <ChevronDown className="w-4 h-4 text-gray-400 rotate-180" />
          </button>
        )}

        <div className="px-5 pb-5 pt-4">
          {!booking && (
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-4">
              Enter details
            </p>
          )}

          <form onSubmit={onSubmit} className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wider">
                Booking ID
              </label>
              <input
                type="text"
                value={refInput}
                onChange={(e) => {
                  setError("");
                  setRefInput(e.target.value.toUpperCase());
                }}
                placeholder="e.g. TPH-2024-001"
                autoCapitalize="characters"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 text-sm font-mono tracking-widest outline-none focus:border-gray-900 focus:bg-white focus:ring-2 focus:ring-gray-900/10 transition-all placeholder:text-gray-300 placeholder:tracking-normal placeholder:font-sans"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wider">
                Mobile number{" "}
                <span className="normal-case font-normal text-gray-400">(your password)</span>
              </label>
              <input
                type="tel"
                inputMode="numeric"
                value={phoneInput}
                onChange={(e) => {
                  setError("");
                  setPhoneInput(e.target.value.replace(/\D/g, "").slice(0, 10));
                }}
                placeholder="10-digit number"
                maxLength={10}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 text-sm outline-none focus:border-gray-900 focus:bg-white focus:ring-2 focus:ring-gray-900/10 transition-all placeholder:text-gray-300"
              />
            </div>

            {error && (
              <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
                <AlertCircle className="w-4 h-4 shrink-0" />
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3.5 rounded-xl text-sm font-bold tracking-wide transition-all flex items-center justify-center gap-2 ${
                loading
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-gray-900 text-white hover:bg-gray-800 active:scale-[0.98] shadow-lg"
              }`}
            >
              {loading ? (
                <>
                  <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" opacity="0.25" />
                    <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                  Checking...
                </>
              ) : (
                <>
                  <Search className="w-4 h-4" />
                  {booking ? "Refresh status" : "Check status"}
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   MAIN COMPONENT
============================================================ */
export default function CheckBooking() {
  const router = useRouter();

  const [refInput, setRefInput] = useState("");
  const [phoneInput, setPhoneInput] = useState("");
  const [booking, setBooking] = useState<BookingDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [timeLeft, setTimeLeft] = useState(30 * 60);
  const [isOnline, setIsOnline] = useState(true);

  // Mobile form minimize state — auto-minimizes after successful check
  const [formMinimized, setFormMinimized] = useState(false);

  // Stable refs so polling closures never go stale
  const pollRef = useRef("");
  const pollPhone = useRef("");

  /* ── Online/offline ── */
  useEffect(() => {
    const on = () => setIsOnline(true);
    const off = () => setIsOnline(false);
    window.addEventListener("online", on);
    window.addEventListener("offline", off);
    setIsOnline(navigator.onLine);
    return () => {
      window.removeEventListener("online", on);
      window.removeEventListener("offline", off);
    };
  }, []);

  /* ── Core fetch ── */
  const fetchBooking = async (
    bRef: string,
    bPhone: string,
    silent = false
  ): Promise<BookingDetails | null> => {
    try {
      const cleanPhone = bPhone.replace(/\D/g, "").slice(-10);
      const res = await fetch(
        `/api/bookings/status?ref=${encodeURIComponent(bRef)}&phone=${cleanPhone}`
      );
      if (!res.ok) {
        if (!silent) setError("No booking found. Check your ID and number.");
        return null;
      }
      const data: BookingDetails = await res.json();
      if (!data?.bookingRef) {
        if (!silent) setError("No booking found.");
        return null;
      }
      return data;
    } catch {
      if (!silent) setError("Network error. Please try again.");
      return null;
    }
  };

  /* ── Submit ── */
  const handleCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimRef = refInput.trim().toUpperCase();
    const trimPhone = phoneInput.replace(/\D/g, "");

    if (!trimRef) { setError("Please enter your Booking ID."); return; }
    if (!/^\d{10}$/.test(trimPhone)) { setError("Enter a valid 10-digit mobile number."); return; }

    setError("");
    setLoading(true);
    setBooking(null);

    const data = await fetchBooking(trimRef, trimPhone);
    if (data) {
      setBooking(data);
      pollRef.current = data.bookingRef;
      pollPhone.current = trimPhone;

      // Auto-minimize form on mobile after successful fetch
      setFormMinimized(true);

      // Initialise timer for PENDING
      if (data.status === "PENDING") {
        const key = `timerStart_${data.bookingRef}`;
        if (!localStorage.getItem(key)) {
          localStorage.setItem(key, Date.now().toString());
        }
        const saved = localStorage.getItem(key);
        if (saved) {
          const elapsed = Math.floor((Date.now() - Number(saved)) / 1000);
          setTimeLeft(Math.max(30 * 60 - elapsed, 0));
        }
      }
    }

    setLoading(false);
  };

  /* ── Timer (PENDING only) ── */
  useEffect(() => {
    if (!booking || booking.status !== "PENDING") return;
    const t = setInterval(() => {
      setTimeLeft((prev) => (prev <= 1 ? 0 : prev - 1));
    }, 1000);
    return () => clearInterval(t);
  }, [booking?.bookingRef, booking?.status]);

  /* ── Poll every 10s (PENDING + APPROVED only) ── */
  useEffect(() => {
    if (!booking || booking.status === "PAID") return;
    const interval = setInterval(async () => {
      const data = await fetchBooking(pollRef.current, pollPhone.current, true);
      if (data) setBooking(data);
    }, 10_000);
    return () => clearInterval(interval);
  }, [booking?.bookingRef, booking?.status]);

  /* ── Go to payment with session prefill ── */
  const handleGoToPayment = () => {
    if (!booking) return;
    sessionStorage.setItem(
      "tph_booking",
      JSON.stringify({
        booking,
        creds: { mode: "check", ref: booking.bookingRef, phone: pollPhone.current },
        savedAt: Date.now(),
      })
    );
    router.push(`/payment?ref=${booking.bookingRef}`);
  };

  /* ── Reset ── */
  const handleReset = () => {
    setBooking(null);
    setRefInput("");
    setPhoneInput("");
    setError("");
    setTimeLeft(30 * 60);
    setFormMinimized(false);
    pollRef.current = "";
    pollPhone.current = "";
  };

  /* ============================================================
     RENDER
  ============================================================ */
  return (
    <section className=" bg-gray-50 py-8">
      <div className="container-fluid ">

        {/* Page header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-1">
            <h1 className="text-2xl font-black text-gray-900 tracking-tight">
              Your Reservation
            </h1>
            <span className={`flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border ${
              isOnline
                ? "bg-green-50 border-green-200 text-green-700"
                : "bg-red-50 border-red-200 text-red-700"
            }`}>
              {isOnline ? <Wifi className="w-3 h-3" /> : <WifiOff className="w-3 h-3" />}
              {isOnline ? "Live" : "Offline"}
            </span>
          </div>
          <p className="text-sm text-gray-500 leading-relaxed">
            Enter your Booking ID and mobile number to track status, pay, or view your confirmed receipt.
          </p>
          <div className="w-10 h-0.5 bg-green-700 mt-3 rounded-full" />
        </div>

        {/*
          ════════════════════════════════════════════════
          LAYOUT:
            Mobile  → single column, form on top, result below
            Desktop → flex row: form (fixed ~380px) | result (flex-1)
          ════════════════════════════════════════════════
        */}
        <div className="flex flex-col lg:flex-row lg:gap-6 lg:items-start">

          {/* ── LEFT: Search form ── */}
          <div className="lg:w-95 lg:shrink-0 lg:sticky lg:top-8">
            <SearchForm
              refInput={refInput}
              phoneInput={phoneInput}
              loading={loading}
              error={error}
              booking={booking}
              formMinimized={formMinimized}
              setFormMinimized={setFormMinimized}
              setRefInput={setRefInput}
              setPhoneInput={setPhoneInput}
              setError={setError}
              onSubmit={handleCheck}
            />

            {/* Desktop only: hint when no booking */}
            {!booking && !loading && (
              <div className="hidden lg:block mt-4 text-center">
                <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-3">
                  <Calendar className="w-5 h-5 text-gray-400" />
                </div>
                <p className="text-xs text-gray-400 mb-3 max-w-65 mx-auto leading-relaxed">
                  No reservation yet? Book your luxury stay first.
                </p>
                <Link
                  href="/booking"
                  className="inline-flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white px-5 py-2 rounded-full text-xs font-semibold transition-all active:scale-95"
                >
                  Book a Stay
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            )}
          </div>

          {/* ── RIGHT: Result area ── */}
          <div className="flex-1 min-w-0">
            {booking && (
              <div className="space-y-2">
                {/* PAID → full receipt inline, zero redirect */}
                {booking.status === "PAID" && (
                  <ConfirmedReceipt booking={booking} onReset={handleReset} />
                )}

                {/* PENDING or APPROVED → status card */}
                {(booking.status === "PENDING" || booking.status === "APPROVED") && (
                  <>
                    <BookingCard
                      booking={booking}
                      timeLeft={timeLeft}
                      onGoToPayment={handleGoToPayment}
                    />
                    {booking.status === "PENDING" && (
                      <p className="text-center text-xs text-gray-400 pt-1 flex items-center justify-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-pulse" />
                        Auto-refreshing every 10s
                      </p>
                    )}
                  </>
                )}
              </div>
            )}

            {/* Mobile empty state */}
            {!booking && !loading && (
              <div className="lg:hidden text-center py-8">
                <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-6 h-6 text-gray-400" />
                </div>
                <p className="text-sm font-bold text-gray-700 mb-1">No reservation found yet</p>
                <p className="text-xs text-gray-400 mb-5 max-w-xs mx-auto leading-relaxed">
                  Enter your Booking ID and mobile number above, or make a new booking.
                </p>
                <Link
                  href="/booking"
                  className="inline-flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white px-6 py-2.5 rounded-full text-sm font-semibold transition-all active:scale-95 shadow-md shadow-green-200"
                >
                  Book a Stay
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}