import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside
      className="bg-dark text-white d-flex flex-column p-3"
      style={{
        width: "270px",
        minHeight: "100vh"
      }}
    >
      {/* Profile */}

      <div className="text-center mb-4">

        <div
          className="bg-primary rounded-circle d-flex justify-content-center align-items-center mx-auto"
          style={{
            width: "70px",
            height: "70px"
          }}
        >
          <h4 className="m-0 text-white">AD</h4>
        </div>

        <h5 className="mt-3 mb-1">Admin User</h5>

        <small className="text-secondary">
          System Administrator
        </small>

      </div>

      {/* Menu */}

      <ul className="nav flex-column">

        <li className="nav-item">
          <a href="#" className="nav-link text-white">
            <i className="bi bi-speedometer2 me-2"></i>
            Dashboard
          </a>
        </li>

        <NavLink
          to="/admin/employees"
          className="nav-link"
        >
          Employee Management
        </NavLink>

        <li className="nav-item">
          <a href="#" className="nav-link text-white">
            <i className="bi bi-laptop-fill me-2"></i>
            Assets
          </a>
        </li>

        <li className="nav-item">
          <a href="#" className="nav-link text-white">
            <i className="bi bi-arrow-left-right me-2"></i>
            Allocation
          </a>
        </li>

        <li className="nav-item">
          <a href="#" className="nav-link text-white">
            <i className="bi bi-clipboard-check me-2"></i>
            Requests
          </a>
        </li>

        <li className="nav-item">
          <a href="#" className="nav-link text-white">
            <i className="bi bi-tools me-2"></i>
            Service
          </a>
        </li>

        <li className="nav-item">
          <a href="#" className="nav-link text-white">
            <i className="bi bi-search me-2"></i>
            Audit
          </a>
        </li>

      </ul>

      <div className="mt-auto">


      </div>

    </aside>
  );
};

export default Sidebar;