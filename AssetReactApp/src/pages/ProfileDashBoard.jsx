

import ProfileWidget from "../components/Employee/ProfileWidget";
import SideBar from "../components/Employee/SideBar";

import NavbarEmployee from "../components/NavBar-Employee";

const ProfileDashboard = () => {
  return (
    <div className="bg-light min-vh-100">

      <NavbarEmployee />

      <div className="d-flex" style={{ minHeight: "100vh" }}>

        {/* FIX: force sidebar width */}
        <div style={{ width: "250px", flexShrink: 0 }}>
          <SideBar />
        </div>

        <div className="flex-grow-1 p-4">
          <ProfileWidget />
        </div>

      </div>
    </div>
  );
};
export default ProfileDashboard