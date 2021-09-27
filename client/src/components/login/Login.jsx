import React from "react";
import "./login.css";
const Login = ({
	handleUsername,
	handleRoom,
	handleSubmit,
	username,
	room,
}) => {
	console.log(username, room);
	return (
		<div className="join-room-container">
			<div className="form-container">
				<form>
					<h1>Join The Room</h1>
					<input
						type="text"
						value={username}
						placeholder="name"
						onChange={handleUsername}
						required
					/>
					<input
						type="text"
						value={room}
						placeholder="Room"
						onChange={handleRoom}
						required
					/>

					<button type="submit" onClick={handleSubmit}>
						Join room
					</button>
				</form>
			</div>
		</div>
	);
};

export default Login;
