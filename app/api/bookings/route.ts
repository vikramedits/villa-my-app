// // app/api/bookings/route.ts
// import fs from "fs";
// import path from "path";
// import { v4 as uuidv4 } from "uuid";

// const filePath = path.join(process.cwd(), "bookings.json"); // JSON file to store bookings

// export async function POST(req: Request) {
//   try {
//     const body = await req.json();
//     const { name, phone, email, checkIn, checkOut, guests, nights, totalAmount } = body;

//     // Basic validation
//     if (!name || !phone || !checkIn || !checkOut || !guests || !nights || !totalAmount) {
//       return new Response(
//         JSON.stringify({ error: "Missing required booking fields" }),
//         { status: 400, headers: { "Content-Type": "application/json" } }
//       );
//     }

//     // Generate unique booking reference
//     const bookingRef = "BP" + uuidv4().slice(0, 8).toUpperCase();

//     // Read existing bookings from JSON file
//     const existingData = fs.existsSync(filePath)
//       ? JSON.parse(fs.readFileSync(filePath, "utf-8"))
//       : [];

//     const newBooking = {
//       name,
//       phone,
//       email: email || null,
//       checkIn,
//       checkOut,
//       guests,
//       nights,
//       totalAmount,
//       bookingRef,
//       status: "Pending",
//       createdAt: new Date().toISOString(),
//     };

//     existingData.push(newBooking);

//     // Save back to JSON file
//     fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2));

//     // Return booking reference to frontend
//     return new Response(
//       JSON.stringify({ bookingRef }),
//       { status: 200, headers: { "Content-Type": "application/json" } }
//     );

//   } catch (err) {
//     console.error("Booking creation error:", err);
//     return new Response(
//       JSON.stringify({ error: "Internal server error" }),
//       { status: 500, headers: { "Content-Type": "application/json" } }
//     );
//   }
// }
import { connectDB } from "@/lib/db";
import Booking from "@/lib/models/Booking";
import { v4 as uuidv4 } from "uuid";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  await connectDB();
  const body = await req.json();

  const bookingRef = "BP" + uuidv4().slice(0, 8).toUpperCase();

  const booking = await Booking.create({
    ...body,
    bookingRef,
    status: "Pending",
  });

  return NextResponse.json({ bookingRef });
}

export async function GET() {
  await connectDB();
  const bookings = await Booking.find().sort({ createdAt: -1 });
  return NextResponse.json(bookings);
}
