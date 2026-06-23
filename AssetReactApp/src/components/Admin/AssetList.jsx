import React, { useEffect, useState } from "react";
import axios from "axios";

const AssetList = () => {

    const [assets, setAssets] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [deleteMsg, setDeleteMsg] = useState("");

    // NEW SORT STATE
    const [sortOrder, setSortOrder] = useState("");

    const size = 10;

    const token = localStorage.getItem("token");

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    // GET ALL ASSETS
    const fetchAssets = async (page = 0) => {
        try {
            const response = await axios.get(
                `http://localhost:8080/api/com/Asset/all/v2?page=${page}&size=${size}`,
                config
            );

            console.log("API RESPONSE:", response.data);

            setAssets(response.data.data);
            setTotalPages(response.data.totalPages);

        } catch (error) {
            console.log("Fetch error:", error);
        }
    };

    useEffect(() => {
        fetchAssets(currentPage);
    }, [currentPage]);

    // DELETE
    const onDelete = async (id) => {
        try {
            await axios.delete(
                `http://localhost:8080/api/com/asset/soft-delete/${id}`,
                config
            );

            setDeleteMsg("Asset deleted successfully");

            fetchAssets(currentPage);

        } catch (err) {
            console.log(err);
            setDeleteMsg("Delete failed");
        }
    };

    // SORT LOGIC
    const sortedAssets = [...assets].sort((a, b) => {
        if (sortOrder === "asc") {
            return a.quantity - b.quantity;
        }
        if (sortOrder === "desc") {
            return b.quantity - a.quantity;
        }
        return 0;
    });

    return (
        <div className="col-md-12">

            <h4>Asset List</h4>

            {deleteMsg && (
                <div className="alert alert-info">{deleteMsg}</div>
            )}

            {/* SORT DROPDOWN */}
            <div className="row mb-3">
                <div className="col-md-3">
                    <select
                        className="form-select"
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value)}
                    >
                        <option value="">Sort By Quantity</option>
                        <option value="asc">
                            Quantity Low To High
                        </option>
                        <option value="desc">
                            Quantity High To Low
                        </option>
                    </select>
                </div>
            </div>

            {/* TABLE */}
            <table className="table table-bordered table-hover">
                <thead className="table-dark">
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Model</th>
                        <th>Status</th>
                        <th>Value</th>
                        <th>Qty</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {sortedAssets.length > 0 ? (
                        sortedAssets.map(asset => (
                            <tr key={asset.assetId}>
                                <td>{asset.assetId}</td>
                                <td>{asset.assetName}</td>
                                <td>{asset.assetModel}</td>
                                <td>{asset.status}</td>
                                <td>{asset.assetValue}</td>
                                <td>{asset.quantity}</td>

                                <td>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => onDelete(asset.assetId)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7" className="text-center">
                                No Data Found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* PAGINATION */}
            <nav>
                <ul className="pagination justify-content-center">

                    <li className="page-item">
                        <button
                            className="page-link"
                            disabled={currentPage === 0}
                            onClick={() => setCurrentPage(prev => prev - 1)}
                        >
                            Prev
                        </button>
                    </li>

                    {Array.from({ length: totalPages }).map((_, index) => (
                        <li className="page-item" key={index}>
                            <button
                                className={`page-link ${currentPage === index ? "active" : ""}`}
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

export default AssetList;