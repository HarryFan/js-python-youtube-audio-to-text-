$(document).ready(function () {
    $("#transcriptionForm").on("submit", function (e) {
        e.preventDefault();

        const youtubeUrl = $("#youtubeUrl").val();
        const outputPath = $("#outputPath").val();
        const apiKey = $("#apiKey").val();

        $("#progress").text("下載和轉換中...");

        $.post("/api/transcribe", {
            url: youtubeUrl,
            output_directory: outputPath,
            api_key: apiKey
        })
            .done(function (response) {
                $("#progress").text(response.message);
            })
            .fail(function (error) {
                $("#progress").text("發生錯誤，請重試。");
            });
    });
});
