import React from "react";
import "./userSideBar.css";
const UserSideBar = ({ users }) => {
	return (
		<div className="chat-user-sidebar">
			<h3 className="chat-user-heading">Avaiable Persons</h3>
			<ul className="list-users">
				{users.map((user, id) =>
					user.map((u, i) => (
						<li className="list-users-item" key={i}>
							<span>{i}</span> {u["username"]}
						</li>
					))
				)}
			</ul>
		</div>
	);
};

export default UserSideBar;
