import axios from "axios";
import { useEffect, useState } from "react";

const ReturnedAssetsrequest = () => {
  const [assets, setAssets] = useState([]);

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const token = localStorage.getItem("token");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    const getReturnedAssets = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/return/returned",
          config
        );

        setAssets(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    getReturnedAssets();
  }, []);

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentAssets = assets.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(
    assets.length / itemsPerPage
  );

  return (
    <div className="container-fluid p-4">
      
        <h3 className="mb-0 p-3">Returned Assets</h3>

        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-bordered table-hover align-middle">
              <thead className="table-dark">
                <tr>
                  <th>Return ID</th>
                  <th>Asset Name</th>
                  <th>Model</th>
                  <th>Reason</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {currentAssets.length > 0 ? (
                  currentAssets.map((item) => (
                    <tr key={item.returnId}>
                      <td>{item.returnId}</td>

                      <td>{item.asset.assetName}</td>

                      <td>{item.asset.assetModel}</td>

                      <td>{item.returnReason}</td>

                      <td>
                        <span className="badge bg-success">
                          RETURNED
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center">
                      No Returned Assets Found
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
      </div>

  );
};

export default ReturnedAssetsrequest;