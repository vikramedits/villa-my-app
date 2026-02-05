// app/api/config/pricing/route.ts
export async function GET() {
  return Response.json({
    pricePerPerson: 1500,
    advancePercent: 20,
    maxGuests: 30,
  });
}
