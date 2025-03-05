const fs = require("fs");
const { Product, Inventory} = require("./product")

// Load products from JSON file
function loadInventory(filepath) {
    const data = fs.readFileSync(filepath, "utf8");
    const jsonData = JSON.parse(data);
    const products = jsonData.map(p => new Product(
        p.id,
        p.title,
        p.description,
        p.price,
        p.rating,
        p.sizes,
        p.color,
        p.imageUrl,
        p.category
    ));

    return new Inventory(products);
}

// Save inventory in JSON file
function saveInventory(filePath, invenotry) {
    const jsonData = JSON.stringify(invenotry.products, null, 2);
    // console.log(`jsonData: ${jsonData}`)

    fs.writeFileSync(filePath, jsonData);
}

// Parse CLI arguments
const args = process.argv.slice(2);
const command = args[0];

// Main logic
const inventory = loadInventory("products.json");
// console.log("All products:");
// console.log(inventory)

if (!command) {
    console.log("Usage: node index.js [command] [options]");
    console.log("Commands: -add, -update, -remove, -search");
    process.exit(1);
}

switch (command) {
    case "-add":
        /* Example: node index.js -add "T-Shirt" "Casual tee" 19.99 4.5 "S,M,L" "Green"
           "https://example.com/tshirt.jpg" "Clothing"
           
            "id": number --> number (int)
            "title": "Cotton T-Shirt" --> string
            "description": "Comfortable everyday t-shirt" --> string
            "price": 15.99 --> number (float)
            "rating": 4.5 --> number (float)
            "sizes": ["S","M","L"] --> array of strings
            "color": "Blue" --> string
            "imageUrl": "https://example.com/tshirt-blue.jpg" --> string
            "category": "Clothing" --> string
        */
        var p = {
            id: null,
            title: null,
            description: null,
            price: null,
            rating: null,
            sizes: null,
            color: null,
            imageUrl: null,
            category: null
        };

        const keys = Object.keys(p);
        p.id = (inventory.products[inventory.products.length - 1].id) + 1;
        p.title = args[1];
        p.description = args[2];
        p.price = parseFloat(args[3]);
        p.rating = parseFloat(args[4]);
        p.sizes = args[5].split(",");
        p.color = args[6];
        p.imageUrl = args[7];
        p.category = args[8];

        inventory.addProduct(p);
        saveInventory("products.json", inventory);

        console.log(`New product:`);
        console.log(inventory.products[inventory.products.length - 1]);
        break;
    case "-update":
        // Example: node index.js -update 1 price=25.99 rating=4.8
        const idToUpdate = parseInt(args[1]);
        const updates = {};

        args.slice(2).forEach(arg => {
            const [key, value] = arg.split("=");
            updates[key] = value;
        });

        if (inventory.updateProduct(idToUpdate, updates)) {
            saveInventory("products.json", inventory);
            console.log(`Update product ID ${idToUpdate}`);
        } else {
            console.log("Product not found");
        }
        break;
    case "-remove":
        // Example: node index.js -remove 1
        // TODO: code to run process to remove product

        idToRemove = args[1];
        [removed, product] = inventory.removeProduct(idToRemove)
        if (removed) {
            saveInventory("products.json", inventory);
            console.log(`Product removed ${product}`);
        } else {
            console.log(`Product of id ${idToRemove} not found.`);
        }
        break;
    case "-search":
        // Example: node index.js -search name "T-Shirt"
        // Example: node index.js -search category "Clothing"
        // Example: node index.js -search rating 4.5
        const [type, value] = args.slice(1);
        let results;
        switch (type) {
            case "name":
                results = inventory.searchByName(value);
                break;
            case "category":
                results = inventory.searchByCategory(value);
                break;
            case "rating":
                results = inventory.searchByRating(praseFloat(value));
                break;
            default:
                console.log("Search type must be: name, category, or rating");
                process.exit(1);
        }

        console.log("Search results:");
        results.forEach(p => console.log(p.getDetails()));
        break;
    defult:
        console.log("Unknown command. Use: -add, -update, -remove, -search");
} 