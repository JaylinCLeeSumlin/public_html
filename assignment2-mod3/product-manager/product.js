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
        this.category = category;
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
        this.products.push(product);
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
        const productIndex = this.products.findIndex(p => p.id == id);
        const product = this.products.find(p => p.id == id);
        // console.log(`Before removal:\n${this.products.length}`);

        if (productIndex !== -1) {
            this.products.splice(productIndex, 1);
            // console.log(`After removal:\n${this.products.length}`);
            return [true, product.getDetails()];
        } else {
            return [false, null];
        }
    }

    searchByName(name) {
        const result = this.products.filter(p => p.title.toLowerCase() == name.toLowerCase());
        return result;
    }

    searchByCategory(category) {
        const result = this.products.filter(p => p.category.toLowerCase() == category.toLowerCase());
        return result;
    }

    searchByRating(minRating) {
        // TODO: code to search products by rating
    }
}

module.exports = { Product, Inventory};