let results = [0, 0, 0, 0, 0, 0, 0, 0, 0];
let winningPatterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
]
let gameover = false;

let actualMarker = "X"

let xWonText = [
    "O is in the dust, X is the winner!",
    "The looooooser is O!",
    "Hard fight, but X was last man standing.",
]

let oWonText = [
    "X is in the dust, O is the winner",
    "The looooooser is X!",
    "Hard fight, but O was last man standing.",
]

let lastMove = [];

const setKaestl = (clickedNumber) => {
    history.pushState({first:1}, document.title);
    lastMove.push(clickedNumber);

    if(
        gameover || 
        results[clickedNumber] !== 0
    ) {
        return;
    }

    if(!document.getElementById("kaestl-"+clickedNumber).innerText) {
        document.getElementById("kaestl-"+clickedNumber).innerText = actualMarker;

        results[clickedNumber]=actualMarker
    }
    
    if(actualMarker==="X") {
        actualMarker="O"
    } else {
        actualMarker="X"
    }
    document.getElementById("marker").innerText = actualMarker;

    // console.log(results);
    checkPattern();
}

const letComputerDoAMove = () => {

    if(gameover) {
        return;
    }

    let anInteger = generateARandomInteger(9);

    while (results[anInteger] !== 0) {
        anInteger = generateARandomInteger(9);
    }

    setKaestl(anInteger);
}

const checkPattern = () => {

    winningPatterns.forEach(pattern => {

        let analysisPattern = [];

        pattern.forEach(cell => {
            analysisPattern.push(results[cell])
            // console.log(results[cell])
        });

        console.log(analysisPattern);

        // we found a full filled pattern
        if(!analysisPattern.includes(0)) {

            if(analysisPattern.every((item) => item === "X")) {
                console.log("Winner is X")
                document.getElementById("textbox").innerText = xWonText[generateARandomInteger(3)];
                gameover = true;
            }

            if(analysisPattern.every((item) => item === "O")) {
                console.log("Winner is O")
                document.getElementById("textbox").innerText = oWonText[generateARandomInteger(3)];
                gameover = true;
            }
        }
    });

    if(results.filter((item) => item === 0).length === 0 && !gameover) {
        document.getElementById("textbox").innerText = "There are no looser. There are two!";
        gameover = true;
    }

    if(gameover) {
        document.getElementById("textbox").classList.add("gameover");
        document.getElementById("textbox-bottom").classList.add("hidden");
        document.getElementById("textbox-bottom-replay").classList.remove("hidden");
        document.getElementById("gametable").classList.add("opacityReducer");
        lastMove = null;
    }
}

const generateARandomInteger = (max) => {
  return Math.floor(Math.random() * max);
}

const resetKaestl = (clickedNumber) => {
    if(
        gameover
    ) {
        return;
    }

    if(document.getElementById("kaestl-"+clickedNumber).innerText) {
       document.getElementById("kaestl-"+clickedNumber).innerText = "";

        results[clickedNumber]=0
    }
    
    if(actualMarker==="X") {
        actualMarker="O"
    } else {
        actualMarker="X"
    }
    document.getElementById("marker").innerText = actualMarker;
}

document.addEventListener('mousedown', function(event) {
    if (event.detail > 1) {
      event.preventDefault();
    }
  }, false);

window.addEventListener('popstate', function (e) {
    if (lastMove && lastMove.length !== 0) {
        let lastElement = lastMove.pop()
        console.log(lastMove)
        resetKaestl(lastElement)
    }
});
