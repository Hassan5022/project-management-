// styles
import "./App.css";

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

// hooks
import { useAuthContext } from "./hooks/useAuthContext";
// pages
import Create from "./pages/create/Create";
import Dashboard from "./pages/dashboard/Dashboard";
import Login from "./pages/login/Login";
import Project from "./pages/project/Project";
import Signup from "./pages/signup/Signup";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import OnlineUser from "./components/OnlineUser";

function App() {
	const { user, authIsReady } = useAuthContext();

	return (
		<div className="App">
			{authIsReady && (
				<BrowserRouter>
					{user && <Sidebar />}
					<div className="container">
						<Navbar />
						<Routes>
							{user && <Route path="/" element={<Dashboard />} />}
							{!user && <Route path="/" element={<Navigate to="/login" />} />}

							{user && <Route path="/create" element={<Create />} />}
							{!user && (
								<Route path="/create" element={<Navigate to="/login" />} />
							)}

							{user && <Route path="/projects/:id" element={<Project />} />}
							{!user && (
								<Route
									path="/projects/:id"
									element={<Navigate to="/login" />}
								/>
							)}

							{!user && <Route path="/login" element={<Login />} />}
							{user && <Route path="/login" element={<Navigate to="/" />} />}

							{!user && <Route path="/signup" element={<Signup />} />}
							{user && <Route path="/signup" element={<Navigate to="/" />} />}
						</Routes>
					</div>
					{user && <OnlineUser />}
				</BrowserRouter>
			)}
		</div>
	);
}

export default App;
