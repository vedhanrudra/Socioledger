import React from "react";
import { SectionCards } from "../components/section-cards"; // adjust path

function Dashboard() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-1">Dashboard</h1>
      <p className="text-gray-500 mb-6">
        Overview of your business metrics and activities
      </p>
      <SectionCards />
    </div>
  );
}

export default Dashboard;
