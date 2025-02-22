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
        }

        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            ydl.download([url])

        print("Download complete.")

    except Exception as e:
        print(f"Error {e}")


if __name__ == "__main__":
    url = input("Enter YouTube video URL: ")
    download_audio(url)