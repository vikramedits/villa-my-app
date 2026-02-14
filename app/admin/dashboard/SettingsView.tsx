"use client";

import { useEffect, useMemo, useRef, useState } from "react";

/* ================= Interfaces ================= */

interface MonthlyEntry {
  groupName: string;
  bookingRS: number;
  foodRS: number;
  startDate: string;
  endDate: string;
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

  const currentYear = new Date().getFullYear();
  const currentMonthIndex = new Date().getMonth(); // 0 = Jan, 11 = Dec

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

  /* ================= Calculations ================= */

  const [yearlyData, setYearlyData] = useState<YearData[]>(initialYearlyData);
  const [expandedYearIndex, setExpandedYearIndex] = useState<number | null>(
    null,
  );

  const yearlyTotals = useMemo(() => {
    return yearlyData.map((year) => ({
      months: year.months.map((month) => ({
        bookingRS: month.entries.reduce((acc, e) => acc + e.bookingRS, 0),
        foodRS: month.entries.reduce((acc, e) => acc + e.foodRS, 0),
      })),
      gross: year.months.reduce(
        (acc, month) => {
          const mBooking = month.entries.reduce((a, e) => a + e.bookingRS, 0);
          const mFood = month.entries.reduce((a, e) => a + e.foodRS, 0);
          return {
            bookingRS: acc.bookingRS + mBooking,
            foodRS: acc.foodRS + mFood,
          };
        },
        { bookingRS: 0, foodRS: 0 },
      ),
    }));
  }, [yearlyData]);

