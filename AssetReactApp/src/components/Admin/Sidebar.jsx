import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside
      className="bg-dark text-white d-flex flex-column p-3"
     style={{
  width: "270px",
  height: "100vh",
  position: "sticky",
  top: 0
}}
    >
      {/* Profile */}
      <div className="text-center mb-4">
        <div
          className="bg-primary rounded-circle d-flex justify-content-center align-items-center mx-auto"
          style={{
            width: "70px",
            height: "70px",
          }}
        >
          <h4 className="m-0 text-white">AD</h4>
        </div>

        <h5 className="mt-3 mb-1">Admin User</h5>
        <small className="text-secondary">System Administrator</small>
      </div>

      {/* Menu */}
      <ul className="nav flex-column">

        {/* Dashboard */}
        <li className="nav-item">
          <NavLink
            to="/admin"
            end
            className={({ isActive }) =>
              isActive
                ? "nav-link text-white fw-bold bg-primary rounded mb-1"
                : "nav-link text-white mb-1"
            }
          >
            <i className="bi bi-speedometer2 me-2"></i>
            Dashboard
          </NavLink>
        </li>

        {/* Employees */}
        <li className="nav-item">
          <NavLink
            to="/admin/employees"
            className={({ isActive }) =>
              isActive
                ? "nav-link text-white fw-bold bg-primary rounded mb-1"
                : "nav-link text-white mb-1"
            }
          >
            <i className="bi bi-people me-2"></i>
            Employee Management
          </NavLink>
        </li>

        {/* Category */}
        <li className="nav-item">
          <NavLink
            to="/admin/categories"
            className={({ isActive }) =>
              isActive
                ? "nav-link text-white fw-bold bg-primary rounded mb-1"
                : "nav-link text-white mb-1"
            }
          >
            <i className="bi bi-tags me-2"></i>
            Category
          </NavLink>
        </li>

        {/* Assets */}
        <li className="nav-item">
          <NavLink
            to="/admin/assets"
            className={({ isActive }) =>
              isActive
                ? "nav-link text-white fw-bold bg-primary rounded mb-1"
                : "nav-link text-white mb-1"
            }
          >
            <i className="bi bi-laptop-fill me-2"></i>
            Assets
          </NavLink>
        </li>

        {/* Requests */}
        <li className="nav-item">
          <NavLink
            to="/admin/requests"
            className={({ isActive }) =>
              isActive
                ? "nav-link text-white fw-bold bg-primary rounded mb-1"
                : "nav-link text-white mb-1"
            }
          >
            <i className="bi bi-clipboard-check me-2"></i>
             Asset Requests
          </NavLink>
        </li>

        {/* Service */}
        <li className="nav-item">
          <NavLink
            to="/admin/service"
            className={({ isActive }) =>
              isActive
                ? "nav-link text-white fw-bold bg-primary rounded mb-1"
                : "nav-link text-white mb-1"
            }
          >
            <i className="bi bi-tools me-2"></i>
            Service
          </NavLink>
        </li>

         {/* Return Assets */}
        <li className="nav-item">
          <NavLink
            to="/admin/return"
            className={({ isActive }) =>
              isActive
                ? "nav-link text-white fw-bold bg-primary rounded mb-1"
                : "nav-link text-white mb-1"
            }
          >
            <i className="bi bi-tools me-2"></i>
            Return Assets
          </NavLink>
        </li>

        {/* Audit */}
        <li className="nav-item">
          <NavLink
            to="/admin/audit"
            className={({ isActive }) =>
              isActive
                ? "nav-link text-white fw-bold bg-primary rounded mb-1"
                : "nav-link text-white mb-1"
            }
          >
            <i className="bi bi-search me-2"></i>
            Audit
          </NavLink>
        </li>

      </ul>
    </aside>
  );
};

export default Sidebar;