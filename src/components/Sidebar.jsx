// styles and images
import "./Sidebar.css";
import dashboard from "../assets/dashboard_icon.svg";
import addIcon from "../assets/add_icon.svg";
import { NavLink } from "react-router-dom";
import Avatar from "./Avatar";
import { useAuthContext } from "../hooks/useAuthContext";

const Sidebar = () => {
	const { user } = useAuthContext();

	return (
		<div className="sidebar">
			<div className="sidebar-content">
				<div className="user">
					<Avatar src={user.photoURL} />
					<p>Hey {user.displayName}</p>
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
	);
};

export default Sidebar;
