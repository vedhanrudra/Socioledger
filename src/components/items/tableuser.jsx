"use client";

import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addItem, updateItem, deleteItem, setItems } from "@/redux/itemsSlice"; // ✅ Changed import
import ReusableTable from "@/components/common/ReusableTable";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, Pencil, Trash2 } from "lucide-react";
import Form from "@/components/common/Form";
import Filter from "@/components/common/ReuseFilter";

export default function TableUser() {
  const dispatch = useDispatch();

  const loading = useSelector((state) => state.items.loading); // ✅ items instead of voucher
  const items = useSelector((state) => state.items.list); // ✅
  const filter = useSelector((state) => state.items.filter); // ✅

  const [editData, setEditData] = React.useState(null);
  const [isFormOpen, setIsFormOpen] = React.useState(false);

  const filteredData = React.useMemo(() => {
    return items.filter((item) => {
      const matchesName = filter.name
        ? item.name.toLowerCase().includes(filter.name.toLowerCase())
        : true;
      const matchesType = filter.type ? item.type === filter.type : true;
      const matchesStatus = filter.status
        ? item.status === filter.status
        : true;
      return matchesName && matchesType && matchesStatus;
    });
  }, [items, filter]);

 const columns = React.useMemo(
  () => [
    { accessorKey: "group", header: "Group" },
    { accessorKey: "name", header: "Name" },
    { accessorKey: "type", header: "Type" },
    { accessorKey: "hsn", header: "HSN/SAC Code" },
    { accessorKey: "unit", header: "Unit" },

    // ✅ Want Stock field (was 'stock')
    {
      accessorKey: "wantStock",
      header: "Want Stock",
      cell: ({ row }) => (
        <span
          className={`px-2 py-1 text-xs font-semibold rounded-full ${
            row.getValue("wantStock") === "Yes"
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          {row.getValue("wantStock")}
        </span>
      ),
    },

    // ✅ Minimum Quantity
    {
      accessorKey: "minQty",
      header: "Min. Qty",
      cell: ({ row }) => <span>{row.getValue("minQty") || "-"}</span>,
    },

    // ✅ Photo (optional preview)
    {
      accessorKey: "photo",
      header: "Photo",
      cell: ({ row }) => {
        const file = row.getValue("photo");
        if (!file) return <span className="text-gray-400">No Photo</span>;

        // Handle both File objects and string URLs
        const src =
          typeof file === "string"
            ? file
            : URL.createObjectURL(file);

        return (
          <img
            src={src}
            alt="Item"
            className="w-10 h-10 rounded object-cover border"
          />
        );
      },
    },

    // ✅ Status field
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

    // ✅ Actions
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
              onClick={() => dispatch(deleteItem(row.original.id))}
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
  [dispatch]
);


  return (
    <ReusableTable
      columns={columns}
      data={filteredData}
      loading={loading}
      pageSize={10}
      emptyMessage="No items found."
      toolbarRight={
        <div className="flex items-center gap-3">
          <Filter />

          <Form
            open={isFormOpen}
            onOpenChange={(open) => {
              setIsFormOpen(open);
              if (!open) setEditData(null);
            }}
            data={editData}
            onSubmit={(formData) => {
              if (editData) {
                dispatch(updateItem(formData)); // ✅ Changed
              } else {
                dispatch(addItem({ id: Date.now(), ...formData })); // ✅ Changed
              }
              setIsFormOpen(false);
              setEditData(null);
            }}
          />
        </div>
      }
    />
  );
}
