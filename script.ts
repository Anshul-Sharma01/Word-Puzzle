const startBtn = document.getElementById("start-btn") as HTMLButtonElement;
const main = document.querySelector("main") as HTMLElement;
let numberToRemove : number;
let difficultySelected : string;
let livesToShow = 0;

const words : string[] = ["APPLE", "RIVER", "HOUSE", "MUSIC", "SUN", "TREE", "BOOK", "PEN", "CHAIR", "WATER", "CLOUD", "STORM", "COFFEE", "LAMP", "CAR", "FIRE", "WIND", "RAIN", "FORK", "PLATE", "ABSTRACT", "CONTEXTUAL", "FRAGMENT", "GENERATOR", "MOSAIC", "PARADOX", "RESILIENT","SYMBOLIC", "VARIABLE", "GRADIENT", "HARMONIZE", "LOGARITHM", "METAPHOR", "SYNTHESIS", "PERSISTENT", "OBSTACLE", "PLATFORM", "QUIETUDE", "LUMINESCENT", "RESONANCE", "ALGORITHM", "BIOSPHERE", "LABYRINTH", "OSCILLATE", "VORTEX", "XEROGRAPHY", "ZEITGEIST", "ACCELERATE", "OBLIQUE", "TERMINAL" ];




function generateRandomIndex(): number {
    return Math.floor(Math.random() * 50);
} 


function generateRandomNumber(len : number) : number{
    return Math.floor(Math.random() * len);
}

function removeRandomLetters(word : string) : { ogWord : string, maskedWord : string } {
    const len : number = word.length;
    numberToRemove = Math.max(1, Math.floor(len / 2));
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


function checkGuess(userInput : string, ogWord : string, maskedWord : string) : {newOgWord : string, guessCorrect : boolean } {

    let updatedWord = maskedWord.split('');
    let guessCorrect : boolean = true;

    for(let i = 0; i < ogWord.length; i++){
        if(maskedWord[i] === '_' && userInput === ogWord[i]){
            updatedWord[i] = userInput;
            guessCorrect = true;
        }
    }

    let newOgWord : string = updatedWord.join("");

    return { newOgWord, guessCorrect };

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



function fetchWord() : string {
    const randomIndex = generateRandomIndex();
    return words[randomIndex];
}


function checkForDifficulty(): boolean {
    const difficultyLevel = (document.getElementById("difficulty-select") as HTMLSelectElement).value;
    return Boolean(difficultyLevel);
}

function createLives(letterCount: number): HTMLDivElement {
    const div = document.createElement("div");
    div.setAttribute("class", "lives");
    livesToShow = letterCount;

    if(difficultySelected === 'beginner'){
        livesToShow *= 3;
    }
    else if(difficultySelected === 'medium'){
        livesToShow *= 2;
    }

    for (let i = 0; i < livesToShow; i++) {
        const img = document.createElement("img");
        img.setAttribute("class", "lives-icon");
        img.src = "./heart.svg";
        div.appendChild(img);
    }

    return div;
}

function updateLives(){
    const livesDiv = document.querySelector(".lives") as HTMLDivElement;

    if(livesDiv && livesToShow > 0){
        livesToShow--;
    }

    livesDiv.removeChild(livesDiv.lastChild!);
}


function createInputDiv(maskedWord: string) {
    const div = document.createElement("div");
    div.classList.add("input-container"); 

    for (let i = 0; i < maskedWord.length; i++) {
        const inp = document.createElement("input");
        inp.setAttribute('class', 'userInput');
        inp.setAttribute('maxLength','1');
        if (maskedWord[i] === '_') {
            inp.setAttribute('class', 'inputHere');
            
        } else {
            inp.setAttribute('disabled', 'true');
            inp.setAttribute('class', 'inputHere');
            inp.value = maskedWord[i];
        }
        div.appendChild(inp);
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
    difficultySelected = difficultyLevel.value;


    startTimer();

    const wordToFind : string = fetchWord();
    console.log(wordToFind);
    const { ogWord, maskedWord } = removeRandomLetters(wordToFind);
    console.log(ogWord, maskedWord);
    const livesDiv = createLives(numberToRemove);
    section.appendChild(livesDiv);

    main.appendChild(section);
    main.appendChild(createInputDiv(maskedWord));
});
