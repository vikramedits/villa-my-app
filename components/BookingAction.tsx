interface Props {
  status: "PENDING" | "APPROVED" | "PAID";
  timeLeft: number;
  advanceAmount: number;
  bookingRef: string;
}

export default function BookingAction({
  status,
  timeLeft,
  advanceAmount,
  bookingRef,
}: Props) {
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="space-y-3">
      {/* TIMER */}
      {status === "PENDING" && timeLeft > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-yellow-800 text-center font-medium">
          ⏳ Owner usually responds within <b>30 minutes</b> <br />
          Time remaining: <b>{formatTime(timeLeft)}</b>
        </div>
      )}

      {status === "PENDING" && timeLeft === 0 && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-center p-2 rounded-lg">
          ⏰ Approval time expired. Please contact the owner.
        </div>
      )}

      {/* BUTTON */}
      {status === "PENDING" && (
        <button
          disabled
          className="w-full bg-gray-400 text-white py-3 rounded-lg font-bold cursor-not-allowed"
        >
          Payment Locked – Waiting for Owner Approval
        </button>
      )}

      {status === "APPROVED" && (
        <button
          onClick={() =>
            (window.location.href = `/payment?ref=${bookingRef}`)
          }
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-bold"
        >
          Pay Now ₹{advanceAmount.toLocaleString("en-IN")}
        </button>
      )}

      {status === "PAID" && (
        <p className="text-center text-green-700 font-semibold">
          🎉 Payment Completed
        </p>
      )}
    </div>
  );
}
