import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

export default function Cart() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="flex items-center gap-2 bg-gray-900 hover:bg-white-800 text-white px-4 py-2">
          <ShoppingCart />
          Cart
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetDescription>
            <div className="space-y-4 mt-3 border rounded-lg p-4">
              {/* Order Summary */}
              <div className="text-gray-900 font-semibold">
                <span>Order Summary</span>
              </div>

              {/* Total Pieces Row */}
              <div className="flex justify-between text-gray-700">
                <span>Total Pieces:</span>
                <span className="font-semibold">1 pcs</span>
              </div>

              {/* Unique Designs Row */}
              <div className="flex justify-between text-gray-700">
                <span>Unique Designs:</span>
                <span className="font-semibold">1</span>
              </div>

              {/* Divider */}
              <hr className="border-gray-300" />

              {/* Total Net Weight */}
              <div className="flex justify-between text-gray-900 text-lg font-semibold">
                <span>Total Net Weight:</span>
                <span>25.000g</span>
              </div>
            </div>

            <div className="space-y-4 mt-3 border rounded-lg p-4">
              
              <div className="text-gray-900 font-semibold">
                <span>Order Details</span>
              </div>


              <span className="text-gray-900">Date</span>
              <div className="flex justify-between text-gray-700 space-y-4 mt-3 border rounded-lg p-4">
                <input type="date" />
              </div>       
                
              <span className="text-gray-900">From Ledger</span>
              <div>
                <select className="w-full border rounded-lg p-2">
                  <option>Select from  Ledger</option>
                </select>
              </div>

            </div>
          </SheetDescription>
        </SheetHeader>
        <SheetFooter>
          <Button type="submit">Save changes</Button>
          <SheetClose asChild>
            <Button variant="outline">Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
