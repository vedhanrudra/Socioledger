import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "@/redux/voucherSlice";

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

function Filter({ onApply, onClear }) {
  const dispatch = useDispatch();
  const currentFilter = useSelector((state) => state.voucher.filter);

  const [filterValues, setFilterValues] = React.useState(currentFilter);

  const handleApply = () => {
    dispatch(setFilter(filterValues)); // ✅ Save to Redux
    if (onApply) onApply();
  };

  const handleClear = () => {
    setFilterValues({});
    dispatch(setFilter({}));
    if (onClear) onClear();
  };

  return (
    <Dialog>
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

          {/* Group */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Group</label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select group" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="group1">Group 1</SelectItem>
                <SelectItem value="group2">Group 2</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Type */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Type</label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="goods">Goods</SelectItem>
                <SelectItem value="service">Service</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* HSN/SAC Code */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">
              HSN/SAC Code
            </label>
            <Input placeholder="Search by HSN/SAC Code" />
          </div>

          {/* GST Rate */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">
              GST Rate
            </label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select Gst Rate" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5%</SelectItem>
                <SelectItem value="12">12%</SelectItem>
                <SelectItem value="18">18%</SelectItem>
                <SelectItem value="28">28%</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Unit */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Unit</label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select unit" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pcs">Pieces</SelectItem>
                <SelectItem value="kg">Kilograms</SelectItem>
                <SelectItem value="ltr">Litres</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Status */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Status</label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Want Stock */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">
              Want Stock
            </label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select Want Stock" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="yes">Yes</SelectItem>
                <SelectItem value="no">No</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Bottom Buttons */}
        <div className="flex justify-end items-center gap-3 pt-4 border-t mt-4">
          <Button
            variant="outline"
            onClick={handleClear} // ✅ use your function
            className="flex items-center gap-1 text-gray-600"
          >
            <Trash2 className="w-4 h-4" />
            Clear
          </Button>
          <Button
            onClick={handleApply} // ✅ use your function
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

export default Filter;
