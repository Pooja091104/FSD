import axios from "axios";
import { useEffect, useState } from "react";

const ReturnAssets = () => {

    const [returns, setReturns] = useState([]);
    const [successMsg, setSuccessMsg] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const token = localStorage.getItem("token");

    const getPendingReturns = async () => {
        try {

            const response = await axios.get(
                "http://localhost:8080/api/return/pending",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setReturns(response.data);

        } catch (err) {
            console.log(err);
            setErrorMsg("Failed to fetch return requests");
        }
    };

    useEffect(() => {
        getPendingReturns();
    }, []);

    const approveReturn = async (id) => {

        try {

            await axios.put(
                `http://localhost:8080/api/return/approve/${id}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setSuccessMsg("Return Approved Successfully");

            setReturns(
                returns.filter(
                    item => item.returnId !== id
                )
            );

        } catch (err) {
            console.log(err);
            setErrorMsg("Approval Failed");
        }
    };

    return (
  <div className="container-fluid p-4">

    <h2 className="mb-4">Return Requests</h2>

    {successMsg && (
      <div className="alert alert-success">
        {successMsg}
      </div>
    )}

    {errorMsg && (
      <div className="alert alert-danger">
        {errorMsg}
      </div>
    )}


      

        <table className="table ">
          <thead className="table-dark">
            <tr>
              <th>Return ID</th>
              <th>Employee</th>
              <th>Asset</th>
              <th>Reason</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {returns.map((item) => (
              <tr key={item.returnId}>
                <td>{item.returnId}</td>
                <td>{item.employee?.fullName}</td>
                <td>{item.asset?.assetName}</td>
                <td>{item.returnReason}</td>
                <td>
                  <span className="badge bg-warning text-dark">
                    {item.returnStatus}
                  </span>
                </td>
                <td>
                  <button
                    className="btn btn-success btn-sm"
                    onClick={() =>
                      approveReturn(item.returnId)
                    }
                  >
                    Approve
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>

      </div>


  
);
};

export default ReturnAssets;