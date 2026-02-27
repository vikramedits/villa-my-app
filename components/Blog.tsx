// File: app/blog/page.tsx
"use client";

import { ArrowDown, ArrowRight, ArrowUp } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import Link from "next/link";
import { CalendarCheck, ImageIcon, BedDouble, Sparkles } from "lucide-react";

const QUICK_LINKS = [
  {
    title: "Book Now",
    description: "Reserve your stay at The Pushpa Heritage Villa.",
    href: "/booking",
    icon: CalendarCheck,
  },
  {
    title: "Images & Videos",
    description: "Explore all villa photos & Videos.",
    href: "/gallery",
    icon: ImageIcon,
  },
  {
    title: "Rooms",
    description: "Discover our spacious master bedrooms.",
    href: "/rooms",
    icon: BedDouble,
  },
  {
    title: "Amenities",
    description: "View all luxury facilities available.",
    href: "/amenities",
    icon: Sparkles,
  },
];

// ---- Blog Data ----
interface BlogPost {
  title: string;
  snippet: string;
  content: string[];
  image: string;
  link: string;
  sn: string;
}

// ---- Featured Article ----
const FEATURED_ARTICLE: BlogPost = {
  title: "Best 7-BHK Private Pool Villa in Udaipur for Families & Celebrations",
  snippet:
    "Planning a group getaway? Discover why private villas like The Pushpa Heritage are better than hotels for large groups.",
  content: [
    "Experience luxury and privacy at The Pushpa Heritage. With a private pool, terrace, 2 Big Gardens and seven bedrooms, it’s perfect for family getaways or celebrations. Enjoy sunset views over Badi Lake, modern amenities, and professional staff ensuring comfort and security throughout your stay.",
  ],
  image: "/villa/hero-pool-drone.jpg",
  link: "/blog/private-7-bhk-villa-udaipur",
  sn: "",
};

