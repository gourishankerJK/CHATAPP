import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import ChatRoom from "./components/chatRoom/ChatRoom";
import Login from "./components/login/Login";
import Header from "./components/header/Header";
import "./App.css";
import Footer from "./components/footer/footer";
const App = () => {
	const [username, setUsername] = useState("");
	const [room, setRoom] = useState("");
	let error = "";
	const handleUsername = (event) => {
		setUsername(event.currentTarget.value);
	};
	const handleRoom = (event) => {
		setRoom(event.currentTarget.value);
	};
	const handleJoin = () => {
		if (username && room) {
			error = "";
			return true;
		}
		error = "Join the room first";
		return false;
	};
	return (
		<div className="container">
			<Header />
			<Switch>
				{handleJoin() && (
					<Route
						path="/chat"
						render={() => <ChatRoom username={username} room={room} />}
					/>
				)}
				<Route
					path="/"
					render={() => (
						<Login
							error={error}
							handleUsername={handleUsername}
							handleRoom={handleRoom}
						/>
					)}
				/>
			</Switch>
			<Footer />
		</div>
	);
};

export default App;
