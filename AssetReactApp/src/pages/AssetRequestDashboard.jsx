import NavbarAdmin from "../components/NavBar-Admin";
import Sidebar from "../components/Admin/Sidebar";

import { useDispatch } from "react-redux";
import { useEffect } from "react";

import AssetRequestWidget from "../components/Admin/AssetRequestWidget";
const AssetRequestDashboard = () => {

 
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
                    <AssetRequestWidget />
                    
                </div>

            </div>

        </div>
    );
};

export default AssetRequestDashboard