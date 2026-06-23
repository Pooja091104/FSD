import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import { useEffect, useState } from "react";
import axios from "axios";
import EmployeeBarChart from "./EmployeeBarChart";
import AssetOverviewPieChart from "./AssetOverviewPieChart";

const Widget = () => {
  const statApi = "http://localhost:8080/api/admin/stats"
  const [label, setLabel] = useState([])
  const [data, setData] = useState([])
  useEffect(() => {
    const config_details = {
      headers: {
        'Authorization': "Bearer " + localStorage.getItem('token')
      }
    }
    const getStats = async () => {
      try {
        const response = await axios.get(statApi, config_details)
        setLabel(response.data.label)
        setData(response.data.count)
      }
      catch (err) {
        console.log(err?.response)
      }
    }
    getStats()
  }, [])
  return (
    <main
      className="flex-grow-1 p-4"
      style={{ background: "#f5f7fb" }}
    >

      {/* Header */}

      <div className="d-flex justify-content-between align-items-center mb-4">

        <div>
          <h2 className="fw-bold">
            Asset Management Dashboard
          </h2>

          <p className="text-muted">
            Welcome back Admin 👋
          </p>
        </div>

      </div>

      {/* Cards */}

      <div className="row g-3 mb-4">

        <div className="col-md-3">
          <div className="card dashboard-card">
            <div className="card-body">
              <h6>{label.length > 0 ? label[0] : "Employees"}</h6>
              <h2>{data.length > 0 ? data[0] : 0}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card dashboard-card">
            <div className="card-body">
              <h6>{label.length > 1 ? label[1] : "Assets"}</h6>
              <h2>{data.length > 1 ? data[1] : 0}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card dashboard-card">
            <div className="card-body">
              <h6>{label.length > 2 ? label[2] : "Available Assets"}</h6>
              <h2>{data.length > 2 ? data[2] : 0}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card dashboard-card">
            <div className="card-body">
              <h6>{label.length > 3 ? label[3] : "Pending Requests"}</h6>
              <h2>{data.length > 3 ? data[3] : 0}</h2>
            </div>
          </div>
        </div>

      </div>

      {/* Employee Distribution + Asset Status */}

      <div className="row g-3 mb-4">

        <div className="col-lg-6">

          <div className="card dashboard-card">

            <div className="card-header bg-white">
              Employee Distribution
            </div>

            <div >
  <EmployeeBarChart />
</div>

          </div>

        </div>

        <div className="col-lg-6">

          <div className="card dashboard-card">

            <div className="card-header bg-white">
              Asset Status Overview
              <AssetOverviewPieChart />
            </div>



          </div>

        </div>

      </div>

     


    </main>
  );
};

export default Widget;