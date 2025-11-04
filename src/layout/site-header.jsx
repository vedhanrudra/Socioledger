import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  LayoutGrid,
  Calendar,
  FileText,
  Search,
  BarChart3,
  User,
  Package,
  Layers,
  Ruler,
  Keyboard,
  LayoutDashboard,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";

export function SiteHeader() {
  const location = useLocation();
  const navigate = useNavigate();

  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
   
  

  // keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Alt + F opens the search dialog
      if (e.altKey && e.key.toLowerCase() === "f") {
        e.preventDefault(); // prevent browser's default find behavior
        setSearchOpen(true);
      }

      // Escape closes the search dialog
      if (e.key === "Escape") {
        setSearchOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const routes = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Items table", path: "/items/ItemTable" },
    { name: "Items groups", path: "/items/ItemGroups" },
    { name: "Items units", path: "/items/ItemUnits" },
    { name: "Years", path: "/years" },
  ];

  const filteredRoutes = routes.filter(
    (r) => r.name && r.name.toLowerCase().includes(query.toLowerCase())
  );

  // Function to dynamically change header content
  const getHeaderDetails = () => {
    switch (location.pathname) {
      // 🏠 Dashboard
      case "/dashboard":
        return {
          icon: <LayoutDashboard className="w-5 h-5 text-indigo-600" />,
          title: "Dashboard",
          subtitle: "Overview of your business metrics and activities",
        };

      // 📦 Items
      case "/items/ItemTable":
        return {
          icon: <Package className="w-5 h-5 text-indigo-600" />,
          title: "Items Table",
          subtitle: "Manage and view all available items",
        };

      case "/items/ItemGroups":
        return {
          icon: <Layers className="w-5 h-5 text-indigo-600" />,
          title: "Item Groups",
          subtitle: "Organize your items into logical groups",
        };

      case "/items/ItemUnits":
        return {
          icon: <Ruler className="w-5 h-5 text-indigo-600" />,
          title: "Item Units",
          subtitle: "Define measurement units for your items",
        };

      // 📅 Years
      case "/years":
        return {
          icon: <Calendar className="w-5 h-5 text-indigo-600" />,
          title: "Years",
          subtitle: "Manage your fiscal years and time-based records",
        };

      // 💰 Vouchers
      case "/Vouchers":
        return {
          icon: <FileText className="w-5 h-5 text-indigo-600" />,
          title: "Vouchers",
          subtitle: "Manage all your transaction vouchers here",
        };

      // 🧰 Jobwork
      case "/Jobwork":
        return {
          icon: <Briefcase className="w-5 h-5 text-indigo-600" />,
          title: "Jobwork",
          subtitle: "Handle external job processes and work orders",
        };

      // 🛒 Orders
      case "/Order":
        return {
          icon: <ShoppingCart className="w-5 h-5 text-indigo-600" />,
          title: "Orders",
          subtitle: "View and manage all customer orders",
        };

      // 📑 Quotations
      case "/Quotations":
        return {
          icon: <FileText className="w-5 h-5 text-indigo-600" />,
          title: "Quotations",
          subtitle: "Manage and track all quotations and proposals",
        };

      // 💳 Payments
      case "/Payments":
        return {
          icon: <CreditCard className="w-5 h-5 text-indigo-600" />,
          title: "Payments",
          subtitle: "Track customer and vendor payments",
        };
      case "/Task":
        return {
          icon: <FileText className="w-5 h-5 text-indigo-600" />,
          title: "Task",
          subtitle: "View and manage your tasks",
        };

      // 🧾 Receipts
      case "/Receipts":
        return {
          icon: <Receipt className="w-5 h-5 text-indigo-600" />,
          title: "Receipts",
          subtitle: "Keep record of received payments and bills",
        };

      // 👥 Ledgers
      case "/Ledgers":
        return {
          icon: <Users className="w-5 h-5 text-indigo-600" />,
          title: "Ledgers",
          subtitle: "Manage account ledgers and financial records",
        };

      // 🔁 Transfers
      case "/Transfers":
        return {
          icon: <Repeat className="w-5 h-5 text-indigo-600" />,
          title: "Transfers",
          subtitle: "Track stock and fund transfers",
        };

      // 📊 Reports
      case "/Reports":
        return {
          icon: <BarChart className="w-5 h-5 text-indigo-600" />,
          title: "Reports",
          subtitle: "Analyze data through detailed reports",
        };

      // 💼 GST
      case "/GST":
        return {
          icon: <Percent className="w-5 h-5 text-indigo-600" />,
          title: "GST",
          subtitle: "Manage GST details and compliance reports",
        };

      // 🧑‍🤝‍🧑 Team
      case "/Team":
        return {
          icon: <Users className="w-5 h-5 text-indigo-600" />,
          title: "Team",
          subtitle: "Manage your organization’s members and roles",
        };

      // 🧩 Default
      default:
        return {
          icon: <LayoutGrid className="w-5 h-5 text-indigo-600" />,
          title: "SocioLedger",
          subtitle: "Welcome to your workspace",
        };
    }
  };

  const { icon, title, subtitle } = getHeaderDetails();

  return (
    <header className="flex h-[80px] shrink-0 items-center justify-between border-b bg-white px-6 shadow-sm">
      {/* Left Section - Dynamic Title */}
      <div className="flex items-center gap-3">
        <SidebarTrigger className="-ml-1" />
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 bg-indigo-100 rounded-xl">
            {icon}
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">{title}</h1>
            <p className="text-sm text-gray-500">{subtitle}</p>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        <select className="border border-gray-200 rounded-md px-3 py-1.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500">
          <option>2024-25</option>
          <option>2025-26</option>
          <option>2026-27</option>
        </select>

        <Button variant="ghost" size="icon" onClick={() => navigate("/Task")}>
          <FileText className="w-5 h-5 text-gray-700" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <Keyboard className="w-5 h-5 text-gray-700" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-64 p-2">
            <DropdownMenuLabel className="font-semibold text-gray-800">
              Keyboard Shortcuts
            </DropdownMenuLabel>
            <DropdownMenuSeparator />

            <div className="space-y-2">
              {[
                { action: "Open search", keys: "Alt + F" },
                { action: "Save form", keys: "Alt + S" },
                { action: "Update form", keys: "Alt + U" },
                { action: "Print", keys: "Alt + P" },
                { action: "Create form", keys: "Alt + A" },
                { action: "Cancel/Close form", keys: "Alt + C" },
                { action: "Close dialog/form", keys: "Escape" },
                { action: "Navigate search results", keys: "↑ / ↓" },
                { action: "Select search result", keys: "Enter" },
              ].map((shortcut, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between px-1 text-sm text-gray-700"
                >
                  <span>{shortcut.action}</span>
                  <span className="px-2 py-0.5 rounded-md bg-gray-100 text-gray-800 font-medium text-xs">
                    {shortcut.keys}
                  </span>
                </div>
              ))}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button variant="ghost" size="icon" onClick={() => setSearchOpen(true)}>
          <Search className="w-5 h-5 text-gray-700" />
        </Button>

        <div className="relative w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-tr from-pink-500 via-purple-500 to-yellow-400 shadow-lg">
          <div className="absolute inset-0 rounded-full blur-md bg-gradient-to-tr from-pink-500 via-purple-500 to-yellow-400 opacity-70 animate-pulse"></div>
          <div className="relative z-10 w-9 h-9 flex items-center justify-center rounded-full bg-white">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 text-lg font-bold">
              ✨
            </span>
          </div> 
        </div>

        {/* profile */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <User className="w-5 h-5 text-gray-700" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-48 p-2">
            <DropdownMenuLabel className="font-semibold text-gray-800">
              My Account
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate("/profile")}>
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate("/settings")}>
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-red-600"
              onClick={() => alert("Logging out...")}
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
        <DialogContent className="sm:max-w-lg p-6 rounded-xl shadow-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl font-semibold">
              <Search className="w-5 h-5 text-gray-600" />
              Search Routes
            </DialogTitle>
          </DialogHeader>

          {/* Search input */}
          <div className="relative my-4">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search routes..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 border rounded-md text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          {/* Route list */}
          <div className="max-h-64 overflow-y-auto space-y-1">
            {filteredRoutes.map((route, i) => (
              <div
                key={i}
                onClick={() => {
                  navigate(route.path);
                  setSearchOpen(false);
                }}
                className="flex items-center justify-between px-3 py-2 hover:bg-gray-100 rounded-md cursor-pointer"
              >
                <span className="text-gray-800 text-sm">{route.name}</span>
                <ArrowRight className="w-4 h-4 text-gray-500" />
              </div>
            ))}
            {filteredRoutes.length === 0 && (
              <p className="text-center text-gray-500 text-sm py-2">
                No routes found
              </p>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </header>
  );
}
