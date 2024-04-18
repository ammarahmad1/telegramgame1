const countries = [
    "ARGENTINA",
    "BRAZIL",
    "CANADA",
    "DENMARK",
    "EGYPT",
    "FRANCE",
    "GERMANY",
    "ITALY",
    "JAPAN",
    "KENYA"
];

let currentIndex = 0;
let currentCountry = countries[currentIndex];
let blankIndex = 0;
let optionsArray = [];

const countryNameElement = document.getElementById("country-name");
const optionsContainer = document.getElementById("options-container");
const resultElement = document.getElementById("result");
const nextButton = document.getElementById("next-btn");

// Function to set up the game for a new country
function setupGame() {
    currentCountry = countries[currentIndex];
    blankIndex = Math.floor(Math.random() * currentCountry.length); // Randomly choose blank index
    countryNameElement.textContent = currentCountry.slice(0, blankIndex) + "_" + currentCountry.slice(blankIndex + 1);
    generateOptions();
    resultElement.textContent = "";
}

// Function to generate options for the current country
function generateOptions() {
    optionsArray = []; // Reset options array
    const missingLetter = currentCountry[blankIndex];

    // Generate options with random incorrect letters
    while (optionsArray.length < 4) {
        const randomLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26)); // Generate random uppercase letter
        if (randomLetter !== missingLetter && !optionsArray.includes(randomLetter)) {
            optionsArray.push(randomLetter);
        }
    }

    // Insert the missing letter at a random position
    const randomPosition = Math.floor(Math.random() * 4);
    optionsArray.splice(randomPosition, 0, missingLetter);

    // Render options in the DOM
    optionsContainer.innerHTML = "";
    optionsArray.forEach(letter => {
        const optionButton = document.createElement("button");
        optionButton.classList.add("option");
        optionButton.textContent = letter;
        optionsContainer.appendChild(optionButton);
    });

    // Add click event listeners to options
    const options = document.querySelectorAll(".option");
    options.forEach(option => {
        option.addEventListener("click", () => {
            checkAnswer(option.textContent);
        });
    });
}

// Next button click event
nextButton.addEventListener("click", () => {
    currentIndex++;
    if (currentIndex >= countries.length) {
        currentIndex = 0;
    }
    setupGame();
});

// Initial setup
setupGame();

// Function to check if selected letter is correct
function checkAnswer(letter) {
    if (letter === currentCountry[blankIndex]) {
        resultElement.textContent = "Correct!";
        resultElement.style.color = "#4CAF50"; // Green color
    } else {
        resultElement.textContent = "Wrong! Try Again.";
        resultElement.style.color = "#FF6347"; // Red color
    }
    // Prevent further clicks after answer
    const options = document.querySelectorAll(".option");
    options.forEach(option => {
        option.disabled = true;
    });
}
