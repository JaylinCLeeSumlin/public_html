const paintings = [];
const thumbnails = [];

window.addEventListener("DOMContentLoaded", () => {

    fetch("paintings.json")
        .then(response => response.json())
        .then(data =>{
            // console.log(data);
            for (let i = 0; i < data.length; i++) {
                thumbnails.push(`./images/small/${data[i].id}.jpg`);
                paintings.push(data[i]);
                displayThumbnails(data[i]);
            }
        });
})

function displayThumbnails(painting) {

    const thumbnailContainer = document.querySelector("ul");
    const insertThumbnail = document.createElement("li");

    const img = document.createElement("img");
    img.src = `./images/small/${painting.id}.jpg`;
    img.dataset.id = painting.id;

    img.addEventListener("click", () => clickedImage(img.dataset.id));

    insertThumbnail.appendChild(img);
    thumbnailContainer.appendChild(insertThumbnail);
}

function clickedImage(imgID) {
    const painting = paintings.find(p => p.id === `${imgID}`);

    var figure = document.querySelector("figure");
    figure.innerHTML = "";

    var paintingTitle = document.querySelector("h2");
    paintingTitle.textContent = painting.title;

    var paintingArtist = document.querySelector("h3");
    paintingArtist.textContent = `By ${painting.artist}`;

    const img = document.createElement("img");
    img.id = "full";
    img.src = `./images/large/${painting.id}.jpg`;

    figure.appendChild(img);


    const paintingFeatures = painting.features;
    for (let i = 0; i < paintingFeatures.length; i++) {
        featureBox = document.createElement("div");
        featureBox.className = "box";
        featureBox.style.position = "absolute";
        featureBox.style.left = `${paintingFeatures[i].upperLeft[0]}px`;
        featureBox.style.top = `${paintingFeatures[i].upperLeft[1]}px`;
        featureBox.style.width = `${paintingFeatures[i].lowerRight[0] - paintingFeatures[i].upperLeft[0]}px`;
        featureBox.style.height = `${paintingFeatures[i].lowerRight[1] - paintingFeatures[i].upperLeft[1]}px`;

        featureBox.addEventListener("mouseover", () => {
            describe = document.querySelector("#description");
            describe.textContent = paintingFeatures[i].description;
            // describe.textContent = "Painting description";
            // console.log(`Painting description: ${paintingFeatures[i].description}`);
        })

        featureBox.addEventListener("mouseout", () => {
            describe = document.querySelector("#description");
            describe.textContent = "";
        })

        figure.appendChild(featureBox);
    }

}