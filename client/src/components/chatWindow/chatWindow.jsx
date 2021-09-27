import "./chatWindow.css";
import React, { useEffect } from "react";
const ChatWindow = ({
	handleSubmit,
	handleChange,
	data,
	username,
	room,
	message,
}) => {
	const scroll = React.useRef();
	useEffect(() => {
		scroll.current.scrollTop = scroll.current.scrollHeight;
	});
	const handleClassName = (name) => {
		if (name) {
			name = name.trim().toLowerCase();
			if (name === "bot") return name;
			if (name === username) return "self";
		}
		return "others";
	};
	return (
		<div className="chat-container">
			<header className="chat-header">{`WelCome to ${room} Room`}</header>
			<div className="chat-window">
				<ul className="chat-messages" ref={scroll}>
					{data.map((user, i) => {
						return (
							<li
								key={i}
								className={`message ${handleClassName(user.username)}`}
							>
								<h3 className="chat-user">{user.username}</h3>
								<p>{user.message}</p>
								<h3 className="chat-datetime">{user.date}</h3>
							</li>
						);
					})}
				</ul>
			</div>
			<form className="chat-input-form">
				<input
					type="text"
					value={message}
					onChange={handleChange}
					onKeyPress={(event) => (event.key === "Enter" ? handleSubmit : null)}
					placeholder="Type your message here"
					className="chat-input"
				/>
				<button type="submit" onClick={handleSubmit} className="message-send">
					click here
				</button>
			</form>
		</div>
	);
};

export default ChatWindow;
