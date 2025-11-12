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
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { Check, Package, Settings, Pencil } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addDesign, updateDesign } from "@/redux/designSlice"; // temporary — change later to designSlice

export default function DesignForm({ open, onOpenChange, data }) {
  const items = useSelector((state) => state.items.data) || [];
  const itemGroup = useSelector((state) => state.itemGroup.data) || [];

  const suppliers = ["ABC Jewellers", "XYZ Traders", "Mohan Exports"];

  const isEditMode = Boolean(data);
  const dispatch = useDispatch();

  const [designno, setDesignNo] = useState("");
  const [itemgroup, setItemGroup] = useState("");
  const [item, setItem] = useState("");
  const [supplier, setSupplier] = useState("");
  const [supplierdesign, setSupplierDesign] = useState("");

  const [Gross, setGross] = useState("");
  const [Less, setLess] = useState("");
  const [Net, setNet] = useState("");

  useEffect(() => {
    const grossNum = parseFloat(Gross) || 0;
    const lessNum = parseFloat(Less) || 0;
    const net = grossNum - lessNum;

    setNet(net.toFixed(3));
  }, [Gross, Less]);

  const [narration, setNarration] = useState("");
  const [status, setStatus] = useState("");
  const [photo, setPhoto] = useState(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [errors, setErrors] = useState({});

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
    if (!item) newErrors.item = "Item is required";
    if (!supplier) newErrors.supplier = "Supplier is required";
    if (!supplierdesign)
      newErrors.supplierdesign = "Supplier Design is required";
    if (!Gross) newErrors.Gross = "Gross is required";
    if (!Less) newErrors.Less = "Less is required";
    if (!Net) newErrors.Net = "Net is required";
    if (!status) newErrors.status = "Status is required";
    if (!narration) newErrors.narration = "Status is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    if (data) {
      setDesignNo(data.designno || "");
      setItem(data.item || "");
      setSupplier(data.supplier || "");
      setSupplierDesign(data.supplierdesign || "");
      setGross(data.Gross || "");
      setLess(data.Less || "");
      setNet(data.Net || "");
      setNarration(data.narration || "");
      setStatus(data.status || "");
      setPhoto(data.photo || null);
    } else {
      setDesignNo(`DES-${Date.now().toString().slice(-4)}`);
      setItem("");
      setSupplier("");
      setSupplierDesign("");
      setGross("");
      setLess("");
      setNet("");
      setNarration("");
      setStatus("");
      setPhoto(null);
    }
  }, [data, open]);

  // 🔢 Generate sequential design number for each shortname
  const generateDesignNo = (shortname) => {
    // Get existing design numbers from localStorage
    const stored = JSON.parse(localStorage.getItem("designCounters")) || {};

    // Get current count for this shortname
    const currentCount = stored[shortname] || 0;

    // Increment the count
    const newCount = currentCount + 1;

    // Save updated count back to localStorage
    stored[shortname] = newCount;
    localStorage.setItem("designCounters", JSON.stringify(stored));

    // Format as 4-digit padded number (e.g., sona0001)
    const padded = newCount.toString().padStart(4, "0");
    return `${shortname}${padded}`;
  };

  const handleSave = () => {
    if (!validateForm()) return;

    const formData = {
      id: isEditMode ? data.id : Date.now(),
      itemgroup,
      item,
      designno,
      supplier,
      supplierdesign,
      Gross,
      Less,
      Net,
      narration,
      status,
      photo,
    };

    if (isEditMode) {
      dispatch(updateDesign({ id: data.id, updatedData: formData }));
    } else {
      dispatch(addDesign(formData));
    }

    // Reset
    setItem("");
    setSupplier("");
    setSupplierDesign("");
    setGross("");
    setLess("");
    setNet("");
    setNarration("");
    setStatus("");
    setPhoto(null);

    onOpenChange(false);
  };

  return (
    <Sheet onOpenChange={onOpenChange} open={open}>
      <SheetContent className="sm:max-w-[480px] overflow-y-auto">
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
                  {isEditMode ? "Edit Design" : "Create New Design"}
                </SheetTitle>
                <SheetDescription>
                  {isEditMode
                    ? "Modify the details below to update the design."
                    : "Fill in the details below to create a new design."}
                </SheetDescription>
              </div>
            </div>
            <Settings className="w-5 h-5 text-black mt-7 cursor-pointer" />
          </div>
        </SheetHeader>

        {/* 🧾 Form Fields */}
        <div className="mt-6 space-y-5">
          {/* Item Dropdown */}
          <div className="grid gap-2">
            <Label>
              Item <span className="text-red-500">*</span>
            </Label>
            <select
              value={item}
              onChange={(e) => {
                const selectedItem = items.find(
                  (i) => i.name === e.target.value
                );
                setItem(e.target.value);

                if (selectedItem) {
                  const groupName =
                    selectedItem.group || selectedItem.Group || "";
                  setItemGroup(groupName);

                  // ✅ Auto-generate design number using shortname
                  if (selectedItem.shortname) {
                    const newDesignNo = generateDesignNo(
                      selectedItem.shortname
                    );
                    setDesignNo(newDesignNo);
                  } else {
                    // fallback if no shortname
                    setDesignNo(`DES-${Date.now().toString().slice(-4)}`);
                  }
                } else {
                  setItemGroup("");
                  setDesignNo("");
                }
              }}
              className="border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Item</option>
              {items.map((i) => (
                <option key={i.id} value={i.name}>
                  {i.name}
                </option>
              ))}
            </select>

            {errors.item && (
              <p className="text-red-500 text-sm">{errors.item}</p>
            )}
          </div>

          {/* Supplier Dropdown */}
          <TextField
            id="supplier"
            label="Supplier "
            value={supplier}
            onChange={setSupplier}
            error={errors.supplier}
          />


          <TextField
            id="supplierdesign"
            label="Supplier Design"
            value={supplierdesign}
            onChange={setSupplierDesign}
            error={errors.supplierdesign}
          />
          <TextField
            id="Gross"
            label="Gross weight"
            value={Gross}
            onChange={setGross}
            error={errors.Gross}
          />
          <TextField
            id="Less"
            label="Less weight"
            value={Less}
            onChange={setLess}
            error={errors.Less}
          />
          <TextField
            id="Net"
            label="Net weight"
            value={Net}
            onChange={setNet}
            error={errors.Net}
          />
          <TextField
            id="narration"
            label="Narration"
            value={narration}
            onChange={setNarration}
            error={errors.narration}
          />

          {/* 📸 Photo Upload */}
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
              className="flex flex-col items-center justify-center w-80 h-70 max-w-lg p-5 mx-auto mt-2 text-center bg-white border-2 border-gray-300 border-dashed cursor-pointer rounded relative overflow-hidden hover:border-blue-400 transition"
            >
              {photo ? (
                <div className="relative w-full h-full group">
                  <img
                    src={photo}
                    alt="Preview"
                    className="absolute inset-0 w-full h-full object-cover rounded cursor-zoom-in group-hover:opacity-80 transition"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setPreviewOpen(true);
                    }}
                  />
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
                  <p className="mt-2 text-sm text-gray-500">
                    Click to upload or drag & drop
                  </p>
                  <p className="text-xs text-gray-400">image/* up to 2MB</p>
                </>
              )}
            </label>
          </div>

          {/* Status Dropdown */}
          <div className="grid gap-2">
            <Label>Status</Label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Status</option>
              {statuses.map((s, i) => (
                <option key={i} value={s}>
                  {s}
                </option>
              ))}
            </select>
            {errors.status && (
              <p className="text-red-500 text-sm">{errors.status}</p>
            )}
          </div>
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

/* 🔹 Reusable TextField */
function TextField({ id, label, value, onChange, error, readOnly = false }) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={id}>
        {label} <span className="text-red-500">*</span>
      </Label>
      <Input
        id={id}
        placeholder={`Enter ${label.toLowerCase()}`}
        value={value}
        readOnly={readOnly}
        className={`${readOnly ? "bg-gray-100 cursor-not-allowed" : ""}`}
        onChange={(e) => !readOnly && onChange(e.target.value)}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}
