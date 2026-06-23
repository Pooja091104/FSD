import React, { useEffect, useState } from "react";
import axios from "axios";

const BrowseAssets = () => {
  const [assets, setAssets] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedAsset, setSelectedAsset] = useState(null);
  
  // State for modal/card alerts and status
  const [statusMessage, setStatusMessage] = useState({ text: "", type: "" });

  // Fetch Available Assets
  const fetchAssets = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:8080/api/com/asset/available",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const formatted = res.data.map((a) => ({
        id: a.assetId,
        name: a.assetName,
        model: a.assetModel,
        category: a.category?.categoryName || "-",
        status: a.status,
        value: a.assetValue,
        quantity: a.quantity,
        imagePath: a.imagePath || null,
      }));
      console.log(formatted);
      setAssets(formatted);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAssets();
  }, []);

  // Request Asset
  const handleRequest = async (assetId) => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        `http://localhost:8080/api/request/request/${assetId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Set Success Message
      setStatusMessage({ text: "Request Sent Successfully!", type: "success" });
    } catch (err) {
      console.log(err);
      // Set Error Message
      setStatusMessage({ 
        text: err?.response?.data || "Request Failed", 
        type: "danger" 
      });
    }

    // Auto-clear message after 3 seconds
    setTimeout(() => {
      setStatusMessage({ text: "", type: "" });
    }, 3000);
  };

  // Open Details Modal
  const openDetails = (assetId) => {
    const asset = assets.find((a) => a.id === assetId);
    setSelectedAsset(asset);
    setStatusMessage({ text: "", type: "" }); // Clear messages on opening new modal
  };

  // Search Filter
  const filteredAssets = assets.filter((asset) =>
    asset.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container-fluid py-3">
      <h3 className="mb-4">Browse Available Assets</h3>

      {/* Global Card Level Status Message (Shows when modal is closed) */}
      {!selectedAsset && statusMessage.text && (
        <div className={`alert alert-${statusMessage.type} text-center`} role="alert">
          {statusMessage.text}
        </div>
      )}

      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search assets..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Asset Cards */}
      <div className="row">
        {filteredAssets.length === 0 ? (
          <div className="text-center">
            <h5>No Assets Found</h5>
          </div>
        ) : (
          filteredAssets.map((asset) => (
            <div className="col-lg-4 col-md-6 mb-4" key={asset.id}>
              <div
                className="card shadow-sm h-100 border-0"
                style={{ borderRadius: "15px" }}
              >
                <img
                  src={
                    asset.imagePath
                      ? `/asset-images/${asset.imagePath}`
                      : "/asset-images/AssetLaptop.jpg"
                  }
                  alt={asset.name}
                  className="card-img-top"
                  style={{
                    height: "220px",
                    objectFit: "cover",
                    borderTopLeftRadius: "15px",
                    borderTopRightRadius: "15px",
                  }}
                />

                <div className="card-body">
                  <h5 className="card-title">{asset.name}</h5>

                  <p className="text-muted mb-2">
                    Category: {asset.category}
                  </p>

                  <span
                    className={`badge ${asset.status === "AVAILABLE"
                      ? "bg-success"
                      : "bg-danger"
                      }`}
                  >
                    {asset.status}
                  </span>

                  <div className="mt-3">
                    <strong>Value:</strong> ₹{asset.value}
                  </div>

                  <div className="mt-2">
                    <strong>Quantity:</strong> {asset.quantity}
                  </div>

                  <div className="d-flex gap-2 mt-4">
                    <button
                      className="btn btn-outline-primary flex-fill"
                      onClick={() => openDetails(asset.id)}
                    >
                      View Details
                    </button>

                    <button
                      className="btn btn-primary flex-fill"
                      onClick={() => handleRequest(asset.id)}
                      disabled={asset.quantity <= 0}
                    >
                      Request
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Details Modal */}
      {selectedAsset && (
        <div
          className="modal show d-block"
          style={{
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {selectedAsset.name}
                </h5>

                <button
                  className="btn-close"
                  onClick={() => setSelectedAsset(null)}
                ></button>
              </div>

              <div className="modal-body">
                {/* Modal Level Message Alert */}
                {statusMessage.text && (
                  <div className={`alert alert-${statusMessage.type} text-center mb-3`} role="alert">
                    {statusMessage.text}
                  </div>
                )}

                <img
                  src={
                    selectedAsset.imagePath
                      ? `/asset-images/${selectedAsset.imagePath}`
                      : "/asset-images/AssetLaptop.jpg"
                  }
                  alt={selectedAsset.name}
                  width="150"
                  className="mb-3"
                />
                <p>
                  <strong>Asset ID:</strong>{" "}
                  {selectedAsset.id}
                </p>

                <p>
                  <strong>Asset Name:</strong>{" "}
                  {selectedAsset.name}
                </p>

                <p>
                  <strong>Asset Model:</strong>{" "}
                  {selectedAsset.model}
                </p>

                <p>
                  <strong>Category:</strong>{" "}
                  {selectedAsset.category}
                </p>

                <p>
                  <strong>Status:</strong>{" "}
                  {selectedAsset.status}
                </p>

                <p>
                  <strong>Asset Value:</strong>{" "}
                  ₹{selectedAsset.value}
                </p>
                <p>
                  <strong>Quantity:</strong>{" "}
                  {selectedAsset.quantity}
                </p>
              </div>

              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setSelectedAsset(null)}
                >
                  Close
                </button>

                <button
                  className="btn btn-primary"
                  onClick={() => {
                    handleRequest(selectedAsset.id);
                    // Notice: Removed `setSelectedAsset(null)` here so the 
                    // user can actually read the success/error message inside the modal!
                  }}
                  disabled={selectedAsset.quantity <= 0}
                >
                  Request Asset
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BrowseAssets;