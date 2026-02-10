import Booking from "@/lib/models/Booking";

/**
 * Calculates the occupancy rate for the current month.
 * Includes error handling and safe defaults.
 */
export async function calculateMonthlyOccupancy() {
  try {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    // Total nights in the month (1 villa)
    const totalNights = endOfMonth.getDate();

    // Fetch bookings that overlap with this month and are approved or paid
    const bookings = await Booking.find({
      status: { $in: ["APPROVED", "PAID"] },
      checkIn: { $lte: endOfMonth },
      checkOut: { $gte: startOfMonth },
    });

    let bookedNights = 0;

    bookings.forEach((b) => {
      const checkIn = new Date(b.checkIn);
      const checkOut = new Date(b.checkOut);

      // Clip dates to current month
      const start = checkIn < startOfMonth ? startOfMonth : checkIn;
      const end = checkOut > endOfMonth ? endOfMonth : checkOut;

      // Nights booked
      const nights = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
      bookedNights += Math.max(0, nights);
    });

    // Calculate occupancy percentage
    const occupancyRate = totalNights ? Math.round((bookedNights / totalNights) * 100) : 0;

    return {
      month: now.toLocaleString("default", { month: "long" }),
      totalNights,
      bookedNights,
      occupancyRate,
      lastMonthPercentage: 65, // TODO: Calculate dynamically later
      targetPercentage: 80,     // Configurable target
    };
  } catch (err) {
    console.error("Occupancy calculation failed:", err);

    // Return safe default so frontend doesn't break
    const now = new Date();
    return {
      month: now.toLocaleString("default", { month: "long" }),
      totalNights: 0,
      bookedNights: 0,
      occupancyRate: 0,
      lastMonthPercentage: 0,
      targetPercentage: 80,
      error: "Failed to calculate occupancy",
    };
  }
}
