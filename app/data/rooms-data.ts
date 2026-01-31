// =========================================
// File: app/data/rooms-data.ts
// =========================================

export type RoomMedia = {
  type: "image" | "video";
  src: string;
};

export type Room = {
  id: number;
  name: string;
  tagline: string;
  floor: string;
  view: string;
  rating: number;
  badge?: string;
  heroImages: RoomMedia[]; // For modal / swiper
  media: RoomMedia[]; // For cards & gallery grid
};

export const roomsData: Room[] = [
  // ================= GROUND / FIRST FLOOR =================
  {
    id: 1,
    name: "(1) Garden Bliss Suite",
    tagline: "Wake up with greenery & fresh air",
    floor: "First Floor",
    view: "Private Garden View",
    rating: 5.0,
    badge: "Garden Access",
    heroImages: [
      { type: "image", src: "/homenew/room/room-1.jpeg" },
      { type: "image", src: "/rooms/garden2.jpg" },
      { type: "image", src: "/rooms/garden3.jpg" },
      { type: "image", src: "/rooms/garden4.jpg" },
      { type: "image", src: "/rooms/garden5.jpg" },
      { type: "image", src: "/rooms/garden6.jpg" },
      { type: "image", src: "/rooms/garden7.jpg" },
    ],
    media: [
      { type: "image", src: "/homenew/room/room-1.jpeg" },
      { type: "image", src: "/rooms/garden2.jpg" },
      { type: "image", src: "/rooms/garden3.jpg" },
    ],
  },
  {
    id: 2,
    name: "(2) Green Haven Suite",
    tagline: "Your private hideaway in nature",
    floor: "First Floor",
    view: "Back Garden & Privacy View",
    rating: 5.0,
    badge: "Most Private",
    heroImages: [
      { type: "image", src: "/rooms/haven1.jpg" },
      { type: "image", src: "/rooms/haven2.jpg" },
      { type: "image", src: "/rooms/haven3.jpg" },
      { type: "image", src: "/rooms/haven4.jpg" },
      { type: "image", src: "/rooms/haven5.jpg" },
      { type: "image", src: "/rooms/haven6.jpg" },
      { type: "image", src: "/rooms/haven7.jpg" },
    ],
    media: [
      { type: "image", src: "/homenew/room/room-2.jpeg" },
      { type: "image", src: "/rooms/haven2.jpg" },
      { type: "image", src: "/rooms/haven3.jpg" },
    ],
  },

  // ================= SECOND FLOOR FRONT (SUNRISE + POOL) =================
  {
    id: 3,
    name: "(3) Sunrise Royal Suite",
    tagline: "Golden mornings with pool & hills",
    floor: "Second Floor",
    view: "Pool View · Sunrise Balcony",
    rating: 5.0,
    badge: "Best Sunrise View",
    heroImages: [
      { type: "image", src: "/rooms/sunrise1.jpg" },
      { type: "image", src: "/rooms/sunrise2.jpg" },
      { type: "image", src: "/rooms/sunrise3.jpg" },
      { type: "image", src: "/rooms/sunrise4.jpg" },
      { type: "image", src: "/rooms/sunrise5.jpg" },
      { type: "image", src: "/rooms/sunrise6.jpg" },
      { type: "video", src: "/rooms/sunrise.mp4" }, // video in hero
    ],
    media: [
      { type: "image", src: "/homenew/room/room-3.jpeg" },
      { type: "image", src: "/rooms/sunrise2.jpg" },
      { type: "video", src: "/rooms/sunrise.mp4" },
    ],
  },
  {
    id: 4,
    name: "(4) Aqua Dawn Suite",
    tagline: "Luxury mornings by the water",
    floor: "Second Floor",
    view: "Pool Facing · Sunrise Balcony",
    rating: 5.0,
    badge: "Pool Facing",
    heroImages: [
      { type: "image", src: "/rooms/aqua1.jpg" },
      { type: "image", src: "/rooms/aqua2.jpg" },
      { type: "image", src: "/rooms/aqua3.jpg" },
      { type: "image", src: "/rooms/aqua4.jpg" },
      { type: "image", src: "/rooms/aqua5.jpg" },
      { type: "image", src: "/rooms/aqua6.jpg" },
      { type: "image", src: "/rooms/aqua7.jpg" },
    ],
    media: [
      { type: "image", src: "/homenew/room/room-4.jpeg" },
      { type: "image", src: "/rooms/aqua2.jpg" },
      { type: "image", src: "/rooms/aqua3.jpg" },
    ],
  },

  // ================= SECOND FLOOR BACK (SUNSET + MOUNTAIN) =================
  {
    id: 5,
    name: "(5) Sunset Serenity Suite",
    tagline: "Evenings painted in gold & silence",
    floor: "Second Floor",
    view: "Mountain View · Sunset Balcony",
    rating: 5.0,
    badge: "Best Sunset View",
    heroImages: [
      { type: "image", src: "/rooms/sunset1.jpg" },
      { type: "image", src: "/rooms/sunset2.jpg" },
      { type: "image", src: "/rooms/sunset3.jpg" },
      { type: "image", src: "/rooms/sunset4.jpg" },
      { type: "image", src: "/rooms/sunset5.jpg" },
      { type: "image", src: "/rooms/sunset6.jpg" },
      { type: "image", src: "/rooms/sunset7.jpg" },
    ],
    media: [
      { type: "image", src: "/homenew/room/room-5.jpeg" },
      { type: "image", src: "/rooms/sunset2.jpg" },
      { type: "image", src: "/rooms/sunset3.jpg" },
    ],
  },
  {
    id: 6,
    name: "(6) Mountain Whisper Suite",
    tagline: "Where mountains speak & you relax",
    floor: "Second Floor",
    view: "Mountain View · Back Balcony",
    rating: 5.0,
    badge: "Peaceful Stay",
    heroImages: [
      { type: "image", src: "/rooms/mountain1.jpg" },
      { type: "image", src: "/rooms/mountain2.jpg" },
      { type: "image", src: "/rooms/mountain3.jpg" },
      { type: "image", src: "/rooms/mountain4.jpg" },
      { type: "image", src: "/rooms/mountain5.jpg" },
      { type: "image", src: "/rooms/mountain6.jpg" },
      { type: "image", src: "/rooms/mountain7.jpg" },
    ],
    media: [
      { type: "image", src: "/homenew/room/room-6.jpeg" },
      { type: "image", src: "/rooms/mountain2.jpg" },
      { type: "image", src: "/rooms/mountain3.jpg" }, 
    ],
  },

  // ================= TOP FLOOR SIGNATURE ROOM =================
  {
    id: 7,
    name: "(7) Sky Signature Suite",
    tagline: "Above all, beyond luxury",
    floor: "Top Floor",
    view: "Mountain · Pool · Terrace View",
    rating: 5.0,
    badge: "Signature Penthouse",
    heroImages: [
      { type: "image", src: "/rooms/sky1.jpg" },
      { type: "image", src: "/rooms/sky2.jpg" },
      { type: "image", src: "/rooms/sky3.jpg" },
      { type: "image", src: "/rooms/sky4.jpg" },
      { type: "image", src: "/rooms/sky5.jpg" },
      { type: "image", src: "/rooms/sky6.jpg" },
      { type: "image", src: "/rooms/sky7.jpg" },
    ],
    media: [
      { type: "image", src: "/homenew/room/room-7.jpeg" },
      { type: "image", src: "/rooms/sky2.jpg" },
      { type: "image", src: "/rooms/sky3.jpg" },
    ],
  },
];
