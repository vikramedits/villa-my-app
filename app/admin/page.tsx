
import { connectDB } from "@/lib/db";
import Booking from "@/lib/models/Booking";
import DashboardPage from "./dashboard/page";

interface IBooking {
  name: string;
  totalAmount: number;
  checkIn: string;
  status: string;
  createdAt: Date;
}


export default async function AdminDashboard() {
  await connectDB();

const allBookings: IBooking[] = await Booking.find().sort({ createdAt: -1 }).limit(5);

  const today = new Date().toISOString().split("T")[0];
  const totalRevenue = allBookings.reduce((sum, b) => sum + (b.totalAmount || 0), 0);
  const todayCheckins = allBookings.filter(b => b.checkIn === today).length;
  const pending = allBookings.filter(b => b.status === "Pending").length;
  const confirmed = allBookings.filter(b => b.status === "Approved").length;

  const stats = {
    total: allBookings.length,
    pending,
    confirmed,
    revenue: totalRevenue,
    todayCheckins,
  };

  // Pass DB data to Client Component
  return (
    <>
    <DashboardPage/>
    </>
  ) 
}
