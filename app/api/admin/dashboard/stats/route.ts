import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Booking from "@/lib/models/Booking";
import { calculateMonthlyOccupancy } from "@/lib/dashboard/occupancy";

export async function GET() {
  try {
    // 🔹 Connect to MongoDB
    await connectDB();

    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    // 🔹 Fetch all stats in parallel
    const [totalBookings, monthlyBookings, revenueAgg, occupancy] = await Promise.all([
      Booking.countDocuments(),
      Booking.countDocuments({ createdAt: { $gte: startOfMonth } }),
      Booking.aggregate([
        {
          $match: {
            status: "PAID",
            createdAt: { $gte: startOfMonth },
          },
        },
        {
          $group: {
            _id: null,
            total: { $sum: "$totalAmount" },
          },
        },
      ]),
      calculateMonthlyOccupancy(),
    ]);

    const monthlyRevenue = revenueAgg[0]?.total || 0;

    // 🔹 Return JSON with caching headers
    return NextResponse.json(
      {
        totalBookings,
        monthlyBookings,
        monthlyRevenue,
        occupancyRate: occupancy.occupancyRate,
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "s-maxage=60, stale-while-revalidate=30",
        },
      }
    );
  } catch (err) {
    console.error("Failed to fetch dashboard stats:", err);

    // 🔹 Safe fallback
    return NextResponse.json(
      {
        totalBookings: 0,
        monthlyBookings: 0,
        monthlyRevenue: 0,
        occupancyRate: 0,
        error: "Failed to fetch dashboard stats",
      },
      { status: 500 }
    );
  }
}
