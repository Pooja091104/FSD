import React, { useState } from "react";
import axios from "axios";

const AddCategory = () => {
  const [categoryName, setCategoryName] = useState("");
  const [description, setDescription] = useState("");

  const postApi = "http://localhost:8080/api/category/add";

  const [successMsg, setSuccessMsg] = useState();
  const [errMsg, setErrMsg] = useState();

  const addCategory = async (e) => {
    e.preventDefault();

    const body = {
      categoryName,
      description,
    };

    const config_details = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };

    try {
      await axios.post(postApi, body, config_details);

      setSuccessMsg("Category Added Successfully");
      setErrMsg(undefined);

      setCategoryName("");
      setDescription("");
    } catch (err) {
      console.log(err);

      setErrMsg(
        "Adding Category Failed: " +
          (err.response?.data?.message || "Server Error")
      );

      setSuccessMsg(undefined);
    }
  };

  return (
    <div className="card shadow-sm border-0">
      
      {/* CARD HEADER */}
      <div className="card-header bg-primary text-white">
        <h5 className="mb-0">Add Category</h5>
      </div>

      {/* CARD BODY */}
      <div className="card-body">

        <form onSubmit={addCategory}>

          <div className="mb-3">
            <label className="form-label">Category Name</label>
            <input
              type="text"
              className="form-control"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Description</label>
            <input
              type="text"
              className="form-control"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-secondary w-100">
            Add Category
          </button>

        </form>

        {/* SUCCESS / ERROR */}
        {successMsg && (
          <div className="alert alert-success mt-3">{successMsg}</div>
        )}

        {errMsg && (
          <div className="alert alert-danger mt-3">{errMsg}</div>
        )}

      </div>
    </div>
  );
};

export default AddCategory;