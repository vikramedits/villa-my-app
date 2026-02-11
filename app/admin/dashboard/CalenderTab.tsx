"use client";

import { useEffect, useState } from "react";
import { DateRange, RangeKeyDict } from "react-date-range";
import { addDays, format, isSameDay } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import toast, { Toaster } from "react-hot-toast";

interface Booking {
  date: string; // YYYY-MM-DD
}

export default function CalendarTab() {
  // ---------------- Selected range ----------------
  const [selectedRange, setSelectedRange] = useState({
    startDate: new Date(),
    endDate: addDays(new Date(), 1),
    key: "selection",
  });

  // ---------------- Booked dates ----------------
  const [bookedDates, setBookedDates] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);

  // ---------------- Fetch blocked dates ----------------
  useEffect(() => {
    const fetchBlockedDates = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/bookings/blocked");
        if (!res.ok) throw new Error("Failed to fetch booked dates");
        const data = await res.json(); // [{date: "YYYY-MM-DD"}, ...]
        setBookedDates(data);
      } catch (err) {
        console.error("Error fetching blocked dates:", err);
        toast.error("Failed to load blocked dates");
      } finally {
        setLoading(false);
      }
    };
    fetchBlockedDates();
  }, []);

  // ---------------- Check if date is booked ----------------
  const isDateBooked = (date: Date) =>
    bookedDates.some((b) => isSameDay(new Date(b.date), date));

  // ---------------- Handle range selection ----------------
  const handleRangeChange = (ranges: RangeKeyDict) => {
    const { startDate, endDate } = ranges.selection;

    // Prevent selecting booked dates
    let blocked = false;
    for (
      let d = new Date(startDate);
      d <= endDate;
      d.setDate(d.getDate() + 1)
    ) {
      if (isDateBooked(d)) {
        blocked = true;
        break;
      }
    }

    if (!blocked) {
      setSelectedRange(ranges.selection);
    } else {
      // Auto-adjust to first available range
      const nextAvailableStart = new Date(startDate);
      while (isDateBooked(nextAvailableStart)) {
        nextAvailableStart.setDate(nextAvailableStart.getDate() + 1);
      }
      const nextAvailableEnd = addDays(nextAvailableStart, 1);
      setSelectedRange({
        startDate: nextAvailableStart,
        endDate: nextAvailableEnd,
        key: "selection",
      });
      toast("Some dates were blocked, adjusted to next available range");
    }
  };

  // ---------------- Confirm booking (block selected range) ----------------
  const confirmBooking = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/bookings/blocked", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          startDate: format(selectedRange.startDate, "yyyy-MM-dd"),
          endDate: format(selectedRange.endDate, "yyyy-MM-dd"),
        }),
      });

      if (!res.ok) {
        const err = await res.json();

        if (res.status === 409) {
          toast("Dates already blocked", { icon: "⚠️" });
          return;
        }

        throw new Error(err.error || "Block failed");
      }

      toast.success("Dates blocked successfully");

      // 🔥 DB se fresh data lao (single source of truth)
      const fresh = await fetch("/api/bookings/blocked");
      setBookedDates(await fresh.json());
    } catch (err) {
      console.error(err);
      toast.error("Failed to block dates");
    } finally {
      setLoading(false);
    }
  };

  // ---------------- Toggle booked status (block/unblock single date) ----------------
  const toggleDateBooked = async (date: string) => {
    const booked = bookedDates.find((b) => b.date === date);

    try {
      setLoading(true);
      // Optimistic update
      if (booked) {
        setBookedDates((prev) => prev.filter((b) => b.date !== date));
      } else {
        setBookedDates((prev) => [...prev, { date }]);
      }

      // Call API
      const res = await fetch("/api/bookings/blocked", {
        method: booked ? "DELETE" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          startDate: date,
          endDate: date,
        }),
      });

      if (!res.ok) throw new Error("Failed to toggle date");

      toast.success(booked ? "Date unblocked" : "Date blocked");
    } catch (err) {
      console.error(err);
      toast.error("Action failed");
      // Rollback
      if (booked) {
        setBookedDates((prev) => [...prev, { date }]);
      } else {
        setBookedDates((prev) => prev.filter((b) => b.date !== date));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <p className="text-center text-lg md:text-2xl font-semibold text-gray-900 my-2">
        Calendar
      </p>
      <p className="border-b-2 border-gray-700 w-10 mx-auto"></p>
      <div className="px-2 md:px-8 flex flex-col md:flex-row gap-6 pt-4 md:pt-6">
        {/* ---------------- Calendar ---------------- */}
        <div className="bg-white rounded-2xl shadow-xl p-4 flex-1 relative">
          {loading && (
            <div className="absolute inset-0 bg-white/70 flex items-center justify-center rounded-2xl z-10">
              <span className="text-gray-800 font-semibold">Loading...</span>
            </div>
          )}
          <p className="text-xl font-semibold mb-4 text-gray-800">
            Select Dates
          </p>

          <DateRange
            ranges={[selectedRange]}
            onChange={handleRangeChange}
            minDate={new Date()}
            rangeColors={["#3b82f6"]}
            disabledDates={bookedDates.map((b) => new Date(b.date))}
            showMonthAndYearPickers
            direction="horizontal"
            moveRangeOnFirstSelection={false}
            editableDateInputs
          />
        </div>

        {/* ---------------- Booking Details ---------------- */}
        <div className="bg-white dark:bg-slate-900 text-gray-900 dark:text-white p-6 rounded-2xl shadow-xl flex-1 flex flex-col justify-between">
          <div>
            <p className="text-xl font-semibold mb-4">Booking Details</p>
            <div className="space-y-3 text-gray-700 dark:text-gray-200">
              <p>
                <span className="font-semibold">Check-in:</span>{" "}
                {format(selectedRange.startDate, "yyyy-MM-dd")}
              </p>
              <p>
                <span className="font-semibold">Check-out:</span>{" "}
                {format(selectedRange.endDate, "yyyy-MM-dd")}
              </p>
              <p>
                <span className="font-semibold">Nights:</span>{" "}
                {Math.max(
                  1,
                  Math.ceil(
                    (selectedRange.endDate.getTime() -
                      selectedRange.startDate.getTime()) /
                      (1000 * 60 * 60 * 24),
                  ),
                )}
              </p>
            </div>
          </div>

          <button
            onClick={confirmBooking}
            disabled={loading}
            className="mt-6 w-full py-3 bg-red-500 hover:bg-black text-white font-semibold rounded-lg transition disabled:opacity-50"
          >
            Booked
          </button>

          {/* ---------------- Fully booked dates ---------------- */}
          <div className="mt-6">
            <p className="text-lg font-semibold mb-3">Fully Booked Dates</p>
            <div className="bg-gray-50 dark:bg-slate-800 p-3 rounded-xl shadow-inner max-h-48 overflow-auto">
              <ul className="space-y-2">
                {bookedDates
                  .sort(
                    (a, b) =>
                      new Date(a.date).getTime() - new Date(b.date).getTime(),
                  )
                  .map((b, idx) => {
                    const booked = isDateBooked(new Date(b.date));
                    return (
                      <li
                        key={idx}
                        onClick={() => toggleDateBooked(b.date)}
                        className="flex justify-between items-center p-2 rounded-lg cursor-pointer hover:bg-gray-200 dark:hover:bg-slate-700 transition"
                        title="Click to block/unblock"
                      >
                        <span className="font-medium">{b.date}</span>
                        <span
                          className={`px-2 py-1 text-xs rounded-full font-semibold ${
                            booked
                              ? "bg-red-500 text-white"
                              : "bg-green-500 text-white"
                          }`}
                        >
                          {booked ? "Blocked" : "Available"}
                        </span>
                      </li>
                    );
                  })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
