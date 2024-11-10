import React from 'react';

export function Bad() {
    const goBack = () => {
        window.history.back();
    };

    return (
        <div style={{ fontFamily: 'Arial, sans-serif', margin: 0, padding: 0, backgroundColor: '#f4f4f4' }}>
            <header style={{ backgroundColor: '#333', color: 'white', padding: '1rem', textAlign: 'center' }}>
                <h1>No.</h1>
                <p>I don't want to hear from you... I haven't finished the website yet.</p>
                <button className="btn btn-primary" onClick={goBack}>Go Back</button>
            </header>
        </div>
    );
}

export default Bad;
