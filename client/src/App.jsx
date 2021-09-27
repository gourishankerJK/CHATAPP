import React, { useState } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import ChatRoom from "./components/chatRoom/ChatRoom";
import Login from "./components/login/Login";
import Header from "./components/header/Header";
import "./App.css";
import Footer from "./components/footer/footer";
const App = () => {
	const [username, setUsername] = useState("");
	const [room, setRoom] = useState("");
	const history = useHistory();

	const handleSubmit = () => {
		if (username && room) history.replace("/chat");
	};

	const handleUsername = (event) => {
		setUsername(event.currentTarget.value);
	};
	const handleRoom = (event) => {
		setRoom(event.target.value);
	};
	return (
		<div className="container">
			<Header />
			<Switch>
				<Route
					path="/chat"
					render={() => <ChatRoom username={username} room={room} />}
				/>
				<Route
					path="/"
					render={() => (
						<Login
							username={username}
							room={room}
							handleUsername={handleUsername}
							handleRoom={handleRoom}
							handleSubmit={handleSubmit}
						/>
					)}
				/>
			</Switch>
			<Footer />
		</div>
	);
};

export default App;
