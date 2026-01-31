"use client";

export default function MonthlyOccupancy() {
  return (
    <div className="bg-white text-slate-800 rounded-2xl p-6 flex flex-col items-center shadow-sm">
      <p className="text-gray-500 mb-3 text-sm">Monthly Occupancy</p>

      <div className="relative w-32 h-32 rounded-full border-10 border-green-500 flex items-center justify-center">
        <span className="text-2xl font-bold text-slate-900">72%</span>
      </div>

      <p className="text-gray-500 mt-4 text-sm">18 booked nights out of 25</p>

      <p className="text-xs text-green-600 mt-1">↑ Better than last month</p>
    </div>
  );
}
