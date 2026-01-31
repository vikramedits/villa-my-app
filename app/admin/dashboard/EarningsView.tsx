"use client";

export default function EarningsOverview() {
  return (
    <div className="bg-gray-50 text-slate-800 rounded-2xl p-6 col-span-2 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-lg">Earnings Overview</h2>
        <span className="text-sm text-gray-500 cursor-pointer">
          Last 30 days
        </span>
      </div>

      <div className="h-48 flex items-center justify-center text-gray-400">
        📊 Revenue graph (API / chart library later)
      </div>

      <div className="flex justify-between text-sm text-gray-500 mt-4">
        <span>Lowest: ₹2,500</span>
        <span>Highest: ₹7,800</span>
      </div>
    </div>
  );
}
