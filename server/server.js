const express = require("express");
const { formatMessage, addUser, findUser } = require("./utils/utils");
const { createServer } = require("http");
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
	socket.on("join-room", (user) => {
		addUser(socket.id, user.username, user.room);
	});

	socket.broadcast.emit(
		"message",
		formatMessage("bot", `${findUser(socket.id).username} has joined the chat`)
	);

	socket.on("disconnect", () => {
		io.emit("message", `${findUser(socket.id).username} has left the chat`);
	});

	socket.on("chatMessage", (message) => {
		io.emit("message", [formatMessage(socket.id, message)]);
	});
});
const Port = process.env.PORT || 5000;
httpServer.listen(5000, () => console.log("server started"));
