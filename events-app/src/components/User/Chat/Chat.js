import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';

const Chat = () => {
    const [username, setUsername] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [joined, setJoined] = useState(false);
    const socketRef = useRef();

    useEffect(() => {
        socketRef.current = io.connect('http://localhost:5000');

        socketRef.current.on('chat message', (msg) => {
            setMessages((messages) => [...messages, msg]);
        });

        return () => {
            socketRef.current.disconnect();
        };
    }, []);

    const joinChat = () => {
        socketRef.current.emit('user_join', username);
        setJoined(true);
    };

    const submitMessage = (e) => {
        e.preventDefault();

        socketRef.current.emit('chat message', message);

        setMessages((messages) => [...messages, `${username}: ${message}`]);

        setMessage('');
    };

    if (!joined) {
        return (
            <div>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                />
                <button onClick={joinChat}>JOIN</button>
            </div>
        );
    }

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
                    placeholder="Enter a Message"
                />
                <button>Send</button>
            </form>
        </div>
    );
};

export default Chat;