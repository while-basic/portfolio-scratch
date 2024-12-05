export interface ImageData {
  id: string
  url: string
  description: string
  createdAt: string
}

export interface GalleryResponse {
  images: ImageData[]
  nextPage: number | null
} 