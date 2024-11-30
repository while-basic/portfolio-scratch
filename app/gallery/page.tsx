"use client";

import { useState } from "react";
import { GalleryFilter } from "@/components/gallery-filter";
import { GalleryItem } from "@/components/gallery-item";
import { PageLayout } from "@/components/page-layout";

export default function GalleryPage() {
  const categories = [
    { name: "All", count: 16 },
    { name: "Software Development", count: 4 },
    { name: "Mechatronics", count: 4 },
    { name: "Industrial Automation", count: 4 },
    { name: "Personal Projects", count: 4 },
  ];

  const galleryItems = [
    { title: "Data Center Operations", category: "Industrial Automation" },
    { title: "Industrial Manufacturing", category: "Industrial Automation" },
    { title: "MedChat", category: "Software Development" },
    { title: "ChatterSync", category: "Software Development" },
    { title: "Gemini Pro Vision", category: "Software Development" },
    { title: "MIDI Saber", category: "Personal Projects" },
    { title: "SDXL Image Generation", category: "Software Development" },
  ];

  const [activeCategory, setActiveCategory] = useState("All");

  const filteredItems = galleryItems.filter(
    (item) => activeCategory === "All" || item.category === activeCategory
  );

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-24">
        <div className="mb-12">
          <h1 className="text-6xl font-bold text-white mb-4">Photo Gallery</h1>
          <p className="text-gray-400">
            A curated collection of my work across various categories.
          </p>
        </div>

        <GalleryFilter
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map((item, index) => (
            <GalleryItem
              key={index}
              title={item.title}
              imageAlt={`Image of ${item.title}`}
            />
          ))}
        </div>
      </div>
    </PageLayout>
  );
}
