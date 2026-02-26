// app/blog/page.tsx
import BlogPage from "@/components/Blog";
import { Metadata } from "next"; // <- add this import

export const metadata: Metadata = { // <- type annotation added
  title: "The Pushpa Heritage Blog | Luxury Villa in Udaipur",
  description:
    "Explore luxury villa experiences, travel guides, and celebration tips at The Pushpa Heritage, your private 7-BHK villa near Badi Lake, Udaipur.",
  openGraph: {
    title: "The Pushpa Heritage Blog",
    description:
      "Luxury villa experiences, travel guides, and celebration tips at The Pushpa Heritage, Udaipur.",
    images: ["/villa/hero-pool-drone.jpg"],
  },
};

export default function Page() {
  return <BlogPage />;
}