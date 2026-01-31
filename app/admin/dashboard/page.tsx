"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";
import StatisticsView from "./StatisticsView";
import BookingsView from "./BookingsView";
import GuestsView from "./GuestsView";
import EarningsView from "./EarningsView";
import SettingsView from "./SettingsView";

export default function DashboardPage() {
  const [activeMenu, setActiveMenu] = useState("Statistics");

  return (
    <div className="flex min-h-screen bg-[#0f172a] text-white">
      <Sidebar activeMenu={activeMenu} setActiveMenu={setActiveMenu} />

      <main className="flex-1 p-8">
        {activeMenu === "Statistics" && <StatisticsView />}
        {activeMenu === "Bookings" && <BookingsView />}
        {activeMenu === "Guests" && <GuestsView />}
        {activeMenu === "Earnings" && <EarningsView />}
        {activeMenu === "Villa Settings" && <SettingsView />}
      </main>
    </div>
  );
}
