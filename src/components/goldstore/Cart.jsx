import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useSelector, useDispatch } from "react-redux";
import {
  clearCart,
  removeFromCart,
  increaseQty,
  decreaseQty,
} from "@/redux/cartSlice";

export default function Cart({ badge }) {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  

const totalPieces = cartItems.reduce((sum, item) => sum + item.qty, 0);

const totalWeight = cartItems
  .reduce((sum, item) => sum + item.Net * item.qty, 0)
  .toFixed(3);


  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="relative p-2 flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-xl">
          <ShoppingCart className="w-5 h-5" />
          <span>Cart</span>

          {badge}
        </button>
      </SheetTrigger>
 
      <SheetContent className="p-0 flex flex-col h-full">
        {/* HEADER */}

        {/* BODY (only this scrolls) */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {/* ORDER SUMMARY */}

         <div className="border rounded-lg p-4 space-y-3">
  <h2 className="text-xl font-semibold">Order Summary</h2>

  <div className="flex justify-between">
    <span>Total Pieces:</span>
    <span className="font-semibold">{totalPieces}</span>
  </div>

  <div className="flex justify-between">
    <span>Unique Designs:</span>
    <span className="font-semibold">{cartItems.length}</span>
  </div>

  <hr />

  <div className="flex justify-between text-lg font-bold">
    <span>Total Net Weight:</span>
    <span>{totalWeight}g</span>
  </div>
</div>


          {/* ORDER DETAILS */}
          <div className="border rounded-lg p-4 space-y-4">
            <h2 className="text-lg font-semibold">Order Details</h2>

            {/* DATE */}
            <div>
              <label className="text-gray-900">Date</label>
              <input
                type="date"
                className="w-full border rounded-lg p-2 mt-2"
              />
            </div>

            {/* LEDGER */}
            <div>
              <label className="text-gray-900">From Ledger</label>
              <select className="w-full border rounded-lg p-2 mt-1">
                <option>Select from ledger</option>
              </select>
            </div>

            {/* TOUCH ID + ORDER TYPE */}
            <div className="flex gap-4">
              <div className="w-1/2">
                <label className="text-gray-900">Touch ID</label>
                <select className="w-full border rounded-lg p-2 mt-1">
                  <option></option>
                </select>
              </div>

              <div className="w-1/2">
                <label className="text-gray-900">Order Type</label>
                <select className="w-full border rounded-lg p-2 mt-1">
                  <option></option>
                </select>
              </div>
            </div>

            {/* DELIVERY DATE */}
            <div>
              <label className="text-gray-900">Delivery Date</label>
              <input
                type="date"
                className="w-full border rounded-lg p-2 mt-2"
              />
            </div>

            {/* NARRATION */}
            <div>
              <label className="text-gray-900">Narration</label>
              <input
                type="text"
                className="w-full border rounded-lg p-2 mt-2"
              />
            </div>
          </div>

          {/* ITEMS  in Cart */}
          <div className="mt-6">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Items in Cart</h2>

              <button
                onClick={() => dispatch(clearCart())}
                className="text-red-500 text-sm font-medium"
              >
                Clear All
              </button>
            </div>

            <div className="mt-3 space-y-3">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="border rounded-xl p-4 flex items-center gap-4 bg-white"
                >
                  {/* IMAGE */}
                  <img
                    src={item.photo}
                    className="w-16 h-16 rounded-lg object-cover"
                    alt=""
                  />

                  {/* DETAILS */}
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">
                      {item.designno}
                    </div>
                    <div className="text-gray-600 text-sm">{item.item}</div>

                    <div className="text-gray-600 text-sm flex items-center gap-2 mt-1">
                      <span>{item.qty} piece</span>
                      <span className="text-gray-400">•</span>
                      <span>{item.Net}g total</span>
                    </div>
                  </div>

                  {/* REMOVE BUTTON */}
                  <button
                    onClick={() => dispatch(removeFromCart(item.id))}
                    className="text-gray-400 text-xl"
                  >
                    ›
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FOOTER (fixed at bottom) */}
        <div className="p-4 border-t flex gap-3">
          <SheetClose asChild>
            <Button variant="outline" className="w-1/2">
              Continue Shopping
            </Button>
          </SheetClose>

          <Button className="w-1/2 bg-gray-900 text-white">Save & Exit</Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
