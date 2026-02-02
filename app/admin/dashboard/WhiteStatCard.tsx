import React from "react";

interface WhiteStatCardProps {
  title: string;
  value: string | number;
  icon: any;
  info?: string;
  highlight?: boolean;
  onClick?: () => void; // click handler for opening modal
  children?: React.ReactNode; // 🔹 support animated/custom value
}

export default function WhiteStatCard({
  title,
  value,
  icon: Icon,
  info,
  highlight,
  onClick,
  children,
}: WhiteStatCardProps) {
  return (
    <div
      onClick={onClick}
      className={`bg-white text-slate-800 rounded-2xl p-6  shadow-xl cursor-pointer transition-transform hover:scale-105 ${
        highlight ? "" : ""
      }`}
    >
      <div className="flex justify-between items-center mb-2">
        <p className="text-sm text-gray-500">{title}</p>
        <Icon className="text-green-500" size={20} />
      </div>

      {/* 🔹 Show animated/custom children if passed */}
      <p className="text-2xl font-bold">{children ? children : value}</p>

      {info && <p className="text-xs text-gray-400 mt-1">{info}</p>}
    </div>
  );
}
