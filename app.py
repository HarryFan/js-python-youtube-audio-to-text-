import os
from flask import Flask, request, jsonify, render_template
from pytube import YouTube
from pytube.cli import on_progress
from pydub import AudioSegment
import openai
import youtube_dl

app = Flask(__name__)

# 新增的部分：定義根路徑並返回 index.html
@app.route('/')
def index():
    return render_template('index.html')

def download_and_transcribe(url, output_directory, api_key):
    # 建立 YouTube 物件
    yt = YouTube(url, on_progress_callback=on_progress)

    # 取得影片的音軌
    audio_stream = yt.streams.filter(only_audio=True).first()

    # 下載音軌到指定的路徑
    audio_stream.download(output_path=output_directory, filename=f"audio.{audio_stream.subtype}")

    # 讀取下載下來的音檔
    audio_file = AudioSegment.from_file(f"{output_directory}/audio.{audio_stream.subtype}", format=audio_stream.subtype)

    # 切割音檔成多個小檔案
    chunk_size = 100 * 1000  # 100 秒
    chunks = [audio_file[i:i+chunk_size] for i in range(0, len(audio_file), chunk_size)]

    # 使用 OpenAI 的 Audio API 將每個小檔案轉成文字，然後合併在一起
    openai.api_key = api_key
    transcript = ""
    for i, chunk in enumerate(chunks, 1):
        with chunk.export("temp.wav", format="wav") as f:
            result = openai.Audio.transcribe("whisper-1", f)
            transcript += result["text"]

    # 儲存轉換後的文字
    with open(f"{output_directory}/逐字稿.txt", "w") as f:
        f.write(transcript)

    return "轉換完成！"
@app.route('/api/transcribe', methods=['POST'])
def transcribe():
    url = request.form['url']
    output_directory = request.form['output_directory']
    api_key = request.form['api_key']

    result = download_and_transcribe(url, output_directory, api_key)
    return jsonify({"message": result})

if __name__ == '__main__':
    app.run(port=5001)