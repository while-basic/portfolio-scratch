"use client"

import * as React from "react"
import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import Image from "next/image"

interface ImageCarouselModalProps {
  isOpen: boolean
  onClose: () => void
  images: {
    src: string
    alt: string
    title?: string
    description?: string
  }[]
  initialIndex?: number
  title?: string
  description?: React.ReactNode
}

export function ImageCarouselModal({
  isOpen,
  onClose,
  images,
  initialIndex = 0,
  title,
  description,
}: ImageCarouselModalProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  const currentImage = images[currentIndex]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl p-0 overflow-hidden bg-background/95 backdrop-blur-sm">
        <div className="relative">
          {/* Close button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-2 z-50"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>

          {/* Image container */}
          <div className="relative aspect-[16/9] bg-muted">
            <Image
              src={currentImage.src}
              alt={currentImage.alt}
              fill
              className="object-contain"
            />

            {/* Navigation buttons */}
            {images.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-2 top-1/2 -translate-y-1/2"
                  onClick={handlePrevious}
                >
                  <ChevronLeft className="h-8 w-8" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                  onClick={handleNext}
                >
                  <ChevronRight className="h-8 w-8" />
                </Button>
              </>
            )}
          </div>

          {/* Image info */}
          <div className="p-6">
            {title && <h2 className="text-xl font-semibold mb-2">{title}</h2>}
            {description && (
              <div className="text-muted-foreground">
                {description}
              </div>
            )}
            {images.length > 1 && (
              <div className="flex justify-center mt-4 gap-1">
                {images.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentIndex
                        ? 'bg-primary'
                        : 'bg-muted-foreground/20'
                    }`}
                    onClick={() => setCurrentIndex(index)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
