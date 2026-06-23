import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllServices } from "../../store/action/serviceAction";

const ServiceList = () => {

    const dispatch = useDispatch();

    const { services, totalpages } = useSelector(
        state => state.services
    );

    const [serviceList, setServiceList] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const size = 10;

    //  FILTER STATES
    const [searchText, setSearchText] = useState("");
    const [statusFilter, setStatusFilter] = useState("ALL");

    const token = localStorage.getItem("token");

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    // LOAD DATA
    useEffect(() => {
        dispatch(getAllServices(currentPage, size));
    }, [currentPage]);

    // SYNC REDUX → LOCAL
    useEffect(() => {
        setServiceList([...services]);
    }, [services]);

    // STATUS UPDATE
    const handleUpdate = async (id, status) => {
        try {
            await axios.put(
                `http://localhost:8080/api/service/status/${id}?serviceStatus=${status}`,
                {},
                config
            );

            dispatch(getAllServices(currentPage, size));

        } catch (error) {
            console.log(error);
        }
    };

    //  FILTER LOGIC (SEARCH + STATUS)
    const filteredList = serviceList.filter((s) => {

        const matchSearch =
            (s.employee?.fullName || "").toLowerCase().includes(searchText.toLowerCase()) ||
            (s.asset?.assetName || "").toLowerCase().includes(searchText.toLowerCase()) ||
            (s.issueType || "").toLowerCase().includes(searchText.toLowerCase());

        const matchStatus =
            statusFilter === "ALL" || s.serviceStatus === statusFilter;

        return matchSearch && matchStatus;
    });

    return (
        <div className="col-md-12">

            <h4>Service List</h4>

            {/*  FILTER UI */}
            <div className="row mb-3">

                <div className="col-md-6">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by employee, asset, issue..."
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                </div>

                <div className="col-md-3">
                    <select
                        className="form-select"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option value="ALL">ALL</option>
                        <option value="OPEN">OPEN</option>
                        <option value="IN_PROGRESS">IN_PROGRESS</option>
                        <option value="COMPLETED">COMPLETED</option>
                    </select>
                </div>

                <div className="col-md-3">
                    <button
                        className="btn btn-secondary w-100"
                        onClick={() => {
                            setSearchText("");
                            setStatusFilter("ALL");
                        }}
                    >
                        Clear Filters
                    </button>
                </div>

            </div>

            {/* TABLE */}
            <table className="table table-bordered table-hover">

                <thead className="table-dark">
                    <tr>
                        <th>ID</th>
                        <th>Employee Name</th>
                        <th>Asset Name</th>
                        <th>Issue</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {filteredList.map((s) => (
                        <tr key={s.serviceRequestId}>

                            <td>{s.serviceRequestId}</td>
                            <td>{s.employee?.fullName}</td>
                            <td>{s.asset?.assetName}</td>
                            <td>{s.issueType}</td>

                            <td>
                                <span className={`badge ${
                                    s.serviceStatus === "COMPLETED"
                                        ? "bg-success"
                                        : s.serviceStatus === "IN_PROGRESS"
                                        ? "bg-warning text-dark"
                                        : "bg-secondary"
                                }`}>
                                    {s.serviceStatus}
                                </span>
                            </td>

                            <td>
                                <select
                                    className="form-select form-select-sm mb-1"
                                    value={s.serviceStatus}
                                    onChange={(e) =>
                                        handleUpdate(
                                            s.serviceRequestId,
                                            e.target.value
                                        )
                                    }
                                >
                                    <option value="OPEN">OPEN</option>
                                    <option value="IN_PROGRESS">IN_PROGRESS</option>
                                    <option value="COMPLETED">COMPLETED</option>
                                </select>
                            </td>

                        </tr>
                    ))}
                </tbody>

            </table>

            {/* PAGINATION */}
            <nav>
                <ul className="pagination justify-content-center">

                    <li className="page-item">
                        <button
                            className="page-link"
                            disabled={currentPage === 0}
                            onClick={() => setCurrentPage(currentPage - 1)}
                        >
                            Previous
                        </button>
                    </li>

                    {Array.from({ length: totalpages }).map((_, index) => (
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
                            disabled={currentPage === totalpages - 1}
                            onClick={() => setCurrentPage(currentPage + 1)}
                        >
                            Next
                        </button>
                    </li>

                </ul>
            </nav>

        </div>
    );
};

export default ServiceList;