// app/data/galleryData.ts

export interface GalleryItem {
  id: string | number;       // number bhi chal sakta hai
  src: string;
  type: "image" | "video";
  alt?: string;
  title?: string;
  placeholder?: string;      // blur placeholder ke liye
  thumbnail?: string;        // video thumbnail ke liye
}
// Static demo data (replace with your own local images/videos)
export const galleryData: GalleryItem[] = [
  { id: 1, type: "image", src: "/homenew/gallery-webp/balcony-2.webp", title: "Living Room" },
  { id: 2, type: "image", src: "/homenew/gallery-webp/room-9.webp", title: "Bedroom" },
  { id: 3, type: "image", src: "/homenew/gallery-webp/pool-1.webp", title: "Pool Area" },
  { id: 4, type: "image", src: "/homenew/gallery-webp/villa-back-1.webp", title: "Garden" },
  // video-1
 { 
  id: 5,
  type: "video",
  src: "/homenew/video-home.mp4",
  thumbnail: "/homenew/gallery-webp/room-4.webp",
  title: "Villa Tour 1"
},
  { id: 6, type: "image", src: "/homenew/gallery-webp/room-1.webp", title: "Dining Area" },
  { id: 7, type: "image", src: "/homenew/gallery-webp/garden-1.webp", title: "Balcony" },
  { id: 8, type: "image", src: "/homenew/gallery-webp/room-2.webp", title: "Lobby" },
  { id: 9, type: "image", src: "/homenew/gallery-webp/room-3.webp", title: "Bedroom 2" },
   // video-2 & 3
 { 
  id: 10,
  type: "video",
  src: "/videos/villa-tour2.mp4",
  thumbnail: "/homenew/gallery-webp/pool-2.webp",
  title: "Villa Tour 2"
},
 { 
  id: 11,
  type: "video",
  src: "/videos/villa-tour3.mp4",
  thumbnail: "/homenew/gallery-webp/room-7.webp",
  title: "Villa Tour 3"
},
  { id: 12, type: "image", src: "/homenew/gallery-webp/room-4.webp", title: "Pool 2" },
  { id: 13, type: "image", src: "/homenew/gallery-webp/pool-3.webp", title: "Garden 2" },
  { id: 14, type: "image", src: "/homenew/gallery-webp/room-6.webp", title: "Living Room 2" },
  { id: 15, type: "image", src: "/homenew/gallery-webp/room-7.webp", title: "Bedroom 3" },
  { id: 16, type: "image", src: "/homenew/gallery-webp/room-8.webp", title: "Dining 2" },
  { id: 17, type: "image", src: "/homenew/gallery-webp/room-10.webp", title: "Balcony 2" },
  { id: 18, type: "image", src: "/homenew/gallery-webp/room-5.webp", title: "Lobby 2" },
  { id: 19, type: "image", src: "/homenew/gallery-webp/pool-2.webp", title: "Garden 3" },
   // video-4
  { 
  id: 20,
  type: "video",
  src: "/videos/villa-tour4.mp4",
  thumbnail: "/homenew/gallery-webp/room-5.webp",
  title: "Villa Tour 4"
},
  // =================================================================================================
  // add more items if you want, pattern will repeat automatically
];
