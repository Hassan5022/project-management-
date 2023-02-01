// styles and images
import "./Sidebar.css"
import dashboard from "../assets/dashboard_icon.svg"
import addIcon from "../assets/add_icon.svg"
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
      <div className="sidebar">
          <div className="sidebar-content">
              <div className="user">
                  <p>Hey user</p>
              </div>
              <nav className="links">
                  <ul>
                      <li>
                          <NavLink to="/">
                              <img src={dashboard} alt="dashboard icon" />
                              <span>Dashboard</span>
                          </NavLink>
                      </li>
                      <li>
                          <NavLink to="/create">
                              <img src={addIcon} alt="add icon" />
                              <span>New Project</span>
                          </NavLink>
                      </li>
                  </ul>
              </nav>
          </div>
    </div>
  )
}

export default Sidebar