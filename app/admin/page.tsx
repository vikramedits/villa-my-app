import AdminCalendar from "@/components/AdminCalender";


export default function AdminPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <AdminCalendar />
      <p>Bookings & availability control</p>
    </div>
  );
}
