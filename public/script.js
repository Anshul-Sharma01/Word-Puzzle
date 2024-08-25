"use strict";
const startBtn = document.getElementById("start-btn");
const main = document.querySelector("main");
const words = ["APPLE", "RIVER", "HOUSE", "MUSIC", "SUN", "TREE", "BOOK", "PEN", "CHAIR", "WATER", "CLOUD", "STORM", "COFFEE", "LAMP", "CAR", "FIRE", "WIND", "RAIN", "FORK", "PLATE", "ABSTRACT", "CONTEXTUAL", "FRAGMENT", "GENERATOR", "MOSAIC", "PARADOX", "RESILIENT", "SYMBOLIC", "VARIABLE", "GRADIENT", "HARMONIZE", "LOGARITHM", "METAPHOR", "SYNTHESIS", "PERSISTENT", "OBSTACLE", "PLATFORM", "QUIETUDE", "LUMINESCENT", "RESONANCE", "ALGORITHM", "BIOSPHERE", "LABYRINTH", "OSCILLATE", "VORTEX", "XEROGRAPHY", "ZEITGEIST", "ACCELERATE", "OBLIQUE", "TERMINAL"];
function generateRandomIndex() {
    return Math.floor(Math.random() * 50);
}
function startTimer() {
    var _a;
    const div = document.createElement("div");
    div.setAttribute('class', 'timer');
    const p = document.createElement("p");
    p.innerHTML = `0`;
    div.appendChild(p);
    (_a = document.querySelector("main")) === null || _a === void 0 ? void 0 : _a.appendChild(div);
    let time = 10;
    p.innerHTML = time.toString();
    const timer = setInterval(() => {
        time -= 1;
        p.innerHTML = time.toString();
        if (time <= 0) {
            clearInterval(timer);
            alert("time's up");
        }
    }, 1000);
}
function checkForDifficulty() {
    const difficultyLevel = document.getElementById("difficulty-select").value;
    return Boolean(difficultyLevel);
}
function createLives(letterCount) {
    const div = document.createElement("div");
    div.setAttribute("class", "lives");
    for (let i = 0; i < letterCount; i++) {
        const img = document.createElement("img");
        img.setAttribute("class", "lives-icon");
        img.src = "./heart.svg";
        div.appendChild(img);
    }
    return div;
}
startBtn.addEventListener("click", () => {
    if (!checkForDifficulty()) {
        alert("Please select the difficulty level first");
        return;
    }
    const difficultyLevel = document.getElementById("difficulty-select");
    difficultyLevel.setAttribute("disabled", "true");
    startBtn.remove();
    const section = document.createElement("section");
    const difficultySelected = difficultyLevel.value;
    let letterCount = 1;
    switch (difficultySelected) {
        case 'beginner':
            letterCount *= 3;
            break;
        case 'medium':
            letterCount *= 2;
            break;
        case 'expert':
            break;
        default:
            console.error("Unknown difficulty level");
            return;
    }
    startTimer();
    const livesDiv = createLives(letterCount);
    section.appendChild(livesDiv);
    main.appendChild(section);
});
