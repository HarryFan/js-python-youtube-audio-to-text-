import os
from flask import Flask, request, jsonify, render_template
from pytube import YouTube
from pytube.cli import on_progress as pytube_on_progress
from pydub import AudioSegment
import openai
import youtube_dl
from flask_socketio import SocketIO, emit

app = Flask(__name__, static_folder="static")
socketio = SocketIO(app, cors_allowed_origins="*")

@app.route('/')
def index():
    return render_template('index.html')

def on_progress(stream, chunk, bytes_remaining, socket):
    progress = (1 - bytes_remaining / stream.filesize) * 100
    print(f"下載進度：{progress:.1f}%")
    socket.emit('download_progress', {'progress': progress})

def download_and_transcribe(url, output_directory, api_key, socket):
    yt = YouTube(url, on_progress_callback=lambda stream, chunk, bytes_remaining: on_progress(stream, chunk, bytes_remaining, socket))

    audio_stream = yt.streams.filter(only_audio=True).first()

    audio_stream.download(output_path=output_directory, filename=f"audio.{audio_stream.subtype}")

    audio_file = AudioSegment.from_file(f"{output_directory}/audio.{audio_stream.subtype}", format=audio_stream.subtype)

    chunk_size = 100 * 1000
    chunks = [audio_file[i:i+chunk_size] for i in range(0, len(audio_file), chunk_size)]

    openai.api_key = api_key
    transcript = ""
    for i, chunk in enumerate(chunks, 1):
        with chunk.export("temp.wav", format="wav") as f:
            result = openai.Audio.transcribe("whisper-1", f)
            transcript += result["text"]

    with open(f"{output_directory}/逐字稿.txt", "w") as f:
        f.write(transcript)

    return "轉換完成！"

@app.route('/api/transcribe', methods=['POST'])
def transcribe():
    url = request.form['url']
    output_directory = request.form['output_directory']
    api_key = request.form['api_key']

    result = download_and_transcribe(url, output_directory, api_key, socketio)
    return jsonify({"message": result})

if __name__ == '__main__':
    socketio.run(app, port=5006)
