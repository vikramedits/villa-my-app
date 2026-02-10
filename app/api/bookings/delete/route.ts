import { NextResponse } from "next/server";
import { connectDB } from "../../../../lib/db";
import Booking from "../../../../lib/models/Booking";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { bookingId } = await req.json();

    if (!bookingId) {
      return NextResponse.json(
        { error: "Booking ID missing" },
        { status: 400 }
      );
    }

    await Booking.findByIdAndDelete(bookingId);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete booking error:", error);
    return NextResponse.json(
      { error: "Failed to delete booking" },
      { status: 500 }
    );
  }
}
