import * as React from "react";
import { Link } from "react-router-dom";
import {
  Minus,
  Plus,
  LayoutDashboard,
  Package,
  Calendar,
  Receipt,
  Briefcase,
  FileText,
  ShoppingCart,
  CreditCard,
  Users,
  PieChart,
  FileSpreadsheet,
} from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar";
//import { SectionCards } from "./section-cards";

// ✅ Sidebar Menu Data
const data = {
  navMain: [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      url: "/dashboard",
    },
    {
      title: "Item",
      icon: Package,
      items: [
        { title: "Items ", url: "/items/ItemTable", icon: Package },
        { title: "Items Groups", url: "/items/ItemGroups", icon: FileText },
        { title: "Items Units", url: "/items/ItemUnits", icon: FileSpreadsheet },
        { title: "Touch & Colors", url: "/items/Colors", icon: FileSpreadsheet },
        { title: "Item Designs", url: "/items/Design", icon: FileSpreadsheet },
      ],
    },
    {
      title: "Years",
      icon: Calendar,
      url: "years"
    },
   {
    title: "Vouchers",
    icon: Receipt,
    items: [
      { title: "Sales", url: "/vouchers/Sales", icon: ShoppingCart },
      { title: "Sale Return", url: "/vouchers/SalesReturn", icon: CreditCard },
      { title: "Purchase", url: "/vouchers/Purchase", icon: ShoppingCart },
      { title: "Purchase Return", url: "/vouchers/PurchaseReturn", icon: CreditCard },
      { title: "CreditNote", url: "/vouchers/Credit", icon: FileText },
      { title: "Debit Note", url: "/vouchers/Debit", icon: FileText },
      { title: "Receipt Note", url: "/vouchers/Receipt", icon: FileText },
      { title: "Delivery Challans", url: "/vouchers/DeliveryChallans", icon: FileText },
      { title: "Opening", url: "/vouchers/Opening", icon: FileSpreadsheet },
    ],
  },

  {
    title: "Order",
    icon: ShoppingCart,
    items: [
      { title: "Order Types", url: "/order/OrderTypes", icon: FileText },
      { title: "Order Customer", url: "/order/OrderCustomer", icon: FileText },
      { title: "Order Supplier", url: "/order/OrderSupplier", icon: FileText },
    ],
  },

  {
    title: "Payments",
    icon: CreditCard,
    url : "/Payments/Payments"
  },
  {
    title: "Receipts",
    icon: FileSpreadsheet,
    url : "/receipts/Receipts"
  },

  {
    title: "RateCut",
    icon: FileSpreadsheet,
    url : "/RateCut/RateCut"
  },

  {
    title: "Ledgers",
    icon: Users,
    items: [
      { title: "Ledgers", url: "/ledgers/Ledgers", icon: Users },
      { title: "Ledger Groups", url: "/ledgers/LedgersGroup", icon: FileText },
    ],
  },
  {
    title: "Transfers",
    icon: PieChart,
    url : "/Transfer/Transfer"
  },
  {
    title: "Reports",
    icon: FileText,
    items: [
      { title: "Ledger Report", url: "/reports/LedgerReport", icon: FileText },
      { title: "Balance Sheet", url: "/reports/BalanceSheet", icon: FileSpreadsheet },
      { title: "Cash Flow", url: "/reports/CashFlow", icon: PieChart },
      { title: "Day Book", url: "/reports/DayBook", icon: Calendar },
      { title: "Profit & Loss", url: "/reports/ProfitLoss", icon: FileText },
      { title: "Trial Balance", url: "/reports/TrialBalance", icon: FileText },
      { title: "Stock", url: "/reports/Stock", icon: Package },
      { title: "Voucher", url: "/reports/Voucher", icon: Receipt },
      {title: "Order Summary", url: "/reports/OrderSummary", icon: FileText},
      { title: "Tag Report", url: "/reports/TagReport", icon: FileText },
      { title: "Tag Verify", url: "/reports/TagVerify", icon: FileText },
      { title: "Daily Register", url: "/reports/DailyRegister", icon: FileText },
      { title: "Ageing", url: "/reports/Ageing", icon: Calendar },
      { title: "TDS Report", url: "/reports/TdsReport", icon: FileSpreadsheet },
      { title: "Rate Cut Support", url: "/reports/RateCutSupport", icon: FileSpreadsheet },
    ],
  },

  {
    title: "Team",
    icon: Users,
  },
  ],
};

export function AppSidebar({ ...props }) {
  const [activeItem, setActiveItem] = React.useState(null);

  return (
    <Sidebar {...props} className="bg-blue-950 text-white w-72">
      {/* HEADER SECTION */}
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link
                to="/dashboard"
                className="relative flex items-center gap-2 px-3 py-2"
              >
                <img
                  src="/logo.png"
                  alt="SocioLedger Logo"
                  className="w-8 h-8 object-contain"
                />
                <span className="text-2xl font-bold text-white">
                  SocioLedger
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* MAIN SIDEBAR MENU */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {data.navMain.map((item) => (
              <Collapsible
                key={item.title}
                defaultOpen={false}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  {/* If item has submenu */}
                  {item.items?.length ? (
                    <>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton
                          onClick={() => setActiveItem(item.title)}
                          className={`flex items-center gap-2 transition-colors ${
                            activeItem === item.title
                              ? "bg-indigo-200 text-white"
                              : "hover:bg-gray-200"
                          }`}
                        >
                          {item.icon && (
                            <item.icon className="w-4 h-4 text-gray-400 group-hover:text-indigo-400 transition-colors" />
                          )}
                          <span className="font-medium">{item.title}</span>

                          {/* ✅ Fixed: Wrap toggle icons in a fragment */}
                          <>
                            <Plus className="ml-auto group-data-[state=open]/collapsible:hidden" />
                            <Minus className="ml-auto group-data-[state=closed]/collapsible:hidden" />
                          </>
                        </SidebarMenuButton>
                      </CollapsibleTrigger>

                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.items.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton asChild>
                                <Link
                                  to={subItem.url}
                                  onClick={() => setActiveItem(subItem.title)}
                                  className={`flex items-center gap-2 px-3 py-1 rounded-md transition-colors ${
                                    activeItem === subItem.title
                                      ? "bg-indigo-200 text-white"
                                      : "hover:bg-gray-200"
                                  }`}
                                >
                                  {subItem.icon && (
                                    <subItem.icon className="w-4 h-4 text-black" />
                                  )}
                                  <span>{subItem.title}</span>
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </>
                  ) : (
                    // No submenu → simple link
                    <SidebarMenuButton
                      asChild
                      className={`flex items-center gap-2 transition-colors ${
                        activeItem === item.title
                          ? "bg-indigo-200 text-white"
                          : "hover:bg-gray-200"
                      }`}
                    >
                      <Link
                        to={item.url || "#"}
                        onClick={() => setActiveItem(item.title)}
                        className="flex items-center gap-2 w-full"
                      >
                        {item.icon && (
                          <item.icon className="w-4 h-4 text-white" />
                        )}
                        <span className="font-medium">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              </Collapsible>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
}
