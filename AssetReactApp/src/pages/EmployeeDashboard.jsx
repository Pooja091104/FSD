import DashboardWidgets from "../components/Employee/DashboardWidgets";
import SideBar from "../components/Employee/SideBar";
import NavbarEmployee from "../components/NavBar-Employee";

const EmployeeDashboard = () => {
  return (
    <div className="bg-light min-vh-100">

      <NavbarEmployee />

      <div className="d-flex">

        <SideBar/>

        <div className="flex-grow-1 p-4">
          <DashboardWidgets />
        </div>

      </div>

    </div>
  );
};
export default EmployeeDashboard