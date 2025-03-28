import React from 'react';
import "../style/About.css"

const About = () => {
    return (
        <div className="about-container">
            <h1 className="about-title">About NOVA</h1>
            <p className="about-text">
                NOVA is a simple music bot available for multiple platforms with open-source code.
                It allows users to download any audio and listen to music effortlessly.
            </p>
            <p className="about-text">
                With a team of dedicated engineers and designers, NOVA provides a seamless experience for music lovers
                worldwide.
            </p>
            <div className="contacts">
                <h2>Contact Us</h2>
                <p><a href="https://github.com/pasha-ors" target="_blank" rel="noopener noreferrer">GitHub</a></p>
                <p><a href="https://www.instagram.com/pas.haors" target="_blank" rel="noopener noreferrer">Instagram</a></p>
            </div>
        </div>
    );
};

export default About;