  /* ================= Dialog State ================= */
  const [showSaved, setShowSaved] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [animateDialog, setAnimateDialog] = useState(false);

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
    startDate: "",
    endDate: "",
  });

  /* ================= Open Dialogs ================= */

  const openAddDialog = (yIdx: number, mIdx: number) => {
    setEditingIndex({ year: yIdx, month: mIdx, entry: null });
    setFormData({
      groupName: "",
      bookingRS: "",
      foodRS: "",
      startDate: "",
      endDate: "",
    });
    setIsDialogOpen(true);

    // delay to trigger transition
    setTimeout(() => setAnimateDialog(true), 1); // small delay
  };

  const openEditDialog = (yIdx: number, mIdx: number, eIdx: number) => {
    const entry = yearlyData[yIdx].months[mIdx].entries[eIdx];
    setEditingIndex({ year: yIdx, month: mIdx, entry: eIdx });
    setFormData({
      groupName: entry.groupName,
      bookingRS: String(entry.bookingRS),
      foodRS: String(entry.foodRS),
      startDate: entry.startDate,
      endDate: entry.endDate,
    });
    setIsDialogOpen(true);
    setTimeout(() => setAnimateDialog(true), 10);
  };
  const closeDialog = () => {
    setAnimateDialog(false); // start closing animation
    setTimeout(() => setIsDialogOpen(false), 200); // match transition duration
  };

  /* ================= Save Entry ================= */

  const saveEntry = async () => {
    if (!editingIndex) return;

    const { year, month, entry } = editingIndex;

    try {
      const body = {
        year: yearlyData[year].year,
        month: yearlyData[year].months[month].month,
        entryIndex: entry,
        groupName: formData.groupName,
        bookingRS: Number(formData.bookingRS),
        foodRS: Number(formData.foodRS),
        startDate: formData.startDate,
        endDate: formData.endDate,
      };

      const res = await fetch("/api/villa-settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error("Server error:", errorText);
        throw new Error("Server responded with error");
      }

      const data = await res.json();

      if (!data?.success) {
        console.error("API returned:", data);
        throw new Error("Save failed");
      }

      // Local state update (UI instant)
      const newData = [...yearlyData];

      const entryData = {
        groupName: body.groupName,
        bookingRS: body.bookingRS,
        foodRS: body.foodRS,
        startDate: body.startDate,
        endDate: body.endDate,
      };

      if (entry === null) {
        newData[year].months[month].entries.push(entryData);
      } else {
        newData[year].months[month].entries[entry] = entryData;
      }

      setYearlyData(newData);
      setYearlyData(newData);
      setIsDialogOpen(false);

      setShowSaved(true);
      setFadeOut(false);
      setTimeout(() => setFadeOut(true), 1500);
      setTimeout(() => setShowSaved(false), 2000);
    } catch (err) {
      console.error(err);
      alert("Failed to save entry");
    }
  };
  /* ================= Delete Entry ================= */

  const deleteEntry = async (yIdx: number, mIdx: number, eIdx: number) => {
    if (!confirm("Delete this entry?")) return;

    try {
      const res = await fetch("/api/villa-settings/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          year: yearlyData[yIdx].year,
          month: yearlyData[yIdx].months[mIdx].month,
          entryIndex: eIdx,
        }),
      });

      const data = await res.json();
      if (!data.success) throw new Error("Delete failed");

      const newData = [...yearlyData];
      newData[yIdx].months[mIdx].entries.splice(eIdx, 1);
      setYearlyData(newData);
    } catch (err) {
      console.error(err);
      alert("Failed to delete entry");
    }
  };

  useEffect(() => {
    const fetchYearData = async () => {
      try {
        const res = await fetch(`/api/villa-settings/${currentYear}`, {
          cache: "no-store",
        });

        const months = await res.json();

        const updatedData = yearlyData.map((yearObj) => {
          if (yearObj.year === currentYear) return { ...yearObj, months };
          return yearObj;
        });

        setYearlyData(updatedData);
      } catch (err) {
        console.error(err);
      }
    };

    fetchYearData();
  }, [currentYear]);

  const autoOpenedRef = useRef(false);

  useEffect(() => {
    if (autoOpenedRef.current) return;

    const idx = currentYear - startYear;
    if (idx >= 0 && idx <= endYear - startYear) {
      setExpandedYearIndex(idx);
      autoOpenedRef.current = true;
    }
  }, [yearlyData]);

  /* ================= UI ================= */

  return (
    <div className="px-2 md:px-8 bg-slate-900 min-h-screen space-y-6 text-white pb-20">
      <p className="text-center text-lg md:text-2xl font-semibold py-4 mb-0">
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
              const gross = yearlyTotals[idx].gross;
              return (
                <div
                  key={year.year}
                  className={`min-w-55 bg-slate-700 p-4 rounded-2xl shadow border-2
                             ${year.year === currentYear ? "border-green-500" : "border-transparent"}`}
                >
                  <p
                    className={`text-lg tracking-wider font-bold ${
                      year.year === currentYear ? "text-green-400" : ""
                    }`}
                  >
                    {year.year}
                  </p>

                  <p className="flex justify-between">
                    <span>Booking</span>
                    <span>
                      ₹{Number(gross.bookingRS).toLocaleString("en-IN")}
                    </span>
                  </p>

                  <p className="flex justify-between">
                    <span>Food</span>
                    <span>₹{Number(gross.foodRS).toLocaleString("en-IN")}</span>
                  </p>

                  <p className="flex justify-between font-semibold border-t mt-2 pt-1">
                    <span>Gross Total</span>
                    <span>
                      ₹
                      {Number(gross.bookingRS + gross.foodRS).toLocaleString(
                        "en-IN",
                      )}
                    </span>
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
        const yearGross = yearlyTotals[yIdx].gross;
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
              <p
                className={`font-bold text-lg tracking-wider
                              ${
                                yearData.year === currentYear
                                  ? "text-green-500" // ✅ Current year (system date)
                                  : expandedYearIndex === yIdx
                                    ? "text-blue-400" // 🔹 Clicked/expanded year
                                    : "text-white" // ⚪ Normal year
                              }
                            `}
              >
                {yearData.year}
              </p>

              <p>
                Booking ₹{Number(yearGross.bookingRS).toLocaleString("en-IN")} |
                Food ₹{Number(yearGross.foodRS).toLocaleString("en-IN")}
              </p>
            </div>

            {isExpanded &&
              yearData.months.map((month, mIdx) => {
                const isCurrentMonth =
                  yearData.year === currentYear && mIdx === currentMonthIndex;

                const total = yearlyTotals[yIdx].months[mIdx];
                // const prev = calcPrevMonthTotal(yIdx, mIdx);

                return (
                  <div
                    key={month.month}
                    className={`bg-slate-700 p-2 md:p-4 mt-4 rounded-xl ${
                      isCurrentMonth ? "ring-2 ring-green-400" : ""
                    }`}
                  >
                    <div className="bg-slate-600 p-3 rounded-lg flex flex-col md:flex-row md:justify-between gap-2">
                      <span className="font-semibold flex items-center gap-2">
                        {month.month}
                        {isCurrentMonth && (
                          <span className="text-xs bg-green-600 px-2 py-0.5 rounded">
                            Current
                          </span>
                        )}
                      </span>

                      {/* Month Total */}
                      <div className="">
                        <span className="text-white font-bold mr-4">
                          Total:
                        </span>

                        <span className="text-green-300 mr-4">
                          Booking ₹{total.bookingRS.toLocaleString("en-IN")}
                        </span>

                        <span className="text-yellow-300">
                          Food ₹{total.foodRS.toLocaleString("en-IN")}
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
                                {e.startDate}
                                {e.endDate && <> → {e.endDate}</>}
                              </td>

                              <td className="border px-2 py-2">
                                ₹{Number(e.bookingRS).toLocaleString("en-IN")}
                              </td>

                              {/* Food + Actions merged */}
                              <td className="border px-2 py-2">
                                <div className="flex items-center justify-between gap-2">
                                  {/* Food amount */}
                                  <span className="whitespace-nowrap">
                                    ₹{Number(e.foodRS).toLocaleString("en-IN")}
                                  </span>

                                  {/* Action dots */}
                                  <div className="flex gap-2 shrink-0">
                                    <button
                                      onClick={() =>
                                        openEditDialog(yIdx, mIdx, i)
                                      }
                                      className="w-4 h-4 rounded-full bg-white hover:scale-110 transition"
                                      title="Edit"
                                    />

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
        <div className="fixed inset-0  flex items-center justify-center z-50 px-5">
          <div
            className={`bg-white  p-6 rounded-xl w-full max-w-md space-y-4 transform transition-all duration-200
                  ${animateDialog ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
          >
            <p className="text-lg font-bold text-red-600 uppercase tracking-wide  ">
              {editingIndex?.entry === null ? "Add Entry" : "Edit Entry"}
            </p>

            <label className="block mb-1 text-gray-700">Start Date</label>
            <input
              type="date"
              className="w-full p-2 rounded shadow-md text-black border-2 border-gray-300"
              value={formData.startDate}
              onChange={(e) =>
                setFormData({ ...formData, startDate: e.target.value })
              }
            />

            <label className="block mb-1 text-gray-700">End Date</label>
            <input
              type="date"
              className="w-full p-2 rounded shadow-md text-black border-2 border-gray-300"
              value={formData.endDate}
              min={formData.startDate}
              onChange={(e) =>
                setFormData({ ...formData, endDate: e.target.value })
              }
            />

            <input
              type="number"
              placeholder="Booking ₹"
              className="w-full p-2 rounded shadow-md  text-black border-2 border-gray-300"
              value={formData.bookingRS}
              onChange={(e) =>
                setFormData({ ...formData, bookingRS: e.target.value })
              }
            />
            <input
              type="number"
              placeholder="Food ₹"
              className="w-full p-2 rounded shadow-md  text-black border-2 border-gray-300 "
              value={formData.foodRS}
              onChange={(e) =>
                setFormData({ ...formData, foodRS: e.target.value })
              }
            />

            <div className="flex justify-between gap-3">
              <button
                onClick={closeDialog}
                className="bg-gray-600 px-4 py-2 w-24 rounded uppercase hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={saveEntry}
                className="bg-blue-600 px-4 py-2 w-24 rounded uppercase hover:bg-blue-700 transition-colors"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= Saved Popup ================= */}
      {showSaved && <div className="saved-popup">Saved!</div>}
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
