"use client";

import { useState, useEffect } from "react";
import WhiteStatCard from "./WhiteStatCard";
import Modal from "./components/Modal";
import RecentBookings from "./RecentBookings";
import MonthlyOccupancy from "./MonthlyOccupancy";
import EarningsOverview from "./EarningsView";
import { BedDouble, CalendarCheck, TrendingUp, IndianRupee } from "lucide-react";
import CountUp from "react-countup"; // ✅ animated numbers

interface Stat {
  title: string;
  value: number | string;
  icon: any;
  info: string;
  highlight?: boolean;
  trend?: "up" | "down";
  details: React.ReactNode;
}

export default function StatisticsView() {
  const [stats, setStats] = useState<Stat[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCard, setSelectedCard] = useState<Stat | null>(null);

  // ==================== Fetch Stats (Future API) ====================
  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        // 🔜 FUTURE API integration
        // const res = await fetch("/api/stats");
        // const data = await res.json();
        // setStats(data);

        // 🔹 Dummy data for now
        setStats([
          {
            title: "Total Bookings",
            value: 12,
            icon: BedDouble,
            info: "Villa inventory",
            trend: "up",
            highlight: true,
            details: (
              <div>
                <p className="text-gray-700 font-semibold">All bookings:</p>
                <ul className="list-disc pl-5 mt-2 text-gray-600">
                  <li>John Doe - 2 nights</li>
                  <li>Mary Smith - 3 nights</li>
                  <li>Ali Khan - 1 night</li>
                  <li>Emma Johnson - 4 nights</li>
                </ul>
              </div>
            ),
          },
          {
            title: "Monthly Bookings",
            value: 7,
            icon: CalendarCheck,
            info: "Current month",
            trend: "up",
            highlight: true,
            details: (
              <div>
                <p className="text-gray-700 font-semibold">Bookings this month:</p>
                <ul className="list-disc pl-5 mt-2 text-gray-600">
                  <li>Michael - 2 nights</li>
                  <li>Sarah - 3 nights</li>
                  <li>Ravi - 1 night</li>
                </ul>
              </div>
            ),
          },
          {
            title: "Monthly Revenue",
            value: 97475,
            icon: IndianRupee,
            info: "+12% from last month",
            trend: "up",
            highlight: true,
            details: (
              <div>
                <p className="text-gray-700 font-semibold">Revenue breakdown:</p>
                <ul className="list-disc pl-5 mt-2 text-gray-600">
                  <li>Room A: ₹40,000</li>
                  <li>Room B: ₹35,000</li>
                  <li>Extras: ₹22,475</li>
                </ul>
              </div>
            ),
          },
          {
            title: "Occupancy Rate",
            value: 72,
            icon: TrendingUp,
            info: "Healthy performance",
            trend: "up",
            highlight: true,
            details: (
              <div>
                <p className="text-gray-700 font-semibold">Occupancy details:</p>
                <ul className="list-disc pl-5 mt-2 text-gray-600">
                  <li>Room A: 90%</li>
                  <li>Room B: 65%</li>
                  <li>Room C: 72%</li>
                </ul>
              </div>
            ),
          },
        ]);
      } catch (err) {
        console.error("Failed to fetch stats", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  // ==================== Render ====================
  return (
    <div className="flex flex-col gap-3 md:gap-10 w-full pt-5 md:pt-10">
      <p className="text-center text-xl md:text-2xl tracking-wider uppercase text-gray-900 shadow-md pb-2 md:pb-4 font-bold md:font-medium rounded-2xl">
        Statistics
      </p>

      {/* ===== Analytics: Occupancy + Earnings ===== */}
      <div className="grid grid-cols-1 md:flex gap-6">
        <div className="w-full md:w-1/4">
          <MonthlyOccupancy />
        </div>
        <div className="w-full md:w-9/12">
          <EarningsOverview />
        </div>
      </div>

      {/* ===== Stat Cards ===== */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 md:gap-6">
        {loading ? (
          <p className="text-gray-400 text-center col-span-4">Loading stats...</p>
        ) : (
          stats.map((stat) => (
            <WhiteStatCard
              key={stat.title}
              title={stat.title}
              icon={stat.icon}
              info={stat.info}
              highlight={stat.highlight}
              onClick={() => setSelectedCard(stat)}
            >
              {/* 🔹 Animated number */}
              <span
                className={`text-xl font-bold ${
                  stat.trend === "up" ? "text-green-600" : "text-red-600"
                }`}
              >
                {typeof stat.value === "number" ? (
                  <CountUp end={stat.value} duration={1.5} separator="," />
                ) : (
                  stat.value
                )}
                {stat.title === "Occupancy Rate" ? "%" : ""}
              </span>
            </WhiteStatCard>
          ))
        )}
      </div>

      {/* ===== Recent Bookings ===== */}
      <RecentBookings />

      {/* ===== Modal for card details ===== */}
      {selectedCard && (
        <Modal
          isOpen={!!selectedCard}
          closeModal={() => setSelectedCard(null)}
          title={selectedCard.title}
        >
          {selectedCard.details}
        </Modal>
      )}
    </div>
  );
}
