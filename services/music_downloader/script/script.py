import os
import yt_dlp

FFMPEG_PATH = "/usr/bin/ffmpeg"

def download_audio(url, output_folder="downloads"):

    if not os.path.exists(output_folder):
        os.makedirs(output_folder)

    try:

        ydl_opts = {
            'format': 'bestaudio/best',
            'outtmpl': os.path.join(output_folder, '%(title)s.%(ext)s'),
            'postprocessors': [{
                'key': 'FFmpegExtractAudio',
                'preferredcodec': 'mp3',
                'preferredquality': '192',
            }],
            'noplaylist': True,
            'ffmpeg_location': FFMPEG_PATH
        }

        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(url, download=True)  # Извлекаем информацию о файле

            file_name = f"{info['title']}.mp3"
            file_path = os.path.join(output_folder, file_name)

            audio_info = {
                "title": info.get("title", "Unknown"),
                "uploader": info.get("uploader", "Unknown"),
                "duration": info.get("duration", 0),
                "file_name": file_name,
                "file_path": file_path
            }

        return True, file_path, audio_info

    except Exception as e:
        return False, None, str(e)