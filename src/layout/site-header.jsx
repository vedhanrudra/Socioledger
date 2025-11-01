import React from "react";
import { useLocation } from "react-router-dom";
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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";

export function SiteHeader() {
  const location = useLocation();

  // Function to dynamically change header content
  const getHeaderDetails = () => {
  switch (location.pathname) {
    // 🏠 Dashboard
    case "/dashboard":
      return {
        icon: <LayoutGrid className="w-5 h-5 text-indigo-600" />,
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

        <Button variant="ghost" size="icon">
          <FileText className="w-5 h-5 text-gray-700" />
        </Button>
        <Button variant="ghost" size="icon">
          <Calendar className="w-5 h-5 text-gray-700" />
        </Button>
        <Button variant="ghost" size="icon">
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

        <Button variant="ghost" size="icon">
          <User className="w-5 h-5 text-gray-700" />
        </Button>
      </div>
    </header>
  );
}
