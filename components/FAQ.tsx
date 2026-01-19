"use client";

import { useState } from "react";

const FAQS = [
  {
    question: "What is the check-in and check-out time?",
    answer:
      "Check-in time is from 2:00 PM and check-out time is until 11:00 AM. Early check-in or late check-out is subject to availability.",
  },
  {
    question: "Is the villa suitable for families?",
    answer:
      "Yes, our villa is ideal for families and groups. It offers a safe, private, and peaceful environment for all age groups.",
  },
  {
    question: "Is parking available at the property?",
    answer:
      "Yes, free and secure parking space is available for guests inside the villa premises.",
  },
  {
    question: "Are pets allowed in the villa?",
    answer:
      "Pets are allowed on prior request. Please inform us in advance so we can make suitable arrangements.",
  },
  {
    question: "Is cooking allowed and is the kitchen equipped?",
    answer:
      "Yes, guests can use the fully equipped kitchen which includes basic utensils, cookware, and a refrigerator.",
  },
  {
    question: "What is the cancellation policy?",
    answer:
      "Cancellation policies depend on the booking period and season. Please contact us or check during booking for exact details.",
  },
];

export default function FAQs() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-gray-50 py-8 md:py-12">
      <div className="container-fluid">
        {/* ================= Heading ================= */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-lg md:text-2xl font-bold md:font-medium tracking-wide text-gray-950">
            Frequently Asked Questions
          </h2>
          <p className="text-xs md:text-base mt-2 text-gray-600 tracking-wide">
            Everything you need to know before booking your stay
          </p>
        </div>

        {/* ================= FAQ List ================= */}
        <div className="space-y-4">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className="border rounded-xl bg-white overflow-hidden transition-all duration-300 hover:shadow-md"
              >
                {/* -------- Question -------- */}
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex justify-between items-center p-4 md:p-5 text-left"
                >
                  <span className="text-sm md:text-base font-medium text-gray-900">
                    {faq.question}
                  </span>

                  {/* Plus rotate animation */}
                  <span
                    className={`text-xl text-primaryBlue transition-transform duration-300 ${
                      isOpen ? "rotate-45" : "rotate-0"
                    }`}
                  >
                    +
                  </span>
                </button>

                {/* -------- Smooth Animated Answer -------- */}
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-4 md:px-5 pb-4 md:pb-5 text-xs md:text-sm text-gray-600 leading-relaxed">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
