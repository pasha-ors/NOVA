import os
import yt_dlp

FFMPEG_PATH = "/usr/bin/ffmpeg"
OUTPUT_FOLDER = "downloads"

def download_audio(url):

    if not os.path.exists(OUTPUT_FOLDER):
        os.makedirs(OUTPUT_FOLDER)

    try:

        ydl_opts = {
            'format': 'bestaudio/best',
            'outtmpl': os.path.join(OUTPUT_FOLDER, '%(title)s.%(ext)s'),
            'postprocessors': [{
                'key': 'FFmpegExtractAudio',
                'preferredcodec': 'mp3',
                'preferredquality': '192',
            }],
            'noplaylist': True,
            'ffmpeg_location': FFMPEG_PATH
        }

        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(url, download=True)

            file_name = f"{info['title']}.mp3"
            file_path = os.path.join(OUTPUT_FOLDER, file_name)

            audio_info = {
                "title": info.get("title", "Unknown"),
                "artist": info.get("uploader", "Unknown"),
                "file_path": file_path
            }

        return True, file_path, audio_info

    except Exception as e:
        return False, None, str(e)