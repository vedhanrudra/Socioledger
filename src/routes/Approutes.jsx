import React, { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Item from "@/components/items/ItemTable";
import ItemGroups from "@/components/items/ItemGroups";
import ItemUnits from "@/components/items/ItemUnits";
import Year from "@/components/years/TableYear";
import Task from  "@/components/task/Task";
import Estimate from "@/components/vouchers/Estimate";
import Sales from "@/components/vouchers/Sales";
import SalesReturn from "@/components/vouchers/SalesReturn";
import Purchase from "@/components/vouchers/Purchase";
import PurchaseReturn from "@/components/vouchers/PurchaseReturn";
import CreditNote from "@/components/vouchers/Credit";
import DebitNote from "@/components/vouchers/Debit";
import ReceiptNote from "@/components/vouchers/Receipt";
import DeliveryChallans from "@/components/vouchers/DeliveryChallans";
import Opening from "@/components/vouchers/Opening";
import MaterialIn from "@/components/jobwork/MaterialIn";
import MaterialOut from "@/components/jobwork/MaterialOut";
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
        <Route path="/items/ItemTable" element={<Item />} />
        <Route path="/items/ItemGroups" element={<ItemGroups />} />
        <Route path="/items/ItemUnits" element={<ItemUnits />} />

        {/* Years */}
        <Route path="/years" element={<Year />} />
        {/* task */}
        <Route path="/task" element={<Task />} />
        
        {/* Vouchers */}
        <Route path="/vouchers/Estimate" element={<Estimate />} />
        <Route path="/vouchers/Sales" element={<Sales />} />
        <Route path="/vouchers/SalesReturn" element={<SalesReturn />} />
        <Route path="/vouchers/Purchase" element={<Purchase />} />
        <Route path="/vouchers/PurchaseReturn" element={<PurchaseReturn />} />
        <Route path="/vouchers/Credit" element={<CreditNote />} />
        <Route path="/vouchers/Debit" element={<DebitNote />} />
        <Route path="/vouchers/Receipt" element={<ReceiptNote />} />
        <Route path="/vouchers/DeliveryChallans" element={<DeliveryChallans />} />
        <Route path="/vouchers/Opening" element={<Opening />} />

        {/* Jobwork */}
        <Route path="/jobwork/MaterialIn" element={<MaterialIn/>} />
        <Route path="/jobwork/MaterialOut" element={<MaterialOut/>} />
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
