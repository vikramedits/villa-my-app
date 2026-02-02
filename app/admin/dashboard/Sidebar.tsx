"use client";

import { useState } from "react";
import {
  Home,
  Calendar,
  Users,
  IndianRupee,
  Settings,
  HelpCircle,
} from "lucide-react";
import MobilePortal from "@/components/MobilePortal";

const MAIN_MENU = [
  { name: "Statistics", icon: Home },
  { name: "Bookings", icon: Calendar },
  { name: "Calendar", icon: Users },
  { name: "Earnings", icon: IndianRupee },
];

const EXTRA_MENU = [
  { name: "Villa Settings", icon: Settings },
  { name: "Help & Support", icon: HelpCircle },
];

export default function Sidebar({ activeMenu, setActiveMenu }: any) {
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <>
      {/* =========================== Desktop ============================= */}
      <aside className="hidden md:flex w-full h-screen sticky top-0 bg-gray-950 p-6 flex-col">
        <div>
          <p className="text-2xl font-bold mb-10">
            VILLA <span className="text-red-500">ADMIN</span>
          </p>
          <nav className="flex flex-col gap-3 text-sm">
            {[...MAIN_MENU, ...EXTRA_MENU].map((item) => (
              <button
                key={item.name}
                onClick={() => setActiveMenu(item.name)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                  activeMenu === item.name ? "bg-red-500" : "hover:bg-slate-800"
                }`}
              >
                <item.icon size={18} />
                {item.name}
              </button>
            ))}
          </nav>
        </div>
      </aside>

      {/* ======================= Mobile ===================== */}
      <MobilePortal>
        <div
          className="fixed inset-x-0 bottom-0 w-full md:hidden
             bg-gray-950 border-t border-gray-800
             flex justify-around py-5
             z-50
             pb-[env(safe-area-inset-bottom)]"
        >
          {MAIN_MENU.map((item) => (
            <button
              key={item.name}
              onClick={() => setActiveMenu(item.name)}
              className="flex flex-col items-center text-xs text-white relative"
            >
              <item.icon
                size={20}
                className={`${activeMenu === item.name ? "text-red-500" : "text-white"}`}
              />
              {item.name}
              {/* Red line indicator */}
              {activeMenu === item.name && (
                <span className="absolute -bottom-1 w-6 h-0.5 bg-red-500 rounded-full"></span>
              )}
            </button>
          ))}

          <button
            onClick={() => setSheetOpen(true)}
            className="flex flex-col items-center text-xs text-white"
          >
            <Settings size={20} />
            More
          </button>
        </div>
      </MobilePortal>

      {/* ============== Bottom Sheet for mobile ================ */}
      <MobilePortal>
        <div
          className={`fixed bottom-0 inset-x-0 md:hidden bg-gray-950 rounded-t-2xl shadow-lg z-50 transition-transform duration-300 ${
            sheetOpen ? "translate-y-0" : "translate-y-full"
          }`}
        >
          {/* Grab bar + Close button */}
          <div className="flex justify-between items-center px-4 py-2">
            {/* Grab bar in the center */}
            <div className="flex-1 flex justify-center">
              <div className="w-12 h-1.5 bg-gray-600 rounded-full"></div>
            </div>

            {/* Close button */}
            <button
              onClick={() => setSheetOpen(false)}
              className="text-white p-1 rounded-full hover:bg-gray-800"
            >
              {/* You can use an arrow icon or X */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Menu items */}
          <nav className="flex flex-col gap-3 px-4 pb-6">
            {EXTRA_MENU.map((item) => (
              <button
                key={item.name}
                onClick={() => {
                  setActiveMenu(item.name);
                  setSheetOpen(false);
                }}
                className="flex items-center text-white gap-3 px-4 py-3 rounded-xl"
              >
                <item.icon size={18} />
                {item.name}
              </button>
            ))}
          </nav>
        </div>
      </MobilePortal>
    </>
  );
}
