class Person {
    // Class constructor with values name, age, and city
    constructor(name, age, city) {
        this.name = name;
        // Convert age value to number
        this.age = parseInt(age);
        this.city = city;
    }
    // Template to display object values
    getDetails() {
        return `${this.name}, ${this.age}, lives in ${this.city}`;
    }
}
// Export calss to be use din other files
module.exports = Person;