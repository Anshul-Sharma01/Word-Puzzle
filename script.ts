

const startBtn = document.getElementById("start-btn") as HTMLButtonElement;
const main = document.querySelector("main") as HTMLBodyElement;

function checkForDifficulty(): boolean{
    const difficultyLevel = (document.getElementById("difficulty-select") as HTMLSelectElement).value;
    
    if(difficultyLevel){
        return true;
    }else{
        return false;
    }


}


startBtn.addEventListener("click", () => {
    const valueSelected = checkForDifficulty();
    if(valueSelected){
        console.log(valueSelected);
        startBtn.remove();
    }else{
        alert("Please select the difficulty level first");
    }
});


startBtn.addEventListener("click",() => {

    const valueSelected = checkForDifficulty();
    
    if(valueSelected){
        const div = document.createElement("div");
        const section = document.createElement("section");
        const h1 = document.createElement("h1");
        h1.textContent = "Lives";
        div.appendChild(h1);
        div.setAttribute("class", "lives");
        section.appendChild(div);
        main.appendChild(section);
    }

})








