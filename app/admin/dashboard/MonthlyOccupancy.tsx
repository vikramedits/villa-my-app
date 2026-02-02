"use client";

import { useEffect, useState } from "react";

interface OccupancyData {
  month: string;
  totalNights: number;
  bookedNights: number;
  lastMonthPercentage: number;
  targetPercentage: number; // 🔥 NEW (e.g. 80%)
}

export default function MonthlyOccupancy() {
  const [data, setData] = useState<OccupancyData | null>(null);
  const [loading, setLoading] = useState(true);
  const [animatedPercent, setAnimatedPercent] = useState(0);

  // 🔹 Dummy data (API ke baad replace hoga)
  const dummyData: OccupancyData = {
    month: "April",
    totalNights: 25,
    bookedNights: 18,
    lastMonthPercentage: 65,
    targetPercentage: 80,
  };

  useEffect(() => {
    const fetchOccupancy = async () => {
      try {
        setLoading(true);

        // 🔜 FUTURE API MODE
        // const res = await fetch("/api/occupancy");
        // const json = await res.json();
        // setData(json);

        /*
          🔜 Backend se data is format mein aayega:

          {
            "month": "April",
            "totalNights": 30,
            "bookedNights": 21,
            "lastMonthPercentage": 68,
            "targetPercentage": 80
          }
        */

        setData(dummyData); // abhi dummy
      } catch (err) {
        console.error("Failed to load occupancy");
      } finally {
        setLoading(false);
      }
    };

    fetchOccupancy();
  }, []);

  // 🔹 Percentage calculation
  const percentage =
    data ? Math.round((data.bookedNights / data.totalNights) * 100) : 0;

  // 🔹 Animate percentage on load
  useEffect(() => {
    if (!data) return;

    let start = 0;
    const interval = setInterval(() => {
      start += 1;
      setAnimatedPercent(start);
      if (start >= percentage) clearInterval(interval);
    }, 15);

    return () => clearInterval(interval);
  }, [data, percentage]);

  if (loading || !data) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-xl flex items-center justify-center text-gray-400">
        Loading occupancy...
      </div>
    );
  }

  const isBetter = percentage >= data.lastMonthPercentage;

  // 🔹 Circle math
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const progressOffset =
    circumference - (animatedPercent / 100) * circumference;
  const targetOffset =
    circumference - (data.targetPercentage / 100) * circumference;

  return (
    <div className="bg-white text-slate-800 rounded-2xl p-6 flex flex-col items-center shadow-xl">
      <p className="text-gray-500 mb-3 text-sm">
        Monthly Occupancy ({data.month})
      </p>

      {/* CIRCULAR GRAPH */}
      <div className="relative w-32 h-32 group">
        <svg className="w-full h-full rotate-[-90deg]">
          {/* Background */}
          <circle
            cx="64"
            cy="64"
            r={radius}
            stroke="#e5e7eb"
            strokeWidth="10"
            fill="transparent"
          />

          {/* Target Ring (80%) */}
          <circle
            cx="64"
            cy="64"
            r={radius}
            stroke="#94a3b8"
            strokeWidth="2"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={targetOffset}
          />

          {/* Progress Ring */}
          <circle
            cx="64"
            cy="64"
            r={radius}
            stroke={isBetter ? "#22c55e" : "#ef4444"}
            strokeWidth="10"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={progressOffset}
            strokeLinecap="round"
          />
        </svg>

        {/* Percentage */}
        <span className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-slate-900">
          {animatedPercent}%
        </span>

        {/* Tooltip */}
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
          {data.bookedNights} / {data.totalNights} nights
        </div>
      </div>

      {/* DETAILS */}
      <p className="text-gray-500 mt-4 text-sm">
        {data.bookedNights} booked nights out of {data.totalNights}
      </p>

      <p
        className={`text-xs mt-1 ${
          isBetter ? "text-green-600" : "text-red-600"
        }`}
      >
        {isBetter ? "↑ Better" : "↓ Worse"} than last month
      </p>

      <p className="text-xs text-gray-400 mt-1">
        Target: {data.targetPercentage}%
      </p>
    </div>
  );
}
