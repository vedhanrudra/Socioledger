"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "@/redux/itemsSlice"; // ✅ use itemsSlice

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { SlidersHorizontal, Trash2 } from "lucide-react";

export default function Filter({ onApply, onClear }) {
  const dispatch = useDispatch();
  const currentFilter = useSelector((state) => state.items.filter);

  const [filterValues, setFilterValues] = React.useState(currentFilter);
  const [open, setOpen] = React.useState(false);

  const handleApply = () => {
    dispatch(setFilter(filterValues)); // ✅ save filter in Redux
    if (onApply) onApply();
    setOpen(false);
  };

  const handleClear = () => {
    const cleared = { name: "", type: "", status: "" };
    setFilterValues(cleared);
    dispatch(setFilter(cleared)); // ✅ reset Redux filter
    if (onClear) onClear();
  };

  // keep local filter synced with redux
  React.useEffect(() => {
    setFilterValues(currentFilter);
  }, [currentFilter]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center gap-2 border rounded-md"
        >
          <SlidersHorizontal className="w-4 h-4" />
          Filter
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-3xl rounded-2xl p-6">
        <DialogHeader className="mb-4">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-5 h-5 text-orange-500" />
            <DialogTitle className="text-lg font-semibold text-gray-800">
              Item Filters
            </DialogTitle>
          </div>
        </DialogHeader>

        {/* Grid Section */}
        <div className="grid grid-cols-2 gap-4">
          {/* Name */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Name</label>
            <Input
              placeholder="Search by name"
              value={filterValues.name || ""}
              onChange={(e) =>
                setFilterValues({ ...filterValues, name: e.target.value })
              }
            />
          </div>

          {/* Type */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Type</label>
            <Select
              value={filterValues.type || ""}
              onValueChange={(value) =>
                setFilterValues({ ...filterValues, type: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="Goods">Goods</SelectItem>
                <SelectItem value="Services">Services</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Status */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Status</label>
            <Select
              value={filterValues.status || ""}
              onValueChange={(value) =>
                setFilterValues({ ...filterValues, status: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Bottom Buttons */}
        <div className="flex justify-end items-center gap-3 pt-4 border-t mt-4">
          <Button
            variant="outline"
            onClick={handleClear}
            className="flex items-center gap-1 text-gray-600"
          >
            <Trash2 className="w-4 h-4" />
            Clear
          </Button>
          <Button
            onClick={handleApply}
            className="bg-orange-500 hover:bg-orange-600 text-white flex items-center gap-1"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Apply
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
