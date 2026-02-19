"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";
import StatisticsView from "./StatisticsView";
import BookingsView from "./BookingsView";
import EarningsView from "./EarningsView";
import SettingsView from "./SettingsView";
import CalenderTab from "./CalenderTab";

export default function DashboardPage() {
  const [activeMenu, setActiveMenu] = useState("Statistics");

  return (
    <div className=" pb-10">
      <div className="flex flex-col md:flex-row min-h-screen ">
        {/* ============== Left ============ */}
        <div className="md:w-1/5 text-white">
          <Sidebar activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
        </div>
        {/* ============ Right ============ */}

        <main className="md:w-4/5 flex-1  bg-white">
          {activeMenu === "Statistics" && <StatisticsView />}
          {activeMenu === "Bookings" && <BookingsView />}
          {activeMenu === "Calendar" && <CalenderTab />}
          {activeMenu === "Earnings" && <EarningsView />}
          {activeMenu === "Villa Settings" && <SettingsView />}
        </main>
      </div>
    </div>
  );
}
