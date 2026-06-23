import Sidebar from "../components/Admin/Sidebar";
import NavbarAdmin from "../components/NavBar-Admin";
import CategoryWidget from "../components/Admin/CategoryWidget";
import CategoryList from "../components/Admin/CategoryList";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAll } from "../store/action/CategoryAction";

const CategoryManagement = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAll());
  }, [dispatch]);

  return (
    <div style={{ display: "flex", height: "100vh", width: "100%" }}>

      {/* Sidebar */}
      <div style={{ width: "270px", flexShrink: 0 }}>
        <Sidebar />
      </div>

      {/* RIGHT SIDE */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>

        {/* Navbar */}
        <NavbarAdmin />

        {/* IMPORTANT PART (THIS FIXES YOUR TABLE ISSUE) */}
        <div style={{ flex: 1, overflow: "auto", padding: "16px" }}>

          <CategoryWidget />

          {/* FORCE TABLE TO STAY INSIDE */}
          <div style={{ marginTop: "20px", width: "100%" }}>
            <CategoryList />
          </div>

        </div>

      </div>
    </div>
  );
};

export default CategoryManagement;