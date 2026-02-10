import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { calculateMonthlyOccupancy } from "@/lib/dashboard/occupancy";

export async function GET() {
  try {
    // Connect to MongoDB
    await connectDB();

    // Calculate occupancy
    const data = await calculateMonthlyOccupancy();

    // Return JSON with caching (1 minute)
    return NextResponse.json(data, {
      status: 200,
      headers: {
        "Cache-Control": "s-maxage=60, stale-while-revalidate=30",
      },
    });
  } catch (err) {
    console.error("Failed to fetch occupancy:", err);

    // Return safe default
    const now = new Date();
    return NextResponse.json(
      {
        month: now.toLocaleString("default", { month: "long" }),
        totalNights: 0,
        bookedNights: 0,
        occupancyRate: 0,
        lastMonthPercentage: 0,
        targetPercentage: 80,
        error: "Failed to fetch occupancy",
      },
      { status: 500 }
    );
  }
}
