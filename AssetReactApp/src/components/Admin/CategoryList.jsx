import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const CategoryList = () => {

  const { categories } = useSelector(state => state.categories);

  const [categoryList, setCategoryList] = useState([]);
  const [deleteMsg, setDeleteMsg] = useState("");

  const token = localStorage.getItem("token");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  useEffect(() => {
    if (categories) {
      setCategoryList(categories);
    }
  }, [categories]);

  const onDelete = async (id) => {
    try {
      await axios.delete(
        `http://localhost:8080/api/category/soft-delete/${id}`,
        config
      );

      setCategoryList(prev =>
        prev.filter(c => c.categoryId !== id)
      );

      setDeleteMsg("Category deleted successfully.");

    } catch (error) {
      console.log(error);
      setDeleteMsg("Failed to delete category.");
    }
  };

 return (
  <div style={{ width: "100%" }}>

    <h4>Category List</h4>

    {deleteMsg && (
      <div className="alert alert-success">
        {deleteMsg}
      </div>
    )}

    {/* FIX TABLE SCROLL ISSUE */}
    <div style={{ overflowX: "auto", width: "100%" }}>

      <table className="table table-bordered table-hover bg-white">

        <thead className="table-dark">
          <tr>
            <th>S.No</th>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {categoryList.map((category, index) => (
            <tr key={category.categoryId ?? index}>
              <td>{index + 1}</td>
              <td>{category.categoryId}</td>
              <td>{category.categoryName}</td>
              <td>{category.description}</td>
              <td>
                <i
                  className="bi bi-trash-fill text-danger"
                  style={{ cursor: "pointer" }}
                  onClick={() => onDelete(category.categoryId)}
                />
              </td>
            </tr>
          ))}
        </tbody>

      </table>

    </div>
  </div>
);
};

export default CategoryList;