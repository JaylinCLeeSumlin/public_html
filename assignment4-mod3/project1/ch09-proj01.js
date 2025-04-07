const symbolPlay = '⯈';
const symbolPause = '❚ ❚';
const files = ['Nature-8399','River-655','Waterfall-941','Wave-2737'];

document.addEventListener("DOMContentLoaded", displayImage);

window.addEventListener("DOMContentLoaded", () => {
    const stopButton = document.querySelector("#stop");
    stopButton.addEventListener("click", stopVideo);
});


function displayImage() {

    files.forEach(file => {
        const insertImage = document.querySelector("aside");

        const img = document.createElement("img");
        img.src = `./images/${file.toString()}.jpg`;
        img.alt = `Thumbnail for ${file.toString()}`;

        img.addEventListener("click", () => displayVideo(file));

        insertImage.appendChild(img);
    })
}

function displayVideo(file) {
    const videoSource = document.querySelector("video").querySelector("source");
    videoSource.src = `./videos/${file.toString()}.mp4`;

    const video = document.querySelector("video");
    video.load();
    video.play();
    videoInProgress = true;

    const playPause = document.querySelector("button#play");
    playPause.innerHTML = symbolPause;

    progressBar = document.querySelector("#progressFilled");

    video.addEventListener("timeupdate", () => {
        // const percent = (video.currentTime / video.duration) * 100;
        // progressBar.innerHTML = `${video.currentTime}`;
        const percent = (video.currentTime / video.duration) * 100;
        // progressBar.style.width = `${percent}%`;
        progressBar = `${percent}`;

    });
}

function stopVideo () {
    const video = document.querySelector("video")

    const playPause = document.querySelector("button#play");
    playPause.innerHTML = symbolPlay;
    video.pause();
    videoInProgress = false;

    console.log(`Before: ${video.currentTime}`);
    video.currentTime = 0; 
    console.log(`After: ${video.currentTime}`);
}