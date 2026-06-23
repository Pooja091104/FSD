import axios from "axios";
import { useEffect, useState } from "react";
import { Chart } from "primereact/chart";

const AssetOverviewPieChart = () => {

    const assetStatApi =
        "http://localhost:8080/api/asset/stats/by-status";

    const [chartData, setChartData] = useState(null);
    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {

        const config_details = {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        };

        const getAssetStats = async () => {

            try {

                const resp = await axios.get(
                    assetStatApi,
                    config_details
                );

                console.log(resp);

                const data = {
                    labels: resp.data.label,
                    datasets: [
                        {
                            data: resp.data.data,
                            backgroundColor: [
                                "#22c55e", // Available
                                "#3b82f6", // Assigned
                                "#f59e0b"  // In Service
                            ],
                            hoverBackgroundColor: [
                                "#16a34a",
                                "#2563eb",
                                "#d97706"
                            ]
                        }
                    ]
                };

                setChartData(data);

                setChartOptions({
                    plugins: {
                        legend: {
                            position: "bottom"
                        }
                    },
                    maintainAspectRatio: false,
                    responsive: true
                });

            } catch (err) {
                console.log(err);
            }
        };

        getAssetStats();

    }, []);

    return (
        <div style={{ height: "300px" }}>
            {chartData && (
                <Chart
                    type="pie"
                    data={chartData}
                    options={chartOptions}
                />
            )}
        </div>
    );
};

export default AssetOverviewPieChart;