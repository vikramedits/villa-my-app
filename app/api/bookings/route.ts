import { connectDB } from "@/lib/db";
import Booking from "../../../lib/models/Booking";
import { v4 as uuidv4 } from "uuid";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    if (
      !body.name ||
      !body.phone ||
      !body.checkIn ||
      !body.checkOut ||
      !body.guests
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const checkInDate = new Date(body.checkIn);
    const checkOutDate = new Date(body.checkOut);

    const nights = Math.max(
      Math.ceil(
        (checkOutDate.getTime() - checkInDate.getTime()) /
          (1000 * 60 * 60 * 24),
      ),
      1,
    );

    const PRICE_PER_PERSON = body.pricePerPerson || 1500;
    const totalAmount = body.guests * nights * PRICE_PER_PERSON;
    const ADVANCE_PERCENT = 0.3; // 30% advance
    const advanceAmount = Math.round(totalAmount * ADVANCE_PERCENT);

    const bookingRef = "BP" + uuidv4().slice(0, 8).toUpperCase();

    const booking = await Booking.create({
      ...body,
      nights,
      totalAmount,
      advanceAmount, // ✅ ADD
      bookingRef,
      status: "PENDING",
      paymentStatus: "NOT_STARTED",
    });

    return NextResponse.json(booking);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function GET() {
  await connectDB();
  const bookings = await Booking.find().sort({ createdAt: -1 });
  return NextResponse.json(bookings);
}
