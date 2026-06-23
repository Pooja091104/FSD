import axios from "axios";
import { useEffect, useState } from "react";


const MyAssetsWidget = () => {
  const [assets, setAssets] = useState([]);

  // SEARCH + FILTER + PAGINATION
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // RETURN STATE
  const [selectedItem, setSelectedItem] = useState(null);
  const [reason, setReason] = useState("");
  const [showModal, setShowModal] = useState(false);

  // SERVICE STATE
  const [serviceItem, setServiceItem] = useState(null);
  const [issueType, setIssueType] = useState("");
  const [description, setDescription] = useState("");
  const [serviceModal, setServiceModal] = useState(false);

  const token = localStorage.getItem("token");

  const config_details = {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  };

  // GET ALL ASSETS
  const getAllAssets = async () => {
    try {
      const assetsResponse = await axios.get(
        "http://localhost:8080/api/request/My-Assets",
        config_details
      );

      const returnedResponse = await axios.get(
        "http://localhost:8080/api/return/returned",
        config_details
      );

      const returnedAssetIds = returnedResponse.data.map(
        (item) => item.asset.assetId
      );

      const activeAssets = assetsResponse.data.filter(
        (item) =>
          (item.requestStatus === "PENDING" ||
            item.requestStatus === "APPROVED") &&
          !returnedAssetIds.includes(item.asset.assetId)
      );

      setAssets(activeAssets);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllAssets();
  }, []);

  useEffect(() => {
  setCurrentPage(1);
}, [search, statusFilter]);

  // ================= FILTER LOGIC =================
  const filteredAssets = assets.filter((item) => {
    const matchSearch =
      item.asset.assetName.toLowerCase().includes(search.toLowerCase()) ||
      item.asset.assetModel.toLowerCase().includes(search.toLowerCase());

    const matchStatus =
      statusFilter === "ALL"
        ? true
        : item.requestStatus === statusFilter;

    return matchSearch && matchStatus;
  });

  // ================= PAGINATION =================
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredAssets.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(filteredAssets.length / itemsPerPage);

  // ================= RETURN FUNCTIONS =================
  const openModal = (item) => {
    setSelectedItem(item);
    setReason("");
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedItem(null);
    setReason("");
    setShowModal(false);
  };

  const handleReturn = async () => {
    try {
      if (!selectedItem || !reason.trim()) {
        alert("Please enter return reason");
        return;
      }

      const payload = {
        assetId: selectedItem.asset.assetId,
        returnReason: reason,
      };

      await axios.post(
        "http://localhost:8080/api/return/add",
        payload,
        config_details
      );

      alert("Return request sent successfully");

      closeModal();
      getAllAssets();
    } catch (err) {
      console.log(err);
      alert("Return failed");
    }
  };

  // ================= SERVICE FUNCTIONS =================
  const openServiceModal = (item) => {
    setServiceItem(item);
    setIssueType("");
    setDescription("");
    setServiceModal(true);
  };

  const handleServiceRequest = async () => {
    try {
      if (!issueType || !description.trim()) {
        alert("Fill all service details");
        return;
      }

      const payload = {
        assetId: serviceItem.asset.assetId,
        issueType,
        description,
      };

      await axios.post(
        "http://localhost:8080/api/service/request",
        payload,
        config_details
      );

      alert("Service Request Created Successfully");

      setServiceModal(false);
      getAllAssets();
    } catch (err) {
      console.log(err);
      alert("Failed to create service request");
    }
  };

  return (
    <div className="container-fluid p-4">

      {/* HEADER + FILTERS */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>My Assets</h3>

        <div className="d-flex gap-2">
          <input
            type="text"
            className="form-control"
            placeholder="Search asset..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />

          <select
            className="form-control"
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="ALL">ALL</option>
            <option value="PENDING">PENDING</option>
            <option value="APPROVED">ASSIGNED</option>
            <option value="REJECTED">REJECTED</option>
          </select>
        </div>
      </div>

      {/* TABLE */}
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Request ID</th>
            <th>Asset Name</th>
            <th>Model</th>
            <th>Category</th>
            <th>Requested On</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {currentItems.length > 0 ? (
            currentItems.map((item) => (
              <tr key={item.requestId}>
                <td>{item.requestId}</td>
                <td>{item.asset.assetName}</td>
                <td>{item.asset.assetModel}</td>
                <td>{item.asset.category?.categoryName}</td>

                <td>
                  {item.createdAt
                    ? new Date(item.createdAt).toLocaleDateString()
                    : "-"}
                </td>

                <td>
                  {item.requestStatus === "PENDING" && (
                    <span className="badge bg-warning text-dark">PENDING</span>
                  )}
                  {item.requestStatus === "APPROVED" && (
                    <span className="badge bg-success">ASSIGNED</span>
                  )}
                  {item.requestStatus === "REJECTED" && (
                    <span className="badge bg-danger">REJECTED</span>
                  )}
                </td>

                <td>
                  {item.requestStatus === "APPROVED" && (
                    <>
                      <button
                        className="btn btn-danger btn-sm me-2"
                        onClick={() => openModal(item)}
                      >
                        Return
                      </button>

                      <button
                        className="btn btn-warning btn-sm"
                        onClick={() => openServiceModal(item)}
                      >
                        Service
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center">
                No Assets Found
              </td>
            </tr>
          )}
        </tbody>
      </table>

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
              currentPage === index + 1 ? "active" : ""
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

      {/* RETURN MODAL */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h4>Return Asset</h4>

            <p>
              <b>Asset:</b> {selectedItem?.asset.assetName}
            </p>

            <input
              className="form-control mb-3"
              placeholder="Return reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />

            <button className="btn btn-success me-2" onClick={handleReturn}>
              Submit
            </button>

            <button className="btn btn-secondary" onClick={closeModal}>
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* SERVICE MODAL */}
      {serviceModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h4>Service Request</h4>

            <p>
              <b>Asset:</b> {serviceItem?.asset.assetName}
            </p>

            <select
              className="form-control mb-2"
              value={issueType}
              onChange={(e) => setIssueType(e.target.value)}
            >
              <option value="">Select Issue</option>
              <option value="HARDWARE">HARDWARE</option>
              <option value="SOFTWARE">SOFTWARE</option>
            </select>

            <textarea
              className="form-control mb-3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe issue"
            />

            <button className="btn btn-primary me-2" onClick={handleServiceRequest}>
              Submit
            </button>

            <button
              className="btn btn-secondary"
              onClick={() => setServiceModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* MODAL CSS */}
      <style>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0,0,0,0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 999;
        }

        .modal-box {
          background: white;
          padding: 20px;
          border-radius: 10px;
          width: 400px;
        }
      `}</style>
    </div>
  );
};

export default MyAssetsWidget;