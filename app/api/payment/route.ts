import { razorpay } from "@/lib/razorpay";
import { NextResponse } from "next/server";

export async function POST() {
  const order = await razorpay.orders.create({
    amount: 500000,
    currency: "INR",
  });

  return NextResponse.json(order);
}

