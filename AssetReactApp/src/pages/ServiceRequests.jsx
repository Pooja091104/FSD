
import { useDispatch } from "react-redux";
import EmployeeSidebar from "../components/Admin/EmployeeSideBar";
import EmployeeWidget from "../components/Admin/EmployeeWidget";
import NavbarAdmin from "../components/NavBar-Admin";
import { useEffect } from "react";
import Sidebar from "../components/Admin/Sidebar";
import ServiceWidget from "../components/Admin/ServiceWidget";
import ServiceList from "../components/Admin/ServiceList";
import { getAllServices } from "../store/action/serviceAction";


const ServiceRequests = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllServices())
  }, [dispatch]);
  return (
    <div className="d-flex">

      <Sidebar />

      <div className="flex-grow-1">

        <NavbarAdmin />

        <div className="p-4">
          <ServiceWidget/>
          <ServiceList />
        </div>
</div>
     </div>  
    
  );
};

export default ServiceRequests;