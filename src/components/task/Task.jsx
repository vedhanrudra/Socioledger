import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusCircle, ClipboardList } from "lucide-react";
import { SiteHeader } from "../../layout/site-header";

function Task() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <main className="p-6">
        {/* Page Title */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2"></div>

          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-2">
            <PlusCircle className="w-4 h-4" />
            Add Task
          </Button>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <Input
            type="text"
            placeholder="Search tasks..."
            className="max-w-md border-gray-300 focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Task Table or Empty State */}
        <div className="bg-white border rounded-xl shadow-sm p-6 text-center text-gray-500">
          <p>No tasks available yet.</p>
          <p className="text-sm mt-1">Click “Add Task” to create a new one.</p>
        </div>
      </main>
    </div>
  );
}

export default Task;
