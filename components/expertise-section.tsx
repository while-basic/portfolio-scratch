import { Cpu, Code, Music } from 'lucide-react'

interface ExpertiseSectionProps {
  id: string
  title: string
  description: string
  icon: 'cpu' | 'code' | 'music'
}

export function ExpertiseSection({ id, title, description, icon }: ExpertiseSectionProps) {
  const Icon = icon === 'cpu' ? Cpu : icon === 'code' ? Code : Music

  return (
    <section id={id} className="py-20 bg-black">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center">
          <Icon className="w-16 h-16 text-white mb-4" />
          <h2 className="text-3xl font-bold mb-4 text-white">{title}</h2>
          <p className="text-xl text-center max-w-2xl text-white">{description}</p>
        </div>
      </div>
    </section>
  )
}
