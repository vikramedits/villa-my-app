"use client"

import Image from "next/image"
import { useState, useMemo, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import FocusLock from "react-focus-lock"
import useEmblaCarousel from "embla-carousel-react"
import { galleryData, GalleryItem } from "@/app/data/galleryData"

type TabType = "all" | "images" | "videos"

export default function Gallery() {

  const [tab, setTab] = useState<TabType>("all")
  const [modalOpen, setModalOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState<number>(0)
  const [videoPlaying, setVideoPlaying] = useState<Record<string, boolean>>({})


  const [activeSlide, setActiveSlide] = useState(0)


  const [startIndex, setStartIndex] = useState(0)

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true, startIndex: startIndex
  })

  const images = useMemo(
    () => galleryData.filter(i => i.type === "image"),
    []
  )

  const videos = useMemo(
    () => galleryData.filter(i => i.type === "video"),
    []
  )

  const filtered = useMemo(() => {
    if (tab === "images") return images
    if (tab === "videos") return videos
    return galleryData
  }, [tab, images, videos])

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setActiveSlide(emblaApi.selectedScrollSnap());
    };

    emblaApi.on("select", onSelect);
    onSelect();

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  const openModal = (item: GalleryItem) => {
    const index = images.findIndex(i => i.id === item.id)

    setStartIndex(index)   // slider start yaha se
    setActiveSlide(index)  // progress bar yaha se
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
  }

  useEffect(() => {
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal()
    }
    window.addEventListener("keydown", key)
    return () => window.removeEventListener("keydown", key)
  }, [])

  const playVideo = (id: string) => {
    setVideoPlaying(prev => {
      const obj: Record<string, boolean> = {}
      Object.keys(prev).forEach(k => obj[k] = false)
      obj[id] = true
      return obj
    })
  }

  useEffect(() => {
    if (!emblaApi) return
    if (modalOpen) {
      emblaApi.scrollTo(startIndex, true)
    }
  }, [modalOpen, emblaApi, startIndex])

  return (

    <div className="container mx-auto px-4 pb-16">

      {/* ================= Heading ================= */}

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

      {/* ================= Tabs ================= */}

      <div className="flex justify-center mb-12">

        <div className="flex gap-2 bg-gray-100 p-1 rounded-full shadow-inner">

          {["all", "images", "videos"].map((t) => {

            const active = tab === t

            return (

              <button
                key={t}
                onClick={() => setTab(t as TabType)}
                className={`relative px-6 py-2 text-sm font-medium rounded-full transition-all duration-300 capitalize
          ${active
                    ? "bg-white text-green-700 shadow-md"
                    : "text-gray-500 hover:text-gray-800"
                  }`}
              >

                {t}

              </button>

            )

          })}

        </div>

      </div>

      {/* ===================== GALLERY CONTENT ===================== */}

      {/* ---------- ALL TAB (Masonry Layout) ---------- */}

      {tab === "all" && (

        <div className="columns-2 md:columns-3 lg:columns-4 gap-2">

          {filtered.map((item, index) => {

            const aspectStyles = [
              "aspect-[4/5]",
              "aspect-[3/4]",
              "aspect-[1/1]",
              "aspect-[4/6]"
            ]

            const aspect = aspectStyles[index % aspectStyles.length]

            if (item.type === "video") {

              const playing = videoPlaying[item.id]

              return (

                <div
                  key={item.id}
                  className="group relative break-inside-avoid mb-2 overflow-hidden rounded-md shadow-md hover:shadow-2xl transition-all duration-300 bg-black"
                >

                  {!playing ? (

                    <>
                      <div className={`relative w-full ${aspect}`}>

                        <Image
                          src={item.thumbnail || "/video-thumb.webp"}
                          alt={item.title || ""}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110 group-hover:brightness-75"
                          loading="lazy"
                        />

                      </div>

                      <div className="absolute inset-0 bg-linar-to-t from-black/70 via-black/20 to-transparent" />

                      <div className="absolute inset-0 flex items-center justify-center">

                        <button
                          onClick={() => playVideo(String(item.id))}
                          className="bg-white/90 backdrop-blur-md p-4 rounded-full shadow-xl transition-transform duration-300 group-hover:scale-110"
                        >
                          ▶
                        </button>

                      </div>

                      <div className="absolute top-3 left-3 bg-black/70 text-green-400 text-xs px-3 py-1 rounded-full">
                        VIDEO
                      </div>

                      {item.title && (

                        <div className="absolute bottom-3 left-3 right-3 text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition">

                          {item.title}

                        </div>

                      )}

                    </>

                  ) : (

                    <video
                      src={item.src}
                      className="w-full h-auto"
                      controls
                      autoPlay
                      playsInline
                    />

                  )}

                </div>

              )

            }

            return (

              <div
                key={item.id}
                className="group relative break-inside-avoid mb-2 cursor-pointer overflow-hidden rounded-md shadow-md hover:shadow-2xl transition-all duration-300"
                onClick={() => openModal(item)}
              >

                <div className={`relative w-full ${aspect}`}>

                  <Image
                    src={item.src}
                    alt={item.alt || ""}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110 group-hover:brightness-90"
                    quality={75}
                    loading="lazy"
                  />

                </div>

                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />

                {item.title && (

                  <div className="absolute bottom-3 left-3 right-3 text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition">

                    {item.title}

                  </div>

                )}

              </div>

            )

          })}

        </div>

      )}

      {/* ---------- IMAGES TAB (Staggered Grid) ---------- */}

      {tab === "images" && (

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[180px] md:auto-rows-[220px] gap-2">

          {images.map((item, index) => {

            const pattern = [
              "md:col-span-1 md:row-span-1",
              "md:col-span-1 md:row-span-1",
              "md:col-span-2 md:row-span-2",
              "md:col-span-1 md:row-span-1",
              "md:col-span-1 md:row-span-2",
              "md:col-span-1 md:row-span-1"
            ]

            const size = pattern[index % pattern.length]

            return (

              <div
                key={item.id}
                className={`group relative col-span-1 row-span-1 ${size} overflow-hidden rounded-md shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer`}
                onClick={() => openModal(item)}
              >

                <Image
                  src={item.src}
                  alt={item.alt || ""}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110 group-hover:brightness-90"
                  quality={75}
                  loading="lazy"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {item.title && (

                  <div className="absolute bottom-3 left-3 right-3 text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition">

                    {item.title}

                  </div>

                )}

              </div>

            )

          })}

        </div>

      )}
      {/* ---------- VIDEOS TAB ---------- */}

      {tab === "videos" && (

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">

          {videos.map(item => {

            const playing = videoPlaying[item.id]

            return (

              <div
                key={item.id}
                className="group relative overflow-hidden rounded-md shadow-md hover:shadow-2xl transition-all duration-300 bg-black"
              >

                {!playing ? (

                  <>
                    <div className="relative w-full aspect-square">

                      <Image
                        src={item.thumbnail || "/video-thumb.webp"}
                        alt={item.title || ""}
                        fill
                        className="object-cover"
                      />

                    </div>

                    <div className="absolute inset-0 flex items-center justify-center">

                      <button
                        onClick={() => playVideo(String(item.id))}
                        className="bg-white/90 backdrop-blur-md p-4 rounded-full shadow-xl transition-transform duration-300 group-hover:scale-110"
                      >
                        ▶
                      </button>

                    </div>

                    <div className="absolute top-3 left-3 bg-black/70 text-green-400 text-xs px-3 py-1 rounded-full">
                      VIDEO
                    </div>

                  </>

                ) : (

                  <div className="relative w-full aspect-square">

                    <video
                      src={item.src}
                      className="absolute inset-0 w-full h-full object-cover"
                      controls
                      autoPlay
                      playsInline
                    />

                  </div>

                )}

              </div>

            )

          })}

        </div>

      )}

      {/* ================= Modal ================= */}

      <AnimatePresence>

        {modalOpen && (

          <motion.div
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 rounded-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >

            <FocusLock>

              <motion.div
                className="relative w-[95vw] aspect-square md:w-225 md:h-[80vh] bg-black md:rounded-lg overflow-hidden"
                initial={{ scale: .9 }}
                animate={{ scale: 1 }}
                exit={{ scale: .9 }}
              >

                <button
                  onClick={closeModal}
                  className="absolute top-3 right-3 bg-gray-200 rounded-full p-2 z-50"
                >
                  ✕
                </button>

               <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-sm text-white text-xs md:text-sm px-3 py-1.5 rounded-full z-50 font-medium">
  {activeSlide + 1} / {images.length}
</div>

                <div className="overflow-hidden h-full" ref={emblaRef}>

                  <div className="flex h-full">

                    {images.map(img => (

                      <div key={img.id} className="min-w-full relative h-full flex items-center justify-center">

                        <Image
                          src={img.src}
                          alt={img.alt || ""}
                          fill
                          className="object-cover"
                          sizes="(max-width:768px) 100vw, 900px rounded-xl"
                          priority
                        />

                      </div>

                    ))}

                  </div>

                </div>

                {/* progress bar */}

                <div className="absolute bottom-0 left-0 w-full p-4">

                  <div className="h-2 bg-gray-300 rounded-full overflow-hidden">

                    <div
                      className="h-2 bg-green-600 transition-all duration-500 ease-out"
                      style={{
                        width: `${((activeSlide + 1) / images.length) * 100}%`
                      }}
                    />

                  </div>

                  <p className="text-sm mt-2 text-gray-700 bg-white py-2 px-4 rounded-full w-1/2 mx-auto text-center">

                    {images[activeSlide]?.title}

                  </p>

                </div>

              </motion.div>

            </FocusLock>

          </motion.div>

        )}

      </AnimatePresence>

    </div>

  )

}