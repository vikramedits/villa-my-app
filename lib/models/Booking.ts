import { Schema, model, Document, models } from "mongoose";

// TypeScript interface for Booking
export interface IBooking extends Document {
  name: string;
  phone: string;
  email?: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  nights: number;
  totalAmount: number;
  status: "Pending" | "Approved" | "Cancelled"; // allowed values
  bookingRef: string;
  createdAt: Date;
}

// Mongoose schema
const BookingSchema = new Schema<IBooking>({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: String,
  checkIn: { type: String, required: true },
  checkOut: { type: String, required: true },
  guests: { type: Number, required: true },
  nights: { type: Number, required: true },
  totalAmount: { type: Number, required: true },
  status: { type: String, enum: ["Pending", "Approved", "Cancelled"], default: "Pending" },
  bookingRef: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
});

// Prevent model overwrite issue in Next.js
export default models.Booking || model<IBooking>("Booking", BookingSchema);
