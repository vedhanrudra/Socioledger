"use client";
import React, { useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addGroup, updateGroup, deleteGroup } from "@/redux/itemGroupsSlice";
import ReusableTable from "@/components/common/ReusableTable";
import { Button } from "@/components/ui/button";
import { MoreVertical, Pencil, Trash2 } from "lucide-react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";

export default function TableGroup() {
  const dispatch = useDispatch();
  const groups = useSelector((s) => s.itemGroups.list);
  const [newName, setNewName] = useState("");
  const [editData, setEditData] = useState(null);

  const columns = useMemo(() => [
    { accessorKey: "name", header: "Group Name" },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreVertical className="w-4 h-4 text-gray-700" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => setEditData(row.original)}
              className="text-blue-600"
            >
              <Pencil className="w-4 h-4 mr-1" /> Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => dispatch(deleteGroup(row.original.id))}
              className="text-red-600"
            >
              <Trash2 className="w-4 h-4 mr-1" /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ], [dispatch]);

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center gap-3">
        <Input
          placeholder="Add new group..."
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          className="w-60"
        />
        <Button
          onClick={() => {
            if (!newName.trim()) return;
            dispatch(addGroup({ id: Date.now(), name: newName }));
            setNewName("");
          }}
          className="bg-blue-600 text-white"
        >
          Add Group
        </Button>
      </div>

      <ReusableTable
        columns={columns}
        data={groups}
        pageSize={10}
        emptyMessage="No groups found."
      />
    </div>
  );
}
