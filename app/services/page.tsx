'use client';

import { Footer } from "@/components/footer";
import { withClientBoundary } from "@/components/client-wrapper";
import { ArrowLeftRight, Laptop, Cog, Server } from "lucide-react";

function ServicesPage() {
  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <section className="container mx-auto pt-32 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6 text-white">Services</h1>
          <p className="text-xl text-gray-400 mb-12">
            Driving innovation through mechatronics, data center operations, and software development.
          </p>
        </div>
      </section>

      {/* Services Sections */}
      <div className="container mx-auto px-4 pb-24">
        {/* Data Center Operations */}
        <section id="data-center" className="mb-24">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
              <Server className="w-8 h-8 text-white" />
              <h2 className="text-3xl font-bold text-white">Data Center Operations</h2>
            </div>
            <p className="text-gray-400 text-lg mb-6">
              Ensuring optimal performance and uptime for critical and non-critical data center infrastructure.
            </p>
            <div className="bg-zinc-900 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Services Include:</h3>
              <ul className="text-gray-400 space-y-3">
                <li>• Preventive maintenance for electrical and mechanical systems</li>
                <li>• CMMS-based task and workflow management</li>
                <li>• Emergency response and contractor supervision</li>
                <li>• Data center infrastructure troubleshooting and optimization</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Mechatronics & Industrial Maintenance */}
        <section id="mechatronics" className="mb-24">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
              <Cog className="w-8 h-8 text-white" />
              <h2 className="text-3xl font-bold text-white">Mechatronics & Industrial Maintenance</h2>
            </div>
            <p className="text-gray-400 text-lg mb-6">
              Maintaining and repairing complex industrial systems to ensure operational excellence.
            </p>
            <div className="bg-zinc-900 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Expertise:</h3>
              <ul className="text-gray-400 space-y-3">
                <li>• Pneumatic and hydraulic systems maintenance</li>
                <li>• Electrical troubleshooting and system optimization</li>
                <li>• Preventive maintenance programs</li>
                <li>• Cooling and water system management</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Software Development */}
        <section id="software" className="mb-24">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
              <Laptop className="w-8 h-8 text-white" />
              <h2 className="text-3xl font-bold text-white">Software Development</h2>
            </div>
            <p className="text-gray-400 text-lg mb-6">
              Building robust and innovative software solutions to tackle industry challenges.
            </p>
            <div className="bg-zinc-900 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Specializations:</h3>
              <ul className="text-gray-400 space-y-3">
                <li>• Web application development using Next.js and React</li>
                <li>• AI and machine learning integration</li>
                <li>• API development and systems integration</li>
                <li>• Cloud-based application deployment</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Project Management */}
        <section id="project-management" className="mb-24">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
              <ArrowLeftRight className="w-8 h-8 text-white" />
              <h2 className="text-3xl font-bold text-white">Project Management</h2>
            </div>
            <p className="text-gray-400 text-lg mb-6">
              Applying a methodical approach to drive projects from inception to completion efficiently.
            </p>
            <div className="bg-zinc-900 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Key Focus Areas:</h3>
              <ul className="text-gray-400 space-y-3">
                <li>• Workflow optimization and task delegation</li>
                <li>• Cross-disciplinary collaboration</li>
                <li>• Technical documentation and quality assurance</li>
                <li>• Risk assessment and mitigation</li>
              </ul>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}

export default withClientBoundary(ServicesPage);