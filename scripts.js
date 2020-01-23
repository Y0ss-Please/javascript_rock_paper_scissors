let playerScore = 0;
let computerScore = 0;
let round = 1;
let footerText = "";
let hardMode = false;

const timeoutTime = 1000;
const message = document.querySelector("#message");
const selectables = document.querySelectorAll(".selectable");
const hardModeButton = document.querySelector("#hardmode");

hardModeButton.addEventListener('click',hardModeToggle);

function hardModeToggle() {
    if (!hardMode){
        hardMode = true;
        hardModeButton.classList.add("hardmode-selected");
    }else{
        hardMode = false;
        hardModeButton.classList.remove("hardmode-selected");
    }
}

function addMouseListeners(objects) {
    objects.forEach(select => select.addEventListener("click", play));
    objects.forEach(select => select.addEventListener("mouseover", mouseOver));
    objects.forEach(select => select.addEventListener("mouseout", mouseOut));
}

function removeMouseListeners(objects) {
    objects.forEach(select => select.removeEventListener("click", play));
    objects.forEach(select => select.removeEventListener("mouseover", mouseOver));
    objects.forEach(select => select.removeEventListener("mouseout", mouseOut));
}


function computerPlay(player){
    console.log(hardMode)
    if (!hardMode){
        rand = Math.random();
        if (rand <= 0.3){
            return "rock";
        }else if (rand >=0.7){
            return "paper";
        }else{
            return "scissors";
        }
    }else{
        if (player == "rock"){
            return "paper";
        }else if (player == "paper"){
            return "scissors";
        }else{
            return "rock";
        }
    }
}

function checkWinner(computer, player){
    let winner = (computer === player) ? "draw" :
    (computer === "rock" && player == "scissors") ? "computer" :
    (computer === "paper" && player == "rock") ? "computer" :
    (computer === "scissors" && player == "paper") ? "computer" :
    "player";
    return winner;
}

function mouseOver (e) {
    hover = toUpperCase(e.target.id);
    message.textContent = hover;
}

function mouseOut (e) {
    message.textContent = "Select an object";
}

function toUpperCase(string){    
    return string.charAt(0).toUpperCase() + string.substring(1);
}

function updateScore() {
    document.querySelector("#player-score").textContent = "Player : "+playerScore;
    document.querySelector("#computer-score").textContent = "Computer : "+computerScore;
}

function prepareFooterText(computer, player, winner) {
    if (winner == "draw") {
        footerText = "Round "+round+": Draw || You both chose "+toUpperCase(computer);
    }else{
        footerText = "Round "+round+": "+toUpperCase(winner)+"  won || You chose "+toUpperCase(player)+". Computer chose "+toUpperCase(computer);
    } 
}

function appendFooter() {
    let newDiv = document.createElement("div");
    let newContent = document.createTextNode(footerText);
    newDiv.appendChild(newContent);
    let footerDiv = document.querySelector(".footer");
    footerDiv.insertBefore(newDiv, footerDiv.firstChild);
}

function reset(){
    grows = document.querySelectorAll(".grow");
    grows.forEach(grow => grow.classList.remove("grow"));
    message.textContent = "Select an object";
    addMouseListeners(selectables);
    round++;
    updateScore();
    appendFooter();
}

function play(e) {
    removeMouseListeners(selectables);
    const playerSelect = e.target.id;
    const computerSelect = computerPlay(playerSelect);
    this.classList.add('grow');
    const winner = checkWinner(computerSelect,playerSelect);

    prepareFooterText(computerSelect,playerSelect,winner);

    message.textContent = "You chose "+toUpperCase(playerSelect)+"!";
    setTimeout(function() {
        document.querySelector(`#comp-${computerSelect}`).classList.add("grow");
        message.textContent = "Computer chose "+toUpperCase(computerSelect)+"!";
        if (winner == "draw") {
            setTimeout(function() {
                message.textContent = "Draw!";
                setTimeout(function() {
                    reset();
                }, timeoutTime);
            }, timeoutTime);
        }else if (winner == "player"){
            playerScore++;
            setTimeout(function() {
                message.textContent = "You win!";
                setTimeout(function() {
                    reset();
                }, timeoutTime);
            }, timeoutTime);
        }else{
            setTimeout(function() {
                computerScore++;
                message.textContent = "You lose...";
                setTimeout(function() {
                    reset();
                }, timeoutTime);
            }, timeoutTime);
        }
    }, timeoutTime);
}

addMouseListeners(selectables);