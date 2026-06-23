import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllEmployees } from "../../store/action/employeeAction";


const EmployeeList = () => {

    const dispatch = useDispatch();

    const { employees, totalpages } = useSelector(
        state => state.employees
    );

    const [employeeList, setEmployeeList] = useState([]);
    const [deleteMsg, setDeleteMessage] = useState("");

    const [currentPage, setCurrentPage] = useState(0);
    const size = 10;

    const deleteApi = "http://localhost:8080/api/employee/soft-delete/";

    // 🔥 load employees with pagination
    useEffect(() => {
        dispatch(getAllEmployees(currentPage, size));
    }, [currentPage]);

    // 🔥 sync redux → local state
    useEffect(() => {
        setEmployeeList([...employees]);
    }, [employees]);

    const onDelete = async (id) => {
        try {
            await axios.delete(deleteApi + id);

            let tempArry = employeeList.filter(
                (e) => e.employeeId !== id
            );

            setEmployeeList(tempArry);

            setDeleteMessage("Employee deleted successfully");

        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="col-md-12">

            <h4>Employee List</h4>

            {deleteMsg && (
                <div className="alert alert-info">
                    {deleteMsg}
                </div>
            )}

            {/* TABLE */}
            <table className="table table-bordered table-hover">

                <thead className="table-dark">
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Gender</th>
                        <th>Department</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {employeeList.map((e) => (
                        <tr key={e.employeeId}>
                            <td>{e.employeeId}</td>
                            <td>{e.fullName}</td>
                            <td>{e.phoneNumber}</td>
                            <td>{e.gender}</td>
                            <td>{e.department}</td>

                            <td>
                                <button
                                    className="btn btn-link p-0"
                                    onClick={() => onDelete(e.employeeId)}
                                >
                                    <i className="bi bi-trash"></i>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>

            </table>

            {/* PAGINATION */}
            <nav>
                <ul className="pagination justify-content-center">

                    {/* Previous */}
                    <li className="page-item">
                        <button
                            className="page-link"
                            disabled={currentPage === 0}
                            onClick={() => setCurrentPage(currentPage - 1)}
                        >
                            Previous
                        </button>
                    </li>

                    {/* Page Numbers */}
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

                    {/* Next */}
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

export default EmployeeList;