class Person {
    constructor(name, age, city) {
        this.name = name;
        this.age = parseInt(age);
        this.city = city;
    }
    getDetails() {
        return `${this.name}, ${this.age}, lives in ${this.city}`;
    }
}
MediaSourceHandle.exports = Person;