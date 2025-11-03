import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal, Trash2 } from "lucide-react";
function ItemFilter({itemName, setItemName, onApply, onClear}) {
  return (
    <>
      <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4" />
          Filter
        </Button>
      </DialogTrigger>
    </>
  );
}

export default ItemFilter
