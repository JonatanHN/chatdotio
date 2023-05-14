const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
	cors: {
		origin: "http://localhost:5173",
		methods: ["GET", "POST"],
		allowedHeaders: ["my-custom-header"],
		credentials: true,
	},
});

app.use(
	cors({
		origin: "http://localhost:5173",
		methods: ["GET", "POST"],
		allowedHeaders: ["my-custom-header"],
		credentials: true,
	})
);

io.on("connection", (socket) => {
	console.log("Nuevo cliente conectado");

	socket.on("disconnect", () => {
		console.log("Cliente desconectado");
	});

	socket.on("chat message", (message) => {
		console.log("Mensaje recibido:", message);
		io.emit("chat message", message);
	});
});

server.listen(3001, () => {
	console.log("Servidor Socket.io escuchando en el puerto 3001");
});
