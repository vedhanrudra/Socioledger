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
// import { useDispatch, useSelector } from "react-redux";
// import { Deleteuser } from "../store/userReducer";

function Tableuser() {
  // const userData = useSelector((state) => state.users);
  // const dispatch = useDispatch();

  const [filterText, setFilterText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("asc");
  const recordsPerPage = 5;

  // Sample data for demo
  const userData = [
    {
      id: 1,
      name: "T-shirt",
      description: "Cotton fabric",
      image: "/placeholder.png",
      combinations: [
        { color: "Red", size: "M", price: 250, stock: 10 },
        { color: "Blue", size: "L", price: 300, stock: 5 },
      ],
    },
    {
      id: 2,
      name: "Jeans",
      description: "Slim fit denim",
      image: "/placeholder.png",
      combinations: [{ color: "Black", size: "32", price: 800, stock: 15 }],
    },
  ];

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
      {/* Page Title */}
      <h2 className="text-4xl font-bold mb-6 text-center text-gray-800">
        Product List
      </h2>

      {/* Search + Add Product */}
      <div className="flex items-center justify-between mb-6">
        <input
          type="search"
          placeholder="Search Here"
          className="border border-gray-300 px-4 py-2 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none"
          value={filterText}
          onChange={(e) => {
            setFilterText(e.target.value);
            setCurrentPage(1);
          }}
        />
        <Link
          to="/create"
          className="bg-indigo-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          + Add Product
        </Link>
      </div>

      {/* Product Table */}
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <Table>
          <TableCaption>A list of your products.</TableCaption>
          <TableHeader className="bg-gray-100">
            <TableRow>
              <TableHead
                className="cursor-pointer select-none"
                onClick={handleSort}
              >
                ID{" "}
                <span className="text-gray-500 text-sm">
                  {sortOrder === "asc" ? "▲" : "▼"}
                </span>
              </TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Product Info</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {currentRecords.length > 0 ? (
              currentRecords.map((user) => (
                <TableRow key={user.id} className="hover:bg-gray-50">
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.description}</TableCell>
                  <TableCell>
                    <img
                      src={user.image || "/placeholder.png"}
                      alt={user.name}
                      className="w-20 h-20 object-cover rounded-lg border"
                    />
                  </TableCell>

                  {/* Nested Product Info Table */}
                  <TableCell>
                    {user.combinations?.length > 0 ? (
                      <div className="border rounded-lg">
                        <Table>
                          <TableHeader className="bg-gray-50">
                            <TableRow>
                              <TableHead>Colour</TableHead>
                              <TableHead>Size</TableHead>
                              <TableHead>Price</TableHead>
                              <TableHead>Qty</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {user.combinations.map((combo, index) => (
                              <TableRow key={index}>
                                <TableCell>{combo.color}</TableCell>
                                <TableCell>{combo.size}</TableCell>
                                <TableCell>{combo.price} ₹</TableCell>
                                <TableCell>{combo.stock}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    ) : (
                      <span className="text-gray-400">No combinations</span>
                    )}
                  </TableCell>

                  {/* Action Buttons */}
                  <TableCell className="text-center space-x-2">
                    <Link
                      to={`/edit/${user.id}`}
                      className="inline-flex items-center gap-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md transition"
                    >
                      <FiEdit /> Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="inline-flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md transition"
                    >
                      <MdDelete /> Delete
                    </button>
                    <Link
                      to={`/viewuser/${user.id}`}
                      className="inline-flex items-center gap-1 bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md transition"
                    >
                      <FaEye /> View
                    </Link>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-4">
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
            Showing{" "}
            <span className="font-semibold">{firstIndex + 1}</span> to{" "}
            <span className="font-semibold">
              {Math.min(lastIndex, sortedUsers.length)}
            </span>{" "}
            of{" "}
            <span className="font-semibold">{sortedUsers.length}</span> results
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

export default Tableuser;
