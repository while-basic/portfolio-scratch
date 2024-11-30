import { Metadata } from "next"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

export const metadata: Metadata = {
  title: "Gallery | Christopher Celaya",
  description: "A visual showcase of Christopher Celaya's work in software development, mechatronics, and industrial automation",
}

export default function GalleryPage() {
  const categories = [
    { name: "All", count: 16 },
    { name: "Software Development", count: 4 },
    { name: "Mechatronics", count: 4 },
    { name: "Industrial Automation", count: 4 },
    { name: "Personal Projects", count: 4 },
  ];

  const galleryItems = [
    { 
      title: "Data Center Operations", 
      category: "Industrial Automation",
      description: "Managing and optimizing data center infrastructure and operations",
      imageSrc: "/images/gallery/data-center.jpg"
    },
    { 
      title: "Industrial Manufacturing", 
      category: "Industrial Automation",
      description: "Automated manufacturing systems and process control",
      imageSrc: "/images/gallery/manufacturing.jpg"
    },
    { 
      title: "EcoTrack", 
      description: "Environmental monitoring dashboard for real-time data analysis",
      category: "Software Development",
      imageSrc: "/images/gallery/ecotrack.jpg"
    },
    { 
      title: "SmartBudget", 
      description: "Personal finance management application with AI insights",
      category: "Software Development",
      imageSrc: "/images/gallery/smartbudget.jpg"
    },
    { 
      title: "Gemini Pro Vision", 
      category: "Software Development",
      description: "AI-powered image analysis and generation platform",
      imageSrc: "/images/gallery/gemini.jpg"
    },
    { 
      title: "MIDI Saber", 
      category: "Personal Projects",
      description: "Interactive musical instrument using motion sensors",
      imageSrc: "/images/gallery/midi-saber.jpg"
    },
    { 
      title: "SDXL Image Generation", 
      category: "Software Development",
      description: "Advanced AI image generation using Stable Diffusion XL",
      imageSrc: "/images/gallery/sdxl.jpg"
    }
  ];

  return (
    <div className="container mx-auto px-4 pt-24 pb-8">
      <h1 className="text-4xl font-bold mb-8">Gallery</h1>
      
      {/* Categories */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Badge
              key={category.name}
              variant="secondary"
              className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              {category.name} ({category.count})
            </Badge>
          ))}
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {galleryItems.map((item, index) => (
          <Card
            key={index}
            className="overflow-hidden group cursor-pointer hover:shadow-lg transition-all duration-300"
          >
            <div className="relative h-48 w-full">
              <Image
                src={item.imageSrc}
                alt={item.title}
                fill
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
    </div>
  );
}