const BLOG_POSTS: BlogPost[] = [
  {
    title: "Poolside BBQ & Parties",
    snippet: "Make the most of your villa pool parties.",
    content: [
      "Private pool area with comfortable dinnig seating and garden surroundings.",
      "Fast service with veg & non-veg options prepared fresh.",
      "Bluetooth music system for party vibes available.",
      "Evening lighting with fairy lights and pool glow effects.",
      "Floating snacks & mocktails for Instagram-worthy moments.",
      "On-call staff support ensuring safety and smooth celebrations.",
    ],
    image: "/homenew/gallery-webp/pool-1.webp",
    link: "/blog/poolside-bbq-party",
    sn: "1",
  },
  {
    title: "How to Host a Birthday Party at The Pushpa Heritage",
    snippet: "DJ nights, poolside fun, terrace celebrations.",
    content: [
      "Host a private poolside celebration with music, floating decorations, and ambient lighting for an unforgettable birthday evening.",

      "Enjoy a stylish terrace dining setup with fairy lights, a custom backdrop, a cozy swing, and breathtaking night hill views — perfectly connected to the master bedroom.",

      "Arrange a live DJ or curated playlist to match your vibe — from relaxed sunset tunes to energetic dance sessions.",

      "Personalize the decor with theme-based setups, balloon arches, floral arrangements, and a beautifully designed cake table.",

      "Enjoy spacious outdoor lounges for games, conversations, and comfortable seating for guests of all ages.",

      "Capture every special moment with stunning villa backdrops — perfect for photos, reels, and memories that last forever.",
    ],

    image: "/homenew/gallery-webp/balcony-1.webp",
    link: "/blog/host-birthday-party",
    sn: "2",
  },
  {
    title: "Top Things to Do Near Villa",
    snippet: "Sunsets, hill views, and nearby attractions.",
    content: [
      "Located just 2 km from Badi Lake, the villa offers quick access to peaceful sunrise walks, scenic lake views, and relaxing evening strolls.",

      "Bahubali Hills is only 2 km away — perfect for a short trek and panoramic sunset views over the Aravalli ranges.",

      "Enjoy the lively atmosphere of Fatehsagar Lake, just 5 km from the villa, where you can explore boating, street food, and beautiful lakefront views.",

      "Visit the iconic Lake Pichola, situated around 10 km away, and experience the timeless charm of Udaipur’s royal waterfront.",

      "Explore the famous Monsoon Palace, just 6 km from the villa, offering breathtaking hilltop views of the city and surrounding lakes.",

      "With major attractions located within a short drive, the villa provides the perfect balance of peaceful stay and easy city access.",
    ],
    image: "/homenew/gallery-webp/room-11.webp",
    link: "/blog/badi-lake-things-to-do",
    sn: "3",
  },
  {
    title: "Why Private Villas Are Better Than Hotels",
    snippet: "Privacy, comfort, and luxury amenities for families.",
    content: [
      "Enjoy complete privacy with your own private pool, living spaces, and outdoor areas — no shared lobbies or crowded common zones.",

      "Experience spacious bedrooms, large gardens, and open terraces that give your family room to relax and celebrate together.",

      "Host gatherings, birthday parties, or intimate celebrations without restrictions typically found in hotels.",

      "Receive personalized service tailored to your group’s needs — from custom meals to special event arrangements.",

      "Relax in a peaceful environment surrounded by nature, away from city noise and busy hotel corridors.",

      "Create meaningful moments in an exclusive setting that feels like your own luxury home rather than just a temporary room stay.",
    ],

    image: "/homenew/gallery-webp/room-10.webp",
    link: "/blog/private-villa-vs-hotels",
    sn: "4",
  },
  {
    title: "Luxury Villa Interior Tour",
    snippet: "Discover the elegance inside The Pushpa Heritage.",
    content: [
      "Step inside our beautifully designed 7-BHK villa where modern elegance meets warm, welcoming interiors crafted for comfort and style.",

      "Each bedroom is thoughtfully curated with premium furnishings, soft lighting, spacious layouts, and large windows that invite natural sunlight.",

      "Relax in expansive living areas featuring plush seating, tasteful décor, and a sophisticated ambiance perfect for family gatherings.",

      "Experience a fully equipped modern kitchen and elegant dining space designed for both intimate meals and grand celebrations.",

      "Enjoy seamless indoor-outdoor living with balconies and sit-out areas that offer serene views and fresh air.",

      "Every corner of the villa reflects attention to detail — from textures and color palettes to lighting design — creating a luxurious yet homely atmosphere.",
    ],
    image: "/homenew/gallery-webp/room-4.webp",
    link: "/blog/luxury-villa-interior-tour",
    sn: "5",
  },
  {
    title: "Best Sunset Spots Near Villa",
    snippet: "Romantic and scenic photography locations.",
    content: [
      "Witness the most breathtaking sunsets from Rayta Hills, one of the most scenic and peaceful viewpoints near the villa, offering wide panoramic views of the Aravalli landscape.",

      "Bahubali Hills, located just 2 km from the villa, is the most popular sunset spot near Badi Lake — perfect for golden hour photography and romantic evening walks.",

      "Visit Neemach Mata Temple for elevated sunset views over Fateh Sagar Lake, where the city lights slowly begin to sparkle after dusk.",

      "Karni Mata Temple offers a stunning bird’s-eye view of Lake Pichola, making it an ideal location for couples and sunset lovers.",

      "Head to the iconic Monsoon Palace for dramatic hilltop sunsets overlooking multiple lakes and the entire city skyline.",

      "With so many iconic sunset points just a short drive away, the villa provides the perfect base to explore Udaipur’s most romantic evening views.",
    ],
    image: "/homenew/gallery-webp/pool-2.webp",
    link: "/blog/best-sunset-spots-badi-lake",
    sn: "6",
  },
  {
    title: "Family Getaway Itinerary",
    snippet: "Perfect 3-day villa stay plan.",
    content: [
      "Day 1: Arrival and Relaxation – Check into your private villa and unwind with a poolside evening. Enjoy indoor games, garden time for kids, and a relaxed family dinner in your spacious dining area.",

      "Day 2 Morning: Explore nearby attractions like Badi Lake (2 km) and Bahubali Hills for a peaceful sunrise walk and scenic family photographs.",

      "Day 2 Evening: Visit Fateh Sagar Lake and Neemach Mata Temple for sunset views, boating, and local food experiences loved by families.",

      "Day 3 Morning: Discover Lake Pichola and the Old City area for heritage views, shopping, and cultural exploration suitable for all age groups.",

      "Optional Experience: Plan a visit to Monsoon Palace or Rayta Hills for panoramic city views and memorable family pictures.",

      "Flexible Planning: This 3-day family itinerary can be customized based on your interests — whether you prefer relaxation at the villa, sightseeing, celebration events, or a mix of everything.",
    ],

    image: "/homenew/gallery-webp/garden-1.webp",
    link: "/blog/family-getaway-itinerary",
    sn: "7",
  },
  {
    title: "Wedding & Celebration Packages",
    snippet: "Host memorable events at our villa.",
    content: [
      "Host intimate destination weddings and grand family celebrations at our private villa, comfortably accommodating 60–70 guests in a spacious and elegant setting.",

      "Celebrate mehendi, haldi, sangeet, anniversaries, and engagement ceremonies with fully customizable décor, themed setups, and professional event arrangements.",

      "Enjoy expansive outdoor areas, garden spaces, and poolside settings ideal for wedding functions, live music, and evening receptions.",

      "Provide your guests with a luxurious 7-BHK stay experience, ensuring privacy, comfort, and convenience throughout the entire celebration.",

      "Capture unforgettable wedding moments with scenic backdrops including nearby lakes, hills, and sunset viewpoints perfect for pre-wedding and couple shoots.",

      "Located close to Udaipur’s iconic attractions, the villa offers the perfect blend of peaceful surroundings and easy city access for a seamless destination wedding experience.",
    ],
    image: "/homenew/gallery-webp/room-3.webp",
    link: "/blog/wedding-celebration-packages",
    sn: "8",
  },
  {
    title: "Private Chef Experience",
    snippet: "Gourmet meals prepared just for you.",
    content: [
      "Enhance your villa stay with an exclusive private chef experience, offering freshly prepared gourmet meals tailored to your preferences.",

      "Enjoy customized breakfast, lunch, and dinner menus featuring Indian, continental, and regional specialties prepared in-house for your family and guests.",

      "Celebrate special occasions with curated dining setups including candlelight dinners, poolside BBQ nights, and festive themed meals.",

      "Experience hygienic, freshly sourced ingredients and personalized service designed to match your dietary requirements and taste preferences.",

      "Host intimate gatherings, birthday dinners, and pre-wedding functions with professional chef-crafted menus that elevate every celebration.",

      "Pair your luxury stay with fine dining comfort, combining the privacy of a villa with the experience of a premium restaurant.",
    ],

    image: "/homenew/gallery-webp/room-4.webp",
    link: "/blog/private-chef-experience",
    sn: "9",
  },
  {
    title: "Villa Safety & Hygiene Standards",
    snippet: "Ensuring a safe and clean stay.",
    content: [
      "We maintain strict daily cleaning and sanitization protocols across all rooms, bathrooms, common areas, and kitchen spaces to ensure a hygienic and comfortable stay.",

      "Our villa is monitored with CCTV cameras covering all external sides and entry points, ensuring enhanced security for guests at all times.",

      "With three secure entrance gates and advanced door locking systems, the property provides controlled and safe access throughout your stay.",

      "Two dedicated on-site caretakers are available to assist guests, manage property upkeep, and respond promptly to any requirements.",

      "High standards of linen hygiene, fresh towels, and professionally maintained interiors ensure cleanliness comparable to premium hospitality standards.",

      "Designed for families, group travelers, and wedding guests, the villa combines privacy with strong safety measures for a worry-free experience.",
    ],

    image: "/homenew/gallery-webp/room-5.webp",
    link: "/blog/villa-safety-hygiene-standards",
    sn: "10",
  },
  {
    title: "New Luxury Villa in Udaipur Near Fateh Sagar Lake – Premium Stay",
    snippet: "Boating, trekking, and local attractions.",
    content: [
      "Experience a new luxury 7-BHK villa in Udaipur designed with modern architecture, premium interiors, and spacious living areas for families and group stays.",

      "Located near Badi Lake, the villa offers a peaceful environment surrounded by scenic hills while remaining close to major tourist attractions.",

      "Enjoy premium amenities including a private pool, large garden space, terrace views, and elegant indoor lounges ideal for celebrations and relaxing stays.",

      "Explore nearby adventure activities such as trekking at Bahubali Hills, boating at Fateh Sagar Lake, and sunset visits to Monsoon Palace.",

      "Perfect for family vacations, birthday parties, weddings, and corporate gatherings, the villa comfortably accommodates large groups with privacy and comfort.",

      "Combining modern luxury with natural surroundings, the villa offers a premium stay experience away from crowded hotels and city noise.",
    ],

    image: "/homenew/gallery-webp/balcony-2.webp",
    link: "/blog/nearby-adventure-activities",
    sn: "11",
  },
  {
    title: "Best Time to Visit Udaipur for a Villa Stay",
    snippet:
      "Discover the ideal season to plan your villa vacation in Udaipur with weather insights and travel tips.",
    content: [
      "The best time to visit Udaipur for a villa stay is between October and March when the weather is pleasant, making it perfect for sightseeing, outdoor dining, and sunset views.",

      "Winter months offer comfortable temperatures ideal for exploring lakes, hill viewpoints, and hosting weddings or celebrations in open garden spaces.",

      "Monsoon season (July to September) transforms the Aravalli hills into lush green landscapes, creating breathtaking views near Badi Lake and Bahubali Hills.",

      "Summer stays can be enjoyable with private pool access, indoor comfort, and peaceful surroundings away from crowded hotel zones.",

      "Festive seasons like Diwali, New Year, and wedding months are especially popular for villa bookings, so early reservations are recommended.",

      "No matter the season, a private villa stay provides flexibility, privacy, and comfort that enhances your Udaipur travel experience.",
    ],

    image: "/homenew/gallery-webp/balcony-2.webp",
    link: "/blog/nearby-adventure-activities",
    sn: "12",
  },
  {
    title: "Villa vs Resort in Udaipur – Which Is Better?",
    snippet:
      "Comparing privacy, cost, space, and experience to help you choose the perfect stay.",
    content: [
      "Planning a trip to Udaipur and confused between booking a resort or a private villa? Choosing the right stay can completely change your travel experience.",
      "Resorts offer hotel-style services, shared amenities, and per-room pricing. However, they often lack privacy and flexibility, especially for large groups.",
      "A private villa gives you the entire property to yourself — private swimming pool, dedicated living area, flexible dining, and complete freedom for celebrations.",
      "For families, birthday parties, reunions, and group trips, a villa provides better bonding space compared to separate hotel rooms.",
      "Cost-wise, when divided among 12–20 guests, a luxury villa often becomes more economical than booking multiple resort rooms.",
      "If you value privacy, celebration freedom, and a peaceful environment near lakes like Badi Lake and Fateh Sagar Lake, a private villa is the better choice in Udaipur.",
    ],
    image: "/homenew/gallery-webp/room-6.webp",
    link: "/blog/villa-vs-resort-in-udaipur",
    sn: "13",
  },
  {
    title: "7 BHK Villa in Udaipur for Large Groups",
    snippet:
      "Spacious luxury villa perfect for families, reunions, and celebrations.",
    content: [
      "Looking for a 7 BHK villa in Udaipur for a large family or group stay? A spacious private villa allows everyone to stay together under one roof.",
      "With seven bedrooms, large living spaces, and a private swimming pool, it’s ideal for 12–20 guests.",
      "Perfect for birthday parties, anniversaries, pre-wedding functions, corporate offsites, and family reunions.",
      "Unlike hotels where rooms are separated, a private villa creates a connected and homely luxury experience.",
      "Located near Badi Lake (2 km), Fateh Sagar Lake (5 km), Bahubali Hills (2 km), and Sajjangarh Monsoon Palace (6 km), the villa offers peaceful surroundings with easy city access.",
      "For large group stays in Udaipur, a 7 BHK private villa offers the perfect mix of space, comfort, privacy, and value.",
    ],
    image: "/homenew/gallery-webp/room-7.webp",
    link: "/blog/7-bhk-villa-in-udaipur-for-large-groups",
    sn: "14",
  },
  {
    title: "Pet-Friendly Villa in Udaipur",
    snippet:
      "Enjoy a comfortable stay with your furry friends in a private luxury villa.",
    content: [
      "Traveling with pets in Udaipur can be challenging as many hotels do not allow them.",
      "A pet-friendly private villa offers open spaces, secure boundaries, and a peaceful environment for both you and your furry companion.",
      "Unlike crowded resorts, a private villa ensures your pet stays stress-free and comfortable.",
      "Morning walks near scenic spots like Badi Lake make the stay even more enjoyable.",
      "With private outdoor areas and a secure property setup, your pets can move around safely.",
      "If you’re searching for a pet-friendly villa in Udaipur, choosing a private luxury villa ensures a relaxed and memorable vacation for the whole family.",
    ],
    image: "/homenew/gallery-webp/balcony-1.webp",
    link: "/blog/pet-friendly-villa-in-udaipur",
    sn: "15",
  },
  {
    title: "Cost of Villa in Udaipur – What to Expect?",
    snippet:
      "Understand pricing, amenities, and value before booking a private villa stay.",
    content: [
      "One of the most searched questions by travelers is: What is the cost of renting a villa in Udaipur?",
      "The price depends on factors like number of bedrooms, amenities, season, weekend demand, and location.",
      "A luxury 7 BHK villa in Udaipur typically offers private pool access, spacious bedrooms, caretaker support, and complete property privacy.",
      "When divided among 14–18 guests, the per-person cost becomes very reasonable compared to booking multiple hotel rooms.",
      "Many villas include modern interiors, CCTV security, multiple entrance locks, and dedicated caretakers for safety and comfort.",
      "If you want privacy, celebration freedom, group space, and premium comfort, renting a private villa in Udaipur offers excellent value for money.",
    ],
    image: "/homenew/gallery-webp/room-8.webp",
    link: "/blog/cost-of-villa-in-udaipur",
    sn: "16",
  },
];

