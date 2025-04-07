const fs = require('fs');

// Function to load and parse the photo-data.js file
function loadProducts() {
    // Read the photo-data.js file as text
    let jsonData;
    fs.readFile('./js/photo-data.js', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading the file:', err);
            return;
        }

        try {
            // Since the content is a string, remove the `const content = ` part to extract the JSON string
            // If the entire content is wrapped with `const content = `, we can remove it using a regular expression.
            const jsonString = data.replace(/^const content = `|`;/g, '').trim(); // This removes the unwanted parts

            // Now parse the JSON string
            const jsonData = JSON.parse(jsonString);  // Convert the string to JSON
            console.log(jsonData);
            // console.log(typeof(jsonData));
        } catch (error) {
            console.error('Error parsing JSON:', error);
        }
    });
}

function displayProducts(jsonData) {
    // Create a section tag to hold the articles
    const sectionBody = document.querySelector("section");

    // Iterate over each item in jsonData
    jsonData.forEach(item => {
        // Create an article tag for each item
        const article = document.createElement('article');

        article = `
        <img src="images/${item.filename}" alt="${item.title}">
         <div class="caption">
            <h2>${item.title}</h2>
            <p>${item.location.city}, ${item.location.country}</p>
            <h3>Colors</h3>`
        
        item.colors.forEach(color => {
            article + `<span style="background-color: ${color.hex}; ">Wax Flower</span>
            <span style="background-color: #137e84; color: white; ">Teal</span>
            <span style="background-color: #11161d; color: white; ">Black Pearl</span>
            <span style="background-color: #0c4656; color: white; ">Sherpa Blue</span>
            <span style="background-color: #91d6d8; ">Morning Glory</span>`

        })

        for (var i = 0; i < item.color.length; i++) {
            article + `<span style="background-color: ${item.colors[i].hex}; ">${item.colors[i].name}</span>`
        }
        article + "</div>";

    document.write(article);
    });
}

loadProducts();