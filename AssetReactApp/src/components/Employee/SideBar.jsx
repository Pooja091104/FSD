import { NavLink } from "react-router-dom";

const SideBar=() => {
  return (
    <div
  className="bg-dark text-white vh-100 p-3"
  style={{
    width: "250px",
    flexShrink: 0
  }}
>
      <h4 className="text-center mb-4">
        Asset Management
      </h4>

      <ul className="nav flex-column">

        <li className="nav-item mb-2">
          <NavLink
            to="/employee"
            className="nav-link text-white"
          >
            🏠 Dashboard
          </NavLink>
        </li>

        <li className="nav-item mb-2">
          <NavLink
            to="/browse-assets"
            className="nav-link text-white"
          >
            💻 Browse Assets
          </NavLink>
        </li>

         <li className="nav-item mb-2">
          <NavLink
            to="/My-Assets"
            className="nav-link text-white"
          >
            My Assets
          </NavLink>
        </li>

        <li className="nav-item mb-2">
          <NavLink
            to="/my-requests"
            className="nav-link text-white"
          >
            📋 My Requests
          </NavLink>
        </li>
         <li className="nav-item mb-2">
          <NavLink
            to="/return-requests"
            className="nav-link text-white"
          >
            📋 Return Requests
          </NavLink>
        </li>
         <li className="nav-item mb-2">
          <NavLink
            to="/audit"
            className="nav-link text-white"
          >
            📋 Audit
          </NavLink>
        </li>


        <li className="nav-item mb-2">
          <NavLink
            to="/profile"
            className="nav-link text-white"
          >
            👤 Profile
          </NavLink>
        </li>

        

      </ul>
    </div>
  );
}

export default SideBar