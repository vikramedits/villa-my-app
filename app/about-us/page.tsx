import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="bg-[#F8F5F0] text-[#1E3A34] mb-5">
      {/* ================= HERO SECTION ================= */}
      <section className="relative w-full h-[70vh] md:h-[85vh] bg-linear-to-r from-black via-green-900 to-black flex items-center justify-center text-center px-6 overflow-hidden">
        {/* Floating shapes for modern look */}
        <div className="absolute w-60 h-60 bg-green-800 rounded-full opacity-30 animate-pulse -top-20 -left-20"></div>
        <div className="absolute w-96 h-96 bg-black rounded-full opacity-20 animate-bounce -bottom-24 -right-24"></div>

        <div className="relative z-10">
          <h1 className="text-3xl md:text-6xl font-bold text-yellow-50 mb-4">
            Welcome to The Pushpa Heritage
          </h1>
          <p className="text-white text-lg md:text-xl max-w-2xl mx-auto">
            Your Luxurious 7-BHK home stay!
          </p>
        </div>
      </section>
      {/* ================= ABOUT SECTION ================= */}
      <section className="py-16 px-6 md:px-20">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-semibold mb-6">
              A Premium 7-BHK Luxury Villa Experience
            </h2>
            <p className="mb-4 text-lg leading-relaxed text-gray-700">
              The Pushpa Heritage is a fully furnished 7-BHK premium villa
              designed for families, celebrations, corporate retreats, and
              peaceful vacations. Nestled amidst beautiful hills, our villa
              offers the perfect blend of luxury, privacy, and nature.
            </p>
            <p className="text-lg leading-relaxed text-gray-700">
              Whether you want to relax by the pool, host a celebration, enjoy
              terrace sunsets, or simply escape city chaos — we provide a
              complete retreat experience with premium hospitality and comfort.
            </p>
          </div>

          <div className="relative h-80 md:h-96">
            <Image
              src="/homenew/gallery-webp/room-4.webp"
              alt="Luxury Villa Interior"
              fill
              className="object-cover rounded-2xl shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* ================= QUICK HIGHLIGHTS ================= */}
      <section className="bg-[#1E3A34] text-white py-14">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <h3 className="text-3xl font-bold">7</h3>
            <p>Luxury Bedrooms</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold">2</h3>
            <p>Beautiful Gardens</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold">1</h3>
            <p>Private Swimming Pool</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold">24x7</h3>
            <p>Premium Room Service</p>
          </div>
        </div>
      </section>

      {/* ================= FACILITIES SECTION ================= */}
      <section className="py-16 px-6 md:px-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-semibold text-center mb-12">
            Our Premium Facilities
          </h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
            {[
              "7-BHK Fully Furnished Luxury Villa",
              "Delicious Home-style Meals (On Request)",
              "DJ Sound System for Celebrations",
              "24x7 Room Service",
              "Personal Cook for Customized Meals",
              "Terrace Seating with Hill View",
              "Indoor & Outdoor Dining Areas",
              "Power Backup (Up to 4 Hours)",
              "Two Spacious Gardens",
              "Swimming Pool for Adults & Kids",
              "High-Speed Wi-Fi Access",
              "Located on Main Road – Easy Access",
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition"
              >
                <p className="text-lg font-medium">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= LOCATION SECTION ================= */}
      <section className="bg-[#EADFCF] py-16 px-6 md:px-20">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-semibold mb-6">
            Prime Location Advantage
          </h2>

          <p className="text-lg mb-4 text-gray-700">
            Strategically located for convenience and sightseeing, our villa
            gives you easy access to Udaipur’s most beautiful attractions.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mt-10">
            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="font-semibold text-xl mb-2">2 km</h3>
              <p>Badi Lake & Bahubali Hills</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="font-semibold text-xl mb-2">5 km</h3>
              <p>Fateh Sagar Lake</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="font-semibold text-xl mb-2">Main Road</h3>
              <p>Easy & Hassle-Free Access</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CTA SECTION ================= */}
      <section className="py-20 px-6 text-center bg-[#1E3A34] text-white">
        <h2 className="text-3xl md:text-5xl font-bold mb-6">
          Book Your Luxurious Stay Today
        </h2>
        <p className="max-w-2xl mx-auto mb-8 text-lg">
          Experience comfort, nature, celebration, and premium hospitality — all
          in one unforgettable getaway at The Pushpa Heritage.
        </p>
        <Link
          href="/booking"
          className="bg-white text-[#1E3A34] px-8 py-3 rounded-full font-semibold hover:bg-gray-200 transition"
        >
          Book Now
        </Link>
      </section>
    </div>
  );
}
