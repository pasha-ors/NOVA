FROM python:3.10

WORKDIR /app
COPY requirements.txt /app/

RUN pip install --no-cache-dir -r requirements.txt
RUN apt-get update && apt-get install -y ffmpeg && apt-get clean && rm -rf /var/lib/apt/lists/*eg

COPY . /app

EXPOSE 5001

CMD ["python", "main.py"]