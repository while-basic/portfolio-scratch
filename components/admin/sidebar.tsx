import Link from 'next/link'
import { useRouter } from 'next/router'
import {
  LayoutDashboard,
  FileText,
  Users,
  Mail,
  Briefcase,
  MessageSquare,
  BarChart2,
  Star,
  Wrench,
  Settings,
  HelpCircle,
  LogOut
} from 'lucide-react'
import { useAuth } from '@/lib/auth'

const menuItems = [
  { name: 'Dashboard', icon: LayoutDashboard, href: '/admin' },
  { name: 'Blog Posts', icon: FileText, href: '/admin/posts' },
  { name: 'Users', icon: Users, href: '/admin/users' },
  { name: 'Email Campaigns', icon: Mail, href: '/admin/emails' },
  { name: 'Projects', icon: Briefcase, href: '/admin/projects' },
  { name: 'Chatbot', icon: MessageSquare, href: '/admin/chatbot' },
  { name: 'Analytics', icon: BarChart2, href: '/admin/analytics' },
  { name: 'Testimonials', icon: Star, href: '/admin/testimonials' },
  { name: 'Skills', icon: Wrench, href: '/admin/skills' },
  { name: 'Settings', icon: Settings, href: '/admin/settings' },
]

export function Sidebar() {
  const router = useRouter()
  const { logout } = useAuth()

  return (
    <aside className="w-64 bg-gray-800 min-h-screen">
      <div className="px-6 py-6">
        <h1 className="text-xl font-bold text-white">Admin Dashboard</h1>
      </div>
      <nav className="mt-6 flex flex-col h-[calc(100vh-88px)]">
        <div className="flex-grow space-y-1">
          {menuItems.map((item) => {
            const isActive = router.pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-6 py-3 text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-white bg-gray-700'
                    : 'text-gray-300 hover:text-white hover:bg-gray-700'
                }`}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.name}
              </Link>
            )
          })}
        </div>
        <div className="border-t border-gray-700">
          <Link
            href="/admin/help"
            className="flex items-center px-6 py-3 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700"
          >
            <HelpCircle className="w-5 h-5 mr-3" />
            Help & Support
          </Link>
          <button
            onClick={() => {
              logout();
              router.push('/');
            }}
            className="flex items-center w-full px-6 py-3 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Log Out
          </button>
        </div>
      </nav>
    </aside>
  )
}
