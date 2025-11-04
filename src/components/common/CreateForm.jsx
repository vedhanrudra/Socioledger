import React from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

export default function CreateForm({ open, setOpen }) {
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button className="ml-auto bg-indigo-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-indigo-700 transition">
          + Add item
        </Button>
      </SheetTrigger>

      <SheetContent side="right" className="w-[400px] sm:w-[540px] bg-center">
        <SheetHeader>
          <SheetTitle>Create New item</SheetTitle>
        </SheetHeader>

        <form className="mt-4 space-y-4">
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              className="w-full border rounded-md p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter product name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Items group</label>
            <input
              type="number"
              className="w-full border rounded-md p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter price"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Type</label>
            <input
              type="number"
              className="w-full border rounded-md p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter quantity"
            />
          </div>

          <Button className="w-full mt-4">Save Product</Button>
        </form>
      </SheetContent>
    </Sheet>
  );
}
