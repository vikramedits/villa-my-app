"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState, useMemo } from "react";
import FocusLock from "react-focus-lock";
import { galleryData, GalleryItem } from "../data/galleryData";
import { motion, AnimatePresence } from "framer-motion";

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

const Page: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [videoPlaying, setVideoPlaying] = useState<Record<string, boolean>>({});
  const [visibleChunks, setVisibleChunks] = useState(1);

  const INITIAL_ITEMS_PER_CHUNK = 12;
  const CHUNK_INCREMENT = 6;

  const chunks = useMemo(() => chunkArray(galleryData, 20), []);
  const [visibleItemsPerChunk, setVisibleItemsPerChunk] = useState<number[]>(
    chunks.map(() => INITIAL_ITEMS_PER_CHUNK),
  );

  const [modalVideoPlaying, setModalVideoPlaying] = useState(false);
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  const openModal = (item: GalleryItem) => {
    setVideoPlaying({});
    const index = galleryData.findIndex((i) => i.id === item.id);
    setActiveIndex(index);
    setModalOpen(true);
  };
  // =============== reset modal video ====================
  const closeModal = () => {
    setModalOpen(false);
    setActiveIndex(null);
    setModalVideoPlaying(false);
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
    if (activeIndex !== null) {
      const container = document.getElementById("slider");
      const child = container?.children[activeIndex] as HTMLElement;
      child?.scrollIntoView({ behavior: "smooth", inline: "center" });
    }
  }, [activeIndex]);
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
    <div className="pb-5 md:pb-8">
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
      <div className="container-fluid grid grid-cols-1 gap-4">
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
      <AnimatePresence>
        {modalOpen && activeIndex !== null && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            className="px-3 fixed inset-0 z-50 w-full flex items-center justify-center bg-black/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <FocusLock>
              <motion.div
                className="relative w-full lg:max-w-4xl max-h-[90vh] bg-white rounded-2xl shadow-lg overflow-hidden"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                <button
                  onClick={closeModal}
                  aria-label="Close modal"
                  className="absolute top-2 right-2 z-50 text-black bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition"
                >
                  ✕
                </button>
                {/* ================= Slider For Images ================= */}
                <div
                ref={sliderRef}
                  id="slider"
                  className="w-96 h-[50vh] flex overflow-x-auto  scroll-smooth"
                >
                  {galleryData
                    .filter((item) => item.type !== "video")
                    .map((item) => (
                      <div
                        key={item.id}
                        className="w-full h-full relative snap-center shrink-0"
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
                {/* ================= Slider For Video ================= */}
                {/* <div
                  id="slider"
                  className="w-full h-[50vh] flex overflow-x-auto snap-x snap-mandatory scroll-smooth"
                >
                  {galleryData.map((item, index) => (
                    <div
                      key={item.id}
                      className="min-w-full h-full relative snap-center shrink-0"
                    >
                      {item.type === "video" ? (
                        <video
                          src={item.src}
                          className="w-full h-full object-contain"
                          controls
                        />
                      ) : (
                        <Image
                          src={item.src}
                          alt={item.alt || ""}
                          fill
                          style={{ objectFit: "contain" }}
                        />
                      )}
                    </div>
                  ))}
                </div> */}

                <div className="p-4">
                  <p id="modal-title" className="text-xl font-bold">
                    {activeIndex !== null && galleryData[activeIndex]?.title}
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

export default Page;
