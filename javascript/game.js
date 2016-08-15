var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var words = ['RECESS', 'ANIMANIACS', 'TRANSFORMERS', 'POKEMON', 'DOUG', 'DEXTERS LABORATORY', 'HEY ARNOLD', 'KIM POSSIBLE', 'POWERPUFF GIRLS', 'SAMURAI JACK'];
var lives = 12;
var winCounter = 0;
var loseCounter = 0;
var messages = {
	win: 'Awesome!!! You won!',
	lose: 'You lose. Game over.',
	guessed: 'You guessed that letter already! Try again.',
	validLetter: 'Enter a letter from A - Z',
}
var isLetter = false;
var alreadyGuessed = false;
var lettersGuessed = []; 
var guesses = 0;
var currentWord;
var hiddenWord = [];
var rightLetter = false;
var winnerWinner = false;


function newGame(){
	currentWord = words[Math.floor((Math.random() * words.length))]; 
	console.log(currentWord);

	if (hiddenWord.length !== currentWord.length){
		hiddenWord = [];
	}

	//replace characters with blanks
	for (var i = 0; i < currentWord.length; i++){
			if(currentWord[i] === " "){
			hiddenWord[i] = "  ";
			}
			else{
			hiddenWord[i] = (" _ ");
			}
	}
}

	//Records keyboard input
document.onkeyup = function(event){
	var userGuess = String.fromCharCode(event.keyCode).toUpperCase();
	var enter = (event.keyCode);

	//Press Enter to start Game
	if (enter == 13){
		newGame();
	}

	//Check to see if letter, if not send message: validLetter
	for(var i = 0; i < alphabet.length; i++){
		if(userGuess === alphabet.charAt(i)){
			isLetter = true;
		}
	}	

	if(isLetter == false && enter != 13){
		console.log(messages.validLetter);
	}

	//If letter was guessed already send message: guessed
	for(var i = 0; i < lettersGuessed.length; i++){
		if(userGuess === lettersGuessed[i]){
			alreadyGuessed = true;
		}
	}

	//If already in the clue, then returns alert saying guessed already
	for(var i = 0; i < hiddenWord.length; i++){
		if (userGuess == hiddenWord[i]){
				alreadyGuessed = true;
		}
	}

	if(alreadyGuessed == true){
			console.log(messages.guessed);
		}

	//Checks for letter match and inserts into hiddenWord array
	for(var i = 0; i < currentWord.length; i++){
		if (currentWord[i] === userGuess){
			hiddenWord[i] = currentWord[i];
			rightLetter = true;
		}
	}	

	//Pushes letters guess into an array and takes away a life for wrong letter. 
	if(isLetter == true && alreadyGuessed == false && rightLetter == false){
		lettersGuessed.push(userGuess);
		lives =  lives - 1;
	}

	//When out of lives - user loses and counter goes up
	if(lettersGuessed.length == 12){
		console.log(messages.lose);
		lettersGuessed = [];
		loseCounter = loseCounter + 1;
		newGame();
	}
	//Resets booleans between keystrokes.
	rightLetter = false;
	isLetter = false;
	alreadyGuessed = false;
	

	//Asks if the user has won
	if(enter != 13){
		win();
	}
}	

function win(){

	for(var i = 0; i < currentWord.length; i++){
		if (hiddenWord[i] != " _ "){
			winnerWinner = true;
		}
		else{
			winnerWinner = false;
		}
	}

	if (winnerWinner == true){
		console.log(messages.win);
		winCounter = winCounter + 1;
		lives = 12;
		newGame();
	}
	
}



	


