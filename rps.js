
var playerMove;
var aiMove;
var aiMoveInt;
var previousMoveInt;
var result;
var winner;
var setMove;
var moves = [];
var arraySize;
var playerScore = 0;
var aiScore = 0;
var modeLog;
var aiResult;

var nn = 0;
var np = 0;
var ns = 0;
var pn = 0;
var pp = 0;
var ps = 0;
var sn = 0;
var sp = 0;
var ss = 0;

var aiWinTotal;

var nnp = 0;
var npp = 0;
var nsp = 0;
var pnp = 0;
var ppp = 0;
var psp = 0;
var snp = 0;
var spp = 0;
var ssp = 0;


// RESETS ALL GAME VARIABLES, TRIGGERED BY RESET BUTTON AND GAME MODE TOGGLE
function resetGame() {
    document.getElementById("playerMoveText").style = "visibility:hidden;";
    document.getElementById("playerMoveImage").src = 'images/unknown.png';
    document.getElementById("aiMoveText").style = "visibility:hidden;";
    document.getElementById("aiMoveImage").src = 'images/unknown.png';
    document.getElementById("rowh").style = "visibility:hidden;";
    document.getElementById("result").style = "visibility:hidden;";
    document.getElementById("playerScore").innerHTML = "-";
    document.getElementById("aiScore").innerHTML = "-";
    
    var i;
    for (i = 0; i < moves.length; i++) {
        document.getElementById("row" + i).style = "visibility:hidden;";
    }
    
    playerMove = null;
    aiMove = null;
    aiMoveInt = null;
    result = null;
    winner = null;
    setMove = null;
    moves = [];
    arraySize = null;
    playerScore = 0;
    aiScore = 0;
    modeLog = null;
    aiResult = null;
    
    nn = 0;
    np = 0;
    ns = 0;
    pn = 0;
    pp = 0;
    ps = 0;
    sn = 0;
    sp = 0;
    ss = 0;

    aiWinTotal = null;

    nnp = 0;
    npp = 0;
    nsp = 0;
    pnp = 0;
    ppp = 0;
    psp = 0;
    snp = 0;
    spp = 0;
    ssp = 0;
}


// ASSIGN PLAYER MOVE TO RELEVANT VARIABLES AND DISPLAY
function playerThrow(move) {
    
    playerMove = move;
    
    document.getElementById("playerMoveText").innerHTML = move;
    document.getElementById("playerMoveText").style = "visibility:visible;";
    document.getElementById("playerMoveImage").src = 'images/player_' + move + '.png';
    
    aiThrow();
}


// LOOK AT GAME MODE TO DETERMINE IF AI OR RANDOM IS USED
// 0=ROCK, 1=PAPER, 2=SCISSORS
// INTERPRET AI/RANDOM THROW AND OUTPUT
function aiThrow() {
    
    if (document.getElementById("aiCheck").checked == true && arraySize != null) {
        
        translateMove();
        
        aiPredict();
                
    } else {
        aiMoveInt = Math.floor(Math.random() * 3); // randomly chooses a 0, 1, or 2
        modeLog = 'Random';
        aiResult = 'AI not used this round.';
    }
    
    switch (aiMoveInt) {
        case 0:
            aiMove = "Rock";
            break;
        case 1:
            aiMove = "Paper";
            break;
        case 2:
            aiMove = "Scissors";
            break;
    }
    
    document.getElementById("aiMoveText").innerHTML = aiMove;
    document.getElementById("aiMoveText").style = "visibility:visible;";
    document.getElementById("aiMoveImage").src = 'images/ai_' + aiMove + '.png';
    
    getResult();
}

// TRANSLATE PLAYERMOVE TO INTEGER
function translateMove() {
    
    switch (moves[arraySize].playerMove) {
        case 'Rock':
            previousMoveInt = 0;
            break;
        case 'Paper':
            previousMoveInt = 1;
            break;
        case 'Scissors':
            previousMoveInt = 2;
            break;
    }
}



