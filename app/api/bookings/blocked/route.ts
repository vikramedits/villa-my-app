import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Booking from "@/lib/models/Booking";

// Helper: format date to YYYY-MM-DD
const formatDate = (date: Date) => date.toISOString().split("T")[0];

// Helper: generate all dates in a range
const getDatesInRange = (start: Date, end: Date) => {
  const dates: string[] = [];
  const current = new Date(start);
  while (current <= end) {
    dates.push(formatDate(current));
    current.setDate(current.getDate() + 1);
  }
  return dates;
};

// ---------------- GET blocked dates ----------------
export async function GET() {
  try {
    await connectDB();

    const bookings = await Booking.find({}).select("checkIn checkOut -_id");
    const dates: string[] = [];

    bookings.forEach((b) => {
      const start = new Date(b.checkIn);
      const end = new Date(b.checkOut);
      dates.push(...getDatesInRange(start, end));
    });

    return NextResponse.json(
      dates.map((date) => ({ date })),
      { status: 200 }
    );
  } catch (err) {
    console.error("Failed to fetch blocked dates:", err);
    return NextResponse.json(
      { error: "Failed to fetch blocked dates" },
      { status: 500 }
    );
  }
}

// ---------------- POST block date(s) ----------------
export async function POST(req: Request) {
  try {
    const { startDate, endDate } = await req.json();

    if (!startDate) {
      return NextResponse.json({ error: "startDate is required" }, { status: 400 });
    }

    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : start;

    if (end < start) {
      return NextResponse.json({ error: "endDate cannot be before startDate" }, { status: 400 });
    }

    await connectDB();

    const datesToBlock = getDatesInRange(start, end);

    // Check conflicts
    const conflicts: string[] = [];
    for (const date of datesToBlock) {
      const existing = await Booking.findOne({
        checkIn: { $lte: date },
        checkOut: { $gte: date },
      });
      if (existing) conflicts.push(date);
    }

    const datesBlocked = datesToBlock.filter((d) => !conflicts.includes(d));

    // Block non-conflicting dates
    await Booking.insertMany(
      datesBlocked.map((date) => ({
        checkIn: date,
        checkOut: date,
        paid: true, // owner manual block
      }))
    );

    return NextResponse.json({ success: true, blocked: datesBlocked, conflicts }, { status: 201 });
  } catch (err) {
    console.error("Failed to block dates:", err);
    return NextResponse.json({ error: "Failed to block dates" }, { status: 500 });
  }
}

// ---------------- DELETE unblock date(s) ----------------
export async function DELETE(req: Request) {
  try {
    const { startDate, endDate } = await req.json();
    if (!startDate) {
      return NextResponse.json({ error: "startDate is required" }, { status: 400 });
    }

    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : start;

    if (end < start) {
      return NextResponse.json({ error: "endDate cannot be before startDate" }, { status: 400 });
    }

    await connectDB();

    const datesToUnblock = getDatesInRange(start, end);

    const result = await Booking.deleteMany({
      checkIn: { $in: datesToUnblock },
      checkOut: { $in: datesToUnblock },
      paid: true, // only manual blocked dates
    });

    return NextResponse.json({ success: true, deletedCount: result.deletedCount, dates: datesToUnblock }, { status: 200 });
  } catch (err) {
    console.error("Failed to unblock dates:", err);
    return NextResponse.json({ error: "Failed to unblock dates" }, { status: 500 });
  }
}
