import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import PageNotFound from "./pages/PageNotFound";
import AdminDashboard from "./pages/AdminDashboard";

import EmployeeManagementDashboard from "./pages/EmployeeManagement";
import EmployeeManagement from "./pages/EmployeeManagement";
import EmployeeOnboard from "./components/Admin/EmployeeOnboard";
import CategoryManagement from "./pages/CategoryManagement";
import AddCategory from "./components/Admin/AddCategory";
import AssetManagementDashboard from "./pages/AssetManagement";
import ServiceRequests from "./pages/ServiceRequests";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import BrowseAssets from "./components/Employee/BrowseAssets";
import BrowseAssetsDashboard from "./pages/BrowseAssetsDashboard";
import MyAssetsWidget from "./components/Employee/MyAssetsWidget";
import MyAssetsDashboard from "./pages/MyAssetsDashboard";
import MyRequestDashbaord from "./pages/MyRequestDashBoard";
import ProfileDashboard from "./pages/ProfileDashBoard";
import AssetRequestDashboard from "./pages/AssetRequestDashboard";
import ReturnAssetDashboard from "./pages/RetrunAssetDashboard";
import ReturnAssetsRequestDasboard from "./pages/ReturnAssetsRequestDasboard";
import AuditPage from "./pages/AuditPage";
import EmployeeAuditPage from "./pages/EmployeeAuditPage";


const App = ()=>{

  return(
    <div>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Auth />}></Route>
          <Route path="/admin" element={<AdminDashboard />}></Route>
        <Route path="*" element={<PageNotFound />}></Route>
        <Route path= "/admin/employees"element={<EmployeeManagement/>}></Route>
         <Route path="/employee-onboard"element={<EmployeeOnboard />} />
          <Route path="/admin/categories"element={<CategoryManagement/>} />
          <Route path="/admin/categories/add"element={<AddCategory/>} />
          <Route path="/admin/assets" element={<AssetManagementDashboard/>} />
           <Route path="/admin/requests" element={<AssetRequestDashboard/>} />
          <Route path="/admin/service" element={<ServiceRequests/>} />
          <Route path="/admin/return" element={<ReturnAssetDashboard/>} />
            <Route path="/admin/audit" element={<AuditPage/>} />
       
       {/*Employee*/}
       <Route path="/employee" element={<EmployeeDashboard />}></Route>
       <Route path="/browse-assets" element={<BrowseAssetsDashboard />}></Route>
       <Route path="/My-Assets" element={<MyAssetsDashboard />}></Route>
       <Route path="/my-requests" element={<MyRequestDashbaord />}></Route>
       <Route path="/return-requests" element={<ReturnAssetsRequestDasboard />}></Route>
         <Route path="/audit" element={<EmployeeAuditPage />}></Route>
        <Route path="/profile" element={<ProfileDashboard />}></Route>
       
       


      </Routes>
    </div>
  )

}

export default App; 