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
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);
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

  const openModal = (item: GalleryItem) => {
    setVideoPlaying({}); // pause all grid videos
    setActiveItem(item);
    setModalOpen(true);
  };
  // =============== reset modal video ====================
  const closeModal = () => {
    setModalOpen(false);
    setActiveItem(null);
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
      <div className="text-center my-4 md:my-8">
        <p className="text-2xl md:text-3xl font-semibold border-x-4 border-black mx-2">
          Villa Gallery
        </p>
        <p className="text-xs uppercase tracking-widest text-gray-400 mt-1">
          Comfort • Space • Serenity
        </p>
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

                // ==== Small group =====
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
                                <Image
                                  src={
                                    img.thumbnail || "/video-placeholder.jpg"
                                  }
                                  alt={img.alt || "Video thumbnail"}
                                  fill
                                  style={{ objectFit: "cover" }}
                                  quality={75}
                                  placeholder="blur"
                                  blurDataURL={
                                    img.thumbnail || "/video-placeholder.jpg"
                                  }
                                  loading="lazy"
                                />
                              ) : (
                                <video
                                  src={img.src}
                                  className="w-full h-full object-cover"
                                  muted
                                  loop
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

                // ==== Big card ====
                if (bigIndexes.includes(index)) {
                  usedIndexes.add(index);
                  const bigItem = chunk[index];
                  if (!bigItem) return null;

                  if (bigItem.type === "video") {
                    const isPlaying = videoPlaying[bigItem.id];
                    return (
                      <div
                        key={bigItem.id.toString()}
                        className="w-full h-96 md:h-auto relative rounded-sm overflow-hidden shadow-md cursor-pointer group bg-gray-100"
                        onClick={() => handleVideoClick(bigItem.id.toString())}
                      >
                        {!isPlaying ? (
                          <Image
                            src={bigItem.thumbnail || "/video-placeholder.jpg"}
                            alt={bigItem.alt || "Video thumbnail"}
                            fill
                            style={{ objectFit: "cover" }}
                            quality={75}
                            placeholder="blur"
                            blurDataURL={
                              bigItem.thumbnail || "/video-placeholder.jpg"
                            }
                            loading="lazy"
                          />
                        ) : (
                          <video
                            src={bigItem.src}
                            className="w-full h-full object-cover"
                            muted
                            loop
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
                      key={bigItem.id.toString()}
                      className="w-full h-96 md:h-auto relative rounded-sm overflow-hidden shadow-md cursor-pointer group"
                      onClick={() => openModal(bigItem)}
                    >
                      <Image
                        src={bigItem.src}
                        alt={bigItem.alt || ""}
                        fill
                        style={{ objectFit: "cover" }}
                        className="transition-transform duration-300 group-hover:scale-105 will-change-transform"
                        quality={75}
                        placeholder="blur"
                        blurDataURL={bigItem.placeholder || bigItem.src}
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

      {/* ===== Modal ===== */}
      <AnimatePresence>
        {modalOpen && activeItem && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            className="fixed inset-0 z-50 w-full flex items-center justify-center bg-black/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <FocusLock>
              <motion.div
                className="relative w-full md:max-w-4xl max-h-[90vh] bg-white rounded-2xl shadow-lg overflow-hidden"
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
                <div className="w-96 md:w-2xl h-[50vh] md:h-[70vh] relative">
                  {activeItem.type === "video" && (
                    <div
                      className="w-full h-full relative cursor-pointer"
                      onClick={() => setModalVideoPlaying(true)}
                    >
                      {!modalVideoPlaying ? (
                        <Image
                          src={activeItem.thumbnail || "/video-placeholder.jpg"}
                          alt={activeItem.alt || "Video thumbnail"}
                          fill
                          style={{ objectFit: "cover" }}
                          className="rounded-t-2xl"
                        />
                      ) : (
                        <video
                          src={activeItem.src}
                          className="w-full h-full object-cover rounded-t-2xl"
                          muted
                          autoPlay
                          loop
                          playsInline
                          controls
                          preload="none"
                        />
                      )}

                      {!modalVideoPlaying && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <button
                            className="bg-white p-2 rounded-full shadow-md"
                            aria-label="Play video"
                          >
                            ▶
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <p id="modal-title" className="text-xl font-bold">
                    {activeItem.title}
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
