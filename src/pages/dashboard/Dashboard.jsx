import { useState } from "react";
import ProjectFilter from "./ProjectFilter";
import ProjectList from "../../components/ProjectList";
import { useCollection } from "../../hooks/useCollection";
import { useAuthContext } from "../../hooks/useAuthContext";
//  styles
import "./Dashboard.css";

const Dashboard = () => {
	const { documents } = useCollection("projects");
	const [currentFilter, setCurrentFilter] = useState("all");
	const { user } = useAuthContext();

	const changeFilter = (newFilter) => {
		setCurrentFilter(newFilter);
	};

	const filterProjects = documents
		? documents.filter((document) => {
				switch (currentFilter) {
					case "all":
						return true;
					case "mine":
						let assignedToMe = false;
						document.assignedUserList.forEach((u) => {
							if (user.uid === u.id) {
								assignedToMe = true;
							}
						});
						return assignedToMe;
					case "development":
					case "design":
					case "marketing":
					case "sales":
						return document.category === currentFilter;
					default:
						return true;
				}
		  })
		: null;

	return (
		<div>
			<h2 className="page-title">Dashboard</h2>
			{documents && (
				<ProjectFilter
					currentFilter={currentFilter}
					changeFilter={changeFilter}
				/>
			)}
			{filterProjects && <ProjectList projects={filterProjects} />}
		</div>
	);
};

export default Dashboard;
