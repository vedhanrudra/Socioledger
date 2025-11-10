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
import { MoreVertical, Pencil, Trash2, Plus } from "lucide-react";
import Form from "@/components/items/FormItem";
import Filter from "@/components/common/ReuseFilter";
import { useSelector, useDispatch } from "react-redux";
import {
    startLoading,
    loadItemSuccess,
    deleteItem,
} from "@/redux/itemsSlice";

export default function Table() {
    const [editData, setEditData] = React.useState(null);
    const [isFormOpen, setIsFormOpen] = React.useState(false);
    const [deleteTarget, setDeleteTarget] = React.useState(null);
    const [confirmOpen, setConfirmOpen] = React.useState(false);

    const dispatch = useDispatch();
    const { data, loading, filters } = useSelector((state) => state.items);


    React.useEffect(() => {
        dispatch(startLoading());
        setTimeout(() => {
            const savedItems = JSON.parse(localStorage.getItem("itemsData")) || [];
            dispatch(loadItemSuccess(savedItems));
        }, 500);
    }, [dispatch]);


    const columns = React.useMemo(
        () => [
            { accessorKey: "group", header: "Group" },
            { accessorKey: "name", header: "Name" },
            { accessorKey: "type", header: "Type" },
            { accessorKey: "hsn", header: "HSN/SAC Code" },
            { accessorKey: "gst", header: "GST" },
            { accessorKey: "unit", header: "Unit" },
            {
                accessorKey: "stock",
                header: "Want Stock",
                cell: ({ row }) => (
                    <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${row.getValue("stock") === "Yes"
                                ? "bg-green-100 text-green-700"
                                : "bg-gray-100 text-gray-600"
                            }`}
                    >
                        {row.getValue("stock")}
                    </span>
                ),
            },
            {
                accessorKey: "status",
                header: "Status",
                cell: ({ row }) => {
                    const status = row.getValue("status");
                    const color =
                        status === "Active"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700";
                    return (
                        <span
                            className={`px-2 py-1 text-xs font-semibold rounded-full ${color}`}
                        >
                            {status}
                        </span>
                    );
                },
            },
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
            dispatch(deleteItem(deleteTarget.id));
            setConfirmOpen(false);
            setDeleteTarget(null);

            const updatedItems =
                data.filter((item) => item.id !== deleteTarget.id) || [];
            localStorage.setItem("itemsData", JSON.stringify(updatedItems));
        }
    };


    const filteredData = React.useMemo(() => {
        if (!filters || Object.keys(filters).length === 0) return data;

        return data.filter((item) => {
            return (
                (!filters.name ||
                    item.name?.toLowerCase().includes(filters.name.toLowerCase())) &&
                (!filters.group || item.group === filters.group) &&
                (!filters.type || item.type === filters.type) &&
                (!filters.gst || item.gst === filters.gst) &&
                (!filters.unit || item.unit === filters.unit) &&
                (!filters.status || item.status === filters.status) &&
                (!filters.wantStock || item.stock === filters.wantStock)
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
                  <div className="flex items-center space-x-2">
                    <Filter key="filter" />
                    <Button
                        key="addItem"
                        className="bg-blue-700 hover:bg-blue-500 text-white"
                        onClick={() => {
                            setEditData(null);
                            setIsFormOpen(true);
                        }}
                    >
                        <Plus className="w-4 h-4 mr-2" /> Add Item
                    </Button>
                  </div>
                ]}
                emptyMessage="No items found."
            />

            <Form
                open={isFormOpen}
                onOpenChange={(open) => {
                    setIsFormOpen(open);
                    if (!open) setEditData(null);
                }}
                data={editData}
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