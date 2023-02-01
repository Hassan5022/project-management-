import { Link } from "react-router-dom";

// styles
import "./Navbar.css";

import logo from "../assets/temple.svg";
import {useLogout} from "../hooks/useLogout"

const Navbar = () => {

	const {logout, isPending} = useLogout()

	return (
		<div className="navbar">
			<ul>
				<li className="logo">
					<img src={logo} alt="logo" />
					<span>The Dojo</span>
				</li>
				<li>
					<Link to="/login">Login</Link>
				</li>
				<li>
					<Link to="/signup">Signup</Link>
				</li>
				<li>
					{!isPending && <button className="btn" onClick={logout}>Logout</button>}
					{isPending && <button className="btn" disabled>Logging out...</button>}
				</li>
			</ul>
		</div>
	);
};

export default Navbar;
