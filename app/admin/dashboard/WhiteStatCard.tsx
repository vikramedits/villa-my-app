export default function WhiteStatCard({
  title,
  value,
  icon: Icon,
  info,
  highlight,
}: any) {
  return (
    <div
      className={`bg-white text-slate-800 rounded-2xl p-6 shadow ${highlight && "ring-2 ring-red-500"}`}
    >
      <div className="flex justify-between">
        <p className="text-sm text-gray-500">{title}</p>
        <Icon className="text-red-500" size={20} />
      </div>
      <p className="text-2xl font-bold">{value}</p>
      <p className="text-xs text-gray-400">{info}</p>
    </div>
  );
}
