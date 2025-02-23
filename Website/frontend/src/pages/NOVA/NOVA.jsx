import React, { useState } from 'react';
import axios from 'axios';
import "./NOVA.css";

const Nova = () => {
    const [inputValue, setInputValue] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [downloadLink, setDownloadLink] = useState("");
    const [isDownloaded, setIsDownloaded] = useState(false);

    const handleDownload = async () => {
        if (!inputValue) {
            setMessage("Please enter a valid URL");
            return;
        }

        setIsLoading(true);
        setMessage("");
        setDownloadLink("");

        try {
            const response = await axios.post("http://127.0.0.1:5000/download", { url: inputValue });
            setMessage(`${response.data.info.file_name.replace(/\.mp3$/, '')}`);
            setDownloadLink(`http://127.0.0.1:5000/audio/${response.data.info.file_name}`);
            setIsDownloaded(true);
        } catch (error) {
            setMessage("Error downloading audio. Try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container">
            {message && <p className="message">{message}</p>}
            {!isDownloaded && (
                <>
                    <h1 className="title">Welcome to NOVA</h1>
                    <p className="description">Paste the URL address from YouTube to download the audio.</p>
                </>
            )}
            <input
                type="text"
                className="input"
                placeholder="Insert URL address"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
            />
            <div className="download">
                <button className="button" onClick={handleDownload} disabled={isLoading}>
                    {isLoading ? "Downloading..." : "Download"}
                </button>
            </div>
            {downloadLink && (
                <p className="button">
                    <a href={downloadLink} download>Download your file</a>
                </p>
            )}
        </div>
    );
};

export default Nova;
