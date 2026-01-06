"use client";
import React, { useState } from "react";
import { User, Users, Calendar, Phone } from "lucide-react"; // lucide icons
import { CreditCard, Tag } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";

export default function LandingPage() {
  const data = [
    {
      image: "/homenew/Villa-landing-1.jpeg",
      alt: "Bedrooms-the-ph",
      title: "Bedrooms",
    },
    {
      image: "/homenew/Villa-landing-3.jpeg",
      alt: "Amenities-the-ph",
      title: "Amenities",
    },
    {
      image: "/homenew/Villa-landing-pool.jpeg",
      alt: "Pool & Gardens-the-ph",
      title: "Pool & Gardens",
    },
  ];
  type FormState = {
    members: string;
    adults: string;
    kids: string;
    checkIn: string;
    checkOut: string;
    contact: string;
  };

  type FieldName = keyof FormState;

  type FormField = {
    label: string;
    name: FieldName;
    type: string;
    placeholder?: string;
    min?: number;
    icon: React.ReactNode;
  };

  const formFields: FormField[] = [
    {
      label: "Total Members",
      name: "members",
      type: "number",
      min: 1,
      placeholder: "1",
      icon: <Users size={16} />,
    },
    {
      label: "Adults",
      name: "adults",
      type: "number",
      min: 1,
      placeholder: "1",
      icon: <User size={16} />,
    },
    {
      label: "Kids",
      name: "kids",
      type: "number",
      min: 0,
      placeholder: "0",
      icon: <User size={16} />,
    },
    {
      label: "Check-In Date",
      name: "checkIn",
      type: "date",
      icon: <Calendar size={16} />,
    },
    {
      label: "Check-Out Date",
      name: "checkOut",
      type: "date",
      icon: <Calendar size={16} />,
    },
    {
      label: "Contact Number",
      name: "contact",
      type: "tel",
      placeholder: "+91-XXXXXXXXXX",
      icon: <Phone size={16} />,
    },
  ];

  const [form, setForm] = useState<FormState>({
    members: "",
    adults: "",
    kids: "",
    checkIn: "",
    checkOut: "",
    contact: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert("Booking submitted!");
  };

  return (
    <div>
      <div className="relative w-full h-screen ">
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          className="absolute  w-full h-full object-cover"
          src="/homenew/video-home.mp4"
        ></video>

        {/* Overlay with subtle dark gradient for readability */}
        <div className="absolute w-full h-full bg-linear-to-b from-black/20 to-black/0 pointer-events-none"></div>

        {/* Content */}
        <div className="lg:flex flex-row mx-auto px-8 py-16">
          {/* Left (40%) */}
          <div className="relative z-10 flex flex-col gap-8 lg:w-2/5 h-full">
            <div className="">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-green-950 shadow-white">
                The Pushpa Heritage
              </h1>
              <p className="text-lg md:text-xl mb-6 text-white">
                Experience luxury and comfort in the heart of nature. Perfect
                for family holidays or a relaxing getaway.
              </p>
            </div>
            <div className="w-full flex justify-center py-16">
       <Swiper
  modules={[EffectCoverflow]}
  effect="coverflow"
  grabCursor={true}
  centeredSlides={true}
  slidesPerView={3}  // 3 slides visible
  loop={true}
  coverflowEffect={{
    rotate: 0,
    stretch: 0,
    depth: 100,
    modifier: 2,
    slideShadows: false,
  }}
  spaceBetween={-30} // thoda overlap
  className="py-12"
>
  {data.map((item, index) => (
    <SwiperSlide
      key={index}
      className="flex justify-center items-center"
      style={{ width: '250px' }} // fix slide width
    >
      <div className="relative w-full h-64 rounded-xl overflow-hidden transform transition-transform duration-500">
        <Image
          src={item.image}
          alt={item.alt}
          width={250}
          height={250}
          className="w-full h-full object-cover rounded-xl"
        />
        <p className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-white text-green-950 font-semibold rounded-md text-sm md:text-base">
          {item.title || "Luxury Villa"}
        </p>
      </div>
    </SwiperSlide>
  ))}
</Swiper>


            </div>
          </div>

          {/* Right - Booking Form */}
          <div className="w-3/5">
            <div className="relative z-20 w-11/12 max-w-5xl mx-auto bg-white rounded-2xl p-6 shadow-xl border-b-8 border-green-950">
              <div className=" items-center gap-4 mb-6 text-green-900 font-semibold text-lg">
                <div className="flex items-center gap-1">
                  <CreditCard size={20} />
                  <span>Pay 20% advance to confirm your luxurious stay</span>
                </div>

                <div className="flex items-center gap-1">
                  <Tag size={20} />
                  <span>₹1500 / per person only</span>
                </div>
              </div>

              <form
                onSubmit={handleSubmit}
                className="flex flex-wrap gap-4 justify-between text-gray-800 items-center"
              >
                {formFields.map((field) => (
                  <div
                    key={field.name}
                    className="flex-1 flex flex-col relative"
                  >
                    <label className="text-sm font-medium mb-1 flex items-center gap-1">
                      {field.icon} {field.label}
                    </label>

                    <input
                      type={field.type}
                      name={field.name}
                      min={field.min}
                      value={form[field.name]}
                      onChange={handleChange}
                      placeholder={field.placeholder}
                      className="p-3 border-b-2 border-green-900 rounded-none focus:outline-none focus:ring-0 focus:border-green-600 font-medium"
                    />
                  </div>
                ))}

                {/* Submit Button */}
                <div className="flex-1 flex items-end mt-6">
                  <button
                    type="submit"
                    className="w-full bg-green-900 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition font-semibold"
                  >
                    Book Now
                  </button>
                </div>

                <div className=" flex gap-4 items-center bg-green-950 p-6 rounded-lg shadow-md ">
                  {data.map((item, index) => (
                    <Link
                      key={index}
                      href="/"
                      className="group relative overflow-hidden rounded-lg border-b-4 border-white "
                    >
                      <Image
                        width={320}
                        height={220}
                        alt={item.alt}
                        src={item.image}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />

                      {/* Bottom Center Title */}
                      <p
                        className="
                                 absolute bottom-3 left-1/2 -translate-x-1/2
                                 px-3 py-2 text-base font-semibold rounded-md
                                 bg-white text-green-950
                                 transition-all duration-300
                                 group-hover:bg-green-900 group-hover:text-white
                                 whitespace-nowrap
                               "
                      >
                        {item.title || "Luxury Villa"}
                      </p>
                    </Link>
                  ))}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
}
