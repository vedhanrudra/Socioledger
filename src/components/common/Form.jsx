import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addVoucher, updateVoucher } from "@/redux/voucherSlice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Check, Package, Settings, Pencil } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Form({ open, onOpenChange, data, onSubmit }) {
  const dispatch = useDispatch();
  const isEditMode = Boolean(data);

  const [name, setName] = useState("");
  const [group, setGroup] = useState("");
  const [type, setType] = useState("");
  const [hsn, setHsn] = useState("");
  const [unit, setUnit] = useState("");
  const [status, setStatus] = useState("");
  const [photo, setPhoto] = useState(null);
  const [wantStock, setWantStock] = useState("");
  const [minQty, setMinQty] = useState("");
  const [errors, setErrors] = useState({});

  const groups = ["Primary"];
  const types = ["Goods", "Services"];
  const units = ["Pcs"];
  const statuses = ["Active", "Inactive"];
  const stockOptions = ["Yes", "No"];

  const validateForm = () => {
    const newErrors = {};
    if (!name) newErrors.name = "Name is required";
    if (!group) newErrors.group = "Group is required";
    if (!type) newErrors.type = "Type is required";
    if (!hsn) newErrors.hsn = "HSN/SAC Code is required";
    if (!unit) newErrors.unit = "Unit is required";
    if (!status) newErrors.status = "Status is required";

    if (type === "Goods") {
      if (!wantStock) newErrors.wantStock = "Please select stock preference";
      if (!minQty) newErrors.minQty = "Minimum Quantity is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    if (data) {
      setName(data.name || "");
      setGroup(data.group || "");
      setType(data.type || "");
      setHsn(data.hsn || "");
      setUnit(data.unit || "");
      setStatus(data.status || "");
      setPhoto(data.photo || null);
      setWantStock(data.wantStock || "");
      setMinQty(data.minQty || "");
    } else {
      setName("");
      setGroup("");
      setType("");
      setHsn("");
      setUnit("");
      setStatus("");
      setPhoto(null);
      setWantStock("");
      setMinQty("");
    }
  }, [data, open]);

  const handleSave = () => {
  if (validateForm()) {
    const formData = {
      id: data?.id || Date.now(),
      name,
      group,
      type,
      hsn,
      unit,
      status,
      photo,
      wantStock,
      minQty,
    };

    // ✅ Call the parent onSubmit instead of dispatching here
    if (typeof onSubmit === "function") {
      onSubmit(formData);
    }

    onOpenChange(false);
  }
};


  return (
    <Sheet onOpenChange={onOpenChange} open={open}>
      {!isEditMode && (
        <SheetTrigger asChild>
          <Button className="flex items-center gap-2 bg-blue-700 hover:bg-blue-500 py-2 px-4 text-white font-semibold rounded transition">
            <Package className="w-5 h-5" />
            Create New Item
          </Button>
        </SheetTrigger>
      )}
      <SheetContent className="sm:max-w-[480px] overflow-y-auto">
        <SheetHeader className="flex flex-col gap-1">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              {isEditMode ? (
                <Pencil className="w-8 h-8 text-blue-700" />
              ) : (
                <Package className="w-8 h-8 text-blue-700" />
              )}
              <div>
                <SheetTitle>
                  {isEditMode ? "Edit Item" : "Create New Item"}
                </SheetTitle>
                <SheetDescription>
                  {isEditMode
                    ? "Modify details below to update the item."
                    : "Fill in the details below to create a new item."}
                </SheetDescription>
              </div>
            </div>
            <Settings className="w-5 h-5 text-black mt-7 cursor-pointer" />
          </div>
        </SheetHeader>

        <div className="mt-6 space-y-5">
          {/* Name */}
          <div className="grid gap-2">
            <Label htmlFor="name">
              Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              placeholder="Enter item name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name}</p>
            )}
          </div>

          {/* Group */}
          <Dropdown
            label="Item Group"
            value={group}
            setValue={setGroup}
            options={groups}
            error={errors.group}
          />

          {/* Type */}
          <Dropdown
            label="Type"
            value={type}
            setValue={setType}
            options={types}
            error={errors.type}
          />

          {/* Photo */}
          {type === "Goods" && (
            <div className="space-y-4 border-t pt-4 mt-2">
              <div className="grid gap-2">
                <Label>Photo</Label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setPhoto(e.target.files[0])}
                />
              </div>
            </div>
          )}

          {/* HSN */}
          <div className="grid gap-2">
            <Label htmlFor="hsn">HSN/SAC Code</Label>
            <Input
              id="hsn"
              placeholder="Enter HSN/SAC Code"
              value={hsn}
              onChange={(e) => setHsn(e.target.value)}
            />
          </div>

          {/* Unit */}
          <Dropdown
            label="Unit"
            value={unit}
            setValue={setUnit}
            options={units}
            error={errors.unit}
          />

          {/* Conditional fields appear when type === "Goods" */}
          {type === "Goods" && (
            <div className="space-y-4 border-t pt-4 mt-2">
             

              {/* Want Stock */}
              <Dropdown
                label="Want Stock"
                value={wantStock}
                setValue={setWantStock}
                options={stockOptions}
                error={errors.wantStock}
              />

              {/* Minimum Quantity */}
              <div className="grid gap-2">
                <Label>
                  Minimum Quantity <span className="text-red-500">*</span>
                </Label>
                <Input
                  type="number"
                  value={minQty}
                  onChange={(e) => setMinQty(e.target.value)}
                  placeholder="Enter minimum quantity"
                />
                {errors.minQty && (
                  <p className="text-red-500 text-sm">{errors.minQty}</p>
                )}
              </div>
            </div>
          )}

          {/* Status */}
          <Dropdown
            label="Status"
            value={status}
            setValue={setStatus}
            options={statuses}
            error={errors.status}
          />
        </div>

        {/* Footer */}
        <SheetFooter className="flex justify-end gap-3 mt-4">
          <Button
            onClick={handleSave}
            className="bg-blue-700 hover:bg-blue-500 text-white"
          >
            {isEditMode ? "💾 Update" : "✅ Save"}
          </Button>
          <SheetClose asChild>
            <Button variant="outline">❎ Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );

  // Reusable dropdown component
  function Dropdown({ label, value, setValue, options, error }) {
    return (
      <div className="grid gap-2">
        <Label>
          {label} <span className="text-red-500">*</span>
        </Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full justify-between">
              {value || `Select ${label}`}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[250px] p-0">
            <Command>
              <CommandInput placeholder={`Search ${label.toLowerCase()}...`} />
              <CommandList>
                <CommandEmpty>No result found.</CommandEmpty>
                <CommandGroup>
                  {options.map((opt) => (
                    <CommandItem key={opt} onSelect={() => setValue(opt)}>
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          value === opt ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {opt}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>
    );
  }
}
