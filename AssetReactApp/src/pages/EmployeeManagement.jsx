import NavbarAdmin from "../components/NavBar-Admin";
import EmployeeWidget from "../components/Admin/EmployeeWidget";
import EmployeeList from "../components/Admin/EmployeeList";
import Sidebar from "../components/Admin/Sidebar";

const EmployeeManagement = () => {
  return (
    <div className="d-flex">

      <Sidebar />

      <div className="flex-grow-1">

        <NavbarAdmin />

        <div className="px-3 py-2">
          <EmployeeWidget />
          <EmployeeList />
        </div>

      </div>

    </div>
  );
};

export default EmployeeManagement;