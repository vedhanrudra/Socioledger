import React from "react";
import { AppSidebar } from "@/layout/app-sidebar";
import { SiteHeader } from "@/layout/site-header";
import { SidebarInset } from "@/components/ui/sidebar";

export function Layout({ children }) {
  return (
    <>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col bg-gray-50 min-h-screen p-6">
          {children}
        </div>
      </SidebarInset>
    </> 
  );
}
