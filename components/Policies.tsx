"use client";

import { ArrowUp } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const policies = [
  {
    id: "check-in-policy",
    title: "Check-in & Check-out",
    content:
      "Check-in time is 1:00 PM onwards and check-out time is before 11:00 AM. Early check-in and late check-out are subject to availability. Guests must present a valid government ID at the time of arrival.",
  },
  {
    id: "booking-policy",
    title: "Booking Policy",
    content:
      "To confirm a booking, 20% advance payment is required. The remaining balance must be paid at the time of check-in. Bookings can be made via phone call, WhatsApp, or online inquiry.",
  },
  {
    id: "cancellation",
    title: "Cancellation Policy",
    content:
      "Guests may cancel their booking up to 7 days before the check-in date for a full refund. Cancellations made within 3–7 days will receive a 50% refund. No refunds are applicable for cancellations within 48 hours of check-in.",
  },
  {
    id: "payment",
    title: "Payment Policy",
    content:
      "We accept payments via UPI, bank transfer, and cash. Advance payment is mandatory for booking confirmation. The final payment must be completed at the property during check-in.",
  },
  {
    id: "house-rules",
    title: "House Rules",
    content:
      "Guests are expected to maintain cleanliness and respect the property. Loud music after 10 PM is not permitted. Illegal activities are strictly prohibited on the premises.",
  },
  {
    id: "pool-rules",
    title: "Pool Rules",
    content:
      "The swimming pool is available for guest use at their own risk. Children must always be supervised by adults in the pool area. Glass items are not allowed near the pool.",
  },
  {
    id: "visitor",
    title: "Visitor Policy",
    content:
      "Only registered guests are allowed inside the property. Visitors must be approved by the management and additional charges may apply for extra guests.",
  },
  {
    id: "damage",
    title: "Damage Policy",
    content:
      "Guests are responsible for any damage caused to the property during their stay. Repair or replacement costs may be charged accordingly.",
  },
  {
    id: "privacy",
    title: "Privacy Policy",
    content:
      "Guest information is kept secure and is used only for booking and communication purposes. We do not share personal data with third parties.",
  },
];

export default function Policies() {
  const [active, setActive] = useState("checkin");

  useEffect(() => {
    const sections = document.querySelectorAll("[data-policy]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-40% 0px -40% 0px",
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="container-fluid py-6 md:py-0 scroll-smooth">
      <h1
        className="text-2xl md:text-4xl font-semibold text-gray-700 tracking-wide pb-1 lg:pb-2 mb-4 md:my-8 text-center "
        id="top"
      >
        Terms & Condition
      </h1>

      <div className="flex flex-col md:flex-row gap-10 md:mb-8">
        {/* Quick Links */}
        <div className="md:w-1/5 w-full shrink-0 border-b border-gray-100">
          <div className="sticky top-24">
            {/* Mobile Links */}
            <div className="flex md:hidden overflow-x-auto gap-3 pb-4 scrollbar-hide">
              {policies.map((item) => (
                <Link
                  key={item.id}
                  href={`#${item.id}`}
                  className={`shrink-0 min-w-30 text-center rounded-full px-4 py-2 text-sm font-medium border transition-all duration-200
                          ${
                            active === item.id
                              ? "bg-black text-white  shadow-md"
                              : "bg-gray-100 text-gray-700 border-gray-200 hover:bg-green-50 hover:text-green-700"
                          }`}
                           >
                  {item.title}
                </Link>
              ))}
            </div>

            {/* Desktop Links */}
            <div className="hidden md:flex flex-col space-y-3">
              {policies.map((item) => (
                <Link
                  key={item.id}
                  href={`#${item.id}`}
                  className={`text-sm transition ${
                    active === item.id
                      ? "text-black font-semibold"
                      : "text-gray-500 hover:text-black"
                  }`}
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Policy Cards */}
        <div className="md:w-4/5 w-full">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {policies.map((item) => (
              <div
                key={item.id}
                id={item.id}
                data-policy
                className={`scroll-mt-28 border rounded-xl p-6 transition
                ${
                  active === item.id
                    ? "border-black shadow-lg"
                    : "border-gray-200 shadow-lg hover:shadow-xl hover:-translate-y-1"
                }`}
              >
                <h2 className="text-lg font-semibold mb-3 text-green-900">
                  {item.title}
                </h2>

                <p className="text-gray-600 text-sm leading-relaxed tracking-wide">
                  {item.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Scroll To Top */}
      <button
        aria-label={`Jump to title`}
        onClick={() =>
          document.getElementById("top")?.scrollIntoView({ behavior: "smooth" })
        }
        className="flex gap-2 items-center fixed bottom-6 left-8 z-50 bg-green-700 hover:bg-green-800 text-white px-3 py-2 rounded-full shadow-lg transition hover:-translate-y-1"
      >
        Top <ArrowUp size={18} />
      </button>
    </section>
  );
}
