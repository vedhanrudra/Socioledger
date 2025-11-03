import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal, Trash2 } from "lucide-react";

function TableFilter({ filterName, setFilterName, onApply, onClear }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4" />
          Filter
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <SlidersHorizontal className="w-5 h-5 text-orange-600" />
            Year Filters
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-2">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <Input
              placeholder="Enter name"
              value={filterName}
              onChange={(e) => setFilterName(e.target.value)}
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button
              variant="outline"
              onClick={onClear}
              className="flex items-center gap-1 text-gray-600"
            >
              <Trash2 className="w-4 h-4" />
              Clear
            </Button>

            <Button
              onClick={onApply}
              className="bg-orange-600 hover:bg-orange-700 text-white flex items-center gap-1"
            >
              Apply
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default TableFilter;

