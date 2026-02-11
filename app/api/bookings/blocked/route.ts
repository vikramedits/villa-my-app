import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import BlockedDate from "@/lib/models/BlockedDate";

const formatDate = (date: Date) => date.toISOString().split("T")[0];

const getDatesInRange = (start: Date, end: Date) => {
  const dates: Date[] = [];
  const current = new Date(start);
  while (current <= end) {
    dates.push(new Date(current));
    current.setDate(current.getDate() + 1);
  }
  return dates;
};

// ---------------- GET ----------------
export async function GET() {
  try {
    await connectDB();

    const dates = await BlockedDate.find().select("date -_id").lean();

    return NextResponse.json(
      dates.map((d) => ({ date: formatDate(d.date) })),
      { status: 200 },
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Fetch failed" }, { status: 500 });
  }
}

// ---------------- POST ----------------
export async function POST(req: Request) {
  try {
    const { startDate, endDate } = await req.json();
    if (!startDate)
      return NextResponse.json(
        { error: "startDate required" },
        { status: 400 },
      );

    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : start;

    await connectDB();

    const dates = getDatesInRange(start, end);

    const existing = await BlockedDate.find({
      date: { $in: dates },
    } as any)
      .select("date")
      .lean();

    const existingSet = new Set(existing.map((d) => formatDate(d.date)));

    const toInsert = dates
      .filter((d) => !existingSet.has(formatDate(d)))
      .map((d) => ({
        date: d,
        reason: "ADMIN_BLOCK",
      }));

    if (toInsert.length === 0) {
      return NextResponse.json(
        { error: "All dates already blocked" },
        { status: 409 },
      );
    }

    await BlockedDate.insertMany(toInsert as any[]);

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Block failed" }, { status: 500 });
  }
}

// ---------------- DELETE ----------------
export async function DELETE(req: Request) {
  try {
    const { startDate, endDate } = await req.json();
    if (!startDate)
      return NextResponse.json(
        { error: "startDate required" },
        { status: 400 },
      );

    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : start;

    await connectDB();

    const dates = getDatesInRange(start, end);

    const result = await BlockedDate.deleteMany({
      date: { $in: dates },
    });

    return NextResponse.json(
      { success: true, deleted: result.deletedCount },
      { status: 200 },
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Unblock failed" }, { status: 500 });
  }
}
