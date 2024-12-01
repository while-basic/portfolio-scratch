import Link from "next/link";
import { ServiceCard } from "@/components/service-card";
import { WorkCarousel } from "@/components/work-carousel";
import { Button } from "@/components/ui/button";
import { ArrowLeftRight, Laptop, Cog, Headphones } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="container mx-auto pt-32 pb-16 px-4 bg-black">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6 text-white">Christopher Celaya</h1>
          <h2 className="text-2xl text-gray-300 mb-8">Full-Stack Developer & Automation Engineer</h2>
          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
            Building modern web applications and industrial automation systems with a focus on user experience and efficiency.
          </p>
          <div className="flex justify-center gap-6">
            <Link href="/projects">
              <Button className="bg-white text-black hover:bg-gray-200">View Projects</Button>
            </Link>
            <Link href="https://github.com/while-basic" target="_blank">
              <Button variant="outline" className="text-white border-white hover:bg-white hover:text-black">GitHub</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* What I Do Section */}
      <section className="py-24 bg-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-white">What I Do</h2>
            <p className="text-gray-400 text-lg">
              Combining technical expertise with creative problem-solving
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            <ServiceCard
              icon={<ArrowLeftRight className="w-8 h-8" />}
              title="SYSTEMS INTEGRATION"
              description="Specializing in connecting integrated systems, from industrial machinery to modern software platforms, ensuring seamless operation and optimal performance."
              link="/services#integration"
            />
            <ServiceCard
              icon={<Laptop className="w-8 h-8" />}
              title="SOFTWARE DEVELOPMENT"
              description="Self-taught programmer, creating efficient solutions that solve real-world problems."
              link="/services#software"
            />
            <ServiceCard
              icon={<Cog className="w-8 h-8" />}
              title="INDUSTRIAL TECHNOLOGY"
              description="Experienced in maintaining and optimizing pneumatic, hydraulic, water, and electrical systems, bringing reliability to complex industrial operations."
              link="/services#industrial"
            />
            <ServiceCard
              icon={<Headphones className="w-8 h-8" />}
              title="AUDIO ENGINEERING & MUSIC PRODUCTION"
              description="Passionate about crafting high-quality sound experiences through recording, mixing, and music production, combining technical expertise with creative vision."
              link="/services#audio"
            />
          </div>
        </div>
      </section>

      {/* Featured Work Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">Featured Work</h2>
          <WorkCarousel />
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8 text-white">Let&apos;s Talk About Your Project</h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Schedule a 30-minute call to discuss your ideas and how we can work together
          </p>
          <div className="bg-black border border-gray-800 rounded-lg p-8 max-w-md mx-auto">
            <h3 className="font-semibold mb-4 text-white">What to expect:</h3>
            <ul className="text-left text-gray-400 mb-6 space-y-2">
              <li>• Project scope and requirements discussion</li>
              <li>• Technical feasibility assessment</li>
              <li>• Timeline and budget planning</li>
              <li>• Next steps and recommendations</li>
            </ul>
            <Button className="w-full bg-white text-black hover:bg-gray-200">Schedule a Call</Button>
          </div>
        </div>
      </section>
    </div>
  );
}
