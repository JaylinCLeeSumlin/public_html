const fs = require("fs");
const { Product, Inventory } = require("./product")

// Load products from JSON file
function loadInventory(filepath) {
    try {
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
    } catch (err) {
        console.log("Error while attempting to read file.");
        process.exit(1);
    }
}

// Save inventory in JSON file
function saveInventory(filePath, invenotry) {
    try {
        const jsonData = JSON.stringify(invenotry.products, null, 2);
        fs.writeFileSync(filePath, jsonData);
    } catch (err) {
        console.log("Error while attempting to write to file.");
        process.exit(1);
    }
}

// Parse CLI arguments
const args = process.argv.slice(2);
const command = args[0];

// Main logic
const inventory = loadInventory("products.json");

if (!command) {
    console.log("Usage: node index.js [command] [options]");
    console.log("Commands: -add, -update, -remove, -search, -list, -sort");
    process.exit(1);
}

switch (command) {
    case "-add":
        // Example: node index.js -add "T-Shirt" "Casual tee" 19.99 4.5 "S,M,L" "Green" "https://exmaple.tshirt.jpg" "Clothing"
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
        if (args.length < 9 || args.length > 9) {
            if (args.length < 9) {
                console.log("Missing product attributes.");
            } else {
                console.log("Too many product attributes.");
            }
            console.log("Usage: node index.js -add \"title\" \"description\" price rating \"sizes\" \"color\" \"imageURL\" \"category\"");
            process.exit(1);
        } else {
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
        }
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
        if (args.length < 2) {
            console.log("Missing ID to remove");
            console.log("Usage: node index.js -remove ID");
            process.exit(1);
        }
        if (!parseInt(args[1])) {
            console.log("ID to remove must be an integer");
            process.exit(1);
        }

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
        const [type, value] = args.slice(1);
        let searchResults;
        switch (type) {
            // Example: node index.js -search name "T-Shirt"
            case "name":
                searchResults = inventory.searchByName(value);
                break;
            // Example: node index.js -search category "Clothing"
            case "category":
                searchResults = inventory.searchByCategory(value);
                break;
            // Example: node index.js -search rating 4.5
            case "rating":
                searchResults = inventory.searchByRating(parseFloat(value));
                break;
            default:
                console.log("Search type must be: name, category, or rating");
                process.exit(1);
        }
        console.log("Search results:");
        searchResults.forEach(p => console.log(p.getDetails()));
        break;
    case "-list":
        // Example: node index.js -list
        inventory.listAllProducts();
        break;
    case "-sort":
        sortType = args[1];
        let sortResults;
        switch (sortType) {
            case "price":
                // Example: node index.js -sort price up
                // Example: node index.js -sort price down
                var priceSort = args[2];
                sortResults = inventory.sortByPrice(priceSort);
                break;
            case "rating":
                // Example: node index.js -sort rating up
                // Example: node index.js -sort rating down
                var rateSort = args[2];
                sortResults = inventory.sortByRating(rateSort);
                break;
        }
        console.log("Sorted results:");
        sortResults.forEach(p => console.log(p.getDetails()));
        break;
    default:
        console.log("Unknown command. Use: -add, -update, -remove, -search, -list, -sort");
} 