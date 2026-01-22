"use client";

import Image from "next/image";
import React, { useState } from "react";
import { galleryData, GalleryItem } from "../data/galleryData";

// Chunk utility (20 items per 8-card pattern)
const chunkArray = <T,>(array: T[], size: number): T[][] => {
  const result: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
};

// Small group indexes in 20-item pattern
const smallGroups = [
  [0, 1, 2, 3],
  [5, 6, 7, 8],
  [11, 12, 13, 14],
  [15, 16, 17, 18],
];

// Big card indexes
const bigIndexes = [4, 9, 10, 19];

const Page: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);

  const openModal = (item: GalleryItem) => {
    setActiveItem(item);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setActiveItem(null);
  };

  const chunks = chunkArray(galleryData, 20); // each 20 items = 1 pattern

  return (
    <div className="bg-fuchsia-100">
      <div className="text-center mb-8">
  <p className="text-2xl md:text-3xl font-semibold">
    Villa Gallery
  </p>
  <p className="text-xs uppercase tracking-widest text-gray-400 mt-1">
    Comfort • Space • Serenity
  </p>
</div>


      <div className="container-fluid grid grid-cols-1">
        {chunks.map((chunk, chunkIdx) => (
          <div
            key={chunkIdx}
            className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full"
          >
            {(() => {
              const usedIndexes = new Set<number>();

              return chunk.map((item, index) => {
                // skip already rendered indexes (prevents ghost cards)
                if (usedIndexes.has(index)) return null;

                const group = smallGroups.find((g) =>
                  g.includes(index)
                );

                // Small 4-image group
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

                        return (
                          <div
                            key={img.id}
                            className="aspect-square relative w-full rounded-sm overflow-hidden shadow-md cursor-pointer"
                            onClick={() => openModal(img)}
                          >
                            {img.type === "image" ? (
                              <Image
                                src={img.src}
                                alt={img.alt || ""}
                                fill
                                style={{ objectFit: "cover" }}
                                quality={75}
                                loading="lazy"
                              />
                            ) : (
                              <video
                                src={img.src}
                                className="w-full h-full object-cover"
                                muted
                                loop
                                controls
                              />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  );
                }

                // Big cards
                if (bigIndexes.includes(index)) {
                  const bigItem = chunk[index];
                  if (!bigItem) return null;

                  usedIndexes.add(index);

                  return (
                    <div
                      key={bigItem.id}
                      className="w-full h-96 md:h-auto relative rounded-sm overflow-hidden shadow-md cursor-pointer group"
                      onClick={() => openModal(bigItem)}
                    >
                      {bigItem.type === "image" ? (
                        <Image
                          src={bigItem.src}
                          alt={bigItem.alt || ""}
                          fill
                          style={{ objectFit: "cover" }}
                          className="transition-transform duration-300 group-hover:scale-105"
                          quality={75}
                          loading="lazy"
                        />
                      ) : (
                        <video
                          src={bigItem.src}
                          className="w-full h-full object-cover"
                          muted
                          loop
                          controls
                        />
                      )}
                    </div>
                  );
                }

                return null;
              });
            })()}
          </div>
        ))}
      </div>

      {/* Modal */}
      {modalOpen && activeItem && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
         <div className="relative w-full max-w-[70vh] aspect-square mx-auto bg-white rounded-2xl shadow-lg">

            <button
              onClick={closeModal}
              className="absolute top-2 right-2 z-50 text-black bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition"
            >
              ✕
            </button>

            <div className="relative w-full max-w-[70vh] aspect-square mx-auto">
              {activeItem.type === "image" ? (
                <Image
                  src={activeItem.src}
                  alt={activeItem.alt || ""}
                  fill
                  style={{ objectFit: "cover" }}
                  className="rounded-t-2xl"
                  quality={75}
                  loading="lazy"
                />
              ) : (
                <video
                  src={activeItem.src}
                  className="w-full h-full object-cover rounded-t-2xl"
                  controls
                  autoPlay
                  muted
                />
              )}
            </div>

            <div className="p-4">
              <h2 className="text-xl font-bold">
                {activeItem.title}
              </h2>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
