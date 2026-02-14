"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { signOut } from "@/lib/auth"
import { cn } from "@/lib/utils"
import {
  FileText,
  BarChart3,
  Search,
  Settings,
  LogOut,
  Database,
  Brain,
} from "lucide-react"

export function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const navItems = [
    { href: "/dashboard", icon: Database, label: "Dashboard" },
    { href: "/dashboard/cases", icon: FileText, label: "Cases" },
    { href: "/dashboard/evidence", icon: BarChart3, label: "Evidence" },
    { href: "/dashboard/analysis", icon: Brain, label: "Analysis" },
    { href: "/dashboard/search", icon: Search, label: "Search" },
    { href: "/dashboard/settings", icon: Settings, label: "Settings" },
  ]

  async function handleLogout() {
    try {
      await signOut()
      router.push("/")
    } catch (error) {
      console.error("Failed to logout:", error)
    }
  }

  return (
    <aside className="w-64 bg-slate-950 border-r border-border h-screen flex flex-col sticky top-0">
      {/* Logo */}
      <div className="p-6 border-b border-border">
        <h1 className="text-xl font-bold text-foreground">Legal OS</h1>
        <p className="text-xs text-muted-foreground mt-1">Evidence Intelligence</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors text-sm font-medium",
                isActive
                  ? "bg-primary text-white"
                  : "text-muted-foreground hover:bg-slate-900 hover:text-foreground"
              )}
            >
              <Icon size={18} />
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-border">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-2.5 rounded-lg transition-colors text-sm font-medium text-muted-foreground hover:bg-slate-900 hover:text-foreground"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  )
}
