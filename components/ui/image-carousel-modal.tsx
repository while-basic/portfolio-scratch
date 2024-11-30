"use client"

import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import Image from "next/image"
import { useState, KeyboardEvent } from "react"

interface ImageCarouselModalProps {
  images: {
    src: string
    alt: string
    title?: string
    description?: string
  }[]
  initialIndex: number
  isOpen: boolean
  onClose: () => void
}

export function ImageCarouselModal({
  images,
  initialIndex,
  isOpen,
  onClose,
}: ImageCarouselModalProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") handlePrevious()
    if (e.key === "ArrowRight") handleNext()
    if (e.key === "Escape") onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className="max-w-[90vw] h-[90vh] p-0 border-none bg-transparent"
        onKeyDown={handleKeyDown}
      >
        <div className="relative flex flex-col h-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 rounded-lg overflow-hidden">
          {/* Navigation buttons */}
          <div className="absolute top-4 right-4 z-50">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full bg-background/20 hover:bg-background/40"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="absolute left-4 top-1/2 -translate-y-1/2 z-50">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full bg-background/20 hover:bg-background/40 text-foreground"
              onClick={handlePrevious}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="absolute right-4 top-1/2 -translate-y-1/2 z-50">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full bg-background/20 hover:bg-background/40 text-foreground"
              onClick={handleNext}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Image container */}
          <div className="relative flex-1 w-full">
            <div className="absolute inset-0 flex items-center justify-center p-8">
              <div className="relative w-full h-full">
                <Image
                  src={images[currentIndex].src}
                  alt={images[currentIndex].alt}
                  fill
                  className="object-contain"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw"
                />
              </div>
            </div>
          </div>

          {/* Image info */}
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background/90 to-transparent">
            <h2 className="text-lg font-semibold text-foreground">
              {images[currentIndex].title}
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              {images[currentIndex].description}
            </p>
            <div className="mt-2 text-sm font-medium text-muted-foreground">
              Image {currentIndex + 1} of {images.length}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
