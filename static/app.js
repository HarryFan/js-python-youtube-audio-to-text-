document.getElementById("transcriptionForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const youtubeUrl = document.getElementById("youtubeUrl").value;
    const apiKey = document.getElementById("apiKey").value;
    const progress = document.getElementById("progress");
    const progressBar = document.querySelector(".progress-bar");
    const socket = io.connect('http://' + document.domain + ':' + location.port);


    socket.on('download_progress', function (data) {
        const progressValue = data.progress.toFixed(1);
        progressBar.style.width = progressValue + "%";
        progressBar.setAttribute("aria-valuenow", progressValue);
    });
    
    if (!youtubeUrl || !apiKey) {
        progress.textContent = "請填寫完整資料";
        return;
    }

    // 顯示進度條
    document.querySelector(".progress").style.display = "block";
    progressBar.style.width = "0%";
    progressBar.setAttribute("aria-valuenow", "0");

    progress.textContent = "正在下載和轉換...";

    try {
        const response = await fetch('/api/transcribe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                url: youtubeUrl,
                api_key: apiKey
            })
        });

        const data = await response.json();

        if (data.message === "轉換完成！") {
            progress.textContent = "轉換完成！";
            progressBar.classList.remove("progress-bar-animated");

            // 模擬下載逐字稿
            const transcriptBlob = new Blob(["模擬逐字稿內容"], { type: "text/plain;charset=utf-8" });
            const downloadLink = document.createElement("a");
            downloadLink.href = URL.createObjectURL(transcriptBlob);
            downloadLink.download = "逐字稿.txt";
            downloadLink.click();
        } else {
            progress.textContent = "發生錯誤";
        }

    } catch (error) {
        console.error(error);
        progress.textContent = "發生錯誤";
    }
});
