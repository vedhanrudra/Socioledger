"use client";

import * as React from "react";
import ReusableTable from "@/components/common/ReusableTable";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogFooter,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogCancel,
    AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { MoreVertical, Pencil, Trash2 } from "lucide-react";
import UnitForm from "@/components/items/FormUnit";
import Filter from "@/components/common/ReuseFilter";
import { useSelector, useDispatch } from "react-redux";
import {
    startLoading,
    loadItemUnitSuccess,
    deleteUnit,
} from "@/redux/itemUnitSlice";

export default function UnitTable() {
    const [editData, setEditData] = React.useState(null);
    const [isFormOpen, setIsFormOpen] = React.useState(false);
    const [deleteTarget, setDeleteTarget] = React.useState(null);
    const [confirmOpen, setConfirmOpen] = React.useState(false);

    const dispatch = useDispatch();
    const { data, loading, filters } = useSelector((state) => state.itemUnit);

    
    React.useEffect(() => {
        dispatch(startLoading());
        setTimeout(() => {
            const savedUnits = JSON.parse(localStorage.getItem("itemUnitData")) || [];
            dispatch(loadItemUnitSuccess(savedUnits));
        }, 500);
    }, [dispatch]);

    
    const columns = React.useMemo(
        () => [
            { accessorKey: "name", header: "Unit Name" },
            { accessorKey: "shortname", header: "Short Name" },
            {
                id: "actions",
                header: "Actions",
                cell: ({ row }) => (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="hover:bg-gray-100 focus:ring-2 focus:ring-blue-200"
                            >
                                <MoreVertical className="h-4 w-4 text-black" />
                            </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent
                            align="end"
                            className="w-36 shadow-md border border-gray-100"
                        >
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                onClick={() => {
                                    setEditData(row.original);
                                    setIsFormOpen(true);
                                }}
                                className="flex items-center gap-2 cursor-pointer hover:bg-blue-50 text-blue-600"
                            >
                                <Pencil className="w-4 h-4 text-blue-600" />
                                <span>Edit</span>
                            </DropdownMenuItem>

                            <DropdownMenuItem
                                onClick={() => {
                                    setDeleteTarget(row.original);
                                    setConfirmOpen(true);
                                }}
                                className="flex items-center gap-2 cursor-pointer hover:bg-red-50 text-red-600"
                            >
                                <Trash2 className="w-4 h-4 text-red-500" />
                                <span>Delete</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                ),
            },
        ],
        []
    );

    
    const handleConfirmDelete = () => {
        if (deleteTarget) {
            dispatch(deleteUnit(deleteTarget.id));
            setConfirmOpen(false);
            setDeleteTarget(null);

            const updatedUnits =
                data.filter((unit) => unit.id !== deleteTarget.id) || [];
            localStorage.setItem("itemUnitData", JSON.stringify(updatedUnits)); // ✅ Corrected key
        }
    };

    
    const filteredData = React.useMemo(() => {
        if (!filters || Object.keys(filters).length === 0) return data;

        return data.filter((unit) => {
            return (
                (!filters.name ||
                    unit.name?.toLowerCase().includes(filters.name.toLowerCase())) &&
                (!filters.shortname ||
                    unit.shortname?.toLowerCase().includes(filters.shortname.toLowerCase()))
            );
        });
    }, [data, filters]);

    
    return (
        <>
            <ReusableTable
                columns={columns}
                data={filteredData}
                loading={loading}
                pageSize={15}
                toolbarRight={[
                     <div className="flex items-center gap-3">
                    <Filter key="filter" />
                    <UnitForm
                        key="unitForm"
                        open={isFormOpen}
                        onOpenChange={(open) => {
                            setIsFormOpen(open);
                            if (!open) setEditData(null);
                        }}
                        data={editData}
                    />
                </div>
                ]}
                emptyMessage="item unit not found."
            />

            
            <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete Confirmation</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to delete{" "}
                            <strong>{deleteTarget?.name}</strong>? This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setConfirmOpen(false)}>
                            Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleConfirmDelete}
                            className="bg-red-600 hover:bg-red-500 text-white"
                        >
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}