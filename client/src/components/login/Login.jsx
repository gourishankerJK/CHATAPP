import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./login.css";
const Login = ({ error, handleUsername, handleRoom }) => {
	useEffect(() => {
		if (error) alert(error);
	}, [error]);
	return (
		<div className="join-room-container">
			<div className="form-container">
				<form>
					<h1>Join The Room</h1>
					<input
						type="text"
						placeholder="name"
						onChange={handleUsername}
						required
					/>
					<input
						type="text"
						placeholder="Room"
						onChange={handleRoom}
						required
					/>
					<Link to="/chat">
						<button type="submit">Join room</button>
					</Link>
				</form>
			</div>
		</div>
	);
};

export default Login;
