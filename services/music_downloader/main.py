from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import os

from script.script import download_audio

app = Flask(__name__)
CORS(app)

@app.route('/download', methods=['POST'])
def download():
    data = request.json
    url = data.get("url")

    if not url:
        return jsonify({"error": "URL is required"}), 400

    success, file_path, audio_info = download_audio(url)

    if success:
        return jsonify({
            "message": "Download successful",
            "data": audio_info
        }), 200
    else:
        return jsonify({
            "error": "Download failed",
            "message": audio_info
        }), 500

@app.route('/audio/<filename>', methods=['GET'])
def get_audio(filename):
    return send_from_directory("./downloads", filename, as_attachment=True)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)