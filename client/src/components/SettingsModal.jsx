import React, { useState } from "react";
import "../style/SettingsModal.css"

const SettingsModal = ({ onClose }) => {
    const [selectedModel, setSelectedModel] = useState("name");

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2 className="modal-title">Select Option</h2>
                <button className="close-btn" onClick={onClose}>✖</button>

                <div className="options">

                    <label className={`option ${selectedModel === "name" ? "active" : ""}`}>
                        <input
                            type="radio"
                            className="hidden-radio"
                            name="model"
                            value="name"
                            checked={selectedModel === "name"}
                            onChange={() => setSelectedModel("name")}
                        />
                        NAME
                    </label>

                    <label className={`option ${selectedModel === "url" ? "active" : ""}`}>
                        <input
                            type="radio"
                            className="hidden-radio"
                            name="model"
                            value="url"
                            checked={selectedModel === "url"}
                            onChange={() => setSelectedModel("url")}
                        />
                        URL
                    </label>
                </div>

                <button className="button" onClick={onClose}>Apply</button>
            </div>
        </div>
    );
};

export default SettingsModal;