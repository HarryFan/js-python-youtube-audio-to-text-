document.getElementById("transcriptionForm").addEventListener("submit", async function (event) {
    event.preventDefault();
    

    const youtubeUrl = document.getElementById("youtubeUrl").value;
    const apiKey = document.getElementById("apiKey").value;
    const progress = document.getElementById("progress");
    const progressBar = document.querySelector(".progress-bar");

    if (!youtubeUrl || !apiKey) {
        progress.textContent = "請填寫完整資料";
        return;
    }

    // 顯示進度條
    document.querySelector(".progress").style.display = "block";
    progressBar.style.width = "0%";
    progressBar.setAttribute("aria-valuenow", "0");

    progress.textContent = "正在下載和轉換...";

    // 在此添加處理進度的代碼
    // ...
    // 模擬進度條增長
    let progressValue = 0;
    const progressInterval = setInterval(() => {
        progressValue += 10;
        progressBar.style.width = progressValue + "%";
        progressBar.setAttribute("aria-valuenow", progressValue);

        if (progressValue >= 100) {
            clearInterval(progressInterval);
            progress.textContent = "轉換完成！";
            progressBar.classList.remove("progress-bar-animated");

            // 模擬下載逐字稿
            const transcriptBlob = new Blob(["模擬逐字稿內容"], { type: "text/plain;charset=utf-8" });
            const downloadLink = document.createElement("a");
            downloadLink.href = URL.createObjectURL(transcriptBlob);
            downloadLink.download = "逐字稿.txt";
            downloadLink.click();
        }
    }, 1000);
});
