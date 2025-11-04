import React, { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import AddItem from "../items/Additem";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import TableFilter from "../years/Filter";

// import { useDispatch, useSelector } from "react-redux";
// import { Deleteuser } from "../store/userReducer";

function TableYear() {
  // const userData = useSelector((state) => state.users);
  // const dispatch = useDispatch();

  const [filterText, setFilterText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("asc");
  const recordsPerPage = 5;

  // Sample data for demo
  const userData = [];

  const filteredUsers = (userData || []).filter((user) =>
    (user?.name || "").toLowerCase().includes(filterText.toLowerCase())
  );

  const sortedUsers = [...filteredUsers].sort((a, b) =>
    sortOrder === "asc" ? a.id - b.id : b.id - a.id
  );

  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const currentRecords = sortedUsers.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(sortedUsers.length / recordsPerPage);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const handleSort = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      console.log("Deleted ID:", id);
      // dispatch(Deleteuser({ id }));
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div></div>
        <div className = "flex items center gap-2">
          <TableFilter
            filterName={filterText}
            setFilterName={setFilterText}
            onApply={() => console.log("Apply clicked with:", filterText)}
            onClear={() => setFilterText("")}
          />
          <AddItem />
        </div>
      </div>

      {/* Product Table */}
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-100">
            <TableRow>
              <TableHead
                className="cursor-pointer select-none"
                onClick={handleSort}
              >
                Name{" "}
                <span className="text-gray-500 text-sm">
                  {sortOrder === "asc" ? "" : ""}
                </span>
              </TableHead>
              <TableHead
                onClick={handleSort}
                className="cursor-pointer select-none"
              >
                Start date{" "}
                <span className="text-gray-500 text-sm">
                  {sortOrder === "asc" ? "" : ""}
                </span>
              </TableHead>
              <TableHead>End Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {userData.length > 0 ? (
              userData.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.group}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.types}</TableCell>
                  <TableCell>{user.hsn}</TableCell>
                  <TableCell>{user.gst}</TableCell>
                  <TableCell>{user.unit}</TableCell>
                  <TableCell>{user.wantStock}</TableCell>
                  <TableCell>{user.status}</TableCell>
                  <TableCell>
                    <TableCell className="text-center">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="px-3 py-1 text-xl font-bold text-gray-600 hover:bg-gray-100 rounded-md">
                            ...
                          </button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end" className="w-32">
                          <DropdownMenuItem asChild>
                            <Link
                              to={`/edit/${user.id}`}
                              className="flex items-center gap-2 hover:text-blue-600"
                            >
                              <FiEdit className="text-blue-500" /> Edit
                            </Link>
                          </DropdownMenuItem>

                          <DropdownMenuItem
                            onClick={() => handleDelete(user.id)}
                            className="flex items-center gap-2 hover:text-red-600 text-red-500"
                          >
                            <MdDelete /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan="9" className="text-center py-6">
                  No products found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {sortedUsers.length > 0 && (
        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 mt-4 rounded-lg shadow-sm">
          <p className="text-sm text-gray-700">
            Showing <span className="font-semibold">{firstIndex + 1}</span> to{" "}
            <span className="font-semibold">
              {Math.min(lastIndex, sortedUsers.length)}
            </span>{" "}
            of <span className="font-semibold">{sortedUsers.length}</span>{" "}
            results
          </p>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className={`p-2 rounded-md border ${
                currentPage === 1
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-gray-100"
              }`}
            >
              <ChevronLeftIcon className="w-5 h-5" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => goToPage(i + 1)}
                className={`px-3 py-1 rounded-md text-sm font-medium ${
                  currentPage === i + 1
                    ? "bg-indigo-600 text-white"
                    : "bg-white hover:bg-gray-100"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`p-2 rounded-md border ${
                currentPage === totalPages
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-gray-100"
              }`}
            >
              <ChevronRightIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TableYear;
