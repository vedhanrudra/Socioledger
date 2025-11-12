import React from "react";
import { useNavigate } from "react-router-dom";
import { Heart, ShoppingCart } from "lucide-react"; // ✅ icons
import { Button } from "@/components/ui/button";

export default function GoldStore() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* 🌟 Top Header */}
      <div className="flex justify-between items-center px-8 py-4 bg-white shadow-sm">
        {/* Left: Logo or Title */}
        <div className="flex items-center gap-4">
          <img src="g.png" alt="Gold Store Logo" className="w-10 h-10" />

          <span className="text-2xl font-semibold text-gray-800">
            Gold Store
          </span>
        </div>
        {/* Right: Icons */}
        <div className="flex items-center gap-4">
          {/* Heart Icon */}
          <button className="p-2 rounded-full hover:bg-gray-100 transition">
            <Heart className="w-6 h-6 text-gray-700 hover:text-red-500" />
          </button>

          {/* Cart Button */}
          <Button className="flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-xl">
            <ShoppingCart className="w-5 h-5" />
            <span>Cart</span>
          </Button>
        </div>
      </div>

      {/* Your existing Gold Store content below */}
      <div className=" flex justify-end mb-6 p-3">
        {/* Cards, filters, etc. */}
        <Button className="flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-xl">
          <span onClick={() => navigate("/")}>back</span>
        </Button>
      </div>
    </div>
  );
}
  
