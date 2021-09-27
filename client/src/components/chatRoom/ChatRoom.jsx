import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { io } from "socket.io-client";
import ChatWindow from "../chatWindow/chatWindow";
import UserSideBar from "../userSidebar/userSideBar";
import "./chatRoom.css";
let socket;
const ChatRoom = ({ username, room }) => {
	const [data, setData] = useState([]);
	const [message, setMessage] = useState("");
	const [users, setUsers] = useState([]);
	const ENDPOINT = "http://localhost:5000";
	const history = useHistory();
	useEffect(() => {
		if (!username || !room) {
			history.replace("/");
			alert("Before entering the room , Enter your name first!");
		}
	}, []);
	useEffect(() => {
		socket = io(ENDPOINT, { transports: ["websocket"] });
		socket.emit("join-room", { username, room }, (error) => {
			if (error) {
				alert(error.error);
				history.replace("/");
			}
		});
		socket.on("message", (payload) => {
			setData((data) => [...data, payload]);
		});
		return () => {
			socket.disconnect();
		};
	}, [username, room]);

	useEffect(() => {
		socket.on("chatMessage", (payload) => {
			setData([...data, payload]);
		});
	}, [data]);

	useEffect(() => {
		socket.on("users", (payload) => {
			setUsers(payload);
		});
	}, [users]);

	const handleMessage = ({ currentTarget }) => {
		setMessage(currentTarget.value);
	};
	const handleSubmit = (event) => {
		event.preventDefault();
		socket.emit("chatMessage", message, (error) => {
			if (error) {
				alert(error.error);
				history.replace("/");
			}
			setMessage((message) => "");
		});
	};

	return (
		<div className="chat-outer-container">
			<ChatWindow
				username={username}
				room={room}
				message={message}
				handleChange={handleMessage}
				handleSubmit={handleSubmit}
				data={data}
			/>
			<UserSideBar users={users} />
		</div>
	);
};

export default ChatRoom;
