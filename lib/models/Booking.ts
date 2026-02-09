import { Schema, model, models, Document } from "mongoose";

export interface IBooking extends Document {
  name: string;
  phone: string;
  email?: string;

  checkIn: string;
  checkOut: string;
  guests: number;
  nights: number;
  totalAmount: number;
  advanceAmount: number; 

  bookingRef: string;

  status: "PENDING" | "APPROVED" | "CANCELLED";
  paymentStatus: "NOT_STARTED" | "PAYMENT_PENDING" | "PAID";

  approvedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const BookingSchema = new Schema<IBooking>(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: String,

    checkIn: { type: String, required: true },
    checkOut: { type: String, required: true },
    guests: { type: Number, required: true },
    nights: { type: Number, required: true },

    totalAmount: { type: Number, required: true },
    advanceAmount: { type: Number, required: true },

    bookingRef: { type: String, required: true, unique: true },

    status: {
      type: String,
      enum: ["PENDING", "APPROVED", "CANCELLED"],
      default: "PENDING",
    },

    paymentStatus: {
      type: String,
      enum: ["NOT_STARTED", "PAYMENT_PENDING", "PAID"],
      default: "NOT_STARTED",
    },

    approvedAt: Date,
  },
  { timestamps: true },
);

export default models.Booking || model<IBooking>("Booking", BookingSchema);
