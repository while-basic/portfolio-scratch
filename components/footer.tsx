import Link from "next/link";
import { Github, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-gray-800 bg-black">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Christopher Celaya</h3>
            <p className="text-gray-400">
              Mechatronics Technician & Software Developer
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/projects" className="hover:text-white">Projects</Link></li>
              <li><Link href="/skills" className="hover:text-white">Skills</Link></li>
              <li><Link href="/experience" className="hover:text-white">Experience</Link></li>
              {/* <li><Link href="/blog" className="hover:text-white">Blog</Link></li> */}
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Resources</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/resume.pdf" className="hover:text-white">Resume</Link></li>
              <li><Link href="/case-studies" className="hover:text-white">Case Studies</Link></li>
              <li><Link href="/gallery" className="hover:text-white">Gallery</Link></li>
              {/* <li><Link href="/chat" className="hover:text-white">Chat</Link></li> */}
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Connect</h4>
            <div className="flex space-x-4">
              <Link href="https://github.com/while-basic" className="text-gray-400 hover:text-white">
                <Github className="w-6 h-6" />
              </Link>
              <Link href="https://linkedin.com/in/christophercelaya" className="text-gray-400 hover:text-white">
                <Linkedin className="w-6 h-6" />
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} 2025Christopher Celaya. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
