const fs = require("fs");
const { Products, Inventory} = require("./product")

// Load products from JSON file
function loadInventory(filepath) {
    const data = fs.readFileSync(filepath, "utf8");
    const jsonData = JSON.parse(data);
    const products = jsonData.map(p => new Products(
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

    fs.writeFileSync(filePath, jsonDate);
}

// Parse CLI arguments
const args = process.argv.slice(2);
const command = args[0];

// Main logic
const inventory = loadInventory("products.json");
if (!command) {
    console.log("Usage node index.js [command] [options]");
    console.log("Commands: -add, -update, -remove, -search");
    process.exit(1);
}

switch (command) {
    case "-add":
        // Example: node index.js -search "T-Shirt" "Casual tee" 19.99 4.5 "S,M,L" "Green" "https://example.com/tshirt.jpg" "Clothing"
        // TODO: code to run process to add product
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
    console.log("Unknown command. Use: -add, -update, -remove, -search")
}