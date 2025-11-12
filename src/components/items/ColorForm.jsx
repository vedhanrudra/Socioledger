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
  SheetTrigger,
  
} from "@/components/ui/sheet";
import { Package, Settings, Pencil } from "lucide-react";
import { useDispatch } from "react-redux";
import { addColor, updateColor } from "@/redux/colorSlice"; 

export default function ColorForm({ open, onOpenChange, data }) {
  const isEditMode = Boolean(data);

  const [name, setName] = useState("");
  const [RealTouch, setRealTouch] = useState("");
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();

  const validateForm = () => {
    const newErrors = {};
    if (!name) newErrors.name = "Unit name is required";
    if (!RealTouch) newErrors.RealTouch = "RealTouch is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    if (data) {
      setName(data.name || "");
      setRealTouch(data.RealTouch || "");
    } else {
      setName("");
      setRealTouch("");
    }
  }, [data, open]);

  const handleSave = () => {
    if (!validateForm()) return;

    const formData = {
      id: isEditMode ? data.id : Date.now(),
      name,
      RealTouch,
    };

    if (isEditMode) {
      dispatch(updateColor({ id: formData.id, updatedData: formData }));
    } else {
      dispatch(addColor(formData));
    }

    onOpenChange(false);
  };

  return (
    <Sheet onOpenChange={onOpenChange} open={open}>
      {!isEditMode && (
        <SheetTrigger asChild>
          <Button className="flex items-center gap-2 bg-blue-700 hover:bg-blue-500 py-2 px-4 text-white font-semibold rounded transition">
            <Package className="w-5 h-5" />
            Add Unit
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
                  {isEditMode ? "Edit Unit" : "Create New Unit"}
                </SheetTitle>
                <SheetDescription>
                  {isEditMode
                    ? "Modify the details below to update the unit."
                    : "Fill in the details below to create a new unit."}
                </SheetDescription>
              </div>
            </div>

            <Settings className="w-5 h-5 text-black mt-7 cursor-pointer" />
          </div>
        </SheetHeader>

        <div className="mt-6 space-y-5">
          <div className="grid gap-2">
            <Label htmlFor="name">
              Name<span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name}</p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="RealTouch">
              Real Touch <span className="text-red-500">*</span>
            </Label>
            <Input
              id="RealTouch"
              placeholder="Enter short name"
              value={RealTouch}
              onChange={(e) => setRealTouch(e.target.value)}
            />
            {errors.RealTouch && (
              <p className="text-red-500 text-sm">{errors.RealTouch}</p>
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
