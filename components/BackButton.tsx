"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className=" bg-black text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 hover:bg-black/80 transition"
    >
      <ArrowLeft size={18} />
      Back
    </button>
  );
}