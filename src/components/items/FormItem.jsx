import { useState, useEffect } from "react";
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
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { Check, Package, Settings, Pencil } from "lucide-react";
import { cn } from "@/lib/utils";
import { useDispatch, useSelector } from "react-redux";
import { addItem, updateItem } from "@/redux/itemsSlice";

export default function Form({ open, onOpenChange, data }) {
  const isEditMode = Boolean(data);
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [group, setGroup] = useState("");
  const [type, setType] = useState("");
  const [hsn, setHsn] = useState("");
  const [shortname, setShortName] = useState("");
  const [unit, setUnit] = useState("");
  const [quantity, setQuantity] = useState("");
  const [stock, setStock] = useState("");
  const [status, setStatus] = useState("");
  const [errors, setErrors] = useState({});
  const [photo, setPhoto] = useState(null);

  const [previewOpen, setPreviewOpen] = useState(false);

  const itemGroups = useSelector((state) => state.itemGroup.data);
  const itemUnits = useSelector((state) => state.itemUnit.data);
  const types = ["Goods", "Services"];
  const stockoptions = ["Yes", "No"];
  const statuses = ["Active", "Inactive"];

  const convertToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const validateForm = () => {
    const newErrors = {};
    if (!name) newErrors.name = "Name is required";
    if (!group) newErrors.group = "Group is required";
    if (!type) newErrors.type = "Type is required";
    if (!hsn) newErrors.hsn = "HSN/SAC Code is required";
    if (!shortname) newErrors.shortname = "ShortName is required";
    if (!unit) newErrors.unit = "Unit is required";
    if (type === "Goods" && !stock) newErrors.stock = "Stock is required";
    if (type === "Goods" && !quantity)
      newErrors.quantity = "Quantity is required";
    if (!status) newErrors.status = "Status is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    if (data) {
      setName(data.name || "");
      setGroup(data.group || "");
      setShortName(data.shortname || "");
      setType(data.type || "");
      setHsn(data.hsn || "");
      setUnit(data.unit || "");
      setQuantity(data.quantity || "");
      setStock(data.stock || "");
      setStatus(data.status || "");
      setPhoto(data.photo || null);
    } else {
      setName("");
      setGroup("");
      setShortName("");
      setType("");
      setHsn("");
      setUnit("");
      setQuantity("");
      setStock("");
      setStatus("");
      setPhoto(null);
    }
  }, [data, open]);

  useEffect(() => {
    if (type === "Services") {
      setStock("Yes");
    } else if (type === "Goods") {
      setStock("");
    }
  }, [type]);

  const handleSave = () => {
    if (!validateForm()) return;

    const formData = {
      id: isEditMode ? data.id : Date.now(),
      name,
      group: typeof group === "object" ? group.name : group,
      shortname,
      type,
      hsn,
      unit: typeof unit === "object" ? unit.name : unit,
      quantity,
      stock,
      status,
      photo,
    };

    if (isEditMode) {
      dispatch(updateItem({ id: data.id, updatedData: formData }));
    } else {
      dispatch(addItem(formData));
    }

    onOpenChange(false);
  };

  return (
    <Sheet onOpenChange={onOpenChange} open={open}>
      <SheetContent className="sm:max-w-[400px]">
        <SheetHeader>
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

        <div className="mt-6 space-y-5 p-2">
          <TextField
            id="name"
            label="Name"
            value={name}
            onChange={setName}
            error={errors.name}
          />

          <TextField
            id="shortname"
            label="Short Name"
            value={shortname}
            onChange={setShortName}
            error={errors.shortname}
          />

          <Dropdown
            label="Item Group"
            value={group}
            setValue={setGroup}
            options={itemGroups}
            error={errors.group}
          />

          <Dropdown
            label="Type"
            value={type}
            setValue={setType}
            options={types}
            error={errors.type}
          />

          {type === "Goods" && (
            <>
              {/* 📸 Photo Upload with Click-to-Preview */}
              <div className="grid gap-2">
                <Label htmlFor="photo">Photo</Label>

                <input
                  id="dropzone-file"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={async (e) => {
                    const file = e.target.files[0];
                    if (file) {
                      if (file.size > 2 * 1024 * 1024) {
                        alert("File must be smaller than 2MB");
                        return;
                      }
                      const base64 = await convertToBase64(file);
                      setPhoto(base64);
                    }
                  }}
                />

                <label
                  htmlFor="dropzone-file"
                  className="flex flex-col items-center justify-center w-80 h-70 max-w-lg p-5 mx-auto mt-2 text-center
      bg-white border-2 border-gray-300 border-dashed cursor-pointer rounded relative overflow-hidden hover:border-blue-400 transition"
                >
                  {photo ? (
                    <div className="relative w-full h-full group">
                      <img
                        src={photo}
                        alt="Preview"
                        className="absolute inset-0 w-full h-full object-cover rounded cursor-zoom-in group-hover:opacity-80 transition"
                        onClick={(e) => {
                          e.preventDefault(); // ✅ stop the label from triggering file input
                          e.stopPropagation(); // ✅ stop event bubbling
                          setPreviewOpen(true); // ✅ open preview modal
                        }} // 👈 opens preview modal
                      />
                      {/* Remove Button */}
                      <button
                        type="button"
                        className="absolute top-2 right-2 bg-red-600 text-white rounded-full w-6 h-6 text-xs flex items-center justify-center shadow"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setPhoto(null);
                        }}
                      >
                        ✕
                      </button>
                    </div>
                  ) : (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-8 h-8 text-gray-500"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775
            5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0
            0118 19.5H6.75z"
                        />
                      </svg>
                      <p className="mt-2 text-sm text-gray-500">
                        Click to upload or drag & drop
                      </p>
                      <p className="text-xs text-gray-400">image/* up to 2MB</p>
                    </>
                  )}
                </label>

                {/* 🖼️ Fullscreen Preview Modal */}
                {previewOpen && (
                  <div
                    className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
                    onClick={() => setPreviewOpen(false)}
                  >
                    <div
                      className="relative bg-white rounded-lg shadow-2xl p-3 w-full max-w-3xl max-h-[90vh] flex flex-col items-center overflow-hidden"
                      onClick={(e) => e.stopPropagation()} // prevent close when clicking inside
                    >
                      {/* Header with Close Button */}
                      <div className="w-full flex justify-between items-center mb-2">
                        <h2 className="text-lg font-semibold text-gray-700">
                          Image Preview
                        </h2>
                        <button
                          className="text-gray-600 hover:text-black text-xl font-bold"
                          onClick={() => setPreviewOpen(false)}
                        >
                          ✕
                        </button>
                      </div>

                      {/* Scroll-Zoomable Box */}
                      <div className="relative w-full h-[85vh] flex items-center justify-center bg-transparent overflow-hidden">
                        <TransformWrapper
                          initialScale={1}
                          minScale={0.3}
                          maxScale={6}
                          wheel={{ step: 0.15 }}
                          doubleClick={{ disabled: false }}
                          zoomAnimation={{
                            animationTime: 200,
                            animationType: "ease-out",
                          }}
                          panning={{ velocityDisabled: true }}
                          centerOnInit={true}
                        >
                          {({ zoomIn, zoomOut, resetTransform }) => (
                            <>
                              {/* Manual Zoom Controls */}
                              <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    zoomIn();
                                  }}
                                  className="bg-white/80 backdrop-blur-sm text-gray-800 rounded-full shadow-md hover:bg-blue-100 w-9 h-9 flex items-center justify-center text-lg font-bold"
                                >
                                  +
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    zoomOut();
                                  }}
                                  className="bg-white/80 backdrop-blur-sm text-gray-800 rounded-full shadow-md hover:bg-blue-100 w-9 h-9 flex items-center justify-center text-lg font-bold"
                                >
                                  −
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    resetTransform();
                                  }}
                                  className="bg-white/80 backdrop-blur-sm text-gray-800 rounded-full shadow-md hover:bg-blue-100 w-9 h-9 flex items-center justify-center text-base font-semibold"
                                >
                                  ⟳
                                </button>
                              </div>

                              {/* Zoomable Image */}
                              <TransformComponent>
                                <img
                                  src={photo}
                                  alt="Zoom Preview"
                                  className="select-none cursor-grab active:cursor-grabbing"
                                  draggable={false}
                                  style={{
                                    maxWidth: "none",
                                    maxHeight: "none",
                                    display: "block",
                                  }}
                                />
                              </TransformComponent>
                            </>
                          )}
                        </TransformWrapper>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}

          <TextField
            id="hsn"
            label="HSN/SAC Code"
            value={hsn}
            onChange={setHsn}
            error={errors.hsn}
          />

          {type === "Goods" && (
            <>
              <TextField
                id="quantity"
                label="Minimum Quantity"
                value={quantity}
                onChange={setQuantity}
                error={errors.quantity}
              />
              {type === "Goods" ? (
                <Dropdown
                  label="Want Stock"
                  value={stock}
                  setValue={setStock}
                  options={stockoptions}
                  error={errors.stock}
                />
              ) : (
                <div className="grid gap-2">
                  <Label>Want Stock</Label>
                  <Input
                    value="Yes"
                    disabled
                    className="bg-gray-100 text-gray-600"
                  />
                </div>
              )}
            </>
          )}

          <Dropdown
            label="Unit"
            value={unit}
            setValue={setUnit}
            options={itemUnits}
            error={errors.unit}
          />
          <Dropdown
            label="Status"
            value={status}
            setValue={setStatus}
            options={statuses}
            error={errors.status}
          />
        </div>

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

/* 🔹 Reusable Components */
function TextField({ id, label, value, onChange, error }) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={id}>
        {label} <span className="text-red-500">*</span>
      </Label>
      <Input
        id={id}
        placeholder={`Enter ${label.toLowerCase()}`} // ✅ fixed
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}

function Dropdown({ label, value, setValue, options = [], error }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="grid gap-2">
      <Label>
        {label} <span className="text-red-500">*</span>
      </Label>
      <Popover open={open} onOpenChange={setOpen}>
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
                {options.map((opt, index) => {
                  const displayValue = opt?.name || opt;
                  const selected = value === displayValue;
                  return (
                    <CommandItem
                      key={index}
                      onSelect={() => {
                        setValue(displayValue);
                        setOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          selected ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {displayValue}
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}
