import React from "react";
import "./userSideBar.css";
const UserSideBar = ({ users }) => {
	return (
		<div className="chat-user-sidebar">
			<h3 className="chat-user-heading">Avaiable Persons</h3>
			<ul className="list-users">
				{users.map((user, id) => (
					<li className="list-users-item" key={id}>
						{user.username.toUpperCase()}
					</li>
				))}
			</ul>
		</div>
	);
};

export default UserSideBar;
