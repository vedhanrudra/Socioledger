import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem, updateItem } from "@/redux/itemsSlice"; // ✅ only items
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

export default function Form({ open, onOpenChange, data }) {
  const dispatch = useDispatch();
  const isEditMode = Boolean(data);

  // form states
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

  // dropdown data
  const groups = useSelector((state) =>
  state.itemGroups.list.map((g) => g.name)
 );
  const types = ["Goods", "Services"];
  const units = ["Pcs"];
  const statuses = ["Active", "Inactive"];
  const stockOptions = ["Yes", "No"];

  // validate input
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

  // set initial values when editing
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

  // handle save
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

      if (isEditMode) dispatch(updateItem(formData));
      else dispatch(addItem(formData));

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
                    ? "Modify the details below to update the item."
                    : "Fill in the details below to create a new item."}
                </SheetDescription>
              </div>
            </div>
            <Settings className="w-5 h-5 text-black mt-7 cursor-pointer" />
          </div>
        </SheetHeader>

        {/* FORM BODY */}
        <div className="mt-6 space-y-5">
          {/* Name */}
          <TextInput
            label="Name"
            value={name}
            setValue={setName}
            error={errors.name}
            placeholder="Enter item name"
          />

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

          {/* Conditional fields for Goods */}
          {type === "Goods" && (
            <div className="space-y-4 border-t pt-4 mt-2">
              {/* Photo Upload */}
              <div className="grid gap-2">
                <Label>Photo</Label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setPhoto(e.target.files[0])}
                />
              </div>

              {/* Want Stock */}
              <Dropdown
                label="Want Stock"
                value={wantStock}
                setValue={setWantStock}
                options={stockOptions}
                error={errors.wantStock}
              />

              {/* Minimum Quantity */}
              <TextInput
                label="Minimum Quantity"
                value={minQty}
                setValue={setMinQty}
                error={errors.minQty}
                placeholder="Enter minimum quantity"
                type="number"
              />
            </div>
          )}

          {/* HSN */}
          <TextInput
            label="HSN/SAC Code"
            value={hsn}
            setValue={setHsn}
            placeholder="Enter HSN/SAC Code"
          />

          {/* Unit */}
          <Dropdown
            label="Unit"
            value={unit}
            setValue={setUnit}
            options={units}
            error={errors.unit}
          />

          {/* Status */}
          <Dropdown
            label="Status"
            value={status}
            setValue={setStatus}
            options={statuses}
            error={errors.status}
          />
        </div>

        {/* FOOTER */}
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
}

/* 🔹 Small helper components for cleaner JSX */

function TextInput({ label, value, setValue, error, placeholder, type = "text" }) {
  return (
    <div className="grid gap-2">
      <Label>
        {label} <span className="text-red-500">*</span>
      </Label>
      <Input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}

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
