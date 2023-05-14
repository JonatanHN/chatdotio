// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:3001");

const App = () => {
	const [messages, setMessages] = useState([]);
	const [messageInput, setMessageInput] = useState("");
	useEffect(() => {
		socket.on("chat message", (message) => {
			setMessages((prevMessages) => [...prevMessages, message]);
		});
		return () => {
			socket.off("chat message");
		};
	}, []);

	const handleSendMessage = (e) => {
		e.preventDefault();
		if (messageInput.trim() !== "") {
			socket.emit("chat message", messageInput);
			setMessageInput("");
		}
	};

	return (
		<div className="container">
			<div className="container-messages">
				{messages.map((message, index) => (
					<div className="message" key={index}>{message}</div>
				))}
			</div>
			<form className="container-form" onSubmit={handleSendMessage}>
				<input
          className="i-message"
					type="text"
					value={messageInput}
          placeholder="Escribe tu mensaje aquí"
					onChange={(e) => setMessageInput(e.target.value)}
				/>
				<button className="b-message" type="submit">Enviar</button>
			</form>
		</div>
	);
};

export default App;
