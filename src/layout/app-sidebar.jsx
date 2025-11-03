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
        { title: "Items Table", url: "/items/ItemTable", icon: Package },
        { title: "Items Groups", url: "/items/ItemGroups", icon: FileText },
        { title: "Items Units", url: "/items/ItemUnits", icon: FileSpreadsheet },
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
      { title: "Estimate", url: "#", icon: FileText },
      { title: "Sales", url: "#", icon: ShoppingCart },
      { title: "Sale Return", url: "#", icon: CreditCard },
      { title: "Purchase", url: "#", icon: ShoppingCart },
      { title: "Purchase Return", url: "#", icon: CreditCard },
      { title: "Credit Note", url: "#", icon: FileText },
      { title: "Debit Note", url: "#", icon: FileText },
      { title: "Receipt Note", url: "#", icon: FileText },
      { title: "Delivery Challans", url: "#", icon: FileText },
      { title: "Opening", url: "#", icon: FileSpreadsheet },
    ],
  },
  {
    title: "Jobwork",
    icon: Briefcase,
    items: [
      { title: "Material In", url: "#", icon: FileText },
      { title: "Material Out", url: "#", icon: FileText },
    ],
  },
  {
    title: "Order",
    icon: ShoppingCart,
    items: [
      { title: "Order Purchase", url: "#", icon: FileText },
      { title: "Order Sale", url: "#", icon: FileText },
    ],
  },
  {
    title: "Quotations",
    icon: FileText,
  },
  {
    title: "Payments",
    icon: CreditCard,
  },
  {
    title: "Receipts",
    icon: FileSpreadsheet,
  },
  {
    title: "Ledgers",
    icon: Users,
    items: [
      { title: "Ledgers", url: "#", icon: Users },
      { title: "Ledger Groups", url: "#", icon: FileText },
    ],
  },
  {
    title: "Transfers",
    icon: PieChart,
  },
  {
    title: "Reports",
    icon: FileText,
    items: [
      { title: "Ledger Report", url: "#", icon: FileText },
      { title: "Balance Sheet", url: "#", icon: FileSpreadsheet },
      { title: "Cash Flow", url: "#", icon: PieChart },
      { title: "Day Book", url: "#", icon: Calendar },
      { title: "Profit & Loss", url: "#", icon: FileText },
      { title: "Trial Balance", url: "#", icon: FileText },
      { title: "Stock", url: "#", icon: Package },
      { title: "Voucher", url: "#", icon: Receipt },
      { title: "Daily Register", url: "#", icon: FileText },
      { title: "Ageing", url: "#", icon: Calendar },
      { title: "TDS Report", url: "#", icon: FileSpreadsheet },
    ],
  },
  {
    title: "GST",
    icon: FileSpreadsheet,
    items: [
      { title: "GSTR-1", url: "#", icon: FileText },
      { title: "GST2B", url: "#", icon: FileSpreadsheet },
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
    <Sidebar {...props} className="bg-white-200 text-black w-72">
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
                <span className="text-2xl font-bold text-black">
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
                              ? "bg-indigo-200 text-black"
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
                                      ? "bg-indigo-200 text-black"
                                      : "hover:bg-gray-200"
                                  }`}
                                >
                                  {subItem.icon && (
                                    <subItem.icon className="w-4 h-4 text-gray-400" />
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
                          ? "bg-indigo-200 text-black"
                          : "hover:bg-gray-200"
                      }`}
                    >
                      <Link
                        to={item.url || "#"}
                        onClick={() => setActiveItem(item.title)}
                        className="flex items-center gap-2 w-full"
                      >
                        {item.icon && (
                          <item.icon className="w-4 h-4 text-gray-400" />
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
