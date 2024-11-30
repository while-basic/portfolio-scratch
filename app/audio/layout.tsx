import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Audio Engineering Portfolio",
  description: "Explore my audio engineering projects, including studio recordings, sound design, and real-time audio visualizations.",
}

export default function AudioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
