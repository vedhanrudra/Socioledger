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
import { MoreVertical, Pencil, Trash2, Plus, CheckCircle } from "lucide-react";
import DesignForm from "@/components/items/DesignForm";
import Filter from "@/components/common/ReuseFilter";
import { useSelector, useDispatch } from "react-redux";
import {
  startLoading,
  loadDesignSuccess,
  deleteDesign,
} from "@/redux/designSlice";

export default function TableDesign() {
  const [editData, setEditData] = React.useState(null);
  const [isFormOpen, setIsFormOpen] = React.useState(false);
  const [deleteTarget, setDeleteTarget] = React.useState(null);
  const [confirmOpen, setConfirmOpen] = React.useState(false);

  const dispatch = useDispatch();
  const { data, loading, filters } = useSelector((state) => state.design);

  // ✅ Load designs from localStorage
  React.useEffect(() => {
    dispatch(startLoading());
    setTimeout(() => {
      const savedDesigns = JSON.parse(localStorage.getItem("designData")) || [];
      dispatch(loadDesignSuccess(savedDesigns));
    }, 300);
  }, [dispatch]);

  // ✅ Table columns
  const columns = React.useMemo(
    () => [
      { accessorKey: "itemgroup", header: "Item Group" },
      { accessorKey: "item", header: "Item" },
      { accessorKey: "designno", header: "Design No" }, 
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
          const status = row.getValue("status");
          const isActive = status === "Active";
          return (
            <div className="flex justify-center">
              {isActive ? (
                <CheckCircle className="w-5 h-5 text-green-500" />
              ) : (
                <span className="text-gray-400">✖</span>
              )}
            </div>
          );
        },
      },
      { accessorKey: "supplier", header: "Supplier" },
      { accessorKey: "SupplierDesignNumber", header: "Supplier Design Number" },
      { accessorKey: "narration", header: "Narration" },    
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
                <MoreVertical className="h-4 w-4 text-gray-700" />
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

  // ✅ Delete confirmation handler
  const handleConfirmDelete = () => {
    if (deleteTarget) {
      dispatch(deleteDesign(deleteTarget.id));
      const updatedDesigns =
        data.filter((design) => design.id !== deleteTarget.id) || [];
      localStorage.setItem("designData", JSON.stringify(updatedDesigns));
      dispatch(loadDesignSuccess(updatedDesigns));
      setConfirmOpen(false);
      setDeleteTarget(null);
    }
  };

  // ✅ Filter handling
  const filteredData = React.useMemo(() => {
    if (!filters || Object.keys(filters).length === 0) return data;

    return data.filter((item) => {
      return (
        (!filters.item ||
          item.item?.toLowerCase().includes(filters.item.toLowerCase())) &&
        (!filters.supplier || item.supplier === filters.supplier) &&
        (!filters.status || item.status === filters.status)
      );
    });
  }, [data, filters]);

  return (
    <>
      <ReusableTable
        columns={columns}
        data={filteredData}
        loading={loading}
        pageSize={10}
        toolbarRight={[
          <div className="flex items-center space-x-2">
            <Filter key="filter" />
            <Button
              key="addDesign"
              className="bg-blue-700 hover:bg-blue-500 text-white"
              onClick={() => {
                setEditData(null);
                setIsFormOpen(true);
              }}
            >
              <Plus className="w-4 h-4 mr-2" /> Add Design
            </Button>
          </div>,
        ]}
        emptyMessage="No designs found."
      />

      {/* ✅ Design Form */}
      <DesignForm
        open={isFormOpen}
        onOpenChange={(open) => {
          setIsFormOpen(open);
          if (!open) setEditData(null);
        }}
        data={editData}
      />

      {/* ✅ Delete Confirmation Dialog */}
      <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Confirmation</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete{" "}
              <strong>{deleteTarget?.item}</strong>? This action cannot be undone.
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