// TAKE PLAYERMOVE AND AIMOVE AND DETERMINE WHO WINS
// INCREMENT PLAYER AND AI SCORES
// OUTPUT RESULTS
function getResult() {
    
    if (playerMove === "Rock" && aiMove === "Rock") {
        result = "It's a Tie! Try again.";
        winner = "Tie";
    } else if (playerMove === "Rock" && aiMove === "Paper") {
        result = "Paper beats Rock. AI wins!";
        winner = "AI";
    } else if (playerMove === "Rock" && aiMove === "Scissors") {
        result = "Rock beats Scissors. You win!";
        winner = "Player";
    } else if (playerMove === "Paper" && aiMove === "Rock") {
        result = "Paper beats Rock. You win!";
        winner = "Player";
    } else if (playerMove === "Paper" && aiMove === "Paper") {
        result = "It's a Tie! Try again.";
        winner = "Tie";
    } else if (playerMove === "Paper" && aiMove === "Scissors") {
        result = "Scissors beats Paper. AI wins!";
        winner = "AI";
    } else if (playerMove === "Scissors" && aiMove === "Rock") {
        result = "Rock beats Scissors. AI wins!";
        winner = "AI";
    } else if (playerMove === "Scissors" && aiMove === "Paper") {
        result = "Scissors beats Paper. You win!";
        winner = "Player";
    } else if (playerMove === "Scissors" && aiMove === "Scissors") {
        result = "It's a Tie! Try again.";
        winner = "Tie";
    } 
    
    if (winner === "Player") {
        playerScore++;
        document.getElementById("playerScore").innerHTML = playerScore;
    } else if (winner === "AI") {
        aiScore++;
        document.getElementById("aiScore").innerHTML = aiScore;
    }
    
    document.getElementById("result").innerHTML = result;
    document.getElementById("result").style = "visibility:visible;";
    
    setResult();
}


// SAVE GAME HISTORY OBJECTS TO MOVES ARRAY
function setResult() {
    
    setMove = {playerMove:playerMove, aiMove:aiMove, winner:winner};
    
    moves.push(setMove);
    
    if (moves.length > 5) {
        moves.shift();
    }
    
    arraySize = moves.length - 1;
    
    logResult();
    logToConsole();
}


//OUTPUT GAME HISTORY TO TABLE
function logResult() {
    
    document.getElementById("rowh").style = "visibility:visible;";
    
    var i;
    for (i = 0; i < moves.length; i++) {
        document.getElementById("player" + i).innerHTML = moves[arraySize - i].playerMove;
        document.getElementById("ai" + i).innerHTML = moves[arraySize - i].aiMove;
        document.getElementById("winner" + i).innerHTML = moves[arraySize - i].winner;
        
        document.getElementById("row" + i).style = "visibility:visible;";
    }
}


//OUTPUT VARIABLE SETTING TO CONSOLE
function logToConsole() {
    console.log("Player Move:  " + playerMove);
    console.log("-----------------------------------------");
    console.log("AI Strategy Mode: " + modeLog);
    console.log(aiResult);
    console.log('Total wins per AI Mode:')
    console.log('nn:'+nn+' np:'+np+' ns:'+ns+' pn:'+pn+' pp:'+pp+' ps:'+ps+' sn:'+sn+' sp:'+sp+' ss:'+ss);
    console.log('Win ratio per AI Mode:')
    console.log('nn:'+nnp+'% np:'+npp+'% ns:'+nsp+'% pn:'+pnp+'% pp:'+ppp+'% ps:'+psp+'% sn:'+snp+'% sp:'+spp+'% ss:'+ssp+'%');
    console.log("AI Move:      " + aiMove);
    console.log('-----------------------------------------');
    console.log("Winner:         " + winner);
    console.log("Result:         " + result);
    //console.log("moves.length: " + moves.length);
    //console.log("arraySize:    " + arraySize);
    console.log("Log to Browser: " + moves[arraySize].playerMove + ', ' + moves[arraySize].aiMove + ', ' + moves[arraySize].winner);
    console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");

}