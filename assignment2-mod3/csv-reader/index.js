// Import file system module, built-in Node library
const fs = require("fs");

// Import Person class
const Person = require("./person");

// Read CSV file and return array of Person objects
function loadCSV(filePath) {
    // Read data from CSV file
    const data = fs.readFileSync(filePath, "utf8");
    // console.log(`Data: ${data}`);

    // Remove whitespace around data and split data into an array based on new line characters
    const lines = data.trim().split("\n")
    // console.log(`Lines: ${lines}`);

    // First array element is split into a 2D array to defind CSV headers
    const headers = lines[0].split(",");
    // console.log(`Headers: ${headers}`)

    // Create an empty array called people
    const people = [];

    // Beginning at the 2nd elements in array lines...
    for (let i = 1; i < lines.length; i++) {
        // ... Split the current element into a 2D array...
        const values = lines[i].split(",");

        // .. Use the inner array's elements as values to create a Person object...
        const person = new Person(values[0], values[1], values[2], values[3]);

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

// Search array people by given city
function searchByCity(people, searchCity) {
    /*
    Return a new array of Person objects;
    - Iterate through array person
    - Convert city value and given city to lowercase
    - Compare to determine a match
    */
    return people.filter(person => person.city.toLowerCase() === searchCity.toLowerCase());
}

// Search array people by given age range
function searchByAge(people, minAge, maxAge = Infinity) {
    /*
    Return a new array of Person objects;
    - Iterate through array person
    - Determine if given age falls within given age range
    */
    return people.filter(person => (person.age >= minAge) && (person.age <= maxAge));
}

// Call loadCSV function with data.csv file as argument
const people = loadCSV("data.csv");
// console.log(`People: ${people}`)

// For each element in array person, call getDetails() function from Person class
console.log("All people:");
people.forEach(person => console.log(person.getDetails()));

// Call searchByName function and store resuts in searchNameResults
const searchNameResults = searchByName(people, "Alice");
// For each element in array person stored in searchNameResults, call getDetails() function
console.log("\nSearch results for 'Alice':");
searchNameResults.forEach(person => console.log(person.getDetails()));

// Call searchByCity function and store resuts in searchResults
const searchCityResults = searchByCity(people, "Chicago");
// For each element in array person stored in searchCityResults, call getDetails() function
console.log("\nSearch results for 'Chicago':");
searchCityResults.forEach(person => console.log(person.getDetails()));

// Call searchByAge function and store resuts in searchAgeResults
const searchAgeResults = searchByAge(people, 20, 25);
// For each element in array person stored in searchAgeResults, call getDetails() function
console.log("\nSearch results for 20 to 25:");
searchAgeResults.forEach(person => console.log(person.getDetails()));