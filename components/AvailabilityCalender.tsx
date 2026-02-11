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

export default function UserCalendar() {
  // ---------------- Selected range ----------------
  const [selectedRange, setSelectedRange] = useState({
    startDate: new Date(),
    endDate: addDays(new Date(), 1),
    key: "selection",
  });

  const [blockedDates, setBlockedDates] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);
  const [available, setAvailable] = useState<boolean | null>(null);

  // ---------------- Fetch blocked dates ----------------
  const fetchBlockedDates = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/bookings/blocked");
      if (!res.ok) throw new Error("Failed to fetch blocked dates");
      const data: Booking[] = await res.json();
      setBlockedDates(data); // [{date: "YYYY-MM-DD"}, ...]
    } catch (err) {
      console.error(err);
      toast.error("Failed to load blocked dates");
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch + polling every 5s
  useEffect(() => {
    fetchBlockedDates();
    const interval = setInterval(fetchBlockedDates, 5000); // 5s polling
    return () => clearInterval(interval);
  }, []);

  // ---------------- Check if date is blocked ----------------
  const isDateBlocked = (date: Date) =>
    blockedDates.some((b) => isSameDay(new Date(b.date), date));

  // ---------------- Handle range selection ----------------
  const handleRangeChange = (ranges: RangeKeyDict) => {
    const { startDate, endDate } = ranges.selection;

    // Prevent selecting blocked dates
    let conflict = false;
    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
      if (isDateBlocked(d)) {
        conflict = true;
        break;
      }
    }

    if (!conflict) {
      setSelectedRange(ranges.selection);
      setAvailable(true);
    } else {
      toast.error("Some dates are already booked. Please select another range.");
      setAvailable(false);
    }
  };

  return (
    <div className="p-4 bg-white rounded-xl shadow-md relative">
      <Toaster position="top-right" reverseOrder={false} />

      {loading && (
        <p className="absolute top-2 right-2 text-gray-700 font-medium">Loading blocked dates...</p>
      )}

      <h3 className="text-lg font-semibold mb-2">Check Availability</h3>

      {/* ---------------- Calendar ---------------- */}
      <DateRange
        ranges={[selectedRange]}
        onChange={handleRangeChange}
        minDate={new Date()}
        rangeColors={["#3b82f6"]}
        disabledDates={blockedDates.map((b) => new Date(b.date))}
        moveRangeOnFirstSelection={false}
        editableDateInputs
        showMonthAndYearPickers
      />

      {/* ---------------- Selected Details ---------------- */}
      <div className="mt-4 space-y-2">
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
          {Math.ceil(
            (selectedRange.endDate.getTime() - selectedRange.startDate.getTime()) /
              (1000 * 60 * 60 * 24)
          )}
        </p>

        {available !== null && (
          <p
            className={`font-medium ${
              available ? "text-green-700" : "text-red-600"
            }`}
          >
            {available ? "Dates Available ✅" : "Dates Not Available ❌"}
          </p>
        )}
      </div>
    </div>
  );
}
