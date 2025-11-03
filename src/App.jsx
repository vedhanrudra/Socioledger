import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Layout } from "@/layout/Layout";
import { AppRoutes } from "@/routes/AppRoutes";
import { sidebarConfig } from "@/config/layout";

export default function App() {
  return (
    <Router>
      <SidebarProvider style={sidebarConfig}>
        <Layout>
          <AppRoutes />
        </Layout>
      </SidebarProvider>
    </Router>
  );
}
