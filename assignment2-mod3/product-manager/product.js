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

        if (productIndex !== -1) {
            this.products.splice(productIndex, 1);
            return [true, product.getDetails()];
        } else {
            return [false, null];
        }
    }

    searchByName(name) {
        const result = this.products.filter(p => p.title.toLowerCase().includes(name.toLowerCase()));
        return result;
    }

    searchByCategory(category) {
        const result = this.products.filter(p => p.category.toLowerCase() == category.toLowerCase());
        return result;
    }

    searchByRating(minRating) {
        const result = this.products.filter(p => p.rating >= minRating);
        return result;
    }

    sortByPrice(priceSort) {
        var priceResults;
        switch (priceSort) {
            case "up":
                priceResults = this.products.sort((a, b) => a.price - b.price);
                return priceResults;
                break;
            case "down":
                priceResults = this.products.sort((a, b) => b.price - a.price);
                return priceResults;
                break;
        }
    }

    sortByRating(rateSort) {
        var rateResults;
        switch (rateSort) {
            case "up":
                rateResults = this.products.sort((a, b) => a.rating - b.rating);
                return rateResults;
                break;
            case "down":
                rateResults = this.products.sort((a, b) => b.rating - a.rating);
                return rateResults;
                break;
        }
    }

    listAllProducts() {
        this.products.forEach(p => console.log(p.getDetails()));
    }
}

module.exports = { Product, Inventory };