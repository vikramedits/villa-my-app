import { NextResponse } from "next/server";
import { connectDB } from "../../../../lib/db";
import Booking from "../../../../lib/models/Booking";

import { ObjectId } from "mongodb";

export async function POST(req: Request) {
  try {
    const { bookingId, status } = await req.json();

    if (!bookingId || !status) {
      return NextResponse.json(
        { error: "Missing bookingId or status" },
        { status: 400 }
      );
    }

    await connectDB();

    await Booking.findByIdAndUpdate(
      new ObjectId(bookingId),
      { status },
      { new: true }
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Update status error:", error);
    return NextResponse.json(
      { error: "Failed to update booking status" },
      { status: 500 }
    );
  }
}
