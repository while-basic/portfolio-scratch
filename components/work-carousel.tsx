"use client"

import { useState } from 'react';
import Image from 'next/image';

interface WorkItem {
  title: string;
  image: string;
  link: string;
}

export function WorkCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const works: WorkItem[] = [
    { title: "Electrical Panels", image: "/images/electrical/dist1.jpg", link: "#" },
    { title: "Electrical Wiring", image: "/images/electrical/wiring-16.jpg", link: "#" },
    { title: "Mechanical", image: "/images/mechanical/engine1.jpg", link: "#" },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % works.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + works.length) % works.length);
  };

  return (
    <div className="relative w-full overflow-hidden">
      <div className="flex items-center justify-between">
        <button
          onClick={prevSlide}
          className="bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
        >
          ←
        </button>
        <div className="flex gap-4 overflow-hidden p-4">
          {works.map((work, index) => (
            <div
              key={index}
              className={`transition-transform duration-300 min-w-[300px] ${
                index === currentSlide ? 'scale-105' : 'scale-95 opacity-75'
              }`}
              style={{
                transform: `translateX(-${currentSlide * 320}px)`,
              }}
            >
              <div className="bg-gray-900 rounded-lg overflow-hidden">
                <div className="relative w-full h-48">
                  <Image
                    src={work.image}
                    alt={work.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-white">{work.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={nextSlide}
          className="bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
        >
          →
        </button>
      </div>
    </div>
  );
}
