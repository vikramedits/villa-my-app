// app/api/bookings/status/route.ts
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "bookings.json");

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const ref = url.searchParams.get("ref");
    const phone = url.searchParams.get("phone");

    if (!ref || !phone) {
      return new Response(
        JSON.stringify({ error: "Booking reference and phone required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    if (!fs.existsSync(filePath)) {
      return new Response(
        JSON.stringify({ error: "No bookings found" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    const bookings = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    const booking = bookings.find(
      (b: any) => b.bookingRef === ref && b.phone === phone
    );

    if (!booking) {
      return new Response(
        JSON.stringify({ error: "Booking not found" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    // ✅ Return full details + status
    return new Response(
      JSON.stringify({
        name: booking.name,
        phone: booking.phone,
        email: booking.email || "",
        checkIn: booking.checkIn,
        checkOut: booking.checkOut,
        guests: booking.guests,
        nights: booking.nights,
        totalAmount: booking.totalAmount,
        bookingRef: booking.bookingRef,
        status: booking.status, // Pending / Approved / Cancelled
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Booking status error:", err);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
