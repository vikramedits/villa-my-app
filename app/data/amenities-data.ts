export type AmenityItem = {
  id: number;
  title: string;
  images: string[];
  rating: number;
};

export type AmenityCategory = {
  id: number;
  name: string;
  items: AmenityItem[];
};

export const amenitiesCategories: AmenityCategory[] = [
  // ================= LUXURY STAY =================
  {
    id: 1,
    name: "Luxury Stay",
    items: [
      {
        id: 1,
        title: "7-BHK Fully Furnished Premium Villa",
        rating: 5.0,
        images: ["/homenew/room/room-6.jpeg", "/homenew/room/room-6.jpeg", "/homenew/room/room-6.jpeg"],
      },
      {
        id: 2,
        title: "Luxury Air-Conditioned Bedrooms",
        rating: 5.0,
        images: ["/homenew/room/room-6.jpeg", "/homenew/room/room-6.jpeg", "/homenew/room/room-6.jpeg"],
      },
      {
        id: 3,
        title: "Spacious Living & Drawing Area",
        rating: 5.0,
        images: ["/homenew/room/room-6.jpeg", "/homenew/room/room-6.jpeg", "/homenew/room/room-6.jpeg"],
      },
    ],
  },

  // ================= DINING & FOOD =================
  {
    id: 2,
    name: "Dining & Food",
    items: [
      {
        id: 4,
        title: "Home-style Breakfast, Lunch & Dinner",
        rating: 5.0,
        images: ["/amenities/food1.jpg", "/amenities/food2.jpg", "/amenities/food3.jpg"],
      },
      {
        id: 5,
        title: "Indoor & Outdoor Dining Area",
        rating: 5.0,
        images: ["/amenities/dining1.jpg", "/amenities/dining2.jpg", "/amenities/dining3.jpg"],
      },
      {
        id: 6,
        title: "Personal Cook for Customized Meals",
        rating: 5.0,
        images: ["/amenities/cook1.jpg", "/amenities/cook2.jpg", "/amenities/cook3.jpg"],
      },
    ],
  },

  // ================= POOL & FUN =================
  {
    id: 3,
    name: "Fun & Entertainment",
    items: [
      {
        id: 7,
        title: "Swimming Pool for Adults & Kids",
        rating: 5.0,
        images: ["/amenities/pool1.jpg", "/amenities/pool2.jpg", "/amenities/pool3.jpg"],
      },
      {
        id: 8,
        title: "DJ Sound System for Parties",
        rating: 5.0,
        images: ["/amenities/dj1.jpg", "/amenities/dj2.jpg", "/amenities/dj3.jpg"],
      },
      {
        id: 9,
        title: "Private Party & Celebration Area",
        rating: 5.0,
        images: ["/amenities/party1.jpg", "/amenities/party2.jpg", "/amenities/party3.jpg"],
      },
    ],
  },

  // ================= NATURE & VIEW =================
  {
    id: 4,
    name: "Nature & Scenic Views",
    items: [
      {
        id: 10,
        title: "Terrace Seating with Hill View",
        rating: 5.0,
        images: ["/amenities/terrace1.jpg", "/amenities/terrace2.jpg", "/amenities/terrace3.jpg"],
      },
      {
        id: 11,
        title: "Two Big Gardens for Relax & Events",
        rating: 5.0,
        images: ["/amenities/garden1.jpg", "/amenities/garden2.jpg", "/amenities/garden3.jpg"],
      },
      {
        id: 12,
        title: "Open Lawn with Mountain View",
        rating: 5.0,
        images: ["/amenities/lawn1.jpg", "/amenities/lawn2.jpg", "/amenities/lawn3.jpg"],
      },
    ],
  },

  // ================= SERVICES =================
  {
    id: 5,
    name: "Premium Services",
    items: [
      {
        id: 13,
        title: "24x7 Room Service",
        rating: 5.0,
        images: ["/amenities/service1.jpg", "/amenities/service2.jpg", "/amenities/service3.jpg"],
      },
      {
        id: 14,
        title: "Fast & Premium Hospitality Service",
        rating: 5.0,
        images: ["/amenities/staff1.jpg", "/amenities/staff2.jpg", "/amenities/staff3.jpg"],
      },
      {
        id: 15,
        title: "Daily Housekeeping & Cleaning",
        rating: 5.0,
        images: ["/amenities/clean1.jpg", "/amenities/clean2.jpg", "/amenities/clean3.jpg"],
      },
    ],
  },

  // ================= COMFORT & UTILITIES =================
  {
    id: 6,
    name: "Comfort & Utilities",
    items: [
      {
        id: 16,
        title: "High-Speed Wi-Fi Access",
        rating: 5.0,
        images: ["/amenities/wifi1.jpg", "/amenities/wifi2.jpg", "/amenities/wifi3.jpg"],
      },
      {
        id: 17,
        title: "Power Backup up to 4 Hours",
        rating: 5.0,
        images: ["/amenities/power1.jpg", "/amenities/power2.jpg", "/amenities/power3.jpg"],
      },
      {
        id: 18,
        title: "Ample Parking Space",
        rating: 5.0,
        images: ["/amenities/parking1.jpg", "/amenities/parking2.jpg", "/amenities/parking3.jpg"],
      },
    ],
  },

  // ================= LOCATION ADVANTAGE =================
  {
    id: 7,
    name: "Prime Location",
    items: [
      {
        id: 19,
        title: "Located on Main Road – Easy Access",
        rating: 5.0,
        images: ["/amenities/road1.jpg", "/amenities/road2.jpg", "/amenities/road3.jpg"],
      },
      {
        id: 20,
        title: "2 km from Badi Lake & Bahubali Hills",
        rating: 5.0,
        images: ["/amenities/lake1.jpg", "/amenities/lake2.jpg", "/amenities/lake3.jpg"],
      },
      {
        id: 21,
        title: "5 km from Famous Fateh Sagar Lake",
        rating: 5.0,
        images: ["/amenities/fateh1.jpg", "/amenities/fateh2.jpg", "/amenities/fateh3.jpg"],
      },
    ],
  },

  // ================= EXTRA LUXURY =================
  {
    id: 8,
    name: "Extra Luxury Features",
    items: [
      {
        id: 22,
        title: "Private Bonfire Setup",
        rating: 5.0,
        images: ["/amenities/fire1.jpg", "/amenities/fire2.jpg", "/amenities/fire3.jpg"],
      },
      {
        id: 23,
        title: "Outdoor Sitting with Night Lighting",
        rating: 5.0,
        images: ["/amenities/night1.jpg", "/amenities/night2.jpg", "/amenities/night3.jpg"],
      },
      {
        id: 24,
        title: "Photography Friendly Scenic Corners",
        rating: 5.0,
        images: ["/amenities/photo1.jpg", "/amenities/photo2.jpg", "/amenities/photo3.jpg"],
      },
    ],
  },
];
