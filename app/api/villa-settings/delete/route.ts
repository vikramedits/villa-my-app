import { connectDB } from "@/lib/db";
import VillaSettings from "@/lib/models/VillaSettings";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectDB();
    const { year, month, entryIndex } = await req.json();

    const monthDoc = await VillaSettings.findOne({ year, month });
    if (!monthDoc) return NextResponse.json({ success: false, message: "Month not found" });

    monthDoc.entries.splice(entryIndex, 1);
    await monthDoc.save();

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
  return NextResponse.json(
  { success: false, message: "Delete failed" },
  { status: 500 }
);
  }
}