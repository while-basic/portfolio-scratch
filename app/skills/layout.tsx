import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Skills",
  description: "Explore my technical skills and expertise in software development, mechatronics, and audio engineering.",
}

export default function SkillsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
