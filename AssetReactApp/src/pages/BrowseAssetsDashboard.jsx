
import { useEffect, useState } from "react";
import BrowseAssets from "../components/Employee/BrowseAssets";
import SideBar from "../components/Employee/SideBar";

import NavbarEmployee from "../components/NavBar-Employee";


const BrowseAssetsDashboard = () => {
  


    
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
                    <BrowseAssets />
                </div>

            </div>

        </div>
    );
};


export default BrowseAssetsDashboard ;