import { LayoutGrid, Calendar, FileText, Search, BarChart3, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"

export function SiteHeader() {
  return (
    <header className="flex h-[80px] shrink-0 items-center justify-between border-b bg-white px-6 shadow-sm">
      {/* Left Section - Dashboard Title */}
      <div className="flex items-center gap-3">
        <SidebarTrigger className="-ml-1" />
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 bg-indigo-100 rounded-xl">
            <LayoutGrid className="w-5 h-5 text-indigo-600" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-sm text-gray-500">
              Overview of your business metrics and activities
            </p>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Year Dropdown */}
        <select className="border border-gray-200 rounded-md px-3 py-1.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500">
          <option>2024-25</option>
          <option>2025-26</option>
          <option>2026-27</option>
        </select>

        {/* Icons */}
        <Button variant="ghost" size="icon">
          <FileText className="w-5 h-5 text-gray-700" />
        </Button>
        <Button variant="ghost" size="icon">
          <Calendar className="w-5 h-5 text-gray-700" />
        </Button>
        <Button variant="ghost" size="icon">
          <Search className="w-5 h-5 text-gray-700" />
        </Button>

        {/* Fancy Chart Icon */}
        <div className="relative w-9 h-9 flex items-center justify-center rounded-full bg-gradient-to-r from-pink-500 via-orange-400 to-yellow-400 shadow-md">
          <BarChart3 className="w-5 h-5 text-white" />
        </div>

        {/* User Icon */}
        <Button variant="ghost" size="icon">
          <User className="w-5 h-5 text-gray-700" />
        </Button>
      </div>
    </header>
  )
}
