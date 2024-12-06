import React, { useState, useEffect } from 'react';

const Chatbox = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        // Create WebSocket connection
        const ws = new WebSocket('ws://localhost:5000');

        ws.onopen = () => {
            console.log('Connected to chat server');
        };

        ws.onmessage = (event) => {
            const message = JSON.parse(event.data);
            setMessages(prev => [...prev, message]);
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
                            <span className="ms-2">{msg.content}</span>
                        </div>
                    ))}
                </div>
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
            </div>
        </div>
    );
};

export { Chatbox };