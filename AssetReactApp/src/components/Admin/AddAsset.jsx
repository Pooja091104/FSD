import React, { useState } from "react";
import axios from "axios";

const AddAsset = () => {

    const [assetNo, setAssetNo] = useState("");
    const [assetName, setAssetName] = useState("");
    const [assetModel, setAssetModel] = useState("");
    const [status, setStatus] = useState("");
    const [manufacturingDate, setManufacturingDate] = useState("");
    const [assetValue, setAssetValue] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [quantity, setQuantity] = useState("");
    const [image, setImage] = useState(null);

    const [successMsg, setSuccessMsg] = useState();
    const [errMsg, setErrMsg] = useState();

    const postApi =
        `http://localhost:8080/api/com/asset/add/${categoryId}`;

    const addAsset = async (e) => {

        e.preventDefault();

        let body = {
            assetNo,
            assetName,
            assetModel,
            status,
            manufacturingDate,
            assetValue,
            quantity,
            image
        };

        const config_details = {
            headers: {
                Authorization:
                    "Bearer " + localStorage.getItem("token")
            }
        };

        try {

            // STEP 1: ADD ASSET
            const response = await axios.post(
                postApi,
                body,
                config_details
            );

            console.log("Response Data:", response.data);
            console.log("Asset ID:", response.data?.assetId);

            // STEP 2: GET GENERATED ASSET ID
            const assetId = response.data.assetId;

            // STEP 3: UPLOAD IMAGE
            if (image) {

                const formData = new FormData();

                formData.append("file", image);

                await axios.post(
                    `http://localhost:8080/api/com/${assetId}/upload`,
                    formData,
                    {
                        headers: {
                            Authorization:
                                "Bearer " +
                                localStorage.getItem("token"),
                            "Content-Type":
                                "multipart/form-data"
                        }
                    }
                );
            }

            setSuccessMsg("Asset Added Successfully");
            setErrMsg(undefined);

            setAssetNo("");
            setAssetName("");
            setAssetModel("");
            setStatus("");
            setManufacturingDate("");
            setAssetValue("");
            setCategoryId("");
            setQuantity("");
            setImage(null);

        } catch (err) {

            console.log(err);

            setErrMsg(
                "Adding Asset Failed " +
                (err.response?.data?.message || "")
            );
        }
    };

    return (
        <div className="container-fluid">

            <div className="col-md-6">
                <h3>Add Asset</h3>
            </div>

            <div className="card body">

                <form onSubmit={addAsset}>

                    <label>Asset No:</label>
                    <input
                        type="text"
                        className="form-control"
                        required
                        value={assetNo}
                        onChange={(e) =>
                            setAssetNo(e.target.value)
                        }
                    />

                    <label>Asset Name:</label>
                    <input
                        type="text"
                        className="form-control"
                        required
                        value={assetName}
                        onChange={(e) =>
                            setAssetName(e.target.value)
                        }
                    />

                    <label>Asset Model:</label>
                    <input
                        type="text"
                        className="form-control"
                        required
                        value={assetModel}
                        onChange={(e) =>
                            setAssetModel(e.target.value)
                        }
                    />

                    <label>Status:</label>
                    <select
                        className="form-control"
                        required
                        value={status}
                        onChange={(e) =>
                            setStatus(e.target.value)
                        }
                    >
                        <option value="">Select Status</option>
                        <option value="AVAILABLE">Available</option>
                        <option value="ASSIGNED">Assigned</option>
                        <option value="IN_SERVICE">In Service</option>
                    </select>

                    <label>Manufacturing Date:</label>
                    <input
                        type="date"
                        className="form-control"
                        required
                        value={manufacturingDate}
                        onChange={(e) =>
                            setManufacturingDate(e.target.value)
                        }
                    />

                    <label>Asset Value:</label>
                    <input
                        type="number"
                        className="form-control"
                        required
                        value={assetValue}
                        onChange={(e) =>
                            setAssetValue(e.target.value)
                        }
                    />

                    {/* ✅ FIXED QUANTITY */}
                    <label>Quantity:</label>
                    <input
                        type="number"
                        className="form-control"
                        required
                        value={quantity}
                        onChange={(e) =>
                            setQuantity(e.target.value)
                        }
                    />

                    <label>Asset Image:</label>
                    <input
                        type="file"
                        className="form-control"
                        accept="image/*"
                        onChange={(e) =>
                            setImage(e.target.files[0])
                        }
                    />

                    <label>Category ID:</label>
                    <input
                        type="text"
                        className="form-control"
                        required
                        value={categoryId}
                        onChange={(e) =>
                            setCategoryId(e.target.value)
                        }
                    />

                    <br />

                    <input
                        type="submit"
                        className="btn btn-secondary"
                        value="Add In System"
                    />

                    {successMsg &&
                        <div className="alert alert-success mt-2">
                            {successMsg}
                        </div>
                    }

                    {errMsg &&
                        <div className="alert alert-danger mt-2">
                            {errMsg}
                        </div>
                    }

                </form>

            </div>

        </div>
    );
};

export default AddAsset;