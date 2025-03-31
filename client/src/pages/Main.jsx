import React, { useState, useEffect, useRef } from 'react';
import axiosInstance from "../axiosInstance";
import "../style/Main.css";
import SettingsModal from "../components/SettingsModal.jsx";

const Main = () => {
    const [inputValue, setInputValue] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [downloadedTracks, setDownloadedTracks] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [isListening, setIsListening] = useState(false);
    const recognitionRef = useRef(null);

    const audioRef = useRef(null);
    const [currentlyPlaying, setCurrentlyPlaying] = useState(null);

    useEffect(() => {
        const fetchMusic = async () => {
            try {
                const response = await axiosInstance.get('/music');
                setDownloadedTracks(response.data.music || []);
            } catch (error) {
                console.error('[Fetch Music Error]', error);
            }
        };

        fetchMusic();
    }, []);

    const handleDownload = async () => {
        if (!inputValue) {
            setMessage("Please enter a title or URL.");
            return;
        }

        setIsLoading(true);
        setMessage("");

        try {
            const response = await axiosInstance.post('/music/download', { url: inputValue });
            const track = response.data.data;

            setDownloadedTracks((prev) => [...prev, track]);
            setMessage(`Downloaded: ${track.title}`);
            setInputValue("");
        } catch (error) {
            console.error('[Download Error]', error);
            setMessage("Failed to download audio.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleVoiceCommand = async (text) => {
        const command = text.toLowerCase();

        if (command.includes("download") || command.includes("play")) {
            let query = "";

            if (command.includes("download")) {
                query = command.split("download")[1]?.trim();
            } else if (command.includes("play")) {
                query = command.split("play")[1]?.trim();
            }

            if (query) {
                setIsLoading(true);
                setMessage(`🚀 Searching: ${query}`);
                try {
                    const response = await axiosInstance.post('/music/download', { url: query });
                    const track = response.data.data;

                    setDownloadedTracks((prev) => [...prev, track]);
                    setMessage(`Downloaded: ${track.title}`);
                    setInputValue("");
                } catch (error) {
                    console.error('[Download Error]', error);
                    setMessage("Failed to download audio.");
                } finally {
                    setIsLoading(false);
                }

            } else {
                setMessage("⚠️ No title or URL provided.");
            }
        } else if (command.includes("clear")) {
            setInputValue("");
        } else if (command.includes("settings") || command.includes("options")) {
            setIsModalOpen(true);
        } else {
            setMessage("🤔 Command not recognized: " + command);
        }
    };

    const startListening = () => {
        if (!("webkitSpeechRecognition" in window)) {
            setMessage("Your browser does not support speech recognition.");
            return;
        }

        if (isListening) {
            stopListening();
            return;
        }

        const recognition = new window.webkitSpeechRecognition();
        recognition.lang = "en-US";
        recognition.interimResults = false;
        recognition.continuous = true;

        recognition.onstart = () => {
            setMessage("🎤 Listening... (say “stop listening” to stop)");
            setIsListening(true);
        };

        recognition.onerror = (event) => {
            console.error("[Speech Error]", event.error);
            setMessage("Speech recognition error.");
            setIsListening(false);
        };

        recognition.onresult = (event) => {
            const transcript = event.results[event.results.length - 1][0].transcript;
            console.log("Voice:", transcript);

            if (transcript.toLowerCase().includes("stop listening")) {
                stopListening();
                setMessage("🛑 Listening stopped by voice command.");
            } else {
                handleVoiceCommand(transcript);
            }
        };

        recognition.onend = () => {
            if (isListening) {
                recognition.start(); // restart on end
            }
        };

        recognitionRef.current = recognition;
        recognition.start();
    };

    const stopListening = () => {
        if (recognitionRef.current) {
            recognitionRef.current.stop();
            recognitionRef.current = null;
        }
        setIsListening(false);
        setMessage("🛑 Listening disabled.");
    };


    return (
        <div className="container">
            {message === "" ? (
                <>
                    <h1 className="title">Welcome to NOVA</h1>
                    <p className="description">Paste a YouTube title or URL to download the audio.</p>
                </>
            ) : (
                <p className="message">{message}</p>
            )}

            <div className="bar">
                <input
                    type="text"
                    className="input"
                    placeholder="Enter title or URL"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />

                <div className="buttons-row">
                    <button className="button" onClick={() => setIsModalOpen(true)}>
                        Options
                    </button>

                    <button className="button" onClick={startListening}>
                        {isListening ? "🛑 Stop" : "🎤 Speak"}
                    </button>

                    <button className="button" disabled={isLoading} onClick={handleDownload}>
                        {isLoading ? "Downloading..." : "Download"}
                    </button>
                </div>

                {isModalOpen && <SettingsModal onClose={() => setIsModalOpen(false)} />}
            </div>

            {downloadedTracks.length > 0 && (
                <div className="downloads">
                    <h2 className="downloads-title">Downloaded Tracks</h2>
                    <ul className="downloads-list">
                        {downloadedTracks.map((track, index) => (
                            <li key={index} className="downloads-item">
                                🎵 {track.title}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Main;