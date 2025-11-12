import React from "react";
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Layout } from "@/layout/Layout";
import { AppRoutes } from "@/routes/AppRoutes";
import { sidebarConfig } from "@/config/layout";
import { Provider } from "react-redux";
import { store, persistor } from "@/redux/store";
import { PersistGate } from "redux-persist/integration/react";

function AppContent() {
  const location = useLocation();

  // ✅ Routes that should NOT have sidebar/header
  const fullPageRoutes = ["/GoldStore"];

  const isFullPage = fullPageRoutes.includes(location.pathname);

  if (isFullPage) {
    // Render only the route content (no sidebar/header)
    return <AppRoutes />;
  }

  // Default: use the sidebar + header layout
  return (
    <SidebarProvider style={sidebarConfig}>
      <Layout>
        <AppRoutes />
      </Layout>
    </SidebarProvider>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <AppContent />
        </Router>
      </PersistGate>
    </Provider>
  );
}
