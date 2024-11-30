import Link from "next/link";
import { ServiceCard } from "@/components/service-card";
import { WorkCarousel } from "@/components/work-carousel";
import { Button } from "@/components/ui/button";
import { ArrowLeftRight, Laptop, Cog, Headphones } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-5xl font-bold mb-6">Christopher Celaya</h1>
          <h2 className="text-2xl text-gray-300 mb-8">Full-Stack Developer & Automation Engineer</h2>
          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
            Building modern web applications and industrial automation systems with a focus on user experience and efficiency.
          </p>
          <div className="flex justify-center gap-6">
            <Link href="/projects">
              <Button className="bg-blue-600 hover:bg-blue-700">View Projects</Button>
            </Link>
            <Link href="https://github.com/christophercelaya" target="_blank">
              <Button variant="outline">GitHub</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* What I Do Section */}
      <section className="py-24 bg-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">What I Do</h2>
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
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Work</h2>
          <WorkCarousel />
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-[#111111]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Let&apos;s Talk About Your Project</h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Schedule a 30-minute call to discuss your ideas and how we can work together
          </p>
          <div className="max-w-md mx-auto bg-black p-6 rounded-lg border border-gray-800">
            <h3 className="font-semibold mb-4">What to expect:</h3>
            <ul className="text-left text-gray-400 mb-6 space-y-2">
              <li>• Project scope and requirements discussion</li>
              <li>• Technical feasibility assessment</li>
              <li>• Timeline and budget planning</li>
              <li>• Next steps and recommendations</li>
            </ul>
            <Button className="w-full bg-blue-600 hover:bg-blue-700">
              Schedule a Call
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
