import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function FilterGold() {
  return (
    <div className="space-y-6">

      {/* Search */}
      <div>
        <Label className="font-semibold">Search</Label>
        <Input placeholder="Search designs..." />
      </div>

      {/* Sort By */}
      <div>
        <Label className="font-semibold">Sort By</Label>
        <select className="w-full border rounded-lg p-2">
          <option>Featured</option>
          <option>Newest First</option>
          <option>oldest First</option>
        </select>
      </div>

      {/* Items */}
      <div>
        <Label className="font-semibold">Items</Label>
        <select className="w-full border rounded-lg p-2">
          <option>Select item(s)</option>
        </select>
      </div>

      {/* Supplier */}
      <div>
        <Label className="font-semibold">Supplier</Label>
        <select className="w-full border rounded-lg p-2">
          <option>Select supplier(s)</option>
        </select>
      </div>

    </div>
  );
}
