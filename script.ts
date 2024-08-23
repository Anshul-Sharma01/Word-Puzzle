const startBtn = document.getElementById("start-btn") as HTMLButtonElement;
const main = document.querySelector("main") as HTMLElement;


function checkForDifficulty(): boolean {
    const difficultyLevel = (document.getElementById("difficulty-select") as HTMLSelectElement).value;
    return difficultyLevel ? true : false;
}

startBtn.addEventListener("click", () => {
    const valueSelected = checkForDifficulty();
    if (valueSelected) {
        console.log(valueSelected);
        const difficultyLevel = document.getElementById("difficulty-select") as HTMLSelectElement;
        difficultyLevel.setAttribute("disabled","true");
        startBtn.remove();
    } else {
        alert("Please select the difficulty level first");
    }
});

let letterCount = 1; // Assuming you want to set a value for letterCount

startBtn.addEventListener("click", () => {
    const valueSelected = checkForDifficulty();

    if (valueSelected) {
        const div = document.createElement("div");
        const section = document.createElement("section");
        const h1 = document.createElement("h1");
        const difficultySelected = (document.querySelector("#difficulty-select") as HTMLSelectElement).value;

        if (difficultySelected === 'beginner') {
            letterCount *= 3;
            for (let i = 0; i < letterCount; i++) {
                const img = document.createElement("img");
                img.setAttribute("class","lives-icon");
                img.src = "./heart.svg";
                h1.insertAdjacentElement("beforeend", img);
                div.appendChild(img);
            }
        } else if (difficultySelected === 'medium') {
            letterCount *= 2;
            for(let i = 0; i < letterCount; i++){
                const img = document.createElement("img");
                img.setAttribute("class","lives-icon");
                img.src = "./heart.svg";
                h1.insertAdjacentElement("beforeend",img);
                div.appendChild(img);
            }
        } else if (difficultySelected === 'expert') {
            for(let i = 0; i < letterCount; i++){
                const img = document.createElement("img");
                img.setAttribute("class","lives-icon");
                img.src = "./heart.svg";
                h1.insertAdjacentElement("beforeend",img);
                div.appendChild(img);
            }
        }

 
        div.setAttribute("class", "lives");
        section.appendChild(div);
        main.appendChild(section);
    }
});
