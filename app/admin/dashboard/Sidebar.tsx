"use client";

import {
  Home,
  Calendar,
  Users,
  IndianRupee,
  Settings,
  HelpCircle,
} from "lucide-react";

const MENU = [
  { name: "Statistics", icon: Home },
  { name: "Bookings", icon: Calendar },
  { name: "Guests", icon: Users },
  { name: "Earnings", icon: IndianRupee },
  { name: "Villa Settings", icon: Settings },
];

export default function Sidebar({ activeMenu, setActiveMenu }: any) {
  return (
    <aside className="w-64 bg-[#020617] p-6 flex flex-col justify-between">
      <div>
        <h1 className="text-2xl font-bold mb-10">
          VILLA <span className="text-red-500">ADMIN</span>
        </h1>

        <nav className="flex flex-col gap-3 text-sm">
          {MENU.map((item) => (
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

      <button className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-800">
        <HelpCircle size={18} />
        Help & Support
      </button>
    </aside>
  );
}
