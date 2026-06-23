import axios from "axios";
import { useEffect, useState } from "react";
import { Chart } from "primereact/chart";

const EmployeeBarChart = () => {

    const EmployeeStatApi = "http://localhost:8080/api/employee/stats/by-department";

    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {

        const config_details = {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        };

        const getEmployeeStat = async () => {
            try {
                const resp = await axios.get(EmployeeStatApi, config_details);

                console.log(resp.data);

                const data = {
                    labels: resp.data.label,
                    datasets: [
                        {
                            label: resp.data.title,
                            data: resp.data.data,
                            backgroundColor: [
                                'rgba(255, 159, 64, 0.2)',
                                'rgba(75, 192, 192, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(153, 102, 255, 0.2)'
                            ],
                            borderColor: [
                                'rgb(255, 159, 64)',
                                'rgb(75, 192, 192)',
                                'rgb(54, 162, 235)',
                                'rgb(153, 102, 255)'
                            ],
                            borderWidth: 1
                        }
                    ]
                };

                setChartData(data);

                setChartOptions({
                    scales: {
                        y: { beginAtZero: true }
                    }
                });

            } catch (err) {
                console.log(err);
            }
        };

        getEmployeeStat();

    }, []);

   return (
  <div style={{ height: "400px" }}>
    {chartData && (
      <Chart type="bar" data={chartData} options={chartOptions} />
    )}
  </div>
   );
};

export default EmployeeBarChart;