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
import { addGroup, updateGroup } from "@/redux/itemGroupsSlice";

export default function GroupForm({ open, onOpenChange, data }) {
    const isEditMode = Boolean(data);

    const [name, setName] = useState("");
    const [shortname, setShortName] = useState("");
    const [decimalnumber, setDecimalNumber] = useState("")
    const [errors, setErrors] = useState({});

    const dispatch = useDispatch();


    const validateForm = () => {
        const newErrors = {};
        if (!name) newErrors.name = "Group Name is required";
        if (!shortname) newErrors.shortname = "ShortName is required";
        if(!decimalnumber) newErrors.decimalnumber = "Decimal Number is required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    useEffect(() => {
        if (data) {
            setName(data.name || "");
            setShortName(data.shortname || "");
            setDecimalNumber(data.decimalnumber || "");
        } else {
            setName("");
            setShortName("");
            setDecimalNumber("");
        }
    }, [data, open]);


    const handleSave = () => {
        if (!validateForm()) return;

        const formData = {
            id: isEditMode ? data.id : Date.now(),
            name,
            shortname,
            decimalnumber
        };

        if (isEditMode) {
            dispatch(updateGroup({ id: formData.id, updatedData: formData }));
        } else {
            dispatch(addGroup(formData));
        }

        onOpenChange(false);
    };

    return (
        <Sheet onOpenChange={onOpenChange} open={open}>
            {!isEditMode && (
                <SheetTrigger asChild>
                    <Button className="flex items-center gap-2 bg-blue-700 hover:bg-blue-500 py-2 px-4 text-white font-semibold rounded transition">
                        <Package className="w-5 h-5" />
                        Add Item Group
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
                                    {isEditMode ? "Edit Item Group" : "Create New Item Group"}
                                </SheetTitle>
                                <SheetDescription>
                                    {isEditMode
                                        ? "Modify the details below to update the item Group."
                                        : "Fill in the details below to create a new item Group."}
                                </SheetDescription>
                            </div>
                        </div>

                        <Settings className="w-5 h-5 text-black mt-7 cursor-pointer" />
                    </div>
                </SheetHeader>


                <div className="mt-6 space-y-5">
                    <div className="grid gap-2">
                        <Label htmlFor="name">
                            Group Name <span className="text-red-500">*</span>
                        </Label>
                        <Input
                            id="name"
                            placeholder="Enter Group name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        {errors.name && (
                            <p className="text-red-500 text-sm">{errors.name}</p>
                        )}
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="shortname">
                            Short Name <span className="text-red-500">*</span>
                        </Label>
                        <Input
                            id="shortname"
                            placeholder="Enter short name"
                            value={shortname}
                            onChange={(e) => setShortName(e.target.value)}
                        />
                        {errors.shortname && (
                            <p className="text-red-500 text-sm">{errors.shortname}</p>
                        )}
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="decimalnumber">
                            Decimal Number <span className="text-red-500">*</span>
                        </Label>
                        <Input
                            id="decimalnumber"
                            placeholder="Enter decimal number"
                            value={decimalnumber}
                            onChange={(e) => setDecimalNumber(e.target.value)}
                        />
                        {errors.decimalnumber && (
                            <p className="text-red-500 text-sm">{errors.decimalnumber}</p>
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