"use client";

import { useState } from "react";
import WhiteStatCard from "./WhiteStatCard";
import Modal from "./components/Modal"; // import your modal
import RecentBookings from "./RecentBookings";
import MonthlyOccupancy from "./MonthlyOccupancy";
import EarningsOverview from "./EarningsView";
import {
  BedDouble,
  CalendarCheck,
  TrendingUp,
  IndianRupee,
} from "lucide-react";

export default function StatisticsView() {
  const [selectedCard, setSelectedCard] = useState<any>(null);

  // Data for cards with their unique modal details
  const stats = [
    {
      title: "Total Bookings",
      value: "12",
      icon: BedDouble,
      info: "Villa inventory",
      highlight: false,
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
      value: "7",
      icon: CalendarCheck,
      info: "Current month",
      highlight: false,
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
      value: "₹97,475",
      icon: IndianRupee,
      info: "+12% from last month",
      highlight: false,
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
      value: "72%",
      icon: TrendingUp,
      info: "Healthy performance",
      highlight: false,
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
  ];

  return (
    <div className="flex flex-col gap-3 md:gap-10 w-full pt-5 md:pt-10">
      <p className="text-center text-xl md:text-2xl tracking-wider uppercase text-gray-900 shadow-md pb-2 md:pb-4 font-bold md:font-medium rounded-2xl">
        Statistics
      </p>
      {/* ============ Analytics ================ */}
      <div className="grid grid-cols-1 md:flex gap-6">
        <div className="w-full md:w-1/4">
          <MonthlyOccupancy />
        </div>
        <div className="w-full md:w-9/12">
          <EarningsOverview />
        </div>
      </div>
      {/* ================= cards ==================== */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 md:gap-6">
        {stats.map((stat) => (
          <WhiteStatCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            info={stat.info}
            highlight={stat.highlight}
            onClick={() => setSelectedCard(stat)}
          />
        ))}
      </div>

      <RecentBookings />

      {/* ================ Modal for card details =================== */}
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
