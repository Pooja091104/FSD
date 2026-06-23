import React, { useState ,useEffect} from "react";
import axios from "axios";
import AddAsset from "./AddAsset";
import { useNavigate } from "react-router-dom";
const AssetWidget = () => {
    {/*} const statApi='http://localhost:8080/api/com/Asset/stats';
     const [label, setLabel] = useState([]);
       const [data, setData] = useState([]);
const navigate = useNavigate();

  useEffect(() => {

    const config_details = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    const getstatApi = async () => {
      try {
        const response = await axios.get(statApi, config_details);
        setLabel(response.data.label);
        setData(response.data.count);
      } catch (err) {
        console.log(err?.response);
      }
    };

    getstatApi();
  }, []);
   
  const getValue = (arr, index, fallback) => {
    return arr?.[index] ?? fallback;
  };
  
    const assignAsset = () => {
        alert("Asset Assigned Successfully");
        setAssignedAssets(assignedAssets + 1);
        setAvailableAssets(availableAssets - 1);
    };*/}

    return (
        <div className="container-fluid">
           
            <h2 className="mb-4">Asset Management Dashboard</h2>

            {/* WIDGETS */}

           {/* <div className="row g-3 mb-4">

                <div className="col-md-3">
                    <div className="card p-3 text-center shadow">
                       <h2 className="mb-0">{getValue(data, 0, 0)}</h2>
                <small>{getValue(label, 0, "Total Assets")}</small>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card p-3 text-center shadow">
                       <h2 className="mb-0">{getValue(data, 1, 0)}</h2>
                <small>{getValue(label, 1, "Assigned Assets")}</small>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card p-3 text-center shadow">
                       <h2 className="mb-0">{getValue(data, 2, 0)}</h2>
                <small>{getValue(label, 2, "Available Assets")}</small>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card p-3 text-center shadow">
                        <h2 className="mb-0">{getValue(data, 3, 0)}</h2>
                        <small>{getValue(label, 3, "In Service")}</small>
                    </div>
                </div>

            </div>*/}

            {/* FORMS */}

            <div className="row mb-4">

                <div className="col-md-6">
                    <AddAsset />
                </div>

                        

               {/* <div className="col-md-6">
                    <div className="card p-3 shadow">

                        <h4>Assign Asset</h4>

                        <select className="form-control mb-2">
                            <option>Dell Laptop</option>
                            <option>HP Laptop</option>
                        </select>

                        <select className="form-control mb-2">
                            <option>Pooja</option>
                            <option>Rahul</option>
                        </select>

                        <button
                            className="btn btn-success"
                            onClick={assignAsset}
                        >
                            Assign Asset
                        </button>

                    </div>
                </div>*/}

            </div>

          
        </div >

    );
};

export default AssetWidget;