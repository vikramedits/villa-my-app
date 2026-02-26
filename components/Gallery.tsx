"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState, useMemo } from "react";
import FocusLock from "react-focus-lock";
import { motion, AnimatePresence } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import { galleryData, GalleryItem } from "@/app/data/galleryData";

const chunkArray = <T,>(array: T[], size: number): T[][] => {
  const result: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
};

// ============= Small group indexes in 20-item pattern =============
const smallGroups = [
  [0, 1, 2, 3],
  [5, 6, 7, 8],
  [11, 12, 13, 14],
  [15, 16, 17, 18],
];

// ========= Big card indexes ===========
const bigIndexes = [4, 9, 10, 19];

const Gallery: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [videoPlaying, setVideoPlaying] = useState<Record<string, boolean>>({});
  const [visibleChunks, setVisibleChunks] = useState(1);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const imageItems = useMemo(
    () => galleryData.filter((item) => item.type !== "video"),
    [],
  );
  const INITIAL_ITEMS_PER_CHUNK = 12;
  const CHUNK_INCREMENT = 6;

  const chunks = useMemo(() => chunkArray(galleryData, 20), []);
  const [visibleItemsPerChunk, setVisibleItemsPerChunk] = useState<number[]>(
    chunks.map(() => INITIAL_ITEMS_PER_CHUNK),
  );

  // const [modalVideoPlaying, setModalVideoPlaying] = useState(false);
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setActiveSlideIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on("select", onSelect);
    onSelect(); // initialize

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  const openModal = (item: GalleryItem) => {
    setVideoPlaying({});
    const index = imageItems.findIndex((i) => i.id === item.id);
    setActiveIndex(index);
    setModalOpen(true);
  };
  // =============== reset modal video ====================
  const closeModal = () => {
    setModalOpen(false);
    setActiveIndex(null);
    // setModalVideoPlaying(false);
  };

  // =============== Keyboard Escape ======================
  const handleKey = (e: KeyboardEvent) => {
    if (e.key === "Escape") closeModal();
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  // ============= IntersectionObserver for infinite scroll ======================
  useEffect(() => {
    let ticking = false;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!ticking && entries[0].isIntersecting) {
          ticking = true;
          setVisibleItemsPerChunk((prev) =>
            prev.map((count, idx) =>
              idx === visibleChunks - 1 ? count + CHUNK_INCREMENT : count,
            ),
          );
          if (visibleChunks < chunks.length) {
            setVisibleChunks((prev) => prev + 1);
          }

          setTimeout(() => (ticking = false), 200);
        }
      },
      { rootMargin: "200px" },
    );

    if (loadMoreRef.current) observer.observe(loadMoreRef.current);
    return () => {
      if (loadMoreRef.current) observer.unobserve(loadMoreRef.current);
    };
  }, [visibleChunks, chunks.length]);

  useEffect(() => {
    if (modalOpen && emblaApi && activeIndex !== null) {
      emblaApi.scrollTo(activeIndex, false);
    }
  }, [modalOpen, emblaApi, activeIndex]);

  // ============ Click-to-play handler for video thumbnails =================
  const handleVideoClick = (id: string) => {
    setVideoPlaying((prev) => {
      const newState: Record<string, boolean> = {};
      Object.keys(prev).forEach((key) => {
        newState[key] = false; // sab videos pause
      });
      newState[id] = true; // clicked video play
      return newState;
    });
  };
  if (!galleryData || galleryData.length === 0) {
    return (
      <div className="text-center p-8 text-gray-500">
        No gallery items found.
      </div>
    );
  }

  return (
    <div className="container-fluid pb-5 md:pb-8">
      {/* ======================= Heading =========================== */}
      <div className="text-center my-5 lg:my-10">
        <p className="text-2xl md:text-4xl font-semibold text-gray-700 tracking-wide pb-1 lg:pb-2">
          Villa Gallery
        </p>

        <p className="text-xs uppercase tracking-widest text-gray-400">
          Comfort • Space • Serenity
        </p>
        <div className="w-20 h-0.5 bg-green-800 mx-auto mt-3"></div>
      </div>
      <div className=" grid grid-cols-1 gap-4">
        {chunks.slice(0, visibleChunks).map((chunk, chunkIdx) => (
          <div
            key={chunkIdx}
            className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full"
          >
            {(() => {
              const usedIndexes = new Set<number>();
              const itemsToRender = chunk.slice(
                0,
                visibleItemsPerChunk[chunkIdx],
              );

              return itemsToRender.map((item, index) => {
                if (usedIndexes.has(index)) return null;

                const group = smallGroups.find((g) => g.includes(index));

                // ======================== Small group ==========================
                if (group && group[0] === index) {
                  group.forEach((i) => usedIndexes.add(i));

                  return (
                    <div
                      key={`group-${index}`}
                      className="grid grid-cols-2 gap-2"
                    >
                      {group.map((i) => {
                        const img = chunk[i];
                        if (!img) return null;

                        if (img.type === "video") {
                          const isPlaying = videoPlaying[img.id];
                          return (
                            <div
                              key={img.id.toString()}
                              className="aspect-square relative w-full rounded-sm overflow-hidden shadow-md cursor-pointer group bg-gray-100"
                              onClick={() =>
                                handleVideoClick(img.id.toString())
                              }
                            >
                              {!isPlaying ? (
                                <>
                                  <Image
                                    src={
                                      img.thumbnail ||
                                      "/homenew/gallery-webp/room-4.webp"
                                    }
                                    alt={img.alt || "Video thumbnail"}
                                    fill
                                    style={{ objectFit: "cover" }}
                                    quality={75}
                                    loading="lazy"
                                  />

                                  {/* TOP LEFT VIDEO BADGE */}
                                  <div className="absolute top-2 left-2 bg-black text-green-500 border border-green-500 text-xs px-2 py-1 rounded-full">
                                    VIDEO
                                  </div>

                                  {/* CENTER PLAY BUTTON */}
                                  <div className="absolute inset-0 flex items-center justify-center">
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleVideoClick(img.id.toString());
                                      }}
                                      className="bg-white/90 p-3 rounded-full shadow-md hover:scale-110 transition"
                                    >
                                      ▶
                                    </button>
                                  </div>
                                </>
                              ) : (
                                <video
                                  src={img.src}
                                  className="w-full h-full object-cover"
                                  muted
                                  autoPlay
                                  playsInline
                                  controls
                                  preload="none"
                                />
                              )}
                            </div>
                          );
                        }

                        return (
                          <div
                            key={img.id.toString()}
                            className="aspect-square relative w-full rounded-sm overflow-hidden shadow-md cursor-pointer"
                            onClick={() => openModal(img)}
                          >
                            <Image
                              src={img.src}
                              alt={img.alt || ""}
                              fill
                              style={{ objectFit: "cover" }}
                              quality={75}
                              placeholder="blur"
                              blurDataURL={img.placeholder || img.src}
                              loading="lazy"
                            />
                          </div>
                        );
                      })}
                    </div>
                  );
                }

                // ================================ Big card ===========================
                if (bigIndexes.includes(index)) {
                  usedIndexes.add(index);

                  const bigItem = chunk[index];
                  if (!bigItem) return null;

                  if (bigItem.type === "video") {
                    const isPlaying = videoPlaying[bigItem.id];

                    return (
                      <div
                        key={bigItem.id.toString()}
                        className="w-full h-96 md:h-auto relative rounded-sm overflow-hidden shadow-md bg-gray-100"
                      >
                        {!isPlaying ? (
                          <>
                            <Image
                              src={
                                bigItem.thumbnail || "/video-placeholder.jpg"
                              }
                              alt={bigItem.alt || "Video thumbnail"}
                              fill
                              style={{ objectFit: "cover" }}
                              quality={75}
                              loading="lazy"
                            />

                            {/* VIDEO BADGE */}
                            <div className="absolute top-2 left-2 bg-green-800 text-white border border-green-500 text-xs px-4 py-1 rounded-full ">
                              VIDEO
                            </div>

                            {/* PLAY BUTTON */}
                            <div className="absolute inset-0 flex items-center justify-center">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleVideoClick(bigItem.id.toString());
                                }}
                                className="bg-white p-4 rounded-full shadow-lg hover:scale-110 transition "
                              >
                                ▶
                              </button>
                            </div>
                          </>
                        ) : (
                          <video
                            src={bigItem.src}
                            className="w-full h-full object-cover"
                            muted
                            autoPlay
                            playsInline
                            controls
                            preload="none"
                          />
                        )}
                      </div>
                    );
                  }

                  //  ======================== Image case - Big ================================
                  return (
                    <div
                      key={bigItem.id.toString()}
                      className="w-full h-96 md:h-auto relative rounded-sm overflow-hidden shadow-md cursor-pointer group"
                      onClick={() => openModal(bigItem)}
                    >
                      <Image
                        src={bigItem.src}
                        alt={bigItem.alt || ""}
                        fill
                        style={{ objectFit: "cover" }}
                        className="transition-transform duration-300 group-hover:scale-105"
                        quality={75}
                        loading="lazy"
                      />
                    </div>
                  );
                }
                return null;
              });
            })()}
          </div>
        ))}

        {/* ==== Scroll trigger ===== */}
        <div ref={loadMoreRef} className="h-4"></div>
      </div>

      {/* =========================================== Modal =========================================== */}
      <AnimatePresence >
        {modalOpen && activeIndex !== null && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            className="fixed inset-0 z-50 w-full  flex items-center justify-center bg-black/70 "
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <FocusLock>
              <motion.div
                className="relative w-screen mx-auto lg:w-125 h-[70%]  md:h-auto bg-white rounded-lg overflow-hidden "
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                <button
                  onClick={closeModal}
                  aria-label="Close modal"
                  className="absolute top-2 right-4 z-50 font-medium text-black bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition"
                >
                  ✕
                </button>
                {/* ================= Slider For Images ================= */}
                <div className="relative w-full h-[55vh] overflow-hidden ">
                  <div className="overflow-hidden" ref={emblaRef}>
                    <div className="flex gap-2">
                      {imageItems.map((item) => (
                        <div
                          key={item.id}
                          className="min-w-full h-[55vh] relative"
                        >
                          <Image
                            src={item.src}
                            alt={item.alt || ""}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                {/* =============== Progress bar =============== */}
                  <div className="absolute bottom-2 left-0 w-full px-4">
                    <div className="h-2 bg-gray-300 rounded-full overflow-hidden">
                      <div
                        className="h-2 bg-green-600 rounded-full transition-all duration-300"
                        style={{
                          width: `${((activeSlideIndex + 1) / imageItems.length) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  {/* ============ Slide counter =========== */}
                  <p className="absolute top-4 left-4 text-white bg-black/50 px-2 py-1 rounded-md text-sm">
                    {activeSlideIndex + 1} / {imageItems.length}
                  </p>
                </div>
                {/* ============= Title =========== */}
                <div className="p-4">
                  <p id="modal-title" className="text-xl font-bold text-black ">
                    {imageItems[activeSlideIndex]?.title || "Gallery Image"}
                  </p>
                </div>
              </motion.div>
            </FocusLock>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;
