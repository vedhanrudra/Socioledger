import React, { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ItemTable from "@/components/items/ItemTable"; 
import ItemGroups from "@/components/items/ItemGroups";
import ItemUnits from "@/components/items/ItemUnits";
const SectionCards = lazy(() => import("@/components/section-cards"));
//const Tableuser = lazy(() => import("@/components/items/Tableuser"));

export function AppRoutes() {
  return (
    <Suspense fallback={<div className="p-6 text-gray-500">Loading...</div>}>
      <Routes>
        {/* Default redirect */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        {/* Dashboard */}
        <Route path="/dashboard" element={<SectionCards />} />

        {/* Items */}
      <Route path="/items/ItemTable" element={<ItemTable />} />
      <Route path="/items/ItemGroups" element={<ItemGroups />} />
      <Route path="/items/ItemUnits" element={<ItemUnits />} />

      

        {/* Optional: 404 */}
        <Route
          path="*"
          element={
            <div className="text-center text-gray-600 mt-10 text-lg">
              404 - Page Not Found
            </div>
          }
        />
      </Routes>
    </Suspense>
  );
}
