import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Gallery | Christopher Celaya",
  description: "A visual showcase of Christopher Celaya's work in software development, mechatronics, and industrial automation",
}

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
