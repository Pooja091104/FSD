import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const EmployeeWidget = () => {

  const statsApi2 = "http://localhost:8080/api/employee/statsemployee";

  const [label, setLabel] = useState([]);
  const [data, setData] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const config_details = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };

    const getStats2 = async () => {
      try {
        const response = await axios.get(statsApi2, config_details);

        setLabel(response.data.label);
        setData(response.data.count);

      } catch (err) {
        console.log(err?.response);
      }
    };

    getStats2();
  }, []);

  const getValue = (arr, index, fallback) => {
    return arr?.[index] ?? fallback;
  };

  return (
    <>

      <div className="d-flex justify-content-end mb-6">
        <button
          className="btn btn-primary"
          onClick={() => navigate("/employee-onboard")}
        >
          <i className="bi bi-plus-circle me-2"></i>
          Add Employee
        </button>
      </div>

      <div className="row g-3 mb-3">

        <div className="col-md-3">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h3>{getValue(data, 0, 0)}</h3>
              <small>{getValue(label, 0, "Total Employees")}</small>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h3>{getValue(data, 1, 0)}</h3>
              <small>{getValue(label, 1, "Male Employees")}</small>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h3>{getValue(data, 2, 0)}</h3>
              <small>{getValue(label, 2, "Female Employees")}</small>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h3>{getValue(data, 3, 0)}</h3>
              <small>{getValue(label, 3, "Departments")}</small>
            </div>
          </div>
        </div>

      </div>

    </>
  );
};

export default EmployeeWidget;