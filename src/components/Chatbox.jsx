import React, { useState, useEffect, useRef } from 'react';

export function Chatbox() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const ws = useRef(null);

    useEffect(() => {
        ws.current = new WebSocket('ws://localhost:4000');
        ws.current.onmessage = (event) => {
            const message = JSON.parse(event.data);
            setMessages((prevMessages) => [...prevMessages, message]);
        };
        return () => {
            ws.current.close();
        };
    }, []);

    const sendMessage = () => {
        if (input.trim()) {
            const message = { text: input, timestamp: new Date() };
            ws.current.send(JSON.stringify(message));
            setInput('');
        }
    };

    return (
        <div style={{ position: 'fixed', bottom: '20px', right: '20px', width: '300px', border: '1px solid #ccc', borderRadius: '5px', backgroundColor: 'white', padding: '10px' }}>
            <div style={{ maxHeight: '200px', overflowY: 'auto', marginBottom: '10px' }}>
                {messages.map((msg, index) => (
                    <div key={index} style={{ marginBottom: '5px' }}>
                        <strong>{msg.timestamp}</strong>: {msg.text}
                    </div>
                ))}
            </div>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                style={{ width: '80%', marginRight: '5px' }}
            />
            <button onClick={sendMessage} style={{ width: '15%' }}>Send</button>
        </div>
    );
}

export default Chatbox;