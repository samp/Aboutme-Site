let chkSugar = document.getElementById("sugar");
let chkCream = document.getElementById("cream");
let chkSyrup = document.getElementById("syrup");

let rdoSmall = document.getElementById("small");
let rdoMedium = document.getElementById("medium");
let rdoLarge = document.getElementById("large");

let numShots = document.getElementById("shots");

let btnAdd = document.getElementById("add");
let btnSave = document.getElementById("save");
let btnSubmit = document.getElementById("submit");
let btnRetrieve = document.getElementById("retrieve");

let shotSection = document.getElementById("shotsection");

let currentDrinkDisplay = document.getElementById("currentDrinkDisplay");
let currentDrinkCost = document.getElementById("currentDrinkCost");
let orderDisplay = document.getElementById("orderDisplay");
let orderCost = document.getElementById("orderCost");
let favouriteDisplay = document.getElementById("favouriteDisplay");
let favouriteCost = document.getElementById("favouriteCost");
let loyaltyDisplay = document.getElementById("loyaltyDisplay");

chkSugar.addEventListener("click", update);
chkCream.addEventListener("click", update);
chkSyrup.addEventListener("click", updateSyrup);
rdoSmall.addEventListener("click", update);
rdoMedium.addEventListener("click", update);
rdoLarge.addEventListener("click", update);
numShots.addEventListener("click", update);
btnSubmit.addEventListener("click", submit);
btnAdd.addEventListener("click", add);
btnSave.addEventListener("click", save);
btnRetrieve.addEventListener("click", retrieve);

let type = "";
let size = "";
let milk = "";

let currentDrink = "";
let currentCost = 0.0;
let totalCost = 0.0;
let loyalty = 0;
let drinksinorder = 0;

function getElements() {
    fetch("scripts/elements.json").then(function (response) {
        return response.text();
    }).then(function (data) {
        let elements = JSON.parse(data);
        let sectionType = document.getElementById("sectionType");
        let types = elements.types;
        for (var i = 0; i < types.length; i++) {
            var item = document.createElement("p");
            currentType = types[i];
            item.innerHTML = `<input type="radio" id="${currentType}" name="drinkType" value="${currentType}">
            <label for="${currentType}">${currentType}</label>`;
            item.addEventListener("click", update);
            sectionType.appendChild(item);
        }

        let sectionMilk = document.getElementById("sectionMilk");
        let milks = elements.milks;
        for (var i = 0; i < milks.length; i++) {
            var item = document.createElement("p");
            currentMilk = milks[i];
            item.innerHTML = `<input type="radio" id=${currentMilk} name="drinkMilk" value="${currentMilk}">
            <label for="${currentMilk}">${currentMilk}</label>`;
            item.addEventListener("click", update);
            sectionMilk.appendChild(item);
        }

        document.getElementById("Semi-skimmed").checked = true;

    }).catch(function (error) {
        console.log(`Error - ${error}`);
    })
    favouriteDisplay.innerHTML = localStorage.getItem("favouriteDrink");
    if (localStorage.getItem("favouriteCost") == null) {
        localStorage.setItem("favouriteCost", 0.0);
    }
    favouriteCost.innerHTML = "£" + localStorage.getItem("favouriteCost");
    if (localStorage.getItem("loyaltyPoints") == null) {
        localStorage.setItem("loyaltyPoints", 0);
        loyalty = 0;
    } else {
        loyalty = parseInt(localStorage.getItem("loyaltyPoints"));
        loyaltyDisplay.innerHTML = loyalty;
    }
}

