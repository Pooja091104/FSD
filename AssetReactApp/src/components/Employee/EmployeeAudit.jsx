import axios from "axios";
import { useEffect, useState } from "react";

const EmployeeAudit = () => {

    const [audits, setAudits] = useState([]);
    const [selectedAudit, setSelectedAudit] = useState(null);

    const [auditStatus, setAuditStatus] = useState("");
    const [remarks, setRemarks] = useState("");

    const token = localStorage.getItem("token");
    const employeeId = localStorage.getItem("employeeId") || 6;

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    const getMyAudits = async () => {
        try {
            const response = await axios.get(
                `http://localhost:8080/api/audit/employee/${employeeId}`,
                config
            );

            setAudits(response.data);

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getMyAudits();
    }, []);

    const openForm = (audit) => {
        setSelectedAudit(audit);
        setAuditStatus("");
        setRemarks("");
    };

    const submitAudit = async () => {

        if (!auditStatus) {
            alert("Please select status");
            return;
        }

        try {

            const body = {
                auditStatus,
                remarks
            };

            await axios.put(
                `http://localhost:8080/api/audit/${selectedAudit.auditId}`,
                body,
                config
            );

            alert("Audit submitted successfully");

            setSelectedAudit(null);
            getMyAudits();

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="container-fluid py-4">

            

                <div className="card-header bg-primary text-white">
                    <h3 className="mb-0">My Audit Requests</h3>
                </div>

                <div className="card-body">

                    <div className="table-responsive">

                        <table className="table">

                            <thead className="table-dark">
                                <tr>
                                    <th>Audit ID</th>
                                    <th>Asset Name</th>
                                    <th>Audit Date</th>
                                    <th>Status</th>
                                    <th>Remarks</th>
                                    <th>Action</th>
                                </tr>
                            </thead>

                            <tbody>

                                {audits.length > 0 ? (
                                    audits.map((audit) => (

                                        <tr key={audit.auditId}>

                                            <td>{audit.auditId}</td>

                                            <td>
                                                {audit.assetName ||
                                                    audit.asset?.assetName}
                                            </td>

                                            <td>{audit.auditDate}</td>

                                            <td>
                                                <span
                                                    className={
                                                        audit.auditStatus === "COMPLETED"
                                                            ? "badge bg-success"
                                                            : audit.auditStatus === "FAILED"
                                                                ? "badge bg-danger"
                                                                : "badge bg-warning text-dark"
                                                    }
                                                >
                                                    {audit.auditStatus}
                                                </span>
                                            </td>

                                            <td>{audit.remarks || "-"}</td>

                                            <td>
                                                {audit.auditStatus === "PENDING" ? (
                                                    <button
                                                        className="btn btn-primary btn-sm"
                                                        onClick={() =>
                                                            openForm(audit)
                                                        }
                                                    >
                                                        Submit Audit
                                                    </button>
                                                ) : (
                                                    <button
                                                        className="btn btn-secondary btn-sm"
                                                        disabled
                                                    >
                                                        Completed
                                                    </button>
                                                )}
                                            </td>

                                        </tr>

                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="6"
                                            className="text-center"
                                        >
                                            No Audit Requests Found
                                        </td>
                                    </tr>
                                )}

                            </tbody>

                        </table>

                    </div>

                </div>

       

            {selectedAudit && (

                <div className="card shadow mt-4 border-0">

                    <div className="card-header bg-success text-white">
                        <h4 className="mb-0">Submit Audit</h4>
                    </div>

                    <div className="card-body">

                        <div className="mb-3">
                            <label className="form-label">
                                Audit Status
                            </label>

                            <select
                                className="form-select"
                                value={auditStatus}
                                onChange={(e) =>
                                    setAuditStatus(e.target.value)
                                }
                            >
                                <option value="">
                                    Select Status
                                </option>

                                <option value="COMPLETED">
                                    COMPLETED
                                </option>

                                <option value="FAILED">
                                    FAILED
                                </option>
                            </select>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">
                                Remarks
                            </label>

                            <textarea
                                className="form-control"
                                rows="4"
                                value={remarks}
                                onChange={(e) =>
                                    setRemarks(e.target.value)
                                }
                                placeholder="Enter remarks..."
                            />
                        </div>

                        <div className="d-flex gap-2">

                            <button
                                className="btn btn-success"
                                onClick={submitAudit}
                            >
                                Submit
                            </button>

                            <button
                                className="btn btn-outline-danger"
                                onClick={() =>
                                    setSelectedAudit(null)
                                }
                            >
                                Cancel
                            </button>

                        </div>

                    </div>

                </div>

            )}

        </div>
    );
};

export default EmployeeAudit;