"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";

interface Earning {
  date: string;
  amount: number;
}

export default function EarningsOverview() {
  const [data, setData] = useState<Earning[]>([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Dummy data (API ke bad replace hoga)
  const dummyData: Earning[] = [
    { date: "Apr 1", amount: 2500 },
    { date: "Apr 5", amount: 4200 },
    { date: "Apr 10", amount: 3800 },
    { date: "Apr 15", amount: 5100 },
    { date: "Apr 20", amount: 6400 },
    { date: "Apr 25", amount: 7800 },
    { date: "Apr 30", amount: 6900 },
  ];

  useEffect(() => {
    // 🔜 FUTURE API SETUP
    const fetchEarnings = async () => {
      try {
        setLoading(true);

        // 🔜 Replace this later
        // const res = await fetch("/api/earnings");
        // const json = await res.json();
        // setData(json);

        setData(dummyData); // for now
      } catch (error) {
        console.error("Failed to load earnings");
      } finally {
        setLoading(false);
      }
    };

    fetchEarnings();
  }, []);

  const amounts = data.map((d) => d.amount);
  const lowest = Math.min(...amounts);
  const highest = Math.max(...amounts);
  const total = amounts.reduce((a, b) => a + b, 0);

  return (
    <>
      <div className="mx-2 md:mx-8 mt-4 md:mt-6  bg-gray-50 text-slate-800 rounded-2xl p-6 col-span-2 shadow-xl">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold text-lg">Earnings Overview</h2>
          <span className="text-sm text-gray-500">Last 30 days</span>
        </div>

        {/* GRAPH */}
        <div className="h-48">
          {loading ? (
            <div className="h-full flex items-center justify-center text-gray-400">
              Loading chart...
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="amount"
                  stroke="#2563eb"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* STATS */}
        <div className="flex justify-between text-sm text-gray-600 mt-4">
          <span>Lowest: ₹{lowest.toLocaleString()}</span>
          <span>Highest: ₹{highest.toLocaleString()}</span>
          <span>Total: ₹{total.toLocaleString()}</span>
        </div>
      </div>
    </>
  );
}
