import { Schema, model, models, Types } from "mongoose";

/* ================= Types ================= */

export interface MonthlyEntry {
  groupName: string;
  bookingRS: number;
  foodRS: number;
  startDate: string;
  endDate?: string;
}

export interface VillaSettingsDoc {
  year: number;
  month: string;
  entries: MonthlyEntry[];
}

/* ================= Schemas ================= */

const MonthlyEntrySchema = new Schema<MonthlyEntry>({
  groupName: { type: String, default: "" }, // ✅ not required
  bookingRS: { type: Number, required: true },
  foodRS: { type: Number, required: true },
  startDate: { type: String, required: true },
  endDate: { type: String },
});


const VillaSettingsSchema = new Schema<VillaSettingsDoc>({
  year: { type: Number, required: true },
  month: { type: String, required: true },
  entries: { type: [MonthlyEntrySchema], default: [] },
});

/* ================= Model ================= */

const VillaSettings =
  models.VillaSettings ||
  model<VillaSettingsDoc>("VillaSettings", VillaSettingsSchema);

export default VillaSettings;