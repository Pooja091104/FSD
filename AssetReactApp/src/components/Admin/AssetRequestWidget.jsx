import { useEffect, useState } from "react";
import axios from "axios";

const AssetRequestWidget = () => {

  const [requests, setRequests] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  // FILTER STATES (unchanged addition)
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [searchTerm, setSearchTerm] = useState("");

  const size = 10;

  const token = localStorage.getItem("token");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  // LOAD DATA WITH PAGINATION
  useEffect(() => {
    fetchRequests(currentPage);
  }, [currentPage]);

  const fetchRequests = async (page = 0) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/request/getall/v2?page=${page}&size=${size}`,
        config
      );

      console.log("API RESPONSE:", response.data);

      setRequests(response.data.data);
      setTotalPages(response.data.totalPages);

    } catch (error) {
      console.error(error);
    }
  };

  // UPDATE STATUS
  const updateStatus = async (requestId, status) => {
    try {
      await axios.put(
        `http://localhost:8080/api/request/status/${requestId}?status=${status}`,
        {},
        config
      );

      fetchRequests(currentPage);

    } catch (error) {
      console.error(error);
    }
  };

  // SEND AUDIT
  const sendAuditRequest = async (requestId) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/audit/send/employee/${requestId}`,
        {},
        config
      );

      alert(response.data);

      fetchRequests(currentPage);

    } catch (error) {
      console.error(error);
      alert("Failed to send audit request");
    }
  };

  return (
    <div className="container-fluid">

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Asset Requests</h2>
      </div>

      {/* FILTER UI */}
      <div className="d-flex gap-3 mb-3">

        <select
          className="form-select w-25"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="ALL">All</option>
          <option value="APPROVED">Approved</option>
          <option value="REJECTED">Rejected</option>
          <option value="PENDING">Pending</option>
        </select>

        <input
          type="text"
          className="form-control w-25"
          placeholder="Search employee or asset"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

      </div>

      <table className="table table-hover align-middle">

        <thead className="table-dark">
          <tr>
            <th>Request Id</th>
            <th>Employee Name</th>
            <th>Asset Name</th>
            <th>Status</th>
            <th>Action</th>
            <th>Send Audit</th>
          </tr>
        </thead>

        <tbody>
          {requests.length > 0 ? (
            requests
              .filter((request) => {

                // ✅ SAFE STATUS CHECK
                const status = (request.requestStatus || "").toUpperCase();

                const matchesStatus =
                  statusFilter === "ALL" || status === statusFilter;

                // ✅ SAFE EMPLOYEE NAME CHECK
                const employeeName = (
                  request.employee?.fullName ||
                  request.employee?.name ||
                  request.employee?.employeeName ||
                  ""
                ).toLowerCase();

                const assetName = (request.asset?.assetName || "").toLowerCase();

                const search = searchTerm.toLowerCase();

                const matchesSearch =
                  employeeName.includes(search) ||
                  assetName.includes(search);

                return matchesStatus && matchesSearch;
              })
              .map((request) => (
                <tr key={request.requestId}>
                  <td>{request.requestId}</td>

                  <td>{request.employee?.fullName}</td>

                  <td>{request.asset?.assetName}</td>

                  <td>
                    <span
                      className={`badge ${
                        request.requestStatus === "APPROVED"
                          ? "bg-success"
                          : request.requestStatus === "REJECTED"
                          ? "bg-danger"
                          : "bg-warning text-dark"
                      }`}
                    >
                      {request.requestStatus}
                    </span>
                  </td>

                  <td>
                    <button
                      className="btn btn-success btn-sm me-2"
                      onClick={() =>
                        updateStatus(request.requestId, "APPROVED")
                      }
                    >
                      Approve
                    </button>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() =>
                        updateStatus(request.requestId, "REJECTED")
                      }
                    >
                      Reject
                    </button>
                  </td>

                  <td>
                    {request.requestStatus === "APPROVED" ? (
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() =>
                          sendAuditRequest(request.requestId)
                        }
                      >
                        Send Audit
                      </button>
                    ) : (
                      <span className="text-muted">-</span>
                    )}
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

      <nav className="mt-3">
        <ul className="pagination justify-content-center">

          <li className="page-item">
            <button
              className="page-link"
              disabled={currentPage === 0}
              onClick={() => setCurrentPage(prev => prev - 1)}
            >
              Previous
            </button>
          </li>

          {Array.from({ length: totalPages }).map((_, index) => (
            <li
              className={`page-item ${
                currentPage === index ? "active" : ""
              }`}
              key={index}
            >
              <button
                className="page-link"
                onClick={() => setCurrentPage(index)}
              >
                {index + 1}
              </button>
            </li>
          ))}

          <li className="page-item">
            <button
              className="page-link"
              disabled={currentPage === totalPages - 1}
              onClick={() => setCurrentPage(prev => prev + 1)}
            >
              Next
            </button>
          </li>

        </ul>
      </nav>

    </div>
  );
};

export default AssetRequestWidget;