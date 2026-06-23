import axios from "axios";
import { useEffect, useState } from "react";

const MyRequestsWidget = () => {
  const [requests, setRequests] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("ALL");

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    fetchRequests();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, filter]);

  const fetchRequests = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:8080/api/service/MyService",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setRequests(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const filteredRequests = requests.filter((req) => {
    const assetName = req.asset?.assetName?.toLowerCase() || "";

    const matchSearch = assetName.includes(search.toLowerCase());

    const matchFilter =
      filter === "ALL" || req.serviceStatus === filter;

    return matchSearch && matchFilter;
  });

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentRequests = filteredRequests.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(
    filteredRequests.length / itemsPerPage
  );

  const badgeClass = (status) => {
    switch (status) {
      case "OPEN":
        return "bg-warning text-dark";
      case "IN_PROGRESS":
        return "bg-info";
      case "COMPLETED":
        return "bg-success";
      default:
        return "bg-secondary";
    }
  };

  return (
    <div className="container-fluid p-4">
      <div className="card shadow-sm border-0 mb-3 rounded-4">
        <div className="card-body">
          <h4 className="mb-0">My Service Requests</h4>
        </div>
      </div>

      {/* SEARCH + FILTER */}
      <div className="row mb-4">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Search Asset..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="col-md-6">
          <select
            className="form-select"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="ALL">All</option>
            <option value="OPEN">Open</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="COMPLETED">Completed</option>
          </select>
        </div>
      </div>

      {/* TABLE */}
      <div className="table-responsive">
        <table className="table table-hover align-middle">
          <thead className="table-light">
            <tr>
              <th>ID</th>
              <th>Asset</th>
              <th>Issue Type</th>
              <th>Description</th>
              <th>Created</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {currentRequests.length > 0 ? (
              currentRequests.map((req) => (
                <tr key={req.serviceRequestId}>
                  <td>#{req.serviceRequestId}</td>

                  <td>{req.asset?.assetName}</td>

                  <td>{req.issueType}</td>

                  <td>{req.description}</td>

                  <td>
                    {req.createdAt
                      ? new Date(req.createdAt).toLocaleDateString()
                      : "-"}
                  </td>

                  <td>
                    <span
                      className={`badge ${badgeClass(
                        req.serviceStatus
                      )}`}
                    >
                      {req.serviceStatus}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">
                  No Requests Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="d-flex justify-content-center mt-4">
          <nav>
            <ul className="pagination">
              <li
                className={`page-item ${
                  currentPage === 1 ? "disabled" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() =>
                    setCurrentPage((prev) => prev - 1)
                  }
                >
                  Previous
                </button>
              </li>

              {[...Array(totalPages)].map((_, index) => (
                <li
                  key={index}
                  className={`page-item ${
                    currentPage === index + 1
                      ? "active"
                      : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() =>
                      setCurrentPage(index + 1)
                    }
                  >
                    {index + 1}
                  </button>
                </li>
              ))}

              <li
                className={`page-item ${
                  currentPage === totalPages
                    ? "disabled"
                    : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() =>
                    setCurrentPage((prev) => prev + 1)
                  }
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
};

export default MyRequestsWidget;