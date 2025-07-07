import { useEffect, useState } from "react";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import { FiSearch } from "react-icons/fi";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { Link } from "react-router-dom";
const Dashboard = () => {
  const [comments, setComments] = useState([]);
  const [searchInput, setSearchInput] = useState(
    localStorage.getItem("searchInput") || ""
  );
  const [sortBy, setSortBy] = useState(localStorage.getItem("sortBy") || "");
  const [sortOrder, setSortOrder] = useState(
    localStorage.getItem("sortOrder") || ""
  );
  const [pageSize, setPageSize] = useState(
    parseInt(localStorage.getItem("pageSize")) || 10
  );
  const [page, setPage] = useState(parseInt(localStorage.getItem("page")) || 1);
  const [visiblePageStart, setVisiblePageStart] = useState(1);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/comments")
      .then((res) => res.json())
      .then((data) => setComments(data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    localStorage.setItem("searchInput", searchInput);
    localStorage.setItem("sortBy", sortBy);
    localStorage.setItem("sortOrder", sortOrder);
    localStorage.setItem("pageSize", pageSize);
    localStorage.setItem("page", page);
  }, [searchInput, sortBy, sortOrder, pageSize, page]);

  const handleSortDropdown = (field, order) => {
    setSortBy(order === "" ? "" : field);
    setSortOrder(order);
  };

  const filteredItems = comments.filter(
    (item) =>
      item.name.toLowerCase().includes(searchInput.toLowerCase()) ||
      item.email.toLowerCase().includes(searchInput.toLowerCase()) ||
      item.body.toLowerCase().includes(searchInput.toLowerCase())
  );

  const sorted = [...filteredItems].sort((a, b) => {
    if (!sortBy) return 0;
    const valA = a[sortBy];
    const valB = b[sortBy];
    if (valA < valB) return sortOrder === "ascending" ? -1 : 1;
    if (valA > valB) return sortOrder === "ascending" ? 1 : -1;
    return 0;
  });

  const totalPages = Math.ceil(sorted.length / pageSize);
  const paginated = sorted.slice((page - 1) * pageSize, page * pageSize);
  const startItem = (page - 1) * pageSize + 1;
  const endItem = Math.min(page * pageSize, sorted.length);

  const handlePageRange = (direction) => {
    if (direction === "next" && visiblePageStart + 2 <= totalPages) {
      setVisiblePageStart(visiblePageStart + 2);
    } else if (direction === "prev" && visiblePageStart - 2 >= 1) {
      setVisiblePageStart(visiblePageStart - 2);
    }
  };

  const visiblePages = [];
  for (
    let i = visiblePageStart;
    i < visiblePageStart + 2 && i <= totalPages;
    i++
  ) {
    visiblePages.push(i);
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {comments.length < 1 ? (
        <p className="text-center mt-10 text-xl text-red-500">Loading...</p>
      ) : (
        <>
          {/* Search & Sort */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-6 mb-5">
            <Link to="/profile" className="flex items-center">
              <MdOutlineKeyboardBackspace /> Back to profile
            </Link>
            {/* Sort Options */}
            <div className="flex flex-wrap gap-2">
              {["postId", "name", "email"].map((field) => (
                <select
                  key={field}
                  value={sortBy === field ? sortOrder : ""}
                  onChange={(e) => handleSortDropdown(field, e.target.value)}
                  className="px-3 py-1 border border-gray-300 rounded shadow-sm"
                >
                  <option value="">{`Sort ${
                    field[0].toUpperCase() + field.slice(1)
                  }`}</option>
                  <option value="ascending">Ascending</option>
                  <option value="descending">Descending</option>
                </select>
              ))}
            </div>

            {/* Search Input with Icon */}
            <div className="relative w-full max-w-md">
              <FiSearch className="absolute top-3 left-3 text-gray-400" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search name, email, comment"
                className="w-full pl-10 pr-4 py-2 border border-grey-400 bg-white rounded shadow"
              />
            </div>
          </div>

          {/* Table */}
          {filteredItems.length === 0 ? (
            <p className="text-center text-red-500 text-lg">
              No matching results found.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full border-l border-r">
                <thead>
                  <tr className="bg-blue-100 text-left text-sm sm:text-base">
                    <th className="px-4 py-2 font-semibold">Post ID</th>
                    <th className="px-4 py-2 font-semibold">Name</th>
                    <th className="px-4 py-2 font-semibold">Email</th>
                    <th className="px-4 py-2 font-semibold">Comment</th>
                  </tr>
                </thead>
                <tbody>
                  {paginated.map(({ id, postId, name, email, body }) => (
                    <tr key={id} className="border-t">
                      <td className="px-4 py-2">{postId}</td>
                      <td className="px-4 py-2">{name}</td>
                      <td className="px-4 py-2">{email}</td>
                      <td className="px-4 py-2">{body}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          <div className="mt-6 mb-8 flex flex-col sm:flex-row items-center justify-end gap-5">
            <div className="flex gap-2 items-center text-sm">
              <p>
                {startItem}-{endItem} of {sorted.length} items
              </p>
              <button
                onClick={() => handlePageRange("prev")}
                disabled={visiblePageStart === 1}
                className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
              >
                <GrFormPrevious />
              </button>
              {visiblePages.map((pg) => (
                <button
                  key={pg}
                  onClick={() => setPage(pg)}
                  className={`px-3 py-1 rounded ${
                    pg === page ? "bg-blue-600 text-white" : "bg-gray-200"
                  }`}
                >
                  {pg}
                </button>
              ))}
              <button
                onClick={() => handlePageRange("next")}
                disabled={visiblePageStart + 2 > totalPages}
                className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
              >
                <GrFormNext />
              </button>
            </div>

            {/* Page Size Selector */}
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(+e.target.value);
                setPage(1);
                setVisiblePageStart(1);
              }}
              className="border px-3 py-1 rounded shadow-sm"
            >
              <option value={10}>10 / page</option>
              <option value={50}>50 / page</option>
              <option value={100}>100 / page</option>
            </select>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
