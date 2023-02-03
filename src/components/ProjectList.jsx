import { Link } from "react-router-dom";
import Avatar from "./Avatar";
import "./ProjectList.css";

const Project = ({ projects }) => {
	return (
		<div className="project-list">
			{projects.length === 0 && <p>No Projects</p>}
			{projects.map((project) => (
				<Link to={`/projects/${project.id}`} key={project.id}>
					<h4>{project.name}</h4>
					<p>Due by {project.dueDate.toDate().toDateString()}</p>
					<div className="assigned-to">
						<ul>
							{project.assignedUserList.map((user) => (
								<li key={user.photoURL}>
									<Avatar src={user.photoURL} />
								</li>
							))}
						</ul>
					</div>
				</Link>
			))}
		</div>
	);
};

export default Project;
