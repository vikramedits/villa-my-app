import { connectDB } from "@/lib/db";
import Booking from "@/models/Booking";
import { NextResponse } from "next/server";

// GET blocked dates
export async function GET() {
  await connectDB();
  const bookings = await Booking.find({}).select("checkIn checkOut");

  const dates: { date: Date }[] = [];

  bookings.forEach((b) => {
    let current = new Date(b.checkIn);
    while (current <= b.checkOut) {
      dates.push({ date: new Date(current) });
      current.setDate(current.getDate() + 1);
    }
  });

  return NextResponse.json(dates);
}

// POST block date manually
export async function POST(req: Request) {
  const { date } = await req.json();

  await connectDB();
  await Booking.create({
    checkIn: date,
    checkOut: date,
    paid: true,
  });

  return NextResponse.json({ success: true });
}
