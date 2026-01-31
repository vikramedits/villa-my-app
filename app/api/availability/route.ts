import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Booking from "@/lib/models/Booking";

interface IBooking {
  name: string;
  checkIn: string;
  checkOut: string;
  totalAmount: number;
  status: string;
}


export async function GET() {
  try {
    await connectDB(); // connect to MongoDB

const bookings: IBooking[] = await Booking.find();
    return NextResponse.json(bookings);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch bookings" }, { status: 500 });
  }
}
