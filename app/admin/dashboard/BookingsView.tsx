import { ChevronLeft, ChevronRight } from "lucide-react";
import { DAYS } from "./data";
import RecentBookings from "./RecentBookings";

export default function BookingsView() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="bg-slate-900 rounded-2xl p-6">
        <div className="flex justify-between mb-4">
          <h2 className="font-semibold">May 2026</h2>
          <div className="flex gap-2">
            <ChevronLeft />
            <ChevronRight />
          </div>
        </div>

        <div className="grid grid-cols-7 gap-2 text-center text-sm">
          {DAYS.map((d) => (
            <div key={d} className="text-gray-400">
              {d}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-slate-900 rounded-2xl p-6 col-span-2">
        <RecentBookings />
      </div>
    </div>
  );
}
