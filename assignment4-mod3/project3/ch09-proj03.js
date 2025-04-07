/* add your code here */
const users = [];
const stocks = [];

window.addEventListener("DOMContentLoaded", () => {

    fetch("users.json")
        .then(response => response.json())
        .then(data =>{
            for (let i = 0; i < data.length; i++) {
                users.push(data[i]);
                displayUsers(data[i])
            }
        });

    fetch("stocks-formatted.json")
        .then(response => response.json())
        .then(data =>{
            for (let i = 0; i < data.length; i++) {
                stocks.push(data[i]);
            }
        });

        detailsSection = document.querySelector("section:last-of-type");
        detailsSection.style.display = "none";
    
})

function displayUsers(userInfo) {

    const userContainer = document.querySelector("ul");
    const insertUser = document.createElement("li");

    insertUser.innerHTML = `
        ${userInfo.user.lastname}, ${userInfo.user.firstname}
    `;
    insertUser.dataset.id = userInfo.id;

    insertUser.addEventListener("click", () => clickedUser(insertUser.dataset.id));

    // insertUser.appendChild(insertuser);
    userContainer.appendChild(insertUser);
}

function clickedUser(userID) {

    console.log(`typeof(userID): ${typeof(userID)}`);

    const userInfo = users.find(u => u.id === parseInt(userID));
    // console.log(`userInfo: ${userInfo}`);

    detailsSection = document.querySelector("section:last-of-type");
    detailsSection.style.display = "grid";

    inputs = document.querySelectorAll("form input");

    inputs.forEach(input => {
        switch (input.id) {
            case 'firstname':
                input.value = userInfo.user.firstname;
                break;
            case 'lastname':
                input.value = userInfo.user.lastname;
                break;
            case 'address':
                input.value = userInfo.user.address;
                break;
            case 'city':
                input.value = userInfo.user.city;
                break;
            case 'email':
                input.value = userInfo.user.email;
                break;
            case 'userID':
                input.value = userID;
                break;
            default:
                break;
        }
    })

    portfolioDetails = document.querySelectorAll("div#listPortfolio");

    userInfo.portfolio.forEach(p => {
        portfolioDetails.textContent = `
        <h3> ${p.symbol} </h3>
        <h3> ${p.owned}</h3>
    `;
    })
}