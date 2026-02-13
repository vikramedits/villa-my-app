import { connectDB } from "@/lib/db";
import VillaSettings from "@/lib/models/VillaSettings";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();
    const {
      year,
      month,
      entryIndex, 
      groupName,
      bookingRS,
      foodRS,
      startDate,
      endDate,
    } = body;

    let monthDoc = await VillaSettings.findOne({ year, month });
    if (!monthDoc) {
      monthDoc = new VillaSettings({ year, month, entries: [] });
    }

    const newEntry = {
      groupName,
      bookingRS,
      foodRS,
      startDate,
      endDate,
    };

    if (
      typeof entryIndex === "number" &&
      entryIndex >= 0 &&
      entryIndex < monthDoc.entries.length
    ) {
      monthDoc.entries[entryIndex] = newEntry;
    } else {
      monthDoc.entries.push(newEntry);
    }

    await monthDoc.save();

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("POST villa-settings error:", err);

    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}