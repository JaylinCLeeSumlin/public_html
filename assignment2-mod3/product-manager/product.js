class Product {
    constructor(id, title, description, price, rating, sizes, color, imageUrl, category) {
        this.id = id;
        this.title = title;
        this.description = description; 
        this.price = price;
        this.rating = rating;
        this.sizes = sizes;
        this.color = color;
        this.imageUrl = imageUrl;
        this.category = catagory;
    }

    getDetails() {
        return `${this.title} (${this.category}) - $${this.price}, Rating: ${this.rating}`;
    }
}

class Inventory {
    constructor(products = []) {
        this.products = products;
    }

    addProduct(product) {
        // TODO: code to add product
    }

    updateProduct(id, updateData) {
        const product = this.products.find(p => p.id == id);
        if (product) {
            Object.assign(this.products, updateData);
            return true;
        }

        return false;
    }

    removeProduct(id) {
        // TODO: code to remove product
    }

    searchByName(name) {
        // TODO: code to search products by name
    }

    searchByCategory(category) {
        // TODO: code to search products by category
    }

    searchByRating(minRating) {
        // TODO: code to search products by rating
    }
}

module.exports = { Product, Inventory};