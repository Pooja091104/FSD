import axios from "axios";
import { useEffect, useState } from "react";
import "../Styles/Dashboard.css";
import { Chart } from "primereact/chart";

const DashboardWidgets = () => {
  const statApi3 =
    "http://localhost:8080/api/employee/CombibnedStats";
  const statApi4 =
    "http://localhost:8080/api/employee/stats/by-request-status";

  const [label, setLabel] = useState([]);
  const [data, setData] = useState([]);

  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});

  const username = localStorage.getItem("username");

  useEffect(() => {
    const config_details = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };

    const getStats = async () => {
      try {
        const response = await axios.get(
          statApi3,
          config_details
        );

        setLabel(response.data.label);
        setData(response.data.count);
      } catch (err) {
        console.log(err);
      }
    };

    const getRequestStatus = async () => {
      try {
        const resp = await axios.get(
          statApi4,
          config_details
        );

        setChartData({
          labels: resp.data.label,
          datasets: [
            {
              label: resp.data.title,
              data: resp.data.data,
              backgroundColor: [
                "#3b82f6",
                "#f59e0b",
                "#10b981",
                "#ef4444",
              ],
              borderRadius: 10,
            },
          ],
        });

        setChartOptions({
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: true,
              position: "top",
            },
          },
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        });
      } catch (err) {
        console.log(err);
      }
    };

    getStats();
    getRequestStatus();
  }, []);

  const getValue = (arr, index, fallback) => {
    return arr?.[index] ?? fallback;
  };

  return (
    <div className="dashboard-container">
      {/* Welcome */}
      <div className="mb-4">
        <h2 className="welcome-title">
          Welcome, {username} 👋
        </h2>
      </div>

      {/* Stats Cards */}
      <div className="row g-4 mb-4">
        <div className="col-lg-4 col-md-6">
          <div className="dashboard-widget-card">
            <div className="icon-box">📦</div>

            <small className="dashboard-label">
              {getValue(label, 0, "Total Assets")}
            </small>

            <h2 className="dashboard-value text-blue">
              {getValue(data, 0, 0)}
            </h2>
          </div>
        </div>

        <div className="col-lg-4 col-md-6">
          <div className="dashboard-widget-card">
            <div className="icon-box">📄</div>

            <small className="dashboard-label">
              {getValue(label, 1, "My Requests")}
            </small>

            <h2 className="dashboard-value text-orange">
              {getValue(data, 1, 0)}
            </h2>
          </div>
        </div>

        <div className="col-lg-4 col-md-6">
          <div className="dashboard-widget-card">
            <div className="icon-box">✅</div>

            <small className="dashboard-label">
              {getValue(label, 2, "Approved")}
            </small>

            <h2 className="dashboard-value text-green">
              {getValue(data, 2, 0)}
            </h2>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="row">
        <div className="col-lg-8">
          <div className="chart-card">
            <h5 className="chart-title">
              My Request Status
            </h5>

            <div style={{ height: "300px" }}>
              {chartData?.labels && (
                <Chart
                  type="bar"
                  data={chartData}
                  options={chartOptions}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardWidgets;