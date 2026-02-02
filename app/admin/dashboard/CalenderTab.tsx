"use client";

import { useState } from "react";
import { DateRange, RangeKeyDict } from "react-date-range";
import { addDays, format, isSameDay } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

interface Booking {
  date: string; // YYYY-MM-DD
}

export default function CalenderTab() {
  // ---------------- Selected range ----------------
  const [selectedRange, setSelectedRange] = useState({
    startDate: new Date(),
    endDate: addDays(new Date(), 1),
    key: "selection",
  });

  // ---------------- Booked dates ----------------
  const [bookedDates, setBookedDates] = useState<Booking[]>([
    { date: "2026-05-10" },
    { date: "2026-05-12" },
    { date: "2026-05-15" },
    { date: "2026-05-20" },
    { date: "2026-05-22" },
  ]);

  // ---------------- Check if date is booked ----------------
  const isDateBooked = (date: Date) =>
    bookedDates.some((b) => isSameDay(new Date(b.date), date));

  // ---------------- Handle range selection ----------------
  const handleRangeChange = (ranges: RangeKeyDict) => {
    // Prevent selecting booked dates by filtering them
    const { startDate, endDate } = ranges.selection;

    // Check if any date in the selected range is booked
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
      // Automatically prevent selection, no alert
      // Optionally, you can adjust the range to first available date
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
    }
  };

  // ---------------- Toggle booked status (block/unblock) ----------------
  const toggleDateBooked = (date: string) => {
    setBookedDates((prev) => {
      if (prev.find((b) => b.date === date)) {
        // Unblock
        return prev.filter((b) => b.date !== date);
      } else {
        // Block
        return [...prev, { date }];
      }
    });
  };

  // ---------------- Confirm booking ----------------
  const confirmBooking = () => {
    setBookedDates((prev) => [
      ...prev,
      ...Array.from(
        {
          length:
            (selectedRange.endDate.getTime() -
              selectedRange.startDate.getTime()) /
              (1000 * 60 * 60 * 24) +
            1,
        },
        (_, i) => {
          const d = new Date(selectedRange.startDate);
          d.setDate(d.getDate() + i);
          return { date: format(d, "yyyy-MM-dd") };
        },
      ),
    ]);
  };

  return (
    <>
      <p className="text-center text-lg md:text-2xl font-semibold text-gray-900 my-2">
        Calender
      </p>
      <p className="border-b-2 border-gray-700 w-10 mx-auto"></p>
      <div className="px-2 md:px-8 flex flex-col md:flex-row gap-6 pt-4 md:pt-6">
        {/* ---------------- Calendar ---------------- */}
        <div className="bg-white rounded-2xl shadow p-4 flex-1">
          <p className="text-xl font-semibold mb-4 text-gray-800">
            Select Dates
          </p>

          <DateRange
            ranges={[selectedRange]}
            onChange={handleRangeChange}
            minDate={new Date()}
            rangeColors={["#3b82f6"]}
            disabledDates={bookedDates.map((b) => new Date(b.date))}
            showMonthAndYearPickers={true}
            direction="horizontal"
            moveRangeOnFirstSelection={false}
            editableDateInputs={true}
          />
        </div>

        {/* ---------------- Booking Details ---------------- */}
        <div className="bg-white dark:bg-slate-900 text-gray-900 dark:text-white p-6 rounded-2xl shadow flex-1 flex flex-col justify-between">
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
                {Math.ceil(
                  (selectedRange.endDate.getTime() -
                    selectedRange.startDate.getTime()) /
                    (1000 * 60 * 60 * 24),
                )}
              </p>
            </div>
          </div>

          <button
            onClick={confirmBooking}
            className="mt-6 w-full py-3 bg-red-500 hover:bg-black text-white font-semibold rounded-lg transition"
          >
            Booked
          </button>

          {/* ---------------- Fully booked dates ---------------- */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-3">Fully Booked Dates</h3>
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
