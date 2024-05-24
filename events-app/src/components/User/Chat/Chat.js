import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';

const Chat = () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const socketRef = useRef();

    useEffect(() => {
        // Connect to the server
        socketRef.current = io.connect('http://localhost:4000');

        // Listen for incoming messages
        socketRef.current.on('chat message', (msg) => {
            setMessages((messages) => [...messages, msg]);
        });

        // Disconnect when the component unmounts
        return () => {
            socketRef.current.disconnect();
        };
    }, []);

    const submitMessage = (e) => {
        e.preventDefault();

        // Emit the message to the server
        socketRef.current.emit('chat message', message);

        // Add the message to the local state
        setMessages((messages) => [...messages, message]);

        // Clear the input field
        setMessage('');
    };

    return (
        <div>
            <ul id="messages">
                {messages.map((msg, index) => (
                    <li key={index}>{msg}</li>
                ))}
            </ul>
            <form id="form" onSubmit={submitMessage}>
                <input
                    id="input"
                    autoComplete="off"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button>Send</button>
            </form>
        </div>
    );
};

export default Chat;