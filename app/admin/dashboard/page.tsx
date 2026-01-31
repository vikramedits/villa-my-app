"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";
import StatisticsView from "./StatisticsView";
import BookingsView from "./BookingsView";
import GuestsView from "./CalenderTab";
import EarningsView from "./EarningsView";
import SettingsView from "./SettingsView";

export default function DashboardPage() {
  const [activeMenu, setActiveMenu] = useState("Statistics");

  return (
    <div className=" pb-10">
      <div className="container-fluid grid grid-cols-1 md:flex text-white min-h-screen ">
        {/* ============== Left ============ */}
        <div className="w-full md:w-1/4 ">
          <Sidebar activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
        </div>
        {/* ============ Right ============ */}

        <main className="w-full md:w-9/12 pb-12 md:pb-0 md:p-6 bg-white">
          {activeMenu === "Statistics" && <StatisticsView />}
          {activeMenu === "Bookings" && <BookingsView />}
          {activeMenu === "Calender" && <GuestsView />}
          {activeMenu === "Earnings" && <EarningsView />}
          {activeMenu === "Villa Settings" && <SettingsView />}
        </main>
      </div>
    </div>
  );
}
