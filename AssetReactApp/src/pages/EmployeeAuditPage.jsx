
import EmployeeAudit from "../components/Employee/EmployeeAudit";
import SideBar from "../components/Employee/SideBar";

import NavbarEmployee from "../components/NavBar-Employee";


const EmployeeAuditPage = () => {
  


    
    return (
        <div className="bg-light min-vh-100 d-flex flex-column p-3">

            {/* Navbar */}
            <NavbarEmployee />
             

            {/* Dashboard Layout */}
            <div className="d-flex flex-grow-1 gap-3 align-items-stretch mt-3">

                {/* Sidebar */}
                <SideBar />

                {/* Main Widget Area */}
                <div className="flex-grow-1">
                    <EmployeeAudit />
                </div>

            </div>

        </div>
    );
};


export default EmployeeAuditPage