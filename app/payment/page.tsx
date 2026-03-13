"use client";

import { useSearchParams, useRouter } from "next/navigation";
import Script from "next/script";
import { useEffect, useState, useRef, Suspense } from "react";
import { Sun, Moon, Shield } from "lucide-react";

declare global {
  interface Window {
    Razorpay: any;
  }
}

/* ══════════════════════════════════════════════════════════════
   Constants
══════════════════════════════════════════════════════════════ */
const STORAGE_KEY = "tph_booking";      // sessionStorage key
const POLL_INTERVAL = 10_000;           // 10 seconds

/* ══════════════════════════════════════════════════════════════
   Helpers
══════════════════════════════════════════════════════════════ */
const fmt = (n: number) => n?.toLocaleString("en-IN") ?? "0";
const fmtDate = (d: string) =>
  new Date(d).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
const calcNights = (ci: string, co: string) =>
  Math.round((new Date(co).getTime() - new Date(ci).getTime()) / 86_400_000);

/* ── sessionStorage helpers (safe SSR) ── */
function ssGet(key: string): string | null {
  if (typeof window === "undefined") return null;
  try { return sessionStorage.getItem(key); } catch { return null; }
}
function ssSet(key: string, val: string) {
  if (typeof window === "undefined") return;
  try { sessionStorage.setItem(key, val); } catch {}
}
function ssDel(key: string) {
  if (typeof window === "undefined") return;
  try { sessionStorage.removeItem(key); } catch {}
}

/* ══════════════════════════════════════════════════════════════
   Clock Hook
══════════════════════════════════════════════════════════════ */
function useClock() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  const h = time.getHours();
  return {
    greet:
      h >= 6 && h < 12
        ? "Good Morning"
        : h >= 12 && h < 15
          ? "Good Afternoon"
          : h >= 15 && h < 21
            ? "Good Evening"
            : "Good Night",
    day: time.toLocaleDateString("en-US", { weekday: "long" }),
    clock: time.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    }),
    isDay: h >= 6 && h < 18,
  };
}

