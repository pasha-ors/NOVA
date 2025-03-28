import React from 'react';
import "../style/Home.css"

const Home = () => {
    return (
        <div className="home-container">
            <h1 className="big-title">NOVA</h1>
            <div className="content">
                <p>Announcing NOVA</p>
                <div className="buttons">
                    <a href="/about" className="btn">Learn more</a>
                    <a href="/main" className="btn try">Try now ↗</a>
                </div>
            </div>
        </div>
    );
};

export default Home;