function update() {
    type = document.querySelector(`input[name="drinkType"]:checked`).value;
    size = document.querySelector(`input[name="drinkSize"]:checked`).value;
    milk = document.querySelector(`input[name="drinkMilk"]:checked`).value;

    switch (size) {
        case "Small":
            currentCost = 2.45;
            break;
        case "Medium":
            currentCost = 2.65;
            break;
        case "Large":
            currentCost = 2.85;
            break;
    }
    currentDrink = size + " " + type.toLowerCase() + " with " + milk.toLowerCase() + " milk";

    if (chkCream.checked == true) {
        currentCost += 0.50;
        currentDrink += ", cream";
    }
    if (chkSugar.checked == true) {
        currentDrink += ", sugar";
    }
    if (chkSyrup.checked == true) {
        currentCost += 0.25 * numShots.value;
        if (numShots.value == 1) {
            currentDrink += ", " + numShots.value + " shot of syrup";
        } else {
            currentDrink += ", " + numShots.value + " shots of syrup";
        }
    }

    currentDrinkDisplay.innerHTML = currentDrink;
    currentDrinkCost.innerHTML = "£" + currentCost.toFixed(2);
    console.log("Updated");
}

function updateSyrup() {
    if (chkSyrup.checked == true) {
        console.log("Syrup selected");
        shotsection.style.display = "block";
    } else {
        console.log("Syrup deselected");
        shotsection.style.display = "none";
    }
    update()
}

function submit() {
    if (orderDisplay.innerHTML != "The order is empty") {
        orderDisplay.innerHTML = "The order is empty"
        currentDrink = "";
        currentDrinkDisplay.innerHTML = "There is no drink selected";
        currentCost = 0;
        currentDrinkCost.innerHTML = "£" + currentCost.toFixed(2);
        totalCost = 0;
        orderCost.innerHTML = "£" + totalCost.toFixed(2);
        loyalty += drinksinorder;
        loyaltyDisplay.innerHTML = loyalty;
        localStorage.setItem("loyaltyPoints", loyalty);
        drinksinorder = 0;
        alert("Thank you for ordering!");
        console.log("Submitted order");
    } else {
        console.log("No order to submit");
    }
}

function add() {
    if (currentDrinkDisplay.innerHTML != "There is no drink selected") {
        if (loyalty >= 10) {
            currentCost = 0;
            loyalty = 0;
            loyaltyDisplay.innerHTML = loyalty;
            localStorage.setItem("loyaltyPoints", loyalty);
        }
        if (orderDisplay.innerHTML == "The order is empty") {
            orderDisplay.innerHTML = currentDrink;
        } else {
            orderDisplay.innerHTML += "<br>" + currentDrink;
        }
        currentDrink = "";
        currentDrinkDisplay.innerHTML = "There is no drink selected";
        totalCost += currentCost;
        currentCost = 0;
        currentDrinkCost.innerHTML = "£" + currentCost.toFixed(2);
        orderCost.innerHTML = "£" + totalCost.toFixed(2);
        drinksinorder += 1
        console.log("Added drink");
    } else {
        console.log("No drink to add");
    }
}

function save() {
    if (currentDrinkDisplay.innerHTML != "There is no drink selected") {
        favouriteDisplay.innerHTML = currentDrink;
        favouriteCost.innerHTML = "£" + currentCost.toFixed(2);
        var drink = currentDrink;
        var cost = currentCost;
        localStorage.removeItem("favouriteDrink");
        localStorage.removeItem("favouriteCost");
        localStorage.setItem("favouriteDrink", drink);
        localStorage.setItem("favouriteCost", cost);
        console.log("Saved drink");
    } else {
        console.log("No drink to add");
    }
}

function retrieve() {
    if (favouriteDisplay.innerHTML != "There is no favourite drink") {
        if (orderDisplay.innerHTML == "The order is empty") {
            orderDisplay.innerHTML = localStorage.getItem("favouriteDrink");
        } else {
            orderDisplay.innerHTML += "<br>" + localStorage.getItem("favouriteDrink");
        }
        if (loyalty < 10) {
            console.log("Less than 10 points")
            totalCost += parseFloat(localStorage.getItem("favouriteCost"));
            orderCost.innerHTML = "£" + totalCost.toFixed(2);
        } else {
            console.log("10 or more points")
            loyalty = 0;
            loyaltyDisplay.innerHTML = loyalty;
            localStorage.setItem("loyaltyPoints", loyalty);
        }
        drinksinorder += 1;
        console.log("Got drink");
    } else {
        console.log("No favourite to add")
    }
}

getElements();