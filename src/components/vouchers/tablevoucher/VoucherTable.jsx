"use client";

import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addVoucher, updateVoucher, deleteVoucher, setVouchers } from "@/redux/voucherSlice";
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

const initialData = [
];

export default function VoucherTable() {
  const dispatch = useDispatch();
  
  const loading = useSelector((state) => state.voucher.loading);

  const [editData, setEditData] = React.useState(null);
  const [isFormOpen, setIsFormOpen] = React.useState(false);

 const vouchers = useSelector((state) => state.voucher.list);
const filter = useSelector((state) => state.voucher.filter);

const filteredData = React.useMemo(() => {
  return vouchers.filter((item) => {
    const matchesName = filter.name
      ? item.name.toLowerCase().includes(filter.name.toLowerCase())
      : true;
    const matchesType = filter.type ? item.type === filter.type : true;
    const matchesStatus = filter.status ? item.status === filter.status : true;
    return matchesName && matchesType && matchesStatus;
  });
}, [vouchers, filter]);

  
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
            className={`px-2 py-1 text-xs font-semibold rounded-full ${
              row.getValue("stock") === "Yes"
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
                onClick={() => dispatch(deleteVoucher(row.original.id))}
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
                dispatch(updateVoucher(formData));
              } else {
                dispatch(addVoucher({ id: Date.now(), ...formData }));
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
