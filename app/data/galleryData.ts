// app/data/galleryData.ts

export type GalleryItem = {
  id: number;
  type: "image" | "video";
  src: string;
  alt?: string;
  title?: string;
};

// Static demo data (replace with your own local images/videos)
export const galleryData: GalleryItem[] = [
  { id: 1, type: "image", src: "/homenew/lake/fatehsagar.jpg", title: "Living Room" },
  { id: 2, type: "image", src: "/homenew/lake/fatehsagar.jpg", title: "Bedroom" },
  { id: 3, type: "image", src: "/homenew/lake/fatehsagar.jpg", title: "Pool Area" },
  { id: 4, type: "image", src: "/homenew/lake/fatehsagar.jpg", title: "Garden" },
  { id: 5, type: "video", src: "/homenew/video-home.mp4", title: "Villa Tour 1" },
  { id: 6, type: "image", src: "/homenew/lake/fatehsagar.jpg", title: "Dining Area" },
  { id: 7, type: "image", src: "/homenew/lake/fatehsagar.jpg", title: "Balcony" },
  { id: 8, type: "image", src: "/homenew/lake/fatehsagar.jpg", title: "Lobby" },
  { id: 9, type: "image", src: "/homenew/lake/fatehsagar.jpg", title: "Bedroom 2" },
  { id: 10, type: "video", src: "/videos/villa-tour2.mp4", title: "Villa Tour 2" },
  { id: 11, type: "video", src: "/videos/villa-tour3.mp4", title: "Villa Tour 3" },
  { id: 12, type: "image", src: "/homenew/lake/fatehsagar.jpg", title: "Pool 2" },
  { id: 13, type: "image", src: "/homenew/lake/fatehsagar.jpg", title: "Garden 2" },
  { id: 14, type: "image", src: "/homenew/lake/fatehsagar.jpg", title: "Living Room 2" },
  { id: 15, type: "image", src: "/homenew/lake/fatehsagar.jpg", title: "Bedroom 3" },
  { id: 16, type: "image", src: "/homenew/lake/fatehsagar.jpg", title: "Dining 2" },
  { id: 17, type: "image", src: "/homenew/lake/fatehsagar.jpg", title: "Balcony 2" },
  { id: 18, type: "image", src: "/homenew/lake/fatehsagar.jpg", title: "Lobby 2" },
  { id: 19, type: "image", src: "/homenew/lake/fatehsagar.jpg", title: "Garden 3" },
  { id: 20, type: "video", src: "/videos/villa-tour4.mp4", title: "Villa Tour 4" },
  // add more items if you want, pattern will repeat automatically
];
