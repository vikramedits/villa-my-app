"use client";

import { useState, useEffect } from "react";
import WhiteStatCard from "./WhiteStatCard";
import Modal from "./components/Modal";
import RecentBookings from "./RecentBookings";
import MonthlyOccupancy from "./MonthlyOccupancy";
import EarningsOverview from "./EarningsView";
import {
  BedDouble,
  CalendarCheck,
  TrendingUp,
  IndianRupee,
} from "lucide-react";
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

  const [occupancyRate, setOccupancyRate] = useState<number>(0);

  // ==================== Fetch Stats (Future API) ====================
  // 1️⃣ Fetch stats normally
  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/admin/dashboard/stats", {
          cache: "no-store",
        });
        const data = await res.json();

        setStats([
          {
            title: "Total Bookings",
            value: data.totalBookings,
            icon: BedDouble,
            info: "Villa inventory",
            trend: "up",
            highlight: true,
            details: <p>Total bookings till date</p>,
          },
          {
            title: "Monthly Bookings",
            value: data.monthlyBookings,
            icon: CalendarCheck,
            info: "Current month",
            trend: "up",
            highlight: true,
            details: <p>Bookings for current month</p>,
          },
          {
            title: "Monthly Revenue",
            value: data.monthlyRevenue,
            icon: IndianRupee,
            info: "Revenue this month",
            trend: "up",
            highlight: true,
            details: <p>Total paid revenue</p>,
          },
          {
            title: "Occupancy Rate",
            value: 0, // temporary 0, will update later
            icon: TrendingUp,
            info: "Monthly occupancy",
            trend: "up",
            highlight: true,
            details: <p>Calculated from booked nights</p>,
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

  // 2️⃣ Fetch occupancy separately
  useEffect(() => {
    const fetchOccupancy = async () => {
      try {
        const res = await fetch("/api/admin/dashboard/occupancy", {
          cache: "no-store",
        });
        const data = await res.json();
        setOccupancyRate(data.occupancyRate);

        // Update stats array with correct occupancyRate
        setStats((prevStats) =>
          prevStats.map((stat) =>
            stat.title === "Occupancy Rate"
              ? { ...stat, value: data.occupancyRate }
              : stat,
          ),
        );
      } catch (err) {
        console.error("Occupancy fetch failed", err);
      }
    };

    fetchOccupancy();
  }, []);

  // ==================== Render ====================
  return (
    <>
      <p className="text-center text-lg md:text-2xl font-semibold text-gray-900 my-2">
        Statistics
      </p>
      <p className="border-b-2 border-gray-700 w-10 mx-auto"></p>

      <div className="px-2 md:px-8 flex flex-col gap-3 md:gap-10 w-full pt-4 md:pt-6 ">
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
            <p className="text-gray-400 text-center col-span-4">
              Loading stats...
            </p>
          ) : (
            stats.map((stat) => (
              <WhiteStatCard
                key={stat.title}
                title={stat.title}
                icon={stat.icon}
                info={stat.info}
                highlight={stat.highlight}
                onClick={() => setSelectedCard(stat)}
                value={""}
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
    </>
  );
}
