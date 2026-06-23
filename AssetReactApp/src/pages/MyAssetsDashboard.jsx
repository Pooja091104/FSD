
import MyAssetsWidget from "../components/Employee/MyAssetsWidget";
import SideBar from "../components/Employee/SideBar";

import NavbarEmployee from "../components/NavBar-Employee";

const MyAssetsDashboard = () => {
  return (
    <div className="bg-light min-vh-100">

      <NavbarEmployee />

      <div className="d-flex" style={{ minHeight: "100vh" }}>

        {/* FIX: force sidebar width */}
        <div style={{ width: "250px", flexShrink: 0 }}>
          <SideBar />
        </div>

        <div className="flex-grow-1 p-4">
          <MyAssetsWidget />
        </div>

      </div>
    </div>
  );
};
export default MyAssetsDashboard