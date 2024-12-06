import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Chatbox = ({ username }) => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
        const wsUrl = process.env.NODE_ENV === 'production'
            ? `${protocol}//${window.location.host}/ws`
            : 'ws://localhost:4000/ws';

        const ws = new WebSocket(wsUrl);

        ws.onopen = () => {
            console.log('Connected to chat server');
        };

        ws.onmessage = async (event) => {
            try {
                let messageData;
                if (event.data instanceof Blob) {
                    const text = await event.data.text();
                    messageData = JSON.parse(text);
                } else {
                    messageData = JSON.parse(event.data);
                }
                setMessages(prev => [...prev, messageData]);
            } catch (error) {
                console.error('Error parsing message:', error);
            }
        };

        ws.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        ws.onclose = () => {
            console.log('Disconnected from chat server');
        };

        setSocket(ws);

        // Cleanup on component unmount
        return () => {
            ws.close();
        };
    }, []);

    const handleSend = () => {
        if (socket && input.trim()) {
            const message = {
                type: 'message',
                content: input.trim(),
                username: username,
                timestamp: new Date().toISOString()
            };
            
            socket.send(JSON.stringify(message));
            setInput('');
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    };

    return (
        <div className="card shadow">
            <div className="card-body">
                <div className="messages-container bg-light p-3 mb-3" style={{ height: '300px', overflowY: 'auto' }}>
                    {messages.map((msg, index) => (
                        <div key={index} className="message mb-2">
                            <small className="text-muted">
                                {new Date(msg.timestamp).toLocaleTimeString()}
                            </small>
                            <strong className="ms-2 text-primary">{msg.username}:</strong>
                            <span className="ms-2">{msg.content}</span>
                        </div>
                    ))}
                </div>
                {username ? (
                    <div className="input-group">
                        <input
                            type="text"
                            className="form-control"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Type a message..."
                        />
                        <button 
                            className="btn btn-primary" 
                            onClick={handleSend}
                        >
                            Send
                        </button>
                    </div>
                ) : (
                    <div className="text-center">
                        <p className="mb-0">Please <Link to="/login">login</Link> to join the conversation.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export { Chatbox };