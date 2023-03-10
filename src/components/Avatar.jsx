// styles
import "./Avatar.css";

const Avatar = ({ src }) => {
	return (
		<div className="avatar">
			<img src={src} alt="profile logo" />
		</div>
	);
};

export default Avatar;