/* ══════════════════════════════════════════════════════════════
   Clock Block (reusable in left panels)
══════════════════════════════════════════════════════════════ */
function ClockBlock() {
  const { greet, day, clock, isDay } = useClock();
  return (
    <div className="text-right">
      <p className="text-xl font-bold text-gray-400 tracking-widest uppercase">{day}</p>
      <div className="flex items-center gap-2 justify-end">
        <p className="text-lg font-mono font-bold text-black">{clock}</p>
        {isDay ? (
          <Sun size={28} className="text-yellow-400" />
        ) : (
          <Moon size={28} className="text-indigo-400" />
        )}
      </div>
      <p className="text-md font-bold text-green-600">{greet}</p>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   LEFT — Check Booking (no ref in URL, no booking yet)
══════════════════════════════════════════════════════════════ */
function LeftCheckBooking({
  loading,
  error,
  bookingRef,
  phone,
  setBookingRef,
  setPhone,
  onSubmit,
}: {
  loading: boolean;
  error: string | null;
  bookingRef: string;
  phone: string;
  setBookingRef: (v: string) => void;
  setPhone: (v: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}) {
  return (
    <div className="px-3 md:px-5 flex flex-col bg-white">
      <div className="my-4 md:my-8">
        <div className="flex justify-between items-start mb-3 border border-gray-200 p-5 md:p-8 rounded-xl shadow-xl">
          <div>
            <p className="flex justify-center items-center gap-1 text-xs font-semibold tracking-wider uppercase text-gray-600 mb-3 bg-gray-200 px-2 py-2 rounded-md">
              <Shield size={16} /> Secure Access
            </p>
            <h1 className="text-xl flex flex-col font-black text-green-500 tracking-wide">
              Hello
              <span className="text-xl font-black text-black tracking-wide">
                Check your booking
              </span>
            </h1>
          </div>
          <ClockBlock />
        </div>
      </div>

      <p className="text-sm md:text-base text-gray-500 leading-relaxed md:max-w-md mb-6">
        Enter your <span className="font-medium text-gray-700">Booking ID</span> and{" "}
        <span className="font-medium text-gray-700">phone number</span> to view your reservation status.
      </p>

      <form onSubmit={onSubmit} className="flex flex-col gap-4 md:gap-5">
        {/* Booking ID */}
        <div className="group">
          <label className="block text-[11px] md:text-[12px] font-semibold tracking-widest uppercase text-gray-400 mb-1.5 group-focus-within:text-green-600 transition-colors">
            Booking ID
          </label>
          <input
            type="text"
            value={bookingRef}
            onChange={(e) => setBookingRef(e.target.value.toUpperCase())}
            placeholder="TPH-2024-001"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-black text-sm font-mono tracking-widest outline-none
                 focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-500/20 transition-all placeholder:text-gray-400 shadow-sm"
          />
        </div>

        {/* Phone */}
        <div className="group">
          <label className="block text-[11px] md:text-[12px] font-semibold tracking-widest uppercase text-gray-400 mb-1.5 group-focus-within:text-green-600 transition-colors">
            Phone Number
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="10-digit mobile number"
            maxLength={10}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-black text-sm outline-none
                 focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-500/20 transition-all placeholder:text-gray-400 shadow-sm"
          />
        </div>

        {error && (
          <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-lg bg-red-50 border border-red-200 text-red-600 text-xs md:text-sm font-medium shadow-sm">
            <svg viewBox="0 0 16 16" className="w-4 h-4 shrink-0" fill="none">
              <circle cx="8" cy="8" r="7" stroke="#ef4444" strokeWidth="1.5" />
              <path d="M8 5v3.5M8 11h.01" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className={`mt-2 w-full py-3.5 rounded-xl text-sm font-bold tracking-wide transition-all duration-200 flex items-center justify-center gap-2
      ${loading
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-black text-white hover:bg-gray-900 active:scale-95 shadow-lg"
            }`}
        >
          {loading ? (
            <>
              <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" opacity="0.25" />
                <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
              </svg>
              Fetching booking…
            </>
          ) : (
            <>Check Status <span className="text-green-400 ml-1">→</span></>
          )}
        </button>
      </form>

      <p className="text-[11px] text-gray-300 text-center mt-6">
        Your phone number is used as your password
      </p>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   LEFT — Login (ref in URL, need password to load)
══════════════════════════════════════════════════════════════ */
function LeftLogin({
  loading,
  error,
  bookingRef,
  password,
  setBookingRef,
  setPassword,
  onSubmit,
}: any) {
  return (
    <div className="px-3 md:px-5 flex flex-col bg-white">
      <div className="my-4 md:my-8">
        <div className="flex justify-between items-start mb-3 border border-gray-200 p-5 md:p-8 rounded-xl shadow-xl">
          <div>
            <p className="flex justify-center items-center gap-1 text-xs font-semibold tracking-wider uppercase text-gray-600 mb-3 bg-gray-200 px-2 py-2 rounded-md">
              <Shield size={16} /> Secure Access
            </p>
            <h1 className="text-xl flex flex-col font-black text-green-500 tracking-wide">
              Hello
              <span className="text-xl font-black text-black tracking-wide">
                View your booking
              </span>
            </h1>
          </div>
          <ClockBlock />
        </div>
      </div>

      <p className="text-sm md:text-base text-gray-500 leading-relaxed md:max-w-md mb-6">
        Enter your credentials to access your{" "}
        <span className="font-medium text-gray-700">booking details</span> and complete the{" "}
        <span className="font-semibold text-gray-800">advance payment</span>.
      </p>

      <form onSubmit={onSubmit} className="flex flex-col gap-4 md:gap-5">
        <div className="group">
          <label className="block text-[11px] md:text-[12px] font-semibold tracking-widest uppercase text-gray-400 mb-1.5 group-focus-within:text-green-600 transition-colors">
            Booking ID
          </label>
          <input
            type="text"
            value={bookingRef}
            onChange={(e) => setBookingRef(e.target.value.toUpperCase())}
            placeholder="TPH-2024-001"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-black text-sm font-mono tracking-widest outline-none
                 focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-500/20 transition-all placeholder:text-gray-500 placeholder:tracking-wider shadow-sm"
          />
        </div>

        <div className="group">
          <label className="block text-[11px] md:text-[12px] font-semibold tracking-widest uppercase text-gray-400 mb-1.5 group-focus-within:text-green-600 transition-colors">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-black text-sm outline-none
                 focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-500/20 transition-all placeholder:text-gray-500 shadow-sm"
          />
        </div>

        {error && (
          <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-lg bg-red-50 border border-red-200 text-red-600 text-xs md:text-sm font-medium shadow-sm">
            <svg viewBox="0 0 16 16" className="w-4 h-4 shrink-0" fill="none">
              <circle cx="8" cy="8" r="7" stroke="#ef4444" strokeWidth="1.5" />
              <path d="M8 5v3.5M8 11h.01" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className={`mt-2 w-full py-3.5 rounded-xl text-sm font-bold tracking-wide transition-all duration-200 flex items-center justify-center gap-2
      ${loading
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-black text-white hover:bg-gray-900 active:scale-95 shadow-lg"
            }`}
        >
          {loading ? (
            <>
              <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" opacity="0.25" />
                <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
              </svg>
              Verifying…
            </>
          ) : (
            <>Continue <span className="text-green-400 ml-1">→</span></>
          )}
        </button>
      </form>

      <p className="text-[11px] text-gray-300 text-center mt-6">
        Credentials sent via WhatsApp / SMS
      </p>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   LEFT — Greeting (booking loaded)
══════════════════════════════════════════════════════════════ */
function LeftGreeting({ booking }: { booking: any }) {
  const { greet, day, clock, isDay } = useClock();

  return (
    <div className="flex flex-col h-full p-4 md:p-10 bg-white">
      <div>
        <div className="flex justify-between items-start mb-6 border border-gray-200 p-5 md:p-8 rounded-xl shadow-xl">
          <div>
            <p className="flex justify-center items-center gap-1 text-xs font-semibold tracking-wider uppercase text-gray-600 mb-3 bg-gray-200 px-2 py-2 rounded-md">
              <Shield size={16} /> Secure Payment
            </p>
            <h1 className="text-xl flex flex-col font-medium text-green-500 tracking-wide">
              Welcome,
              <span className="text-2xl md:text-3xl font-bold text-gray-900 tracking-wide capitalize">
                {`Mr./Mrs. ${booking.name.split(" ")[0]}`}
              </span>
            </h1>
          </div>
          <div className="text-right">
            <p className="text-xl font-bold text-gray-400 tracking-widest uppercase">{day}</p>
            <div className="flex items-center gap-2 justify-end">
              <p className="text-lg font-mono font-bold text-black">{clock}</p>
              {isDay ? <Sun size={28} className="text-yellow-400" /> : <Moon size={28} className="text-indigo-400" />}
            </div>
            <p className="text-md font-bold text-green-600">{greet}</p>
          </div>
        </div>

        <p className="text-sm md:text-base text-gray-600 md:max-w-md leading-relaxed mb-8">
          We're delighted to have you here.
          <span className="block mt-2">
            Please confirm your{" "}
            <span className="font-semibold text-gray-800">advance payment</span> below to secure your reservation.
          </span>
          <span className="block mt-2 text-gray-500">We look forward to welcoming you soon.</span>
        </p>

        <div className="flex gap-3">
          <div className="flex-1 p-4 rounded-xl bg-gray-100 border border-gray-100">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">Property |</p>
            <p className="text-sm font-bold text-black">The Pushpa Heritage</p>
          </div>
          <div className={`flex-1 p-4 rounded-xl border ${
            booking.status === "APPROVED"
              ? "bg-green-600 border-green-600"
              : booking.status === "PAID"
                ? "bg-emerald-700 border-emerald-700"
                : "bg-yellow-500 border-yellow-500"
          }`}>
            <p className="text-xs font-bold uppercase tracking-wider text-white/70 mb-1">Status |</p>
            <p className="text-sm font-bold tracking-wider text-white">
              {booking.status === "APPROVED"
                ? "✓ Approved — Pay Now"
                : booking.status === "PAID"
                  ? "✓ Confirmed"
                  : "⏳ Awaiting Approval"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   RIGHT — Placeholder
══════════════════════════════════════════════════════════════ */
function RightPlaceholder() {
  return (
    <div className="relative flex flex-col items-center justify-center h-full bg-[#0a0a0a] overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(34,197,94,0.12) 0%, transparent 70%)" }}
      />
      <div className="relative text-center px-8">
        <div className="w-16 h-16 rounded-2xl border border-white/10 bg-white/4 flex items-center justify-center mx-auto mb-5">
          <svg viewBox="0 0 32 32" className="w-8 h-8" fill="none">
            <rect x="6" y="14" width="20" height="14" rx="2.5" stroke="white" strokeWidth="1.5" fillOpacity="0" />
            <path d="M10 14v-4a6 6 0 0 1 12 0v4" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
            <circle cx="16" cy="21" r="2.5" fill="#22c55e" />
          </svg>
        </div>
        <h3 className="text-[17px] font-bold text-white mb-2">Booking Details</h3>
        <p className="text-[12px] text-white/30 leading-relaxed max-w-[180px] mx-auto">
          Enter your booking ID and phone number to view your reservation
        </p>
        <div className="flex justify-center gap-1.5 mt-7">
          {[0, 200, 400].map((d, i) => (
            <span key={i} className="w-1 h-1 rounded-full bg-green-500/50 animate-pulse" style={{ animationDelay: `${d}ms` }} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   RIGHT — Status Panel (PENDING status)
══════════════════════════════════════════════════════════════ */
function RightStatusPanel({ booking }: { booking: any }) {
  const ci = booking.checkIn ? fmtDate(booking.checkIn) : null;
  const co = booking.checkOut ? fmtDate(booking.checkOut) : null;
  const n = booking.checkIn && booking.checkOut ? calcNights(booking.checkIn, booking.checkOut) : null;
  const remaining = (booking.totalAmount ?? 0) - (booking.advanceAmount ?? 0);

  const [timeLeft, setTimeLeft] = useState<number>(30 * 60);

  useEffect(() => {
    // Use sessionStorage for timer (tab-level, not cross-device)
    const key = `timerStart_${booking.bookingRef}`;
    const existing = ssGet(key);
    if (!existing) ssSet(key, Date.now().toString());
    const elapsed = Math.floor((Date.now() - Number(ssGet(key))) / 1000);
    const initial = Math.max(30 * 60 - elapsed, 0);
    setTimeLeft(initial);
    if (initial <= 0) return;
    const t = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) { clearInterval(t); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [booking.bookingRef]);

  const mm = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const ss = String(timeLeft % 60).padStart(2, "0");

  return (
    <div className="relative flex flex-col justify-center h-full bg-[#0a0a0a] overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.12]"
        style={{ backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)", backgroundSize: "28px 28px" }}
      />
      <div
        className="absolute -top-32 -right-32 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(234,179,8,0.08) 0%, transparent 65%)" }}
      />

      <div className="relative p-4 md:p-8 flex flex-col gap-4">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-white/30 mb-1">Booking</p>
            <p className="text-[13px] font-mono font-bold text-white/70 tracking-wider">{booking.bookingRef}</p>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
            <span className="text-[10px] font-semibold text-yellow-400 uppercase tracking-wide">Pending</span>
          </div>
        </div>

        <div className="pb-4 border-b border-white/6">
          <p className="text-[10px] font-semibold tracking-[0.15em] uppercase text-white/25 mb-1">Guest</p>
          <p className="text-[20px] font-black text-white tracking-tight">{booking.name}</p>
          {booking.phone && (
            <p className="text-[12px] text-white/30 mt-1 font-mono tracking-wider">{booking.phone}</p>
          )}
        </div>

        {(ci || co) && (
          <div className="grid grid-cols-2 gap-2">
            {([
              [ci, "Check-in"],
              [co, "Check-out"],
            ] as [string | null, string][])
              .filter(([v]) => v)
              .map(([val, label]) => (
                <div key={label} className="p-3.5 rounded-xl bg-white/3 border border-white/[0.07]">
                  <p className="text-[9px] tracking-[0.2em] uppercase text-white/25 mb-1.5">{label}</p>
                  <p className="text-[13px] font-bold text-white">{val}</p>
                </div>
              ))}
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          {([
            [`${booking.guests ?? 0} Guest${(booking.guests ?? 0) !== 1 ? "s" : ""}`, "👥"],
            n ? [`${n} Night${n > 1 ? "s" : ""}`, "🌙"] : null,
          ] as ([string, string] | null)[])
            .filter(Boolean)
            .map(([val, icon]) => (
              <div key={val} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/4 border border-white/[0.07]">
                <span className="text-xs">{icon}</span>
                <span className="text-xs font-semibold text-white/60">{val}</span>
              </div>
            ))}
        </div>

        {(booking.totalAmount > 0 || booking.advanceAmount > 0) && (
          <div className="rounded-2xl overflow-hidden border border-white/8">
            <div className="px-4 py-3 bg-white/4">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/40">Payment Summary</p>
            </div>
            <div className="px-4 py-3 space-y-2.5 bg-white/2">
              {booking.totalAmount > 0 && (
                <div className="flex justify-between items-center">
                  <span className="text-[12px] text-white/40">Total Amount</span>
                  <span className="text-[13px] font-bold text-white">₹{fmt(booking.totalAmount)}</span>
                </div>
              )}
              {booking.advanceAmount > 0 && (
                <div className="flex justify-between items-center">
                  <span className="text-[12px] text-white/40">Advance (20%)</span>
                  <span className="text-[13px] font-bold text-yellow-400">₹{fmt(booking.advanceAmount)}</span>
                </div>
              )}
              {remaining > 0 && (
                <div className="flex justify-between items-center pt-2 border-t border-white/6">
                  <span className="text-[12px] text-white/25">Due at check-in</span>
                  <span className="text-[12px] text-white/25">₹{fmt(remaining)}</span>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="flex items-start gap-3 p-4 rounded-xl bg-yellow-500/8 border border-yellow-500/15">
          <svg viewBox="0 0 20 20" className="w-4 h-4 mt-0.5 shrink-0" fill="none">
            <circle cx="10" cy="10" r="8" stroke="#facc15" strokeWidth="1.5" />
            <path d="M10 6v4l2.5 2.5" stroke="#facc15" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-0.5">
              <p className="text-[12px] font-bold text-yellow-400">Awaiting Owner Approval</p>
              {timeLeft > 0 && (
                <span className="text-[11px] font-mono text-yellow-400/70">{mm}:{ss}</span>
              )}
            </div>
            <p className="text-[11px] text-white/30 leading-relaxed mb-2">
              Once approved, this page will automatically show the payment option — no refresh needed.
            </p>
            <div className="flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-yellow-400/60 animate-pulse" style={{ animationDelay: "0ms" }} />
              <span className="w-1 h-1 rounded-full bg-yellow-400/60 animate-pulse" style={{ animationDelay: "300ms" }} />
              <span className="w-1 h-1 rounded-full bg-yellow-400/60 animate-pulse" style={{ animationDelay: "600ms" }} />
              <span className="text-[10px] text-white/20 ml-1">Checking for updates every 10s</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   RIGHT — Payment Panel (APPROVED, ready to pay)
══════════════════════════════════════════════════════════════ */
function RightPanel({
  booking,
  onPay,
  paying,
}: {
  booking: any;
  onPay: () => void;
  paying: boolean;
}) {
  const ci = booking.checkIn ? fmtDate(booking.checkIn) : null;
  const co = booking.checkOut ? fmtDate(booking.checkOut) : null;
  const n = booking.checkIn && booking.checkOut ? calcNights(booking.checkIn, booking.checkOut) : null;
  const remaining = (booking.totalAmount ?? 0) - (booking.advanceAmount ?? 0);

  return (
    <div className="relative flex flex-col justify-center h-full bg-[#0a0a0a] overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.12]"
        style={{ backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)", backgroundSize: "28px 28px" }}
      />
      <div
        className="absolute -top-32 -right-32 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(34,197,94,0.1) 0%, transparent 65%)" }}
      />

      <div className="relative p-4 md:p-8 flex flex-col gap-4 h-full">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-white/30 mb-1">Booking</p>
            <p className="text-[13px] font-mono font-bold text-white/70 tracking-wider">{booking.bookingRef}</p>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-500/10 border border-green-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-[10px] font-semibold text-green-400 uppercase tracking-wide">Active</span>
          </div>
        </div>

        <div className="pb-4 border-b border-white/6">
          <p className="text-[10px] font-semibold tracking-[0.15em] uppercase text-white/25 mb-1">Guest</p>
          <p className="text-[20px] font-black text-white tracking-tight">{booking.name}</p>
        </div>

        {(ci || co) && (
          <div className="grid grid-cols-2 gap-2">
            {([
              [ci, "Check-in"],
              [co, "Check-out"],
            ] as [string | null, string][])
              .filter(([v]) => v)
              .map(([val, label]) => (
                <div key={label} className="p-3.5 rounded-xl bg-white/3 border border-white/[0.07]">
                  <p className="text-[9px] tracking-[0.2em] uppercase text-white/25 mb-1.5">{label}</p>
                  <p className="text-[13px] font-bold text-white">{val}</p>
                </div>
              ))}
          </div>
        )}

        <div className="flex gap-2">
          {([
            [`${booking.guests} Guest${booking.guests !== 1 ? "s" : ""}`, "👥"],
            n ? [`${n} Night${n > 1 ? "s" : ""}`, "🌙"] : null,
          ] as ([string, string] | null)[])
            .filter(Boolean)
            .map(([val, icon]) => (
              <div key={val} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/4 border border-white/[0.07]">
                <span className="text-xs">{icon}</span>
                <span className="text-xs font-semibold text-white/60">{val}</span>
              </div>
            ))}
        </div>

        <div className="rounded-2xl overflow-hidden border border-white/8">
          <div className="px-4 py-3 bg-white/4 flex items-center justify-between">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/40">Payment Summary</p>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-green-500/15 text-green-400 border border-green-500/25 tracking-wide">
              20% ADVANCE
            </span>
          </div>
          <div className="px-4 py-3 space-y-2 bg-white/2">
            <div className="flex justify-between items-center">
              <span className="text-[12px] text-white/40">Total Amount</span>
              <span className="text-[13px] font-bold text-white">₹{fmt(booking.totalAmount)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[12px] text-white/30">Due at check-in</span>
              <span className="text-[12px] text-white/25">₹{fmt(remaining)}</span>
            </div>
          </div>
          <div className="px-4 py-4 bg-white/3 border-t border-white/5 flex items-center justify-between">
            <div>
              <p className="text-[11px] font-black text-green-400 uppercase tracking-wider mb-0.5">Pay Now</p>
              <p className="text-[10px] text-white/25">Secures your reservation</p>
            </div>
            <div className="text-right">
              <p className="text-[28px] font-black text-white leading-none">₹{fmt(booking.advanceAmount)}</p>
            </div>
          </div>
        </div>

        <button
          onClick={onPay}
          disabled={paying}
          className={`w-full py-4 rounded-xl text-[14px] font-black tracking-wide transition-all duration-150 flex items-center justify-center gap-2
            ${paying
              ? "bg-white/6 text-white/20 cursor-not-allowed"
              : "bg-green-500 text-white hover:bg-green-400 active:scale-[0.98] shadow-[0_0_0_0_rgba(34,197,94,0)] hover:shadow-[0_8px_30px_rgba(34,197,94,0.4)]"
            }`}
        >
          {paying ? (
            <>
              <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" opacity="0.25" />
                <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
              </svg>
              Processing payment…
            </>
          ) : (
            <>
              <svg viewBox="0 0 20 20" className="w-4 h-4" fill="none">
                <rect x="2" y="5" width="16" height="12" rx="2" stroke="white" strokeWidth="1.5" />
                <path d="M2 9h16" stroke="white" strokeWidth="1.5" />
                <circle cx="6" cy="13" r="1" fill="white" />
              </svg>
              Pay ₹{fmt(booking.advanceAmount)} Now
            </>
          )}
        </button>

        <div className="flex items-center justify-center gap-4">
          <div className="flex items-center gap-1.5">
            <svg viewBox="0 0 14 14" className="w-3 h-3" fill="none">
              <path d="M7 1L1.5 3.5V7c0 3 2.3 5.8 5.5 6.5C10.2 12.8 12.5 10 12.5 7V3.5L7 1z" stroke="#22c55e" strokeWidth="1.2" />
              <path d="M4.5 7l2 2 3-3" stroke="#22c55e" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
            <span className="text-[10px] text-white/20 font-medium">SSL Encrypted</span>
          </div>
          <div className="w-px h-3 bg-white/10" />
          <div className="flex items-center gap-1.5">
            <svg viewBox="0 0 14 14" className="w-3 h-3" fill="none">
              <rect x="1" y="3" width="12" height="9" rx="1.5" stroke="white" strokeWidth="1.2" opacity="0.3" />
              <path d="M1 6h12" stroke="white" strokeWidth="1.2" opacity="0.3" />
            </svg>
            <span className="text-[10px] text-white/20 font-medium">Razorpay</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   MAIN — PaymentContent
   Changes vs original:
   ① sessionStorage se booking restore on page reload
   ② Server = source of truth (fresh fetch on every load)
   ③ Credentials stored in ref so polling always has them
   ④ sessionStorage clear when booking is PAID / on success
══════════════════════════════════════════════════════════════ */
function PaymentContent() {
  const params = useSearchParams();
  const router = useRouter();

  const [booking, setBooking] = useState<any>(null);
  const [paying, setPaying] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [pageError, setPageError] = useState<string | null>(null);

  const [mode, setMode] = useState<"url-login" | "check">("url-login");

  // URL-login state
  const [bookingRef, setBookingRef] = useState("");
  const [password, setPassword] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  // Check-booking state
  const [checkRef, setCheckRef] = useState("");
  const [checkPhone, setCheckPhone] = useState("");
  const [checkLoading, setCheckLoading] = useState(false);
  const [checkError, setCheckError] = useState<string | null>(null);

  // ── refs so polling closure always has fresh credentials ──
  const modeRef = useRef<"url-login" | "check">("url-login");
  const checkPhoneRef = useRef("");
  const passwordRef = useRef("");
  const bookingRefForPoll = useRef("");

  useEffect(() => { modeRef.current = mode; }, [mode]);
  useEffect(() => { checkPhoneRef.current = checkPhone; }, [checkPhone]);
  useEffect(() => { passwordRef.current = password; }, [password]);

  /* ── Helper: save booking to sessionStorage ── */
  const persistBooking = (data: any, creds: { mode: "url-login" | "check"; ref: string; password?: string; phone?: string }) => {
    ssSet(STORAGE_KEY, JSON.stringify({ booking: data, creds, savedAt: Date.now() }));
  };

  /* ── Helper: clear persisted booking ── */
  const clearPersistedBooking = () => ssDel(STORAGE_KEY);

  /* ── Helper: redirect to success + clear storage ── */
  const redirectSuccess = (ref: string) => {
    clearPersistedBooking();
    router.replace(`/booking-success?ref=${ref}`);
  };

  /* ── Initial load ──
     Priority order:
     1. If ref in URL → try to restore from sessionStorage (same ref, APPROVED/PENDING, <30 min old)
     2. If restored & server confirms same status → show booking directly (no password prompt)
     3. Else → show login form
     4. If no ref in URL → check sessionStorage for "check" mode booking
  ── */
  useEffect(() => {
    const ref = params.get("ref");

    // ── Try to restore from sessionStorage first ──
    const raw = ssGet(STORAGE_KEY);
    if (raw) {
      try {
        const saved = JSON.parse(raw);
        const ageMin = (Date.now() - (saved.savedAt ?? 0)) / 60_000;
        const matchesRef = ref ? saved.creds?.ref === ref : true;

        if (matchesRef && ageMin < 30 && saved.booking?.bookingRef) {
          // Restore credentials into state/refs immediately
          const c = saved.creds;
          if (c.mode === "url-login") {
            setMode("url-login");
            setBookingRef(c.ref ?? "");
            setPassword(c.password ?? "");
            passwordRef.current = c.password ?? "";
          } else {
            setMode("check");
            setCheckRef(c.ref ?? "");
            setCheckPhone(c.phone ?? "");
            checkPhoneRef.current = c.phone ?? "";
          }
          bookingRefForPoll.current = saved.booking.bookingRef;
          modeRef.current = c.mode;

          // Show cached booking immediately (fast UI)
          if (saved.booking.status !== "PAID") {
            setBooking(saved.booking);
          }

          // Then verify with server in background (source of truth)
          (async () => {
            try {
              let res: Response;
              if (c.mode === "url-login") {
                res = await fetch(`/api/bookings/by-ref?ref=${c.ref}&password=${c.password ?? ""}`);
              } else {
                res = await fetch(`/api/bookings/status?ref=${c.ref}&phone=${c.phone ?? ""}`);
              }
              if (!res.ok) {
                // Session expired or booking gone — clear and show login
                clearPersistedBooking();
                setBooking(null);
                setFetching(false);
                return;
              }
              const data = await res.json();
              if (data.status === "PAID") {
                redirectSuccess(data.bookingRef);
                return;
              }
              setBooking(data);
              persistBooking(data, c);
            } catch {
              // Network error — keep showing cached booking, polling will update
            } finally {
              setFetching(false);
            }
          })();
          return; // Early exit — handled above
        }
      } catch {
        ssDel(STORAGE_KEY); // Corrupt data — clear it
      }
    }

    // ── No valid sessionStorage — normal flow ──
    if (!ref) {
      setMode("check");
      setFetching(false);
      return;
    }

    setMode("url-login");
    setBookingRef(ref);

    (async () => {
      try {
        const res = await fetch(`/api/bookings/by-ref?ref=${ref}`);
        if (res.status === 404) throw new Error("Booking not found");
        if (res.status === 410) throw new Error("This payment link has expired");
        if (!res.ok) throw new Error("Something went wrong");
        const data = await res.json();
        if (data.status === "PAID") {
          redirectSuccess(ref);
          return;
        }
        // Booking loaded without password (public endpoint) — show booking
        setBooking(data);
        bookingRefForPoll.current = data.bookingRef;
      } catch (err: any) {
        setPageError(err.message ?? "Booking not found or expired");
      } finally {
        setFetching(false);
      }
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  /* ── URL-login submit ── */
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingRef.trim() || !password.trim()) {
      setLoginError("Please fill in both fields");
      return;
    }
    setLoginLoading(true);
    setLoginError(null);
    try {
      const res = await fetch(
        `/api/bookings/by-ref?ref=${bookingRef.trim()}&password=${password.trim()}`
      );
      if (res.status === 401) throw new Error("Invalid booking ID or password");
      if (res.status === 404) throw new Error("Booking not found");
      if (!res.ok) throw new Error("Something went wrong");
      const data = await res.json();
      if (data.status === "PAID") {
        redirectSuccess(data.bookingRef);
        return;
      }
      bookingRefForPoll.current = data.bookingRef;
      passwordRef.current = password.trim();
      modeRef.current = "url-login";
      persistBooking(data, { mode: "url-login", ref: bookingRef.trim(), password: password.trim() });
      setBooking(data);
    } catch (err: any) {
      setLoginError(err.message ?? "Unable to fetch booking");
    } finally {
      setLoginLoading(false);
    }
  };

  /* ── Phone-based check submit ── */
  const handleCheckBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimRef = checkRef.trim();
    const trimPhone = checkPhone.replace(/\D/g, "").slice(-10);

    if (!trimRef || !trimPhone) {
      setCheckError("Please fill in both fields");
      return;
    }
    if (!/^\d{10}$/.test(trimPhone)) {
      setCheckError("Enter a valid 10-digit phone number");
      return;
    }

    setCheckLoading(true);
    setCheckError(null);

    try {
      const res = await fetch(
        `/api/bookings/status?ref=${trimRef}&phone=${trimPhone}`
      );
      if (!res.ok) throw new Error("No booking found with these details");
      const data = await res.json();
      if (!data?.bookingRef) throw new Error("No booking found");

      if (data.status === "PAID") {
        redirectSuccess(data.bookingRef);
        return;
      }
      bookingRefForPoll.current = data.bookingRef;
      checkPhoneRef.current = trimPhone;
      modeRef.current = "check";
      persistBooking(data, { mode: "check", ref: trimRef, phone: trimPhone });
      setBooking(data);
    } catch (err: any) {
      setCheckError(err.message ?? "Could not find booking");
    } finally {
      setCheckLoading(false);
    }
  };

  /* ── Polling: re-fetch every 10s until PAID ──
     Uses refs so the closure always has fresh credentials,
     even after a page reload that restored from sessionStorage.
  ── */
  useEffect(() => {
    if (!booking) return;
    if (booking.status === "PAID") return;

    const poll = async () => {
      try {
        let res: Response;
        if (modeRef.current === "check") {
          const phone = checkPhoneRef.current;
          res = await fetch(`/api/bookings/status?ref=${bookingRefForPoll.current}&phone=${phone}`);
        } else {
          res = await fetch(`/api/bookings/by-ref?ref=${bookingRefForPoll.current}&password=${passwordRef.current}`);
        }
        if (!res.ok) return;
        const data = await res.json();
        if (!data?.bookingRef) return;

        if (data.status === "PAID") {
          redirectSuccess(data.bookingRef);
          return;
        }

        // Update state + re-persist fresh data
        setBooking(data);
        const creds =
          modeRef.current === "check"
            ? { mode: "check" as const, ref: bookingRefForPoll.current, phone: checkPhoneRef.current }
            : { mode: "url-login" as const, ref: bookingRefForPoll.current, password: passwordRef.current };
        persistBooking(data, creds);
      } catch {
        // silently ignore poll errors
      }
    };

    const interval = setInterval(poll, POLL_INTERVAL);
    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [booking?.bookingRef, booking?.status]);

  /* ── Payment ── */
  const handlePayment = async () => {
    if (!booking) return;
    setPaying(true);
    try {
      const res = await fetch("/api/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bookingRef: booking.bookingRef,
          amount: booking.advanceAmount,
        }),
      });
      if (!res.ok) throw new Error("Order creation failed");
      const order = await res.json();

      const razorpay = new window.Razorpay({
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: "INR",
        name: "The Pushpa",
        description: "Advance Payment",
        order_id: order.id,
        prefill: { name: booking.name, contact: booking.phone },
        theme: { color: "#22c55e" },
        handler: async (response: any) => {
          try {
            await fetch("/api/bookings/mark-paid", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                bookingRef: booking.bookingRef,
                paymentId: response.razorpay_payment_id,
              }),
            });
          } catch (err) {
            console.error("mark-paid failed:", err);
          } finally {
            redirectSuccess(booking.bookingRef);
          }
        },
        modal: { ondismiss: () => setPaying(false) },
      });
      razorpay.on("payment.failed", (r: any) => {
        alert(`Payment failed: ${r.error.description}`);
        setPaying(false);
      });
      razorpay.open();
    } catch (err) {
      console.error(err);
      alert("Could not initiate payment. Please try again.");
      setPaying(false);
    }
  };

  /* ── Loading ── */
  if (fetching)
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-gray-100 border-t-green-500 animate-spin" />
          <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-gray-300">Loading</p>
        </div>
      </div>
    );

  /* ── Error ── */
  if (pageError)
    return (
      <div className="min-h-screen flex items-center justify-center bg-white p-4">
        <div className="text-center max-w-xs">
          <div className="w-12 h-12 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center mx-auto mb-4">
            <svg viewBox="0 0 20 20" className="w-5 h-5" fill="none">
              <circle cx="10" cy="10" r="8" stroke="#ef4444" strokeWidth="1.5" />
              <path d="M10 6.5V10M10 13h.01" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
          <h2 className="text-lg font-black text-black mb-1">Link Unavailable</h2>
          <p className="text-sm text-gray-400 mb-5">{pageError}</p>
          <button
            onClick={() => router.replace("/")}
            className="px-7 py-3 rounded-xl bg-black text-white text-sm font-bold tracking-wide hover:bg-gray-900 transition-all"
          >
            Go Home
          </button>
        </div>
      </div>
    );

  /* ── Determine panels ── */
  const showPaymentPanel = booking && booking.status === "APPROVED" && booking.advanceAmount > 0;
  const showStatusPanel = booking && !showPaymentPanel;

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="beforeInteractive" />

      <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
        {/* LEFT */}
        <div className="min-h-[60vh] lg:min-h-screen">
          {booking ? (
            <LeftGreeting booking={booking} />
          ) : mode === "check" ? (
            <LeftCheckBooking
              loading={checkLoading}
              error={checkError}
              bookingRef={checkRef}
              phone={checkPhone}
              setBookingRef={setCheckRef}
              setPhone={setCheckPhone}
              onSubmit={handleCheckBooking}
            />
          ) : (
            <LeftLogin
              loading={loginLoading}
              error={loginError}
              bookingRef={bookingRef}
              password={password}
              setBookingRef={setBookingRef}
              setPassword={setPassword}
              onSubmit={handleLogin}
            />
          )}
        </div>

        {/* RIGHT */}
        <div className="min-h-[60vh] lg:min-h-screen">
          {showPaymentPanel ? (
            <RightPanel booking={booking} onPay={handlePayment} paying={paying} />
          ) : showStatusPanel ? (
            <RightStatusPanel booking={booking} />
          ) : (
            <RightPlaceholder />
          )}
        </div>
      </div>
    </>
  );
}

export default function PaymentPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-white">
          <div className="w-6 h-6 rounded-full border-2 border-gray-100 border-t-green-500 animate-spin" />
        </div>
      }
    >
      <PaymentContent />
    </Suspense>
  );
}