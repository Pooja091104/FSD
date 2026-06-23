import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminAuditPage = () => {

    const [audits, setAudits] = useState([]);
    const [page, setPage] = useState(0);
    const [size] = useState(5);
    const [loading, setLoading] = useState(false);

    const token = localStorage.getItem("token");

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    // FETCH AUDITS
    const fetchAudits = async (pageNo) => {
        try {
            setLoading(true);

            const res = await axios.get(
                `http://localhost:8080/api/audit/getall?page=${pageNo}&size=${size}`,
                config
            );

            setAudits(res.data);

        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAudits(page);
    }, [page]);

    // NEXT PAGE
    const nextPage = () => {
        setPage(prev => prev + 1);
    };

    // PREVIOUS PAGE
    const prevPage = () => {
        if (page > 0) setPage(prev => prev - 1);
    };

    // SEND AUDIT REQUEST (ADMIN)
    const sendAuditRequest = async () => {
        try {
            const res = await axios.post(
                "http://localhost:8080/api/audit/send",
                {},
                config
            );

            alert(res.data);

            // refresh table
            fetchAudits(page);

        } catch (err) {
            console.log(err);
            alert("Failed to send audit request");
        }
    };

    return (
        <div style={{ padding: "20px" }}>

            <h2>Admin Audit Dashboard</h2>

       

            {/* TABLE */}
            {loading ? (
                <p>Loading audits...</p>
            ) : (
                <table border="1" width="100%" cellPadding="10">
                    <thead>
                        <tr>
                            <th>Audit ID</th>
                            <th>Employee</th>
                            <th>Asset</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Remarks</th>
                        </tr>
                    </thead>

                    <tbody>
                        {audits.length > 0 ? (
                            audits.map((audit) => (
                                <tr key={audit.auditId}>
                                    <td>{audit.auditId}</td>
                                    <td>{audit.employeeName}</td>
                                    <td>{audit.assetName}</td>
                                    <td>{audit.auditDate}</td>
                                    <td>
                                        <span
                                            style={{
                                                color:
                                                    audit.auditStatus === "PENDING"
                                                        ? "orange"
                                                        : audit.auditStatus === "COMPLETED"
                                                            ? "green"
                                                            : "red",
                                                fontWeight: "bold"
                                            }}
                                        >
                                            {audit.auditStatus}
                                        </span>
                                    </td>
                                    <td>{audit.remarks || "-"}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" style={{ textAlign: "center" }}>
                                    No audits found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            )}

            {/* PAGINATION */}
            <div style={{ marginTop: "20px" }}>
                <button onClick={prevPage} disabled={page === 0}>
                    Previous
                </button>

                <span style={{ margin: "0 10px" }}>
                    Page {page + 1}
                </span>

                <button onClick={nextPage}>
                    Next
                </button>
            </div>

        </div>
    );
};

export default AdminAuditPage;