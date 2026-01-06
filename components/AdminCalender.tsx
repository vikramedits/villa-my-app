"use client";

import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

type BookingDate = {
  date: string;
};

export default function AdminCalendar() {
  const [blockedDates, setBlockedDates] = useState<Date[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // 🔄 Fetch blocked dates from backend
  useEffect(() => {
    async function fetchDates() {
      const res = await fetch("/api/availability");
      const data = await res.json();
      setBlockedDates(data.map((d: BookingDate) => new Date(d.date)));
    }
    fetchDates();
  }, []);

  // ➕ Block selected date
  async function blockDate() {
    if (!selectedDate) return;

    await fetch("/api/availability", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ date: selectedDate }),
    });

    setBlockedDates([...blockedDates, selectedDate]);
  }

  // ❌ Disable already blocked dates
  function isTileDisabled({ date }: { date: Date }) {
    return blockedDates.some(
      (d) => d.toDateString() === date.toDateString()
    );
  }

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Manage Availability</h2>

      <Calendar
        onChange={(value) => setSelectedDate(value as Date)}
        tileDisabled={isTileDisabled}
      />

      <button
        onClick={blockDate}
        className="mt-4 bg-red-600 text-white px-4 py-2 rounded"
      >
        Block Selected Date
      </button>
    </div>
  );
}
