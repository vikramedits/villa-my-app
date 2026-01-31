import WhiteStatCard from "./WhiteStatCard";
import RecentBookings from "./RecentBookings";
import {
  BedDouble,
  CalendarCheck,
  TrendingUp,
  IndianRupee,
} from "lucide-react";
import MonthlyOccupancy from "./MonthlyOccupancy";
import EarningsOverview from "./EarningsView";

export default function StatisticsView() {
  return (
    <div className="flex flex-col gap-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        <WhiteStatCard
          title="Total Bookings"
          value="12"
          icon={BedDouble}
          info="Villa inventory"
        />
        <WhiteStatCard
          title="Monthly Bookings"
          value="7"
          icon={CalendarCheck}
          info="Current month"
          highlight
        />
        <WhiteStatCard
          title="Monthly Revenue"
          value="₹97,475"
          icon={IndianRupee}
          info="+12% from last month"
        />
        <WhiteStatCard
          title="Occupancy Rate"
          value="72%"
          icon={TrendingUp}
          info="Healthy performance"
        />
      </div>

      {/* Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <MonthlyOccupancy />
        <EarningsOverview />
      </div>

      <RecentBookings />
    </div>
  );
}
