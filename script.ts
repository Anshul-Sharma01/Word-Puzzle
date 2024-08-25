const startBtn = document.getElementById("start-btn") as HTMLButtonElement;
const main = document.querySelector("main") as HTMLElement;


const words : String[] = ["APPLE", "RIVER", "HOUSE", "MUSIC", "SUN", "TREE", "BOOK", "PEN", "CHAIR", "WATER", "CLOUD", "STORM", "COFFEE", "LAMP", "CAR", "FIRE", "WIND", "RAIN", "FORK", "PLATE", "ABSTRACT", "CONTEXTUAL", "FRAGMENT", "GENERATOR", "MOSAIC", "PARADOX", "RESILIENT","SYMBOLIC", "VARIABLE", "GRADIENT", "HARMONIZE", "LOGARITHM", "METAPHOR", "SYNTHESIS", "PERSISTENT", "OBSTACLE", "PLATFORM", "QUIETUDE", "LUMINESCENT", "RESONANCE", "ALGORITHM", "BIOSPHERE", "LABYRINTH", "OSCILLATE", "VORTEX", "XEROGRAPHY", "ZEITGEIST", "ACCELERATE", "OBLIQUE", "TERMINAL" ];




function generateRandomIndex(): number {
    return Math.floor(Math.random() * 50);
} 


function generateRandomNumber(len : number) : number{
    return Math.floor(Math.random() * len);
}

function removeRandomLetters(word : string) : { ogWord : string, maskedWord : string } {
    const len : number = word.length;
    const numberToRemove : number = Math.max(1, Math.floor(len / 3));
    const indexToRemove : number[] = [];

    while(indexToRemove.length < numberToRemove){
        const randomIndex = generateRandomNumber(len);
        if(!indexToRemove.includes(randomIndex)){
            indexToRemove.push(randomIndex);
        }
    }

    let maskedWord : string = "";
    for(let i = 0; i < len; i++){
        if(indexToRemove.includes(i)){
            maskedWord += "_";
        }else{
            maskedWord += word[i];
        }
    }

    return { ogWord : word, maskedWord};

}


function checkGuess(userInput : string, ogWord : string, maskedWord : string) : string {

    let updatedWord = maskedWord.split('');

    for(let i = 0; i < ogWord.length; i++){
        if(maskedWord[i] === '_' && userInput === ogWord[i]){
            updatedWord[i] = userInput;
        }
    }

    return updatedWord.join("");

}

function startTimer() : void{
    const div = document.createElement("div") as HTMLDivElement;
    div.setAttribute('class','timer');
    const p = document.createElement("p") as HTMLParagraphElement;
    p.innerHTML = `0`;
    div.appendChild(p);
    document.querySelector("main")?.appendChild(div);
    let time = 10;
    p.innerHTML = time.toString();
    const timer = setInterval(() => {
        time -= 1;
        p.innerHTML = time.toString();
        if(time <= 0){
            clearInterval(timer);
            alert("time's up");
        }
    }, 1000);
    
}





function checkForDifficulty(): boolean {
    const difficultyLevel = (document.getElementById("difficulty-select") as HTMLSelectElement).value;
    return Boolean(difficultyLevel);
}

function createLives(letterCount: number): HTMLDivElement {
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

    const difficultyLevel = document.getElementById("difficulty-select") as HTMLSelectElement;
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
