from flask import Blueprint, request, jsonify, send_from_directory
import os

from Script.script import download_audio

api_bp = Blueprint('api', __name__)

DOWNLOAD_FOLDER = "downloads"
os.makedirs(DOWNLOAD_FOLDER, exist_ok=True)

@api_bp.route('/')
def home():
    return jsonify({"message": "Welcome to NOVA Music Bot API"})

@api_bp.route('/status')
def status():
    return jsonify({"status": "running", "service": "NOVA Music Bot API"})


@api_bp.route("/download", methods=['POST'])
def download():

    data = request.get_json()
    url = data.get("url")

    if not url:
        return jsonify({"success": False, "error": "No URL provided"}), 400

    success, file_path, audio_info = download_audio(url, DOWNLOAD_FOLDER)

    if success:
        return jsonify({"success": True, "file": file_path, "info": audio_info})
    else:
        return jsonify({"success": False, "error": audio_info}), 500

@api_bp.route('/audio/<filename>')
def get_audio(filename):
    return send_from_directory(DOWNLOAD_FOLDER, filename, as_attachment=True)