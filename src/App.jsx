import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppSidebar } from "@/components/app-sidebar";
import { SectionCards } from "@/components/section-cards";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import Tableuser from "@/components/Tableuser";

export default function App() {
  return (
    <Router>
      <SidebarProvider
        style={{
          "--sidebar-width": "300px",
          "--header-height": "calc(var(--spacing) * 12)",
        }}
      >
        <AppSidebar variant="inset" />
        <SidebarInset>
          <SiteHeader />
          <div className="flex flex-1 flex-col bg-gray-50 min-h-screen p-6">
            <Routes>
              <Route path="/" element={<SectionCards />} />
              <Route path="/items/tableuser" element={<Tableuser />} /> {/* ✅ */}
            </Routes>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </Router>
  );
}
