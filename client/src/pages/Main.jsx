import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../style/Main.css";
import SettingsModal from "../components/SettingsModal.jsx";


const Main = () => {
    const [inputValue, setInputValue] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [downloadedTracks, setDownloadedTracks] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="container">
            {message && <p className="message">{message}</p>}
            <h1 className="title">Welcome to NOVA</h1>
            <p className="description">Paste the URL address from YouTube to download the audio.</p>

            <div className="bar">
                <input
                    type="text"
                    className="input"
                    placeholder="Insert URL address"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />

                <div className="buttons-row">
                    <button className="button" onClick={() => setIsModalOpen(true)}>
                        Options
                    </button>
                    <button className="button" disabled={isLoading}>
                        {isLoading ? "Downloading..." : "Download"}
                    </button>
                </div>

                {isModalOpen && <SettingsModal onClose={() => setIsModalOpen(false)} />}
            </div>
        </div>
    );
};

export default Main;