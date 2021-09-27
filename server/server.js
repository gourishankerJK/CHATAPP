const express = require("express");
const {
	formatMessage,
	getUser,
	getUsersInRoom,
	removeUser,
	addUser,
} = require("./utils/utils.js");
const { createServer, get } = require("http");
const { Server } = require("socket.io");
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
	cors: {
		origin: "http://localhost:3000",
		methods: ["GET", "POST"],
		transports: ["websocket"],
	},
});

io.on("connection", (socket) => {
	socket.on("join-room", ({ username, room }, callback) => {
		const { error, user } = addUser(socket.id, username, room);

		if (error) {
			return callback(error);
		}

		socket.emit(
			"message",
			formatMessage("bot", `Welcome ${user.username} to the ${user.room} room `)
		);
		socket.broadcast
			.to(user.room)
			.emit(
				"message",
				formatMessage("bot", `${user.username} has joined the chat`)
			);
		socket.join(user.room);
		io.to(user.room).emit("users", getUsersInRoom(user.room));
		callback();
	});
	socket.on("chatMessage", (message, callback) => {
		const user = getUser(socket.id);
		if (!user) {
			return callback({ error: "Server disconnected , Login again!" });
		}
		io.to(user.room).emit("chatMessage", formatMessage(user.username, message));
		callback();
	});
	socket.on("disconnect", () => {
		const user = removeUser(socket.id);
		if (user)
			io.to(user.room).emit(
				"message",
				formatMessage("bot", `${user.username} has left the chat`)
			);
	});
});
const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => console.log("server started"));
