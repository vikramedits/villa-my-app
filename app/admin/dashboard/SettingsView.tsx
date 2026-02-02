"use client";

import { useRef, useState } from "react";

/* ================= Interfaces ================= */

interface MonthlyEntry {
  groupName: string;
  bookingRS: number;
  foodRS: number;
  date: string;
}

interface MonthData {
  month: string;
  entries: MonthlyEntry[];
}

interface YearData {
  year: number;
  months: MonthData[];
}

/* ================= Component ================= */

export default function SettingsView() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -300 : 300,
      behavior: "smooth",
    });
  };

  /* ================= Year Setup ================= */

  const startYear = 2024;
  const endYear = 2032;

  const initialYearlyData: YearData[] = Array.from(
    { length: endYear - startYear + 1 },
    (_, i) => ({
      year: startYear + i,
      months: Array.from({ length: 12 }, (_, m) => ({
        month: new Date(0, m).toLocaleString("default", { month: "long" }),
        entries: [],
      })),
    }),
  );

  const [yearlyData, setYearlyData] = useState<YearData[]>(initialYearlyData);
  const [expandedYearIndex, setExpandedYearIndex] = useState<number | null>(0);

  /* ================= Dialog State ================= */

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<{
    year: number;
    month: number;
    entry: number | null;
  } | null>(null);

  const [formData, setFormData] = useState({
    groupName: "",
    bookingRS: "",
    foodRS: "",
    date: "",
  });

  /* ================= Open Dialogs ================= */

  const openAddDialog = (yIdx: number, mIdx: number) => {
    setEditingIndex({ year: yIdx, month: mIdx, entry: null });
    setFormData({ groupName: "", bookingRS: "", foodRS: "", date: "" });
    setIsDialogOpen(true);
  };

  const openEditDialog = (yIdx: number, mIdx: number, eIdx: number) => {
    const entry = yearlyData[yIdx].months[mIdx].entries[eIdx];
    setEditingIndex({ year: yIdx, month: mIdx, entry: eIdx });
    setFormData({
      groupName: entry.groupName,
      bookingRS: String(entry.bookingRS),
      foodRS: String(entry.foodRS),
      date: entry.date,
    });
    setIsDialogOpen(true);
  };

  /* ================= Save Entry ================= */

  const saveEntry = () => {
    if (!editingIndex) return;

    const { year, month, entry } = editingIndex;
    const newData = [...yearlyData];

    const newEntry: MonthlyEntry = {
      groupName: formData.groupName,
      bookingRS: Number(formData.bookingRS),
      foodRS: Number(formData.foodRS),
      date: formData.date,
    };

    if (entry === null) {
      newData[year].months[month].entries.push(newEntry);
    } else {
      newData[year].months[month].entries[entry] = newEntry;
    }

    setYearlyData(newData);
    setIsDialogOpen(false);
  };

  /* ================= Delete Entry ================= */

  const deleteEntry = (yIdx: number, mIdx: number, eIdx: number) => {
    if (!confirm("Delete this entry?")) return;
    const newData = [...yearlyData];
    newData[yIdx].months[mIdx].entries.splice(eIdx, 1);
    setYearlyData(newData);
  };

  /* ================= Calculations ================= */

  const calcMonthlyTotal = (y: number, m: number) =>
    yearlyData[y].months[m].entries.reduce(
      (acc, curr) => ({
        bookingRS: acc.bookingRS + curr.bookingRS,
        foodRS: acc.foodRS + curr.foodRS,
      }),
      { bookingRS: 0, foodRS: 0 },
    );

  const calcPrevMonthTotal = (y: number, m: number) =>
    m === 0 ? { bookingRS: 0, foodRS: 0 } : calcMonthlyTotal(y, m - 1);

  const calcYearGross = (y: number) =>
    yearlyData[y].months.reduce(
      (acc, month) => {
        const t = month.entries.reduce(
          (mAcc, e) => ({
            bookingRS: mAcc.bookingRS + e.bookingRS,
            foodRS: mAcc.foodRS + e.foodRS,
          }),
          { bookingRS: 0, foodRS: 0 },
        );
        return {
          bookingRS: acc.bookingRS + t.bookingRS,
          foodRS: acc.foodRS + t.foodRS,
        };
      },
      { bookingRS: 0, foodRS: 0 },
    );

  /* ================= UI ================= */

  return (
    <div className="px-2 md:px-8 bg-slate-900 min-h-screen space-y-6 text-white">
      <p className="text-center text-lg md:text-2xl font-semibold py-4">
        Villa Collection
      </p>
      <p className="border-b-2 border-gray-700 w-10 mx-auto" />

      {/* ================= Year Summary Scroll ================= */}

      <div className="relative w-full">
        <button
          onClick={() => scroll("left")}
          className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full z-10"
        >
          ◀
        </button>

        <div ref={scrollRef} className="overflow-x-auto py-2">
          <div className="flex gap-4 min-w-max">
            {yearlyData.map((year, idx) => {
              const gross = calcYearGross(idx);
              return (
                <div
                  key={year.year}
                  className="min-w-55 bg-slate-700 p-4 rounded-2xl shadow"
                >
                  <p className="text-lg tracking-wider font-bold">
                    {year.year}
                  </p>
                  <p>Booking RS: {gross.bookingRS}</p>
                  <p>Food RS: {gross.foodRS}</p>
                  <p className="font-semibold border-t mt-2 pt-1">
                    Gross Total: {gross.bookingRS + gross.foodRS}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <button
          onClick={() => scroll("right")}
          className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full z-10"
        >
          ▶
        </button>
      </div>

      {/* ================= Year Cards ================= */}

      {yearlyData.map((yearData, yIdx) => {
        const yearGross = calcYearGross(yIdx);
        const isExpanded = expandedYearIndex === yIdx;

        return (
          <div
            key={yearData.year}
            className="bg-slate-800 p-2 md:p-4 rounded-2xl"
          >
            <div
              className="bg-slate-700 p-3 rounded-xl cursor-pointer flex justify-between"
              onClick={() => setExpandedYearIndex(isExpanded ? null : yIdx)}
            >
              <p className="font-semibold text-lg">{yearData.year}</p>
              <p>
                Booking ₹{yearGross.bookingRS} | Food ₹{yearGross.foodRS}
              </p>
            </div>

            {isExpanded &&
              yearData.months.map((month, mIdx) => {
                const total = calcMonthlyTotal(yIdx, mIdx);
                const prev = calcPrevMonthTotal(yIdx, mIdx);

                return (
                  <div
                    key={month.month}
                    className="bg-slate-700 p-2 md:p-4 mt-4 rounded-xl"
                  >
                    <div className="bg-slate-600 p-3 rounded-lg flex flex-col md:flex-row md:justify-between gap-2">
                      <span className="font-semibold">{month.month}</span>

                      {/* Month Total */}
                      <div className="">
                        <span className="text-white font-bold mr-4">
                          Total:
                        </span>{" "}
                        <span className="text-green-300 mr-4">
                          Booking ₹{total.bookingRS}
                        </span>{" "}
                        <span className="text-yellow-300">
                          Food ₹{total.foodRS}
                        </span>
                      </div>
                    </div>

                    <div className="overflow-x-auto mt-3">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-slate-600">
                            <th className="border px-2">#</th>
                            <th className="border px-2">Date</th>
                            <th className="border px-2">Booking</th>
                            {/* <th className="border px-2">Group</th> */}
                            <th className="border px-2">Food</th>
                          </tr>
                        </thead>
                        <tbody>
                          {month.entries.map((e, i) => (
                            <tr key={i} className="bg-slate-500">
                              <td className="border px-2 py-2">{i + 1}</td>
                              <td className="border px-2 py-2 whitespace-nowrap">
                                {e.date}
                              </td>
                              {/* <td className="border px-2 py-2">
                                {e.groupName}
                              </td> */}
                              <td className="border px-2 py-2">
                                {e.bookingRS}
                              </td>

                              {/* Food + Actions merged */}
                              <td className="border px-2 py-2">
                                <div className="flex items-center justify-between gap-2">
                                  {/* Food amount */}
                                  <span className="whitespace-nowrap">
                                    {e.foodRS}
                                  </span>

                                  {/* Action dots */}
                                  <div className="flex gap-2 shrink-0">
                                    {/* Edit */}
                                    <button
                                      onClick={() =>
                                        openEditDialog(yIdx, mIdx, i)
                                      }
                                      className="w-4 h-4 rounded-full bg-white hover:scale-110 transition"
                                      title="Edit"
                                    />

                                    {/* Delete */}
                                    <button
                                      onClick={() => deleteEntry(yIdx, mIdx, i)}
                                      className="w-4 h-4 rounded-full bg-red-500 hover:scale-110 transition"
                                      title="Delete"
                                    />
                                  </div>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <button
                      onClick={() => openAddDialog(yIdx, mIdx)}
                      className="mt-3 bg-blue-600 px-4 py-2 rounded-sm"
                    >
                      Add Entry
                    </button>
                  </div>
                );
              })}
          </div>
        );
      })}

      {/* ================= Dialog ================= */}

      {isDialogOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-slate-800 p-6 rounded-xl w-full max-w-md space-y-4">
            <h2 className="text-lg font-semibold">
              {editingIndex?.entry === null ? "Add Entry" : "Edit Entry"}
            </h2>

            <input
              type="date"
              className="w-full p-2 rounded bg-slate-700"
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
            />
            {/* <input
              placeholder="Group Name"
              className="w-full p-2 rounded bg-slate-700"
              value={formData.groupName}
              onChange={(e) =>
                setFormData({ ...formData, groupName: e.target.value })
              }
            /> */}
            <input
              type="number"
              placeholder="Booking RS"
              className="w-full p-2 rounded bg-slate-700"
              value={formData.bookingRS}
              onChange={(e) =>
                setFormData({ ...formData, bookingRS: e.target.value })
              }
            />
            <input
              type="number"
              placeholder="Food RS"
              className="w-full p-2 rounded bg-slate-700"
              value={formData.foodRS}
              onChange={(e) =>
                setFormData({ ...formData, foodRS: e.target.value })
              }
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsDialogOpen(false)}
                className="bg-gray-600 px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={saveEntry}
                className="bg-blue-600 px-4 py-2 rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* 
==================== MongoDB Backend Integration (Future Use) ====================

👉 PURPOSE:
Villa / Resort ke liye yearly income tracking:
- Month-wise multiple group bookings
- Booking amount + Food amount
- Year-end summary calculation

-------------------------------------------------------------------------------
1️⃣ Add / Update Monthly Entry
-------------------------------------------------------------------------------
POST /api/villa-settings

Request Body:
{
  year: 2026,
  month: "May",
  groupName: "Group A",
  bookingRS: 12000,
  foodRS: 3000
}

Use case:
- Kisi specific month me ek group ki booking add/update karna
- Same month me multiple groups ho sakte hain

-------------------------------------------------------------------------------
2️⃣ Fetch Complete Year Data
-------------------------------------------------------------------------------
GET /api/villa-settings?year=2026

Response:
[
  {
    month: "January",
    entries: [
      { groupName: "Group A", bookingRS: 12000, foodRS: 3000 },
      { groupName: "Group B", bookingRS: 15000, foodRS: 4000 }
    ]
  },
  {
    month: "February",
    entries: [
      { groupName: "Group C", bookingRS: 18000, foodRS: 5000 }
    ]
  }
]

Use case:
- Admin dashboard me yearly table
- Month-wise breakdown dikhana

-------------------------------------------------------------------------------
3️⃣ Save / Update Year-End Summary
-------------------------------------------------------------------------------
POST /api/villa-settings/summary

Request Body:
{
  year: 2026,
  totalBookingRS: 500000,
  totalFoodRS: 100000,
  grossTotal: 600000
}

Use case:
- Saal ke end me final report
- Earnings / Tax / Profit calculation

-------------------------------------------------------------------------------
🗄️ MongoDB Schema (Suggested)
-------------------------------------------------------------------------------

VillaSettingsSchema {
  year: Number,               // e.g. 2026
  month: String,              // e.g. "May"
  entries: [
    {
      groupName: String,      // e.g. "Group A"
      bookingRS: Number,      // Booking amount
      foodRS: Number          // Food amount
    }
  ]
}

Optional Summary Collection:
YearSummarySchema {
  year: Number,
  totalBookingRS: Number,
  totalFoodRS: Number,
  grossTotal: Number
}

-------------------------------------------------------------------------------
📝 NOTES:
- Abhi UI static data pe chalega
- API routes baad me Next.js App Router me banenge
- MongoDB aggregation se totals nikale ja sakte hain

===============================================================================
*/
