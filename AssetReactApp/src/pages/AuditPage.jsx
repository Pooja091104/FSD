import NavbarAdmin from "../components/NavBar-Admin";
import Sidebar from "../components/Admin/Sidebar";
import AdminAuditPage from "../components/Admin/AdminAuditPage";

const AuditPage = () => {
 
    return (
        <div className="bg-light min-vh-100 d-flex flex-column p-3">

            {/* Navbar */}
            <NavbarAdmin />

            {/* Dashboard Layout */}
            <div className="d-flex flex-grow-1 gap-3 align-items-stretch mt-3">

                {/* Sidebar */}
                <Sidebar />

                {/* Main Widget Area */}
                <div className="flex-grow-1">
                    <AdminAuditPage />
                   
                </div>

            </div>

        </div>
    );
};

export default AuditPage;