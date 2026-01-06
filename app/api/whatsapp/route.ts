import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { checkIn, checkOut, guests, total } = await req.json();

  const message = encodeURIComponent(
    `New Villa Booking
CheckIn: ${checkIn}
CheckOut: ${checkOut}
Guests: ${guests}
Amount: ₹${total}`
  );

  return NextResponse.json({
    url: `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=${message}`,
  });
}
