import { Metadata } from "next"

export const metadata: Metadata = {
  title: "About | Christopher Celaya",
  description: "Learn more about Christopher Celaya and his journey in software development and technology.",
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
