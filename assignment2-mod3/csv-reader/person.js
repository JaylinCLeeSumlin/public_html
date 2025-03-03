class Person {
    // Class constructor with values name, age, and city
    constructor(name, age, city, phone) {
        this.name = name;
        // Convert age value to number
        this.age = parseInt(age);
        this.city = city;
        this.phone = phone
    }
    // Template to display object values
    getDetails() {
        return `${this.name}, ${this.age}, lives in ${this.city} with area code ${this.phone.slice(0,3)}`;
    }
}
// Export calss to be use din other files
module.exports = Person;