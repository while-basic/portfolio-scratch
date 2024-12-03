"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ImageCarouselModal } from "@/components/ui/image-carousel-modal"
import Image from "next/image"
import { Breadcrumb } from "@/components/breadcrumb"

interface GalleryItem {
  title: string
  category: string
  description: string
  imageSrc: string
  additionalImages?: string[]
}

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [selectedGalleryItem, setSelectedGalleryItem] = useState<GalleryItem | null>(null)

  const categories = [
    { name: "All", count: 16 },
    { name: "Software Development", count: 4 },
    { name: "Mechatronics", count: 4 },
    { name: "Industrial Automation", count: 4 },
    { name: "Personal Projects", count: 4 },
  ];

  const galleryItems: GalleryItem[] = [
    { 
      title: "Electrical Panels", 
      category: "Electrical Panels",
      description: "Managing and optimizing electrical panels",
      imageSrc: "/images/electrical/dist1.jpg",
      additionalImages: [
        "/images/gallery/electrical/wiring1.jpg",
        "/images/gallery/electrical/wiring2.jpg",
        "/images/gallery/electrical/wiring3.jpg",
        "/images/gallery/electrical/wiring4.jpg",
        "/images/gallery/electrical/wiring5.jpg",
        "/images/gallery/electrical/wiring6.jpg",
        "/images/gallery/electrical/wiring7.jpg",
        "/images/gallery/electrical/wiring8.jpg",
        "/images/gallery/electrical/wiring9.jpg",
        "/images/gallery/electrical/wiring10.jpg",
        "/images/gallery/electrical/wiring11.jpg",
        "/images/gallery/electrical/wiring12.jpg",
        "/images/gallery/electrical/wiring13.jpg",
        "/images/gallery/electrical/wiring14.jpg",
        "/images/gallery/electrical/wiring15.jpg",
        "/images/gallery/electrical/wiring16.jpg",
      ]
    },
    { 
      title: "Industrial Manufacturing", 
      category: "Industrial Automation",
      description: "Automated manufacturing systems and process control",
      imageSrc: "/images/gallery/manufacturing.jpg",
      additionalImages: [
        "/images/gallery/manufacturing/1.jpg",
        "/images/gallery/manufacturing/2.jpg",
        "/images/gallery/manufacturing/3.jpg",
      ]
    },
    {
      title: "Electrical Wiring",
      category: "Electrical Wiring",
      description: "Wired electrical panels",
      imageSrc: "/images/electrical/wiring-1.jpg",
      additionalImages: [
        "/images/electrical/wiring-2.jpg",
        "/images/electrical/wiring-3.jpg",
        "/images/electrical/wiring-4.jpg",
        "/images/electrical/wiring-5.jpg",
        "/images/electrical/wiring-6.jpg",
        "/images/electrical/wiring-7.jpg",
      ]
    },
  ];

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  const handleImageClick = (item: GalleryItem) => {
    setSelectedGalleryItem(item);
    setSelectedImageIndex(0);
    setIsModalOpen(true);
  };

  const filteredItems = galleryItems.filter(
    item => selectedCategory === "All" || item.category === selectedCategory
  );

  const getCarouselImages = (item: GalleryItem) => {
    const images = [
      {
        src: item.imageSrc,
        alt: item.title,
        title: item.title,
        description: item.description,
      },
    ];

    if (item.additionalImages) {
      item.additionalImages.forEach((src, index) => {
        images.push({
          src,
          alt: `${item.title} - Image ${index + 2}`,
          title: item.title,
          description: item.description,
        });
      });
    }

    return images;
  };

  return (
    <div className="container mx-auto px-4 pt-24 pb-8">
      <Breadcrumb />
      <h1 className="text-4xl font-bold mb-8">Gallery</h1>
      
      {/* Categories */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Badge
              key={category.name}
              variant={selectedCategory === category.name ? "default" : "secondary"}
              className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
              onClick={() => handleCategoryClick(category.name)}
            >
              {category.name} ({category.count})
            </Badge>
          ))}
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item, index) => (
          <Card
            key={index}
            className="overflow-hidden group cursor-pointer hover:shadow-lg transition-all duration-300"
            onClick={() => handleImageClick(item)}
          >
            <div className="relative h-48 w-full">
              <Image
                src={item.imageSrc}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-4 space-y-2">
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="text-muted-foreground text-sm">{item.description}</p>
              <Badge variant="secondary">{item.category}</Badge>
            </div>
          </Card>
        ))}
      </div>

      {/* Image Carousel Modal */}
      {selectedGalleryItem && (
        <ImageCarouselModal
          images={getCarouselImages(selectedGalleryItem)}
          initialIndex={selectedImageIndex}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}
