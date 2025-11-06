import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Layout } from "@/layout/Layout";
import { AppRoutes } from "@/routes/AppRoutes";
import { sidebarConfig } from "@/config/layout";
import { Provider } from "react-redux"; // ✅ Redux provider
import { store, persistor } from "@/redux/store";
import { PersistGate } from "redux-persist/integration/react";
export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <SidebarProvider style={sidebarConfig}>
            <Layout>
              <AppRoutes />
            </Layout>
          </SidebarProvider>
        </Router>
      </PersistGate>
    </Provider>
  );
}
