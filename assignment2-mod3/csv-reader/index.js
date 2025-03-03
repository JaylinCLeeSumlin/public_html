const fs = require("fs");
const Person = require("./person");

function loadCSV(filePath) {
    const data = fs.readFileSync(filePath, "utf8");
    const lines = data.trim().split("\n")
    const headers = lines[0].split(",");
    const people = [];

    for (let i = 1; i < lines.length; i++) {
        const values = line[i].split(",");
        const person = new Person(values[0], values[1], values[2]);
        people.push(person);
    }
    return people;
}

function searchByName(people, searchName) {
    return people.filter(person => person.name.toLowerCase() === searchName.toLowerCase());
}

const people = loadCSV("data.csv");
console.log("All people:");
people.forEach(person => console.log(person.getDetails()));

const searchResults = searchByName(people, "Alice");
console.log("\nSearch results for 'Alice':");
searchResults.forEach(person => console.log(person.getDetails()));