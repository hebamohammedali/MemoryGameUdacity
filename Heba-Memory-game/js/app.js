//Array holding the icons used in the cards
var cardArray = ["diamond", "diamond", "paper-plane-o", "paper-plane-o", "anchor", "anchor", "bolt", "bolt",
                    "cube", "cube", "leaf", "leaf", "bicycle", "bicycle", "bomb", "bomb"];
var deck = document.querySelector(".deck");

//Object stores the fastest time the user won a game
var bestTime = {
    min: 0,
    sec: 0
};

//Boolean that is turned to true when the user first click a card to start the timer

/*
 * @description starts game by:
 *      - generating new cards set
 *      - resetting the timer
 *      - resetting the stars
 *      - resetting number of moves
 */
 
function initGame(){
	'use strict';
	
	popup.style.display = "none";

    shuffle(cardArray);
    generateBoard(cardArray.length);

    
    starRatingReset();
	TimeMovesReset();

    
	deck.addEventListener("click", onCardClick);
}

//Function which reset the stars when click on reset button.
function starRatingReset() {
	'use strict';
	var stars = document.querySelectorAll(".score-panel .fa-star-o");
    for(var i = 0; i < stars.length; i++){
        stars[i].classList.replace("fa-star-o", "fa-star");
    }	
}

/*
 * @description generates list of random cards and adds them to the deck
 * @param {number} cardNum - the number of cards to be generated
 */
function generateBoard(){
	'use strict';
	var card;
    var fragment = document.createDocumentFragment();

	var i;
    for(i = 0; i <= 15; i++)
	{
        card = document.createElement('li');
        card.innerHTML = '<i class="fa fa-'+ cardArray[i] +'"></i>';
		//add class "card" to each <li>
		var classname = "card";
		card.className += classname;

        fragment.appendChild(card);
    }

    deck.innerHTML = "";
    deck.appendChild(fragment);
}

/*
 * @description is triggered when the user clicks on any card
 *      - starts the timer (if not started)
 *      - opens the card (by adding "open" & "show" classes)
 *      - add card animation
 *      - if there are two open cards checks if they are a match
 */
function onCardClick(e){
	'use strict';
    	
		startTimer();

    if(e.target.className === "card"){
        e.target.classList.add("open", "show");

        var openedCards = document.querySelectorAll(".open");
        if(openedCards.length === 2){
            incrementMoves();
			if (openedCards[1].querySelector(".fa").className === openedCards[0].querySelector(".fa").className) {
				match(openedCards);
			}
			
			else {
              mismatch();
			}
        }
    }
}

//boolean for start timer initially false.
var timerStart;
var timerID;
var timer = document.querySelector(".score-panel .timer");
function startTimer()
{
	'use strict';
	if(timerStart === false)
	{
        timerStart = true;
        timerID = setInterval(TimerFunc, 1000);
    }	
}


function TimeMovesReset()
{
    'use strict';
	minute = 0;
    second = 0;

	NoofMovment = 0;
	moves.textContent = NoofMovment;
	
	timerStart = false;
    timer.textContent = "00:00";
	
    if(timerID) { 
		clearInterval(timerID); 
	}
}


var minute = 0;
var second = 0;

function TimerFunc() {
	'use strict';
	
    second++;

    if(second >= 60){
        minute = minute + 1;
        second = 0;
    }

    var Time = "";
	
	if(minute <= 9) {
		Time += "0" + minute.toString();
	}
	
	else {
		Time += minute.toString();
	}
	
	Time += " : ";
	
	if(second <= 9) {
		Time += "0" + second.toString();
	}
	
	else {
		Time += second.toString();
	}

    timer.textContent = Time;
}

 var moves = document.querySelector(".score-panel .moves");
 var NoofMovment = 0;
 
function incrementMoves() {
	'use strict';
    NoofMovment = NoofMovment + 1;
    moves.textContent = NoofMovment;
	
	if(NoofMovment === 10 || NoofMovment === 20)
	{
            var stars = document.querySelectorAll(".score-panel .fa-star");
            stars[stars.length - 1].classList.replace("fa-star", "fa-star-o");
	}

}


function mismatch() {
	'use strict';
    deck.removeEventListener("click", onCardClick);
    setTimeout(function () {
        var openedCards = document.querySelectorAll(".open");
        openedCards[0].classList.remove("open", "show");
        openedCards[1].classList.remove("open", "show");
		
        deck.addEventListener("click", onCardClick);
    },400);
}

function match (openedCards) {
	'use strict';
    openedCards[0].classList.remove("open", "show");
    openedCards[0].classList.add("match");

    openedCards[1].classList.remove("open", "show");
    openedCards[1].classList.add("match");

    if(document.querySelectorAll(".match").length === cardArray.length){
        clearInterval(timerID);

        if((bestTime.minute * 60) + bestTime.second === 0 || 
		(minute * 60) + second < (bestTime.minute * 60) + bestTime.sec) 
		{
            bestTime.minute = minute;
            bestTime.second = second;
        }

        deck.removeEventListener("click", onCardClick);
        winnerPopup();
    }
}



/*
 * @description
 *      - increases number of moves displayed on screen
 *      - check star rating
 */
 



// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
	'use strict';
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/*
 * @description displays the win popup including:
 *      - star rating
 *      - number of moves
 *      - current game time
 *      - best game time
 */
function winnerPopup() {
	'use strict';
    document.querySelector(".modal-body .stars").innerHTML = document.querySelector(".score-panel .stars").innerHTML;
    document.querySelector(".modal-body .moves").textContent = NoofMovment;

	bestTimeFunc();

    popup.style.display = "block";
}

function bestTimeFunc() {
	'use strict';
	var timeStr = "";
	
	if( minute < 10) {
		timeStr += "0" + minute.toString();
	}
	else {
		timeStr += minute.toString();
	}
	timeStr += ":";
	
	if(second < 10) {
		timeStr += "0" + second.toString();
	}
	
	else {
		timeStr += second.toString();
	}

document.querySelector(".modal-body .timer").textContent = timeStr;

 timeStr = "";
	if(bestTime.min < 10) {
		timeStr += "0" + bestTime.min.toString();
	}
	else {
		timeStr += bestTime.min.toString();
	}
	
	 timeStr += ":";
	 
	 if( bestTime.sec < 10) {
		 timeStr += "0" + bestTime.sec.toString();
	 }
	 
	 else {
		timeStr += bestTime.sec.toString();
	 }
	 
	 document.querySelector(".modal-body .best-time").textContent = timeStr;
	 

}


var restartGame = document.querySelector(".restart");
var playAgain = document.querySelector(".modal-footer button");

//When click on restart or play again, start the game from beginning. 
restartGame.addEventListener("click", initGame);
playAgain.addEventListener("click", initGame);

// When the user clicks anywhere outside of the modal, close it
var popup = document.getElementById('popupWinner');
window.onclick = function(e) {
	'use strict';
    var closeBtn = document.querySelector(".close");

    if (e.target === closeBtn) {
        popup.style.display = "none";
    }
	
	if (e.target === popup ) {
		popup.style.display = "none";
	}
};

initGame();