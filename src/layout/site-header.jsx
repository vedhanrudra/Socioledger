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
  ShoppingCart,
  CreditCard,
  Undo2,
  Briefcase,
  Receipt,
  Users,
  Repeat,
  BookOpen,
  Clock,
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
  const [open, setOpen] = useState(false);
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
      if (e.altKey && e.key.toLowerCase() === "A") {
        e.preventDefault(); // prevent browser's default find behavior
        setOpen(true);
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
    { name: "estimate", path: "/vouchers/Estimate" },
    { name: "sales", path: "/vouchers/Sales" },
    { name: "sales return", path: "/vouchers/SalesReturn" },
    { name: "purchase", path: "/vouchers/Purchase" },
    { name: "purchase return", path: "/vouchers/PurchaseReturn" },
    { name: "credit note", path: "/vouchers/Credit" },
    { name: "debit note", path: "/vouchers/Debit" },
    { name: "receipt note", path: "/vouchers/Receipt" },
    { name: "delivery challans", path: "/vouchers/DeliveryChallans" },
    { name: "opening", path: "/vouchers/Opening"},
    { name: "MaterialIn", path: "/jobwork/MaterialIn"},
    { name: "MaterialOut", path: "/jobwork/MaterialOut"},
    { name: "quotation", path: "/quotation/Quotation" },
    { name: "payments", path: "/Payments/Payments" },
    { name: "receipts", path: "/receipts/Receipts" },
    { name: "ledgers", path: "/ledgers/Ledgers" },
    { name: "ledgers Group", path: "/ledgers/LedgersGroup" },
    { name: "Transfers", path: "/Transfer/Transfer" },
    { name: "ledger report", path: "/reports/LedgerReport" },
    { name: "Balance sheet", path: "/reports/BalanceSheet" },
    { name: "trial balance", path: "/reports/TrialBalance" },
    { name: "cash flow", path: "/reports/CashFlow" },
    { name: "day book", path: "/reports/DayBook" },
    { name: "profit and loss", path: "/reports/ProfitLoss" },
    { name: "stock", path: "/reports/Stock" },
    { name: "voucher", path: "/reports/Voucher" },
    { name: "daily register", path: "/reports/DailyRegister" },
    { name: "ageing", path: "/reports/Ageing" },
    { name: "tds report", path: "/reports/TdsReport" },
    { name: "task", path: "/task" },
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
          title: "Items",
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
      case "/vouchers/Estimate":
        return {
          icon: <FileText className="w-5 h-5 text-indigo-600" />,
          title: "Estimate",
          subtitle: "Create and manage customer estimates and quotations",
        };

      case "/vouchers/Sales":
        return {
          icon: <ShoppingCart className="w-5 h-5 text-indigo-600" />,
          title: "Sales",
          subtitle: "Track product sales and customer invoices",
        };

      case "/vouchers/SalesReturn":
        return {
          icon: <CreditCard className="w-5 h-5 text-indigo-600" />,
          title: "Sales Return",
          subtitle: "Handle and record returned sales items",
        };

      case "/vouchers/Purchase":
        return {
          icon: <Package className="w-5 h-5 text-indigo-600" />,
          title: "Purchase",
          subtitle: "Manage supplier purchases and bills",
        };

      case "/vouchers/PurchaseReturn":
        return {
          icon: <Package className="w-5 h-5 text-indigo-600" />,
          title: "Purchase Return",
          subtitle: "Track returned goods and supplier adjustments",
        };

      case "/vouchers/Credit":
        return {
          icon: <FileText className="w-5 h-5 text-indigo-600" />,
          title: "Credit Note",
          subtitle: "Adjust sales invoices with issued credits",
        };

      case "/vouchers/Debit":
        return {
          icon: <FileText className="w-5 h-5 text-indigo-600" />,
          title: "Debit Note",
          subtitle: "Adjust purchases with debit entries",
        };

      case "/vouchers/Receipt":
        return {
          icon: <FileText className="w-5 h-5 text-indigo-600" />,
          title: "Receipt Note",
          subtitle: "Record received items or payments",
        };

      case "/vouchers/DeliveryChallans":
        return {
          icon: <FileText className="w-5 h-5 text-indigo-600" />,
          title: "Delivery Challans",
          subtitle: "Track goods delivery without invoices",
        };

      case "/vouchers/Opening":
        return {
          icon: <FileText className="w-5 h-5 text-indigo-600" />,
          title: "Opening",
          subtitle: "Initialize your accounts with opening balances",
        };

      // 🧰 Jobwork
      case "/jobwork/MaterialIn":
        return {
          icon: <Briefcase className="w-5 h-5 text-indigo-600" />,
          title: "Material In",
          subtitle: "Handle external job processes and work orders",
        };

      case "/jobwork/MaterialOut":
        return {
          icon: <Briefcase className="w-5 h-5 text-indigo-600" />,
          title: "Material Out",
          subtitle: "Manage outgoing materials and jobwork dispatches",
        };

      // 🛒 Orders
      case "/order/OrderPurchase":
        return {
          icon: <ShoppingCart className="w-5 h-5 text-indigo-600" />,
          title: "Order Purchase",
          subtitle: "View and manage all customer orders",
        };

      case "/order/OrderSales":
        return {
          icon: <ShoppingCart className="w-5 h-5 text-indigo-600" />,
          title: "Order Sales",
          subtitle: "View and manage all customer orders",
        };

      // 📑 Quotations
      case "/quotation/Quotation":
        return {
          icon: <FileText className="w-5 h-5 text-indigo-600" />,
          title: "Quotations",
          subtitle: "Manage and track all quotations and proposals",
        };

      // 💳 Payments
      case "/Payments/Payments":
        return {
          icon: <CreditCard className="w-5 h-5 text-indigo-600" />,
          title: "Payments",
          subtitle: "Track customer and vendor payments",
        };

         // 🧾 Receipts
      case "/receipts/Receipts":
        return {
          icon: <Receipt className="w-5 h-5 text-indigo-600" />,
          title: "Receipts",
          subtitle: "Keep record of received payments and bills",
        };

      // 👥 Ledgers
      case "/ledgers/Ledgers":
        return {
          icon: <Users className="w-5 h-5 text-indigo-600" />,
          title: "Ledgers",
          subtitle: "Manage account ledgers and financial records",
        };

        case "/ledgers/LedgersGroup":
        return {
          icon: <Users className="w-5 h-5 text-indigo-600" />,
          title: "Ledgers Group",
          subtitle: "Manage account ledgers and financial records",
        };

      // 🔁 Transfers
      case "/Transfer/Transfer":
        return {
          icon: <Repeat className="w-5 h-5 text-indigo-600" />,
          title: "Transfers",
          subtitle: "Track stock and fund transfers",
        };

      // 📊 Reports
      case "/reports/LedgerReport":
      return {
        icon: <FileText className="w-5 h-5 text-indigo-600" />,
        title: "Ledger Report",
        subtitle: "View account-wise ledger details",
      };

    case "/reports/BalanceSheet":
      return {
        icon: <FileText className="w-5 h-5 text-indigo-600" />,
        title: "Balance Sheet",
        subtitle: "Check assets, liabilities, and equity summary",
      };

    case "/reports/CashFlow":
      return {
        icon: <FileText className="w-5 h-5 text-indigo-600" />,
        title: "Cash Flow",
        subtitle: "Track inflow and outflow of cash",
      };

    case "/reports/DayBook":
      return {
        icon: <FileText className="w-5 h-5 text-indigo-600" />,
        title: "Day Book",
        subtitle: "See all daily financial transactions",
      };

    case "/reports/ProfitLoss":
      return {
        icon: <FileText className="w-5 h-5 text-indigo-600" />,
        title: "Profit & Loss",
        subtitle: "Monitor revenue and expenses summary",
      };

    case "/reports/TrialBalance":
      return {
        icon: <FileText className="w-5 h-5 text-indigo-600" />,
        title: "Trial Balance",
        subtitle: "Verify debit and credit balances",
      };

    case "/reports/Stock":
      return {
        icon: <FileText className="w-5 h-5 text-indigo-600" />,
        title: "Stock Report",
        subtitle: "Check available inventory and stock movements",
      };

    case "/reports/Voucher":
      return {
        icon: <FileText className="w-5 h-5 text-indigo-600" />,
        title: "Voucher Report",
        subtitle: "View all voucher transactions and entries",
      };

    case "/reports/DailyRegister":
      return {
        icon: <FileText className="w-5 h-5 text-indigo-600" />,
        title: "Daily Register",
        subtitle: "Track daily business activities and records",
      };

    case "/reports/Ageing":
      return {
        icon: <FileText className="w-5 h-5 text-indigo-600" />,
        title: "Ageing Report",
        subtitle: "Analyze outstanding receivables and payables",
      };

    case "/reports/TdsReport":
      return {
        icon: <FileText className="w-5 h-5 text-indigo-600" />,
        title: "TDS Report",
        subtitle: "Review tax deducted at source details",
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

      // 📝 task
        case "/Task":
        return {
          icon: <FileText className="w-5 h-5 text-indigo-600" />,
          title: "Task",
          subtitle: "View and manage your tasks",
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

        {/* ✨ Glowing Button + Dialog */}
        <div>
          {/* Glowing Gradient Button */}
          <button
            onClick={() => setOpen(true)}
            className="relative w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-tr from-pink-500 via-purple-500 to-yellow-400 shadow-lg hover:scale-105 transition-transform duration-200"
          >
            <div className="absolute inset-0 rounded-full blur-md bg-gradient-to-tr from-pink-500 via-purple-500 to-yellow-400 opacity-70 animate-pulse"></div>
            <div className="relative z-10 w-9 h-9 flex items-center justify-center rounded-full bg-white">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 text-lg font-bold">
                ✨
              </span>
            </div>
          </button>

          {/* Dialog Popup */}
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="max-w-md rounded-2xl p-6">
              <DialogHeader>
                <DialogTitle className="text-center text-2xl font-semibold">
                  What would you like to process?
                </DialogTitle>
                <p className="text-center text-gray-500 mt-1 text-sm">
                  Select the type of document you want to analyze
                </p>
              </DialogHeader>

              <div className="grid grid-cols-2 gap-3 mt-4">
                {[
                  {
                    title: "Direct Payment",
                    desc: "Process payment transactions",
                  },
                  {
                    title: "Receipt Payment",
                    desc: "Process receipt documents",
                  },
                  {
                    title: "Purchase",
                    desc: "Process purchase invoices",
                  },
                  {
                    title: "Business Card",
                    desc: "Add new business contact",
                  },
                  {
                    title: "Bank Statement",
                    desc: "Reconcile bank statements",
                  },
                  {
                    title: "Credit Card Statement",
                    desc: "Process credit card statements",
                  },
                  {
                    title: "Verify Ledger",
                    desc: "Verify ledger entries",
                  },
                ].map((item, index) => (
                  <button
                    key={index}
                    className="flex items-center gap-3 p-4 bg-white border rounded-xl hover:border-pink-400 hover:shadow-md transition-all"
                  >
                    <div className="relative w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-tr from-pink-500 via-purple-500 to-yellow-400">
                      <div className="absolute inset-0 rounded-full blur-md bg-gradient-to-tr from-pink-500 via-purple-500 to-yellow-400 opacity-60 animate-pulse"></div>
                      <div className="relative z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white">
                        <FileText className="w-4 h-4 text-pink-600" />
                      </div>
                    </div>

                    <div className="text-left">
                      <p className="text-sm font-semibold text-gray-800">
                        {item.title}
                      </p>
                      <p className="text-xs text-gray-500">{item.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </DialogContent>
          </Dialog>
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
