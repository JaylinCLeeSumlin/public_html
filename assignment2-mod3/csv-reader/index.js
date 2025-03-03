// Import file system module, built-in Node library
const fs = require("fs");

// Import Person class
const Person = require("./person");

// Read CSV file and return array of Person objects
function loadCSV(filePath) {
    // Read data from CSV file
    const data = fs.readFileSync(filePath, "utf8");
    console.log(`Data: ${data}`);

    // Remove whitespace around data and split data into an array based on new line characters
    const lines = data.trim().split("\n")
    console.log(`Lines: ${lines}`);

    // First array element is split into a 2D array to defind CSV headers
    const headers = lines[0].split(",");
    console.log(`Headers: ${headers}`)

    // Create an empty array called people
    const people = [];

    // Beginning at the 2nd elements in array lines...
    for (let i = 1; i < lines.length; i++) {
        // ... Split the current element into a 2D array...
        const values = lines[i].split(",");

        // .. Use the inner array's elements as values to create a Person object...
        const person = new Person(values[0], values[1], values[2]);

        // .. and append the new Person object to array people
        people.push(person);
    }

    // Return the array of Person objects
    return people;
}

// Search array people by given name
function searchByName(people, searchName) {
    /*
    Return a new array of Person objects;
    - Iterate through array person
    - Convert name value and given name to lowercase
    - Compare to determine a match
    */
    return people.filter(person => person.name.toLowerCase() === searchName.toLowerCase());
}

// Call loadCSV function with data.csv file as argument
const people = loadCSV("data.csv");
console.log(`People: ${people}`)

// For each element in array person, call getDetails() function from Person class
console.log("All people:");
people.forEach(person => console.log(person.getDetails()));

// Call searchByName function and store resuts in searchResults
const searchResults = searchByName(people, "Alice");

// for each element in array person stored in searchResults, call getDetails() function
console.log("\nSearch results for 'Alice':");
searchResults.forEach(person => console.log(person.getDetails()));