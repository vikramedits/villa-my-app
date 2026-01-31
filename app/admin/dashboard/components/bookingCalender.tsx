"use client";

import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
// import RecentBookings from "./RecentBookings";

interface Booking {
  id: number;
  title: string;
  date: string;
}

export default function BookingCalender() {
  const [events, setEvents] = useState<Booking[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [newTitle, setNewTitle] = useState("");

  useEffect(() => {
    // Replace with API call in real app
    setEvents([
      { id: 1, title: "Booked", date: "2026-05-10" },
      { id: 2, title: "Booked", date: "2026-05-15" },
      { id: 3, title: "Booked", date: "2026-05-20" },
    ]);
  }, []);

  const handleDateClick = (info: DateClickArg) => {
    setSelectedDate(info.dateStr);
    setShowForm(true);
    setNewTitle("");
  };

  const handleAddBooking = () => {
    if (!selectedDate || !newTitle.trim()) return;
    const newBooking: Booking = {
      id: Date.now(),
      title: newTitle,
      date: selectedDate,
    };
    setEvents([...events, newBooking]);
    setShowForm(false);

    // TODO: Send POST request to backend API
  };

  const handleDeleteBooking = (id: number) => {
    setEvents(events.filter((e) => e.id !== id));
    // TODO: Send DELETE request to backend API
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 my-4">
        {/* Calendar */}
        <div className="w-full bg-white rounded-2xl text-black p-4 md:p-6 shadow-xl calendar-container border border-gray-200">
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            height="auto"
            events={events.map((e) => ({
              title: e.title,
              start: e.date,
              id: e.id.toString(),
            }))}
            eventColor="#ef4444"
            dateClick={handleDateClick}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "",
            }}
            dayCellClassNames={(args) =>
              args.isToday ? "bg-blue-100 rounded-lg" : ""
            }
            eventContent={(eventInfo) => (
              <div className="text-sm font-medium truncate px-1">
                {eventInfo.event.title}
              </div>
            )}
            eventClick={(info) => {
              if (confirm(`Delete booking on ${info.event.startStr}?`)) {
                handleDeleteBooking(Number(info.event.id));
              }
            }}
          />
        </div>

        {/* Recent Bookings */}
        <div className="w-full bg-slate-900 rounded-2xl p-4 md:p-6 shadow-xl">
          <h2 className="text-xl font-semibold mb-4 text-white">
            Recent Bookings
          </h2>
          <ul className="space-y-2">
            {events
              .slice(-5)
              .reverse()
              .map((e) => (
                <li
                  key={e.id}
                  className="bg-slate-800 p-2 rounded flex justify-between items-center text-white"
                >
                  <span className="font-semibold">{e.title}</span>
                  <span className="text-gray-300 text-sm">{e.date}</span>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
