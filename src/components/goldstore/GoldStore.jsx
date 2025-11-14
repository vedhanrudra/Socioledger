import React, { useState } from "react"; // ✅ FIXED useState import
import { useNavigate } from "react-router-dom";
import { Heart, ShoppingCart, Funnel, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ArrowBigLeft } from "lucide-react";
import FilterGold from "@/components/goldstore/FilterGold";
import Cart from "@/components/goldstore/Cart";
import { useSelector } from "react-redux";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function GoldStore() {
  const designs = useSelector((state) =>
    state.design.data.filter((d) => d.status == "Active")
  );

  const navigate = useNavigate();

  // ✅ controls the sidebar open / close
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* 🌟 Top Header */}
      <div className="flex justify-between items-center px-8 py-4 bg-white shadow-sm">
        <div className="flex items-center gap-4">
          <img src="g.png" alt="Gold Store Logo" className="w-10 h-10" />
          <span className="text-2xl font-semibold text-gray-800">
            Gold Store
          </span>
        </div>

        <div className="flex items-center gap-4">
          <Popover>
            <PopoverTrigger asChild>
              <button className="relative p-2 rounded-full hover:bg-gray-100 transition">
                <Heart className="w-6 h-6 text-gray-700 hover:text-red-500" />

                {/* Badge */}
                <span className="absolute -top-1 -right-1 bg-gray-800 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  1
                </span>
              </button>
            </PopoverTrigger>

            <PopoverContent className="w-80 p-0 rounded-xl shadow-xl">
              {/* HEADER */}
              
              <div className="flex items-center justify-between p-4 border-b">
                <div className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-red-500" />
                  <span className="font-semibold">My Wishlist</span>
                </div>
                <span className="text-sm text-gray-500">1 item</span>
              </div>

              {/* ITEM */}
              <div className="flex items-center gap-3 p-4 border-b">
                <img
                  src=""
                  className="w-14 h-14 rounded-lg object-cover"
                  alt=""
                />

                <div className="flex-1">
                  <div className="font-semibold text-gray-900">sona0001</div>
                  <div className="text-sm text-gray-600">ring</div>
                  <div className="text-sm text-gray-600">25.000g</div>
                </div>

                <div className="text-green-600 text-sm flex items-center gap-1">
                  <Check className="w-4 h-4" />
                  In Cart
                </div>

                <button className="text-red-500 text-sm hover:underline">
                  Remove
                </button>
              </div>

              {/* FOOTER BUTTON */}
              <button className="w-full py-3 bg-gray-900 text-white rounded-b-xl">
                Add All to Cart
              </button>
            </PopoverContent>
          </Popover>

          <Cart className="p-2 rounded-full hover:bg-gray-100 transition" />
        </div>
      </div>

      {/* ===================== MAIN SECTION ===================== */}
      <div className="flex mt-6 px-8 gap-6">
        {/* ===================== LEFT FILTER SIDEBAR ===================== */}
        {showFilters && (
          <div className="w-72 bg-gray-50 border-r p-4 rounded-xl shadow">
            {/* Header inside sidebar */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <Funnel className="w-5 h-5" />
                Filters
              </h2>

              <button
                onClick={() => setShowFilters(false)}
                className="text-sm text-gray-500"
              >
                Hide
              </button>
            </div>

            {/* Actual filter component */}

            <FilterGold />
          </div>
        )}

        {/* ===================== RIGHT SIDE CONTENT ===================== */}
        <div className="flex-1">
          {/* Top row buttons */}
          <div className="flex items-center gap-4 mb-6">
            {/* SHOW FILTER BUTTON */}
            <button
              onClick={() => setShowFilters(true)}
              className="flex items-center gap-2 px-4 py-2 border rounded-xl bg-white"
            >
              <Funnel className="w-5 h-5" />
              Show Filters
            </button>

            <div className="border rounded-lg p-2">
              <input type="checkbox" className="mr-2" />
              <span>show only stock items</span>
            </div>

            <div className="flex items-center gap-4 ml-auto">
              <select className="border rounded-lg p-2">
                <option>2</option>
                <option>4</option>
                <option>6</option>
                <option>8</option>
              </select>

              {/* Back Button */}
              <button
                onClick={() => navigate("/")}
                className="flex items-center gap-2 bg-gray-900 hover:bg-white-800 text-white px-4 py-2 rounded-xl"
              >
                <ArrowBigLeft className="w-5 h-5" />
                <span>back</span>
              </button>
            </div>
          </div>

          {/* ======= PRODUCT GRID goes here ======= */}
          <div>
            {/* all your product cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {designs.map((d) => (
                <div
                  key={d.id}
                  className="relative bg-white rounded-2xl shadow p-4 border"
                >
                  {/* Green piece badge */}
                  {d.pieces > 0 && (
                    <div className="absolute top-3 left-3 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow">
                      ✔ {d.pieces} pc
                    </div>
                  )}

                  {/* Heart Icon */}
                  <button className="absolute top-3 right-3 bg-white p-2 rounded-full shadow hover:bg-gray-100">
                    <Heart className="w-5 h-5 text-gray-700" />
                  </button>

                  {/* IMAGE */}
                  <div className="h-48 bg-gray-100 rounded-xl flex items-center justify-center mt-2">
                    {d.photo ? (
                      <img
                        src={d.photo}
                        alt={d.item}
                        className="max-w-full max-h-full"
                      />
                    ) : (
                      <span className="text-gray-400">No Image</span>
                    )}
                  </div>

                  {/* Floating Add-to-cart Icon */}
                  <button className="absolute bottom-[95px] right-6 bg-white p-3 rounded-full shadow-lg hover:scale-105 transition">
                    <ShoppingCart className="w-5 h-5 text-gray-800" />
                  </button>

                  {/* DETAILS */}
                  <div className="mt-4 space-y-1">
                    <div className="text-lg font-semibold">{d.designno}</div>

                    <div className="text-gray-600">
                      {d.item}
                      {d.Net && <> ({d.Net}g)</>}
                    </div>

                    <div className="text-gray-600">
                      Supplier No: {d.supplierdesign}
                    </div>
                  </div>

                  {/* QUANTITY SELECTOR */}
                  {/* <div className="mt-4">
                    <span className="text-gray-700">Pieces:</span>

                    <div className="flex items-center gap-4 mt-2">
                      <button className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-lg">
                        -
                      </button>

                      <span className="text-gray-900 text-lg">
                        {d.pieces || 0}
                      </span>

                      <button className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-lg">
                        +
                      </button>
                    </div>
                  </div> */}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
