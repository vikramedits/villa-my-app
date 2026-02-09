import { connectDB } from "@/lib/db";
import Booking, { IBooking } from "@/lib/models/Booking";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const ref = searchParams.get("ref");
    const phone = searchParams.get("phone");

    if (!ref || !phone) {
      return NextResponse.json(
        { error: "Booking reference and phone are required" },
        { status: 400 }
      );
    }

    // TypeScript-safe query
    const booking: IBooking | null = await Booking.findOne({
      bookingRef: ref,
      phone,
    });

    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    // Return only necessary fields (optional)
   return NextResponse.json({
  name: booking.name,
  phone: booking.phone,
  email: booking.email || "",
  checkIn: booking.checkIn,
  checkOut: booking.checkOut,
  guests: booking.guests,
  nights: booking.nights,
  totalAmount: booking.totalAmount,
  advanceAmount: booking.advanceAmount,
  bookingRef: booking.bookingRef,
  status: booking.status,
  paymentStatus: booking.paymentStatus,
});

  } catch (err) {
    console.error("Booking status API error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
