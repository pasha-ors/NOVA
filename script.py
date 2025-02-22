import yt_dlp
import ffmpeg
import os


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
            'noplaylist': True,  # Prevents downloading full playlists  # Use cookies to bypass restrictions
            'ffmpeg_location': r"ffmpeg\ffmpeg-2025-02-20-git-bc1a3bfd2c-full_build\ffmpeg-2025-02-20-git-bc1a3bfd2c-full_build\bin"
        }

        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            ydl.download([url])

        return True, "Download complete!"

    except Exception as e:
        return False, str(e)