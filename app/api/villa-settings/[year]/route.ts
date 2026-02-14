import { connectDB } from "@/lib/db";
import VillaSettings from "@/lib/models/VillaSettings";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ year: string }> }
) {
  try {
    await connectDB();

    const { year } = await params;   // ✅ IMPORTANT
    const yearNum = Number(year);

    if (isNaN(yearNum)) {
      return NextResponse.json([], { status: 400 });
    }

    const monthsData = await VillaSettings.find({ year: yearNum }).lean();

    const allMonths = Array.from({ length: 12 }, (_, m) => {
      const monthName = new Date(0, m).toLocaleString("default", {
        month: "long",
      });

      const monthData = monthsData.find((x) => x.month === monthName);

      return monthData ?? { month: monthName, entries: [] };
    });

    return NextResponse.json(allMonths);
  } catch (err) {
    console.error("GET year error:", err);

    return NextResponse.json([], { status: 500 });
  }
}