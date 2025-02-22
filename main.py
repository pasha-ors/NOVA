from script import download_audio
import sys
from PyQt6.QtWidgets import QApplication, QWidget, QVBoxLayout, QLabel, QLineEdit, QPushButton, QFileDialog, QMessageBox
from PyQt6.QtCore import QThread, pyqtSignal

class DownloadThread(QThread):
    finished = pyqtSignal(bool, str)

    def __init__(self, url, output_folder):
        super().__init__()
        self.url = url
        self.output_folder = output_folder

    def run(self):
        success, message = download_audio(self.url, self.output_folder)
        self.finished.emit(success, message)

class YouTubeDownloader(QWidget):
    def __init__(self):
        super().__init__()
        self.init_ui()

    def init_ui(self):
        self.setWindowTitle("YouTube Audio Downloader")
        self.setGeometry(100, 100, 400, 200)

        layout = QVBoxLayout()

        self.label = QLabel("Enter YouTube URL:")
        layout.addWidget(self.label)

        self.url_input = QLineEdit()
        layout.addWidget(self.url_input)

        self.download_button = QPushButton("Download")
        self.download_button.clicked.connect(self.handle_download)
        layout.addWidget(self.download_button)

        self.setLayout(layout)

    def handle_download(self):

        url = self.url_input.text().strip()
        if not isinstance(url, str) or not url:
            QMessageBox.warning(self, "Error", "Please enter a valid URL")
            return

        output_folder = QFileDialog.getExistingDirectory(self, "Select Download Folder")

        if not isinstance(output_folder, str) or not output_folder:
            return

        self.download_button.setEnabled(False)
        self.thread = DownloadThread(url, output_folder)
        self.thread.finished.connect(self.on_download_complete)
        self.thread.start()

    def on_download_complete(self, success, message):
        self.download_button.setEnabled(True)
        if success:
            QMessageBox.information(self, "Success", "Download complete!")
        else:
            QMessageBox.critical(self, "Error", f"Download failed: {message}")

if __name__ == "__main__":
    app = QApplication(sys.argv)
    window = YouTubeDownloader()
    window.show()
    sys.exit(app.exec())