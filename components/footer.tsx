import Link from "next/link";
import { Github, Linkedin, Mail, FileText } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-gray-800 bg-black">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1 space-y-4">
            <h3 className="text-lg font-semibold text-white">Christopher Celaya</h3>
            <p className="text-gray-400 text-sm">
              Mechatronics Technician & Software Developer
            </p>
            <div className="flex space-x-4 pt-2">
              <Link 
                href="https://github.com/while-basic" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Github className="w-5 h-5" />
              </Link>
              <Link 
                href="https://linkedin.com/in/christophercelaya" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </Link>
              <Link 
                href="mailto:contact@christophercelaya.com"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Mail className="w-5 h-5" />
              </Link>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Navigation</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
              <li><Link href="/projects" className="hover:text-white transition-colors">Projects</Link></li>
              <li><Link href="/skills" className="hover:text-white transition-colors">Skills</Link></li>
              <li><Link href="/experience" className="hover:text-white transition-colors">Experience</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Resources</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/resume" className="hover:text-white transition-colors inline-flex items-center">
                  <FileText className="w-4 h-4 mr-2" />
                  Resume
                </Link>
              </li>
              <li><Link href="/auth/sign-in" className="hover:text-white transition-colors">Sign In</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Contact</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a 
                  href="mailto:chris@chriscelaya.xyz"
                  className="hover:text-white transition-colors"
                >
                  chris@chriscelaya.xyz
                </a>
              </li>
              <li>El Paso, TX</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-sm text-gray-400">
            <p>&copy; {new Date().getFullYear()} Christopher Celaya. All rights reserved.</p>
            <div className="flex space-x-6">
              <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
