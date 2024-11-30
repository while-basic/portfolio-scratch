import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Resume | Christopher Celaya",
  description: "Professional resume and qualifications of Christopher Celaya - Software Developer & Mechatronic Technician",
}

export default function ResumeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
