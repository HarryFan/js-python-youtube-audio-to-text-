js-python-youtube-audio-to-text
===============================

這是一個使用 JavaScript 和 Python 開發的 Web 應用程式，旨在將 YouTube 影片的音頻轉換成文字。

目錄
--

*   [功能](https://chat.openai.com/chat?model=gpt-4#%E5%8A%9F%E8%83%BD)
    
*   [環境需求](https://chat.openai.com/chat?model=gpt-4#%E7%92%B0%E5%A2%83%E9%9C%80%E6%B1%82)
    
*   [安裝與設定](https://chat.openai.com/chat?model=gpt-4#%E5%AE%89%E8%A3%9D%E8%88%87%E8%A8%AD%E5%AE%9A)
    
*   [使用方法](https://chat.openai.com/chat?model=gpt-4#%E4%BD%BF%E7%94%A8%E6%96%B9%E6%B3%95)
    
*   [開發者資訊](https://chat.openai.com/chat?model=gpt-4#%E9%96%8B%E7%99%BC%E8%80%85%E8%B3%87%E8%A8%8A)
    

功能
--

*   簡單易用的 Web 介面，使用 jQuery 和 Bootstrap 4 構建
    
*   下載 YouTube 音頻並轉換成文字
    
*   選擇音頻保存的路徑
    
*   下載和轉錄進度顯示
    

環境需求
----

*   Python 3.x
    
*   Node.js
    
*   pip
    
*   npm or yarn
    

安裝與設定
-----

1.  克隆此專案：
    
    ```
    git clone https://github.com/your-username/js-python-youtube-audio-to-text.git
    ```
2.  安裝前端依賴：
    
    ```
    cd js-python-youtube-audio-to-text
    npm install
    ```
3.  安裝後端依賴：
    
    ```
    pip install -r requirements.txt
    ```
4.  設定 OpenAI API 金鑰：
    
    將您的 OpenAI API 金鑰添加到環境變量中，或直接在 `server.py` 中設定。
    
    ```
    export OPENAI\_API\_KEY=your\_openai\_api_key
    ```

使用方法
----

1.  啟動 Web 伺服器：
    
    ```
    arduinoCopy codenpm run start
    ```
2.  使用瀏覽器訪問應用程式：
    
    打開瀏覽器，訪問 [http://localhost:3000](http://localhost:3000/)。
    
3.  輸入 YouTube URL、選擇儲存路徑，然後點擊「開始下載和轉換」。
    
4.  等待下載和轉換過程完成，之後可以在選擇的路徑找到轉換後的文字檔案。
    

開發者資訊
-----

*   前端：JavaScript (jQuery), Bootstrap 4
    
*   後端：Python (Flask), OpenAI API
    
*   音頻處理：pytube, pydub
    

有關更多開發資訊，請查看專案源碼及相關註解。