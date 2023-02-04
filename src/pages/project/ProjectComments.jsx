import { useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { Timestamp } from "../../firebase/config";
import { useFirestore } from "../../hooks/useFirestore";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import Avatar from "../../components/Avatar";

const ProjectComments = ({ project }) => {
	const { user } = useAuthContext();
	const [newComment, setNewComment] = useState("");
	const { updateDocument, response } = useFirestore("projects");

	const handleSubmit = async (e) => {
		e.preventDefault();
		const commentToAdd = {
			displayName: user.displayName,
			photoURL: user.photoURL,
			content: newComment,
			id: Math.random(),
			createdAt: Timestamp.fromDate(new Date()),
		};

		await updateDocument(project.id, {
			comments: [...project.comments, commentToAdd],
		});
		if (!response.error) {
			setNewComment("");
		}
		if (response.error) {
			console.log(response.error);
		}
	};

	return (
		<div className="project-comments">
			<h4>Project Comments</h4>
			<ul>
				{project.comments.length > 0 &&
					project.comments.map((comment) => (
						<li key={comment.id}>
							<div className="comment-auther">
								<Avatar src={comment.photoURL} />
								<p>{comment.displayName}</p>
							</div>
							<div className="comment-date">
								<p>
									{formatDistanceToNow(comment.createdAt.toDate(), {
										addSuffix: true,
									})}
								</p>
							</div>
							<div className="comment-content">
								<p>{comment.content}</p>
							</div>
						</li>
					))}
			</ul>
			<form className="add-comments" onSubmit={handleSubmit}>
				<label>
					<span>Add new comment:</span>
					<textarea
						required
						onChange={(e) => setNewComment(e.target.value)}
						value={newComment}
					/>
				</label>
				<button className="btn">Add Comment</button>
			</form>
		</div>
	);
};

export default ProjectComments;
