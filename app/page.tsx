import { Layout } from '../components/layout'
import { Hero } from '../components/hero'
import { ExpertiseSection } from '../components/expertise-section'
import { ProjectsSection } from '../components/projects-section'
import { SkillsSection } from '../components/skills-section'
import { ContactForm } from '../components/contact-form'

export default function Home() {
  return (
    <Layout>
      <Hero />
      <ExpertiseSection
        id="mechatronics"
        title="Mechatronics Technician"
        description="Bridging the gap between mechanical, electrical, and software systems to create innovative solutions."
        icon="cpu"
      />
      <ExpertiseSection
        id="software"
        title="Software Developer"
        description="Crafting efficient, scalable, and user-friendly applications across various platforms."
        icon="code"
      />
      <ExpertiseSection
        id="audio"
        title="Audio Engineer"
        description="Designing and optimizing audio systems for pristine sound quality and immersive experiences."
        icon="music"
      />
      <ProjectsSection />
      <SkillsSection />
      <ContactForm />
    </Layout>
  )
}

