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
			username = username.trim().toLowerCase();
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
								className={`message-container ${handleClassName(
									user.username
								)}`}
							>
								<div className="data-message">
									<span className="chat-user">{user.username}</span>
									<span className="chat-datetime">{user.date}</span>
								</div>
								<p
									className={`message ${handleClassName(
										user.username
									)}-message`}
								>
									{user.message}
								</p>
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
					<i className="fa fa-paper-plane" aria-hidden="true"></i>
				</button>
			</form>
		</div>
	);
};

export default ChatWindow;
