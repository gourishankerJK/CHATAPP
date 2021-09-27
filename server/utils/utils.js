const moment = require("moment");
var data = [];

const formatMessage = (username, text) => {
	return {
		username: username,
		message: text,
		date: moment().format("h:mm:ss a"),
	};
};
const addUser = (id, username, room) => {
	username = username.trim().toLowerCase();
	room = room.trim().toLowerCase();
	const existingUser = data.find(
		(user) => user.room === room && user.username === username
	);
	if (existingUser) {
		return { error: "Username is already taken" };
	}
	const user = {
		id,
		username,
		room,
	};
	data.push(user);
	return { user };
};
const getUser = (id) => {
	const user = data.find((user) => user.id === id);
	return user;
};
const getUsersInRoom = (room) => {
	return data.filter((user) => user.room === room);
};
const removeUser = (id) => {
	const index = data.findIndex((user) => user.id === id);
	console.log(index);
	if (index !== -1) {
		return data.splice(index, 1)[0];
	}
};
module.exports = {
	formatMessage,
	getUser,
	getUsersInRoom,
	addUser,
	removeUser,
};
