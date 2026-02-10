import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Booking from "@/lib/models/Booking";

export async function GET() {
  try {
    await connectDB();

    const last30Days = new Date();
    last30Days.setDate(last30Days.getDate() - 30);

    const bookings = await Booking.aggregate([
      {
        $match: {
          paymentStatus: "PAID",
          createdAt: { $gte: last30Days },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%d %b", date: "$createdAt" },
          },
          amount: { $sum: "$advanceAmount" },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const formatted = bookings.map((b) => ({
      date: b._id,
      amount: b.amount,
    }));

    return NextResponse.json(formatted);
  } catch (error) {
    console.error("Earnings API error", error);
    return NextResponse.json(
      { error: "Failed to load earnings" },
      { status: 500 }
    );
  }
}
