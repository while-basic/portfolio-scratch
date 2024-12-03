import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Links | Christopher Celaya",
  description: "Connect with Christopher Celaya through various social platforms and explore featured projects.",
}

export default function LinksLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
