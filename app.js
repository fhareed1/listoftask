/*
  Game Function:
  - Player must guess a number between a min and max
  - Player gets a certain amount of guesses
  - Notify player of guesses remaining
  - Notify the player of the correct answer if loose
  - Let player choose to play again
*/

// Game values
let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;


// UI Elements
const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input')
      message = document.querySelector('.message');

// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// play again event listeners
game.addEventListener('mousedown', function(e){

  if(e.target.className === 'play-again'){
    window.location.reload();
  }

});


//listen for guess
guessBtn.addEventListener('click', function(){

  let guess = parseInt(guessInput.value);

  // Validate
  if(isNaN(guess) || guess < min || guess > max){
    setMessage(`Please enter a number between ${min} and ${max}`, 'red');
  }

  //check if you won
  if(guess === winningNum){
    // game over - you win

    gameOver(true, `${winningNum} is correct, YOU WIN!` );
    
  } else{
    // wrong number
    guessesLeft -= 1;

    if(guessesLeft === 0){
    // Game over - lost
      gameOver(false, `Game Over YOU LOSE!, The correct number was ${winningNum}`);






    // // disbled input
    // guessInput.disabled = true;

    // // Change Border Color
    // guessInput.style.borderColor = 'red';

    // // Set message
    // setMessage(`Game Over YOU LOSE!, The correct number was ${winningNum}`, 'red');
  }else {
    // Game continues - answer wrong
    
    // Change Border Color
     guessInput.style.borderColor = 'red';

    //clear input
    guessInput.value = '';
    
    // tell user its the wrong number   
    setMessage(`${guess} is not correct,  ${guessesLeft} guesses left`);

     
    }
  }

});

// To avoid repetition we create a function to just make the whole code smaller and neater

function gameOver (won, msg){
  let color;
  won === true ? color = 'green' : color = 'red';


   // Disable the input
   guessInput.disabled = true;

   // change text color
   message.style.color = color;

   // change border color
   guessInput.style.borderColor = color;

   // Set message
   setMessage(msg);

   // Play again 
   guessBtn.value = 'Play Again';
   guessBtn.className += 'play-again';

}

//get winning number
function getRandomNum(min, max){
  return Math.floor(Math.random()*(max-min+1)+min);
}

//  Set Message
function setMessage(msg, color){
  message.style.color = color;
  message.textContent = msg;
}