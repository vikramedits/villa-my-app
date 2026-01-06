"use client";
import React, { useState } from "react";
import { User, Users, Calendar, Phone } from "lucide-react"; // lucide icons
import { CreditCard, Tag } from "lucide-react";

export default function LandingPage() {
  const [form, setForm] = useState({
    members: "",
    adults: "",
    kids: "",
    checkIn: "",
    checkOut: "",
    contact: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Booking submitted!"); // Replace with API integration
  };

  return (
    <div className="relative w-full h-screen">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        className="absolute w-full h-full object-cover"
        src="/homenew/video-home.mp4"
      ></video>

      {/* Overlay with subtle dark gradient for readability */}
      <div className="absolute w-full h-full bg-gradient-to-b from-black/20 to-black/0 pointer-events-none"></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-8 py-16 flex flex-col lg:flex-row gap-8 items-center">
        {/* Left Text (40%) */}
        <div className="lg:w-2/5 text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Welcome to Sunny Villa
          </h1>
          <p className="text-lg md:text-xl mb-6">
            Experience luxury and comfort in the heart of nature. Perfect for
            family holidays or a relaxing getaway.
          </p>
        </div>

        {/* Right Images (60%) */}
        <div className="lg:w-3/5 flex gap-4">
          <img
            src="/villa1.jpg"
            alt="Villa 1"
            className="w-1/3 rounded-lg object-cover"
          />
          <img
            src="/villa2.jpg"
            alt="Villa 2"
            className="w-1/3 rounded-lg object-cover"
          />
          <img
            src="/villa3.jpg"
            alt="Villa 3"
            className="w-1/3 rounded-lg object-cover"
          />
        </div>
      </div>

      {/* Booking Form */}

      <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 w-11/12 max-w-5xl bg-white rounded-2xl p-6 shadow-xl border-b-8 border-green-950">
        {/* Price Info */}

        <div className=" items-center gap-4 mb-6 text-green-900 font-semibold text-lg">
          {/* Advance Info */}
          <div className="flex items-center gap-1">
            <CreditCard size={20} />
            <span>Pay 20% advance to confirm your luxurious stay</span>
          </div>
          {/* Price */}
          <div className="flex items-center gap-1">
            <Tag size={20} />
            <span>₹1500 / per person only</span>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-wrap gap-4 justify-between text-gray-800 items-center"
        >
          {/* Total Members */}
          <div className="flex-1 flex flex-col relative">
            <label className="text-sm font-medium mb-1 flex items-center gap-1">
              <Users size={16} /> Total Members
            </label>
            <input
              type="number"
              name="members"
              min={1}
              value={form.members}
              onChange={handleChange}
              placeholder="1"
              className="p-3 border-b-2 border-green-900 rounded-none focus:outline-none focus:ring-0 focus:border-green-600 font-medium"
            />
          </div>

          {/* Adults */}
          <div className="flex-1 flex flex-col relative">
            <label className="text-sm font-medium mb-1 flex items-center gap-1">
              <User size={16} /> Adults
            </label>
            <input
              type="number"
              name="adults"
              min={1}
              value={form.adults}
              onChange={handleChange}
              placeholder="1"
              className="p-3 border-b-2 border-green-900 rounded-none focus:outline-none focus:ring-0 focus:border-green-600 font-medium"
            />
          </div>

          {/* Kids */}
          <div className="flex-1 flex flex-col relative">
            <label className="text-sm font-medium mb-1 flex items-center gap-1">
              <User size={16} /> Kids
            </label>
            <input
              type="number"
              name="kids"
              min={0}
              value={form.kids}
              onChange={handleChange}
              placeholder="0"
              className="p-3 border-b-2 border-green-900 rounded-none focus:outline-none focus:ring-0 focus:border-green-600 font-medium"
            />
          </div>

          {/* Check-In Date */}
          <div className="flex-1 flex flex-col relative">
            <label className="text-sm font-medium mb-1 flex items-center gap-1">
              <Calendar size={16} /> Check-In Date
            </label>
            <input
              type="date"
              name="checkIn"
              value={form.checkIn}
              onChange={handleChange}
              className="p-3 border-b-2 border-green-900 rounded-none focus:outline-none focus:ring-0 focus:border-green-600 font-medium"
            />
          </div>

          {/* Check-Out Date */}
          <div className="flex-1 flex flex-col relative">
            <label className="text-sm font-medium mb-1 flex items-center gap-1">
              <Calendar size={16} /> Check-Out Date
            </label>
            <input
              type="date"
              name="checkOut"
              value={form.checkOut}
              onChange={handleChange}
              className="p-3 border-b-2 border-green-900 rounded-none focus:outline-none focus:ring-0 focus:border-green-600 font-medium"
            />
          </div>

          {/* Contact Number */}
          <div className="flex-1 flex flex-col relative">
            <label className="text-sm font-medium mb-1 flex items-center gap-1">
              <Phone size={16} /> Contact Number
            </label>
            <input
              type="tel"
              name="contact"
              value={form.contact}
              onChange={handleChange}
              placeholder="+91-XXXXXXXXXX"
              className="p-3 border-b-2 border-green-900 rounded-none focus:outline-none focus:ring-0 focus:border-green-600 font-medium"
            />
          </div>

          {/* Submit Button */}
          <div className="flex-1 flex items-end mt-6">
            <button
              type="submit"
              className="w-full bg-green-900 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition font-semibold"
            >
              Book Now
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
