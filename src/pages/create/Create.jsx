import { useEffect, useState } from "react";
import Select from "react-select";
//  styles
import "./Create.css";
//  hooks
import { useCollection } from "../../hooks/useCollection";
import { useAuthContext } from "../../hooks/useAuthContext";
import { Timestamp } from "../../firebase/config";
import { useFirestore } from "../../hooks/useFirestore";
import { useNavigate } from "react-router-dom";

const categories = [
	{ value: "development", label: "Development" },
	{ value: "design", label: "Design" },
	{ value: "sales", label: "Sales" },
	{ value: "marketing", label: "Marketing" },
];

const Create = () => {
	const { documents } = useCollection("users");
	const {addDocument, response} = useFirestore('projects')

	const [name, setName] = useState("");
	const [dueDate, setDueDate] = useState("");
	const [details, setDetails] = useState("");
	const [category, setCategory] = useState("");
	const [users, setUsers] = useState([]);
	const [assignedUser, setAssignedUser] = useState([]);
	const [formError, setFormError] = useState(null);
	const { user } = useAuthContext();
	const navigate = useNavigate()

	useEffect(() => {
		if (documents) {
			const results = documents.map((document) => {
				return { value: document, label: document.displayName };
			});
			setUsers(results);
		}
	}, [documents]);

	const handleSubmit = async (e) => {
		setFormError(null);
		e.preventDefault();
		if (!category) {
			setFormError("Please select project category");
			return;
		}
		if (assignedUser.length < 1) {
			setFormError("Please assign the project to atleast 1 user");
			return;
		}

		const createdBy = {
			displayName: user.displayName,
			photoURL: user.photoURL,
			id: user.uid,
		};

		const assignedUserList = assignedUser.map((user) => {
			return {
				displayName: user.value.displayName,
				photoURL: user.value.photoURL,
				id: user.value.id,
			};
		});

		const project = {
			name,
			details,
			category: category.value,
			dueDate: Timestamp.fromDate(new Date(dueDate)),
			comments: [],
			createdBy,
			assignedUserList,
		};

		await addDocument(project)
		if (!response.error) {
			navigate('/')
		}

	};

	return (
		<div className="create-user">
			<h2 className="page-title">Create a new project</h2>
			<form onSubmit={handleSubmit}>
				<label>
					<span>Project Name:</span>
					<input
						type="text"
						required
						onChange={(e) => setName(e.target.value)}
						value={name}
					/>
				</label>
				<label>
					<span>Project Details:</span>
					<textarea
						type="text"
						required
						onChange={(e) => setDetails(e.target.value)}
						value={details}
					/>
				</label>
				<label>
					<span>Project Name:</span>
					<input
						type="date"
						required
						onChange={(e) => setDueDate(e.target.value)}
						value={dueDate}
					/>
				</label>
				<label>
					<span>Project Category:</span>
					<Select
						onChange={(option) => setCategory(option)}
						options={categories}
					/>
				</label>
				<label>
					<span>Assign to:</span>
					<Select
						onChange={(option) => setAssignedUser(option)}
						options={users}
						isMulti
					/>
				</label>
				<button className="btn">Add Project</button>
				{formError && <p className="error">{formError}</p>}
			</form>
		</div>
	);
};

export default Create;
