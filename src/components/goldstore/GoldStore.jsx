import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, ShoppingCart, Funnel, ArrowBigLeft } from "lucide-react";
import FilterGold from "@/components/goldstore/FilterGold";
import Cart from "@/components/goldstore/Cart";
import { useSelector, useDispatch } from "react-redux";
import { toggleWishlist } from "@/redux/designSlice";

// ✔ FIXED: import all cart actions
import {
  addToCart,
  increaseQty,
  decreaseQty,
  removeFromCart,
} from "@/redux/cartSlice";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

export default function GoldStore() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const designs = useSelector((state) =>
    state.design.data.filter((d) => d.status === "Active")
  );

  const cartItems = useSelector((state) => state.cart.items);
  const wishlist = useSelector((state) =>
    state.design.data.filter((d) => d.wishlist)
  );

  const totalPieces = cartItems.reduce((sum, item) => sum + item.qty, 0);
  const totalWeight = cartItems
    .reduce((sum, item) => sum + item.Net * item.qty, 0)
    .toFixed(3);
const [columns, setColumns] = useState(4);

  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* HEADER */}
      <div className="flex justify-between items-center px-8 py-4 bg-white shadow-sm">
        <div className="flex items-center gap-4">
          <img src="g.png" alt="Gold Store" className="w-10 h-10" />
          <span className="text-2xl font-semibold text-gray-800">Gold Store</span>
        </div>

        <div className="flex items-center gap-4">
          {/* WISHLIST POPUP */}
          <Popover>
            <PopoverTrigger asChild>
              <button className="relative p-2 hover:bg-gray-100 rounded-full">
                <Heart className="w-6 h-6 text-gray-700 hover:text-red-500" />
                <span className="absolute -top-1 -right-1 bg-gray-800 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              </button>
            </PopoverTrigger>

            <PopoverContent className="w-80 p-0 rounded-xl shadow-xl">
              <div className="flex items-center justify-between p-4 border-b">
                <div className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-red-500" />
                  <span className="font-semibold">My Wishlist</span>
                </div>
                <span className="text-sm text-gray-500">{wishlist.length} items</span>
              </div>

              {wishlist.length === 0 ? (
                <div className="p-4 text-center text-gray-500">No items added</div>
              ) : (
                wishlist.map((w) => (
                  <div key={w.id} className="flex items-center gap-3 p-4 border-b">
                    <img src={w.photo} className="w-14 h-14 rounded-lg object-cover" />

                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">{w.designno}</div>
                      <div className="text-sm text-gray-600">{w.item}</div>
                      <div className="text-sm text-gray-600">{w.Net}g</div>
                    </div>

                    <button
                      onClick={() => dispatch(toggleWishlist(w.id))}
                      className="text-red-500 text-sm hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                ))
              )}

              <button className="w-full py-3 bg-gray-900 text-white rounded-b-xl">Add All to Cart</button>
            </PopoverContent>
          </Popover>

          <Cart
            badge={
              totalPieces > 0 && (
                <span className="bg-white text-gray-900 text-sm font-semibold px-3 py-1 rounded-full">
                  {totalPieces} pcs / {totalWeight}g
                </span>
              )
            }
          />
        </div>
      </div>

      {/* MAIN SECTION */}
      <div className="flex mt-6 px-8 gap-6">
        {/* LEFT FILTER SIDEBAR */}
        {showFilters && (
          <div className="w-72 bg-gray-50 border-r p-4 rounded-xl shadow">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <Funnel className="w-5 h-5" /> Filters
              </h2>

              <button onClick={() => setShowFilters(false)} className="text-sm text-gray-500">
                Hide
              </button>
            </div>

            <FilterGold />
          </div>
        )}

        {/* RIGHT CONTENT */}
        <div className="flex-1">
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => setShowFilters(true)}
              className="flex items-center gap-2 px-4 py-2 border rounded-xl bg-white"
            >
              <Funnel className="w-5 h-5" /> Show Filters
            </button>

            <div className="border rounded-lg p-2">
              <input type="checkbox" className="mr-2" /> <span>show only stock items</span>
            </div>

            <div className="flex items-center gap-4 ml-auto">
              <select
  className="border rounded-lg p-2"
  value={columns}
  onChange={(e) => setColumns(Number(e.target.value))}
>
  <option value={2}>2</option>
  <option value={4}>4</option>
  <option value={6}>6</option>
  <option value={8}>8</option>
</select>


              <button
                onClick={() => navigate("/")}
                className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-xl"
              >
                <ArrowBigLeft className="w-5 h-5" /> back
              </button>
            </div>
          </div>

          {/* PRODUCTS GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {designs.map((d) => {
              const itemInCart = cartItems.find((i) => i.id === d.id);

              return (
                <div key={d.id} className="bg-white rounded-2xl shadow p-4 border relative">
                  {d.pieces > 0 && (
                    <div className="absolute top-3 left-3 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow">
                      ✔ {d.pieces} pc
                    </div>
                  )}

                  <button
                    onClick={() => dispatch(toggleWishlist(d.id))}
                    className="absolute top-3 right-3 bg-white p-2 rounded-full shadow"
                  >
                    <Heart
                      className={`w-5 h-5 ${d.wishlist ? "text-red-500" : "text-gray-700"}`}
                    />
                  </button>

                  <div className="h-48 bg-gray-100 rounded-xl flex items-center justify-center mt-2">
                    {d.photo ? (
                      <img src={d.photo} alt={d.item} className="max-w-full max-h-full" />
                    ) : (
                      <span className="text-gray-400">No Image</span>
                    )}
                  </div>

                  {/* PRODUCT DETAILS */}
                  <div className="mt-4 space-y-1">
                    <div className="text-lg font-semibold">{d.designno}</div>
                    <div className="text-gray-600">
                      {d.item} {d.Net && <>({d.Net}g)</>}
                    </div>
                    <div className="text-gray-600">Supplier No: {d.supplierdesign}</div>
                  </div>

                  {/* NEW: QTY BUTTONS BELOW SUPPLIER NUMBER */}
                  <div className="mt-3 flex items-center gap-3 bg-gray-100 py-4 px-2 rounded-lg w-full">
                    {itemInCart ? (
                      <>
                        <button
                          onClick={() =>
                            itemInCart.qty > 1
                              ? dispatch(decreaseQty(d.id))
                              : dispatch(removeFromCart(d.id))
                          }
                          className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center"
                        >
                          -
                        </button>

                        <span className="font-semibold">{itemInCart.qty}</span>

                        <button
                          onClick={() => dispatch(increaseQty(d.id))}
                          className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center"
                        >
                          +
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => dispatch(addToCart(d))}
                        className="bg-white px-3 py-2 rounded-full shadow flex items-center gap-2 hover:scale-105 transition"
                      >
                        <ShoppingCart className="w-5 h-5 text-gray-800" />
                      </button>
                    )}
                  </div>
                </div>  
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