export default function BlogPage() {
  const [openPost, setOpenPost] = useState<BlogPost | null>(null);

  return (
    <main id="top" className="bg-gray-50 min-h-screen font-sans">
      {/* ==================== Featured Article - Top ====================== */}
      <section className="relative w-full l h-96 md:h-150">
        <Image
          src={FEATURED_ARTICLE.image}
          alt={FEATURED_ARTICLE.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-[#F8F5F0] bg-opacity-30 flex flex-col justify-center lg:justify-start  px-8 md:px-16">
          <h1 className="text-3xl md:text-5xl font-light text-green-950 mb-4">
            {FEATURED_ARTICLE.title}
          </h1>
          <p className="text-gray-500 text-lg md:text-xl mb-4">
            {FEATURED_ARTICLE.snippet}
          </p>
          <button
            onClick={() => setOpenPost(FEATURED_ARTICLE)}
            className="flex gap-2 bg-green-700 hover:bg-green-800 text-white font-semibold py-3 px-3 rounded-sm transition w-1/2 "
            aria-label={`Read full story: ${FEATURED_ARTICLE.title}`}
          >
            Full Overview <ArrowRight />
          </button>
        </div>
      </section>

      {/* ============================ Blog Grid ============================== */}
      <section className="container-fluid mx-auto py-6 lg:py-16 ">
        <h2 className="text-center text-2xl lg:text-3xl pb-3 lg:pb-6 text-gray-600 flex justify-center gap-1  items-center">
          {" "}
          <span>Why Stay With Us</span> <ArrowDown size={28} />
        </h2>
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {BLOG_POSTS.map((post) => (
            <div
              key={post.title}
              className=" bg-white rounded-xl shadow-md hover:shadow-xl transition flex flex-col"
            >
              <div className="relative h-60 w-full">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className=" object-cover rounded-t-xl"
                />

                {/* ========== Badge overlay =========== */}
                <p className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 bg-white text-green-900 font-medium px-2 py-1 rounded-t-full w-12 text-center ">
                  {post.sn}
                </p>
              </div>

              <div className="p-6 flex flex-col flex-1">
                <h2 className="text-xl font-medium mb-2">{post.title}</h2>

                <p className="text-gray-600 mb-4 text-sm">{post.snippet}</p>

                <button
                  onClick={() => setOpenPost(post)}
                  className="flex items-center gap-2 mt-auto text-green-700 bg-orange-100 w-1/2 px-2 py-1 rounded-full font-medium
                   hover:text-white shadow hover:scale-90 transition ease-in-out duration-100"
                >
                  More Details <ArrowRight size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =============================== Modal =============================== */}
      <AnimatePresence>
        {openPost && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={() => setOpenPost(null)}
          >
            <motion.div
              className="bg-white rounded-xl max-w-3xl w-full px-4 pb-6 pt-14 lg:px-8 lg:py-14 relative shadow-2xl max-h-[90vh] overflow-y-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              style={{ willChange: "opacity" }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                className="absolute top-2 right-5 z-50 bg-gray-200 rounded-full w-9 h-9 flex items-center justify-center hover:bg-gray-300 text-lg"
                onClick={() => setOpenPost(null)}
                aria-label="Close modal"
              >
                ×
              </button>

              <div className="mb-6 p-4 lg:p-8 bg-green-50 rounded-lg border border-green-100">
                <h2 className="text-lg lg:text-2xl font-semibold text-green-900">
                  {openPost.title}
                </h2>
              </div>

              <ul className="list-disc pl-5 text-gray-700 space-y-2">
                {openPost.content.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* ==================== Ouick Links ========================== */}
      <section className="max-w-6xl mx-auto px-4 md:px-8 mb-20">
        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900">Quick Links</h2>
          <div className="w-16 h-1 bg-green-700 mx-auto mt-3 rounded-full"></div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-2 md:flex md:justify-center gap-6">
          {QUICK_LINKS.map((item, index) => {
            const Icon = item.icon;
            return (
              <Link
                key={index}
                href={item.href}
                className="group bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition duration-300 w-full md:w-60"
              >
                <div className="flex flex-col h-full">
                  {/* Icon */}
                  <Icon className="w-8 h-8 text-green-700 mb-4 group-hover:scale-110 transition" />

                  {/* Title */}
                  <h3 className="font-bold text-gray-700 text-lg mb-2 group-hover:text-green-700 transition">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 text-sm grow">
                    {item.description}
                  </p>

                  {/* Go Arrow */}
                  <span className="flex gap-2 items-center mt-4 text-green-700 font-bold text-sm group-hover:translate-x-1 transition ">
                    Go <ArrowRight size={20}/>
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
      {/* ===================== Scroll to Top Button ====================== */}
      <button
        onClick={() => {
          document.documentElement.scrollTo({ top: 0, behavior: "smooth" });
          document.body.scrollTo({ top: 0, behavior: "smooth" });
        }}
        className="flex justify-center gap-1 fixed bottom-8 left-8 `z-9999` bg-green-700 hover:bg-green-800 text-white p-4 rounded-full shadow-lg transition transform hover:-translate-y-1"
        aria-label="Scroll to top"
      >
        Top <ArrowUp size={24} />
      </button>
    </main>
  );
}
