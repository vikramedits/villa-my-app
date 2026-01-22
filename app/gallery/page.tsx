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
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Villa Gallery</h1>

      {/* Outer grid: Desktop 4 patterns per row, mobile stacked */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {chunks.map((chunk, chunkIdx) => (
          <div key={chunkIdx} className="flex flex-col gap-4 w-full">
            {chunk.map((item, index) => {
              // Check if item is in a small 4-image group
              const group = smallGroups.find((g) => g.includes(index));
              if (group && group[0] === index) {
                // Render 4-image group as 2x2 grid
                return (
                  <div key={index} className="grid grid-cols-2 gap-2">
                    {group.map((i) => {
                      const img = chunk[i];
                      if (!img) return null;
                      return (
                        <div
                          key={img.id}
                          className="aspect-square relative w-full rounded-xl overflow-hidden shadow-md cursor-pointer"
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
                return (
                  <div
                    key={bigItem.id}
                    className="w-full h-96 relative rounded-xl overflow-hidden shadow-md cursor-pointer"
                    onClick={() => openModal(bigItem)}
                  >
                    {bigItem.type === "image" ? (
                      <Image
                        src={bigItem.src}
                        alt={bigItem.alt || ""}
                        style={{ objectFit: "cover" }}
                        className="w-full h-full"
                        fill
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

              return null; // other items already rendered in small groups
            })}
          </div>
        ))}
      </div>

      {/* Modal */}
      {modalOpen && activeItem && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl max-h-[80vh] overflow-y-auto bg-white rounded-2xl shadow-lg">
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 z-50 text-black bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition"
            >
              ✕
            </button>

            <div className="relative w-full h-[70vh]">
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
              <h2 className="text-xl font-bold">{activeItem.title}</h2>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
