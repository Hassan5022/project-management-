import "./OnlineUser.css";
import { useCollection } from "../hooks/useCollection";
import Avatar from "./Avatar";

const OnlineUser = () => {
	const { error, documents } = useCollection("users");

	return (
		<div className="user-list">
			<h2>All Users</h2>
			{error && <div className="error">{error}</div>}
			{documents &&
				documents.map((document) => (
                    <div key={document.id} className="user-list-item">
                        {document.online && <span className="online-user"></span> }
						<span>{document.displayName}</span>
						<Avatar src={document.photoURL} />
					</div>
				))}
		</div>
	);
};

export default OnlineUser;
