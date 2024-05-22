let diffic;
let col;
let gameBoard=document.getElementById("gameBoard");
let square = null;
let score = -1;
let timer = null;
let end = false;
let optionalTime = 0;


function startFunc(event){
    diffic = document.getElementById("difficulty").value;
    col = document.getElementById("color").value;
    if(diffic!=="" && col !== ""){
        if(diffic==="ease"){optionalTime=6;}
        if(diffic==="medium"){optionalTime=4;}
        if(diffic==="hard"){optionalTime=2;}
        square = document.createElement("div");
        square.style.background = col;
        square.className ="square";
        square.style.background = col;
        square.onclick = moveSquare;
        gameBoard.appendChild(square);
        moveSquare();
        startTimer();
        document.getElementById("startButton").disabled=true;
    }
}

function moveSquare(event){
    if(!end){
        square.style.left = Math.random() * (gameBoard.clientWidth - square.clientWidth) + "px";
        square.style.top = Math.random() * (gameBoard.clientHeight - square.clientHeight) + "px";
        score++;
        writeScore();
        if(score>0)resetTimer();
    }
}

function writeScore(){document.getElementById("score").textContent = "Score: " + score;}
function writeTimer(t){document.getElementById("timer").textContent = "Timer: " + t+"s";}

function startTimer(){
    let timeLeft = optionalTime;
    timer = setInterval(() => {
    timeLeft -= 0.1;
    writeTimer(timeLeft.toFixed(0));
    if (timeLeft <= 0) {
      clearInterval(timer);
      writeTimer(0);
      GameOver();
    }
  }, 100);
}

function resetTimer(){
    clearInterval(timer);
    startTimer();
}

function GameOver(){
    end = true;
    showModal();
}

function showModal() {
    let modal = document.getElementById("myModal");
    let span = document.getElementsByClassName("close")[0];

    modal.style.display = "flex";

    span.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}

document.getElementById("startButton").addEventListener("click", startFunc);