import { NextRequest, NextResponse } from "next/server";

// Replace with DB later
let bookings: any[] = [];

export async function POST(req: NextRequest) {
  const data = await req.json();

  const checkIn = new Date(data.checkIn);
  const checkOut = new Date(data.checkOut);
  const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000*60*60*24));
  const totalAmount = data.guests * nights * 1500;
  const bookingRef = `BK${Date.now()}`;

  const newBooking = {
    ...data,
    nights,
    totalAmount,
    bookingRef,
    status: "PENDING",
  };

  bookings.push(newBooking);

  return NextResponse.json({ bookingRef });
}
