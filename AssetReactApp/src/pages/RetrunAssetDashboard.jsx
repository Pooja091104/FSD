
import ReturnAssets from "../components/Admin/ReturnAsset";
import Sidebar from "../components/Admin/Sidebar";
import NavbarAdmin from "../components/NavBar-Admin";


const ReturnAssetDashboard = () => {
  return (
    <div className="bg-light min-vh-100">

      <NavbarAdmin />

      <div className="d-flex">

        <Sidebar/>

        <div className="flex-grow-1 p-4">
          <ReturnAssets />
        </div>

      </div>

    </div>
  );
};
export default ReturnAssetDashboard