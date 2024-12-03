import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Projects | Christopher Celaya",
  description: "Featured projects and portfolio work by Christopher Celaya",
}

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
