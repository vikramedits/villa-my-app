"use client";

import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";

interface Booking {
  id: number;
  title: string;
  date: string;
  time: string;
}

const TIME_SLOTS = ["10:00 AM", "12:00 PM", "02:00 PM", "04:00 PM"];

export default function BookingCalendar() {
  const [events, setEvents] = useState<Booking[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // 🔜 GET API (example)
    setEvents([
      { id: 1, title: "Booked", date: "2026-05-10", time: "10:00 AM" },
      { id: 2, title: "Booked", date: "2026-05-10", time: "12:00 PM" },
      { id: 3, title: "Booked", date: "2026-05-15", time: "02:00 PM" },
    ]);
  }, []);

  const isDateFullyBooked = (date: string) => {
    return (
      events.filter((e) => e.date === date).length >= TIME_SLOTS.length
    );
  };

  const handleDateClick = (info: DateClickArg) => {
    if (isDateFullyBooked(info.dateStr)) {
      alert("This date is fully booked");
      return;
    }
    setSelectedDate(info.dateStr);
    setShowModal(true);
  };

  const handleAddBooking = async () => {
    if (!selectedDate || !title || !time) return;

    const newBooking: Booking = {
      id: Date.now(),
      title,
      date: selectedDate,
      time,
    };

    setEvents((prev) => [...prev, newBooking]);
    setShowModal(false);
    setTitle("");
    setTime("");

    // 🔜 POST API
    // await fetch("/api/bookings", { method: "POST", body: JSON.stringify(newBooking) });
  };

  const handleDeleteBooking = (id: number) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));

    // 🔜 DELETE API
    // await fetch(`/api/bookings/${id}`, { method: "DELETE" });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* CALENDAR */}
      <div className="bg-white  text-black rounded-2xl shadow">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={events.map((e) => ({
            id: e.id.toString(),
            title: `${e.title} (${e.time})`,
            start: e.date,
          }))}
          dateClick={handleDateClick}
          eventClick={(info) => {
            if (confirm("Delete this booking?")) {
              handleDeleteBooking(Number(info.event.id));
            }
          }}
          dayCellClassNames={(arg) =>
            isDateFullyBooked(arg.date.toISOString().split("T")[0])
              ? "bg-red-100 cursor-not-allowed"
              : ""
          }
        />
      </div>

      {/* RECENT BOOKINGS */}
      <div className="bg-slate-900 p-4 rounded-2xl shadow text-white">
        <h2 className="text-xl font-semibold mb-4">Recent Bookings</h2>
        <ul className="space-y-2">
          {events.slice(-5).reverse().map((e) => (
            <li
              key={e.id}
              className="bg-slate-800 p-2 rounded flex justify-between"
            >
              <span>{e.title}</span>
              <span className="text-sm text-gray-300">
                {e.date} · {e.time}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-80">
            <p className="text-lg font-semibold mb-3 text-black">
              Add Booking ({selectedDate})
            </p>

            <input
              className="w-full border px-3 py-2 rounded mb-3 text-black"
              placeholder="Booking title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <select
              className="w-full border px-3 py-2 rounded mb-4 text-black"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            >
              <option value="" className="text-black">Select Time</option>
              {TIME_SLOTS.map((t) => (
                <option
                  key={t}
                  value={t}
                  disabled={events.some(
                    (e) => e.date === selectedDate && e.time === t
                  )}
                >
                  {t}
                </option>
              ))}
            </select>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleAddBooking}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
