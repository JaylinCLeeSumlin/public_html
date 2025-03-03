console.log(object);
import moduleName from 'module';

// loops
for (let i=0; i < 5; i++) {
    console.log('Loop iteration: ${i}');
}

// conditional
let age = 20;
if (age >= 18) {
    console.log("You can vote!");
} else {
    console.log("Too young to vote.")
}

// arrays
let fruit = ["apple", "banana", "orange"];
console.log(fruits[1]);
fruits.push("grape");

// functions
function greet(name) {
    return 'Hello, ${name}!';
}
console.log(greet("Alice"));

// objects
let person = {
    name: "Bob",
    age: 25,
    greet() {
        return `Hi, I'm ${this.name}!`
    }
}
console.log(person.greet());

// classes
class Car {
    constructor(brand, year) {
        this.brand = brand;
        this.year = year;
    }
    getDetails() {
        return `${this.brand} from ${this.year}`;
    }
}
let myCar = new Car("Toyota", 2020);
console.log(myCar.getDetails());

const add = (a,b) => a + b;
console.log(add(3,4));
let numbers = [1, 2, 3, 4];
let doubled = numbers.map(num => num*2);
console.log(doubled);