"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useMemo, useState } from "react";

interface Earning {
  date: string;
  amount: number;
}

export default function EarningsOverview() {
  const [data, setData] = useState<Earning[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEarnings = async () => {
      try {
        setLoading(true);

        const res = await fetch("/api/admin/dashboard/earnings", {
          cache: "no-store",
        });

        if (!res.ok) throw new Error("Failed to fetch earnings");

        const json = await res.json();
        setData(json);
      } catch (error) {
        console.error("Failed to load earnings", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEarnings();
  }, []);

  const { lowest, highest, total } = useMemo(() => {
    if (!data.length) return { lowest: 0, highest: 0, total: 0 };

    const amounts = data.map((d) => d.amount);

    return {
      lowest: Math.min(...amounts),
      highest: Math.max(...amounts),
      total: amounts.reduce((a, b) => a + b, 0),
    };
  }, [data]);

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
          ) : data.length === 0 ? (
            <div className="h-full flex items-center justify-center text-gray-400">
              No earnings data yet
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
