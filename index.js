const guessInput = document.getElementById('guess'); // The input field where the user enters their guess 
const submitButton = document.getElementById('submit'); // The button the user clicks to submit their guess
const resetButton = document.getElementById('reset'); // The button the user clicks to reset the game
const messages = document.getElementsByClassName('message'); // All the message elements that can be shown to the user
const tooHighMessage = document.getElementById('too-high'); // The message that tells the user their guess was too high 
const tooLowMessage = document.getElementById('too-low'); // The message that tells the user their guess was too low
const maxGuessesMessage = document.getElementById('max-guesses'); // The message that tells the user they have reached the maximum number of guesses
const numberOfGuessesMessage = document.getElementById('number-of-guesses'); // The message that tells the user how many guesses they have made and how many they have left
const correctMessage = document.getElementById('correct'); // The message that tells the user they guessed correctly

let targetNumber; // The number the user is trying to guess
let attempts = 0; // The number of attempts the user has made
const maxNumberOfAttempts = 5; // The maximum number of attempts allowed

// Returns a random number from min (inclusive) to max (exclusive)
// Usage:
// > getRandomNumber(1, 50)
// <- 32
// > getRandomNumber(1, 50)
// <- 11
function getRandomNumber(min, max) { // BUG 1 - was missing a closing parenthesis
  return Math.floor(Math.random() * (max - min)) + min;
}

// `checkGuess` is called when the user clicks the "Submit Guess" button (checks the user's guess against the target number)
function checkGuess() {
  // Get value from guess input element
  const guess = parseInt(guessInput.value, 10); // Parse the user's guess as an integer (base 10) from the input field value 
  if (isNaN(guess) || guess < 1 || guess > 99) { // BUG 2 - didn't check if the guess was smaller than 1 or greater than 99  
    alert('Please enter a valid number between 1 and 99');
    return; // Exit the function early if the input is invalid 
  }
  
  // Step 1: Increment attempts at the start of the guess check
  attempts++;

  hideAllMessages(); // `hideAllMessages` hides all the messages so we can show only the relevant one(s)
  
  // Step 2: Check if the user has run out of attempts FIRST
  if (attempts >= maxNumberOfAttempts && guess !== targetNumber) {
    // Step 3: Handle game over - no more attempts
    maxGuessesMessage.innerHTML = `Game Over! You've used all 5 attempts. The correct number was ${targetNumber}`;
    maxGuessesMessage.style.display = ''; // Show the game over message  
    // Hide all other messages (they're already hidden by hideAllMessages above)
    // Disable both submitButton and guessInput
    submitButton.disabled = true;
    guessInput.disabled = true;
    guessInput.value = ''; // Clear the input field
    resetButton.style.display = ''; // show the reset button
    return; // Exit the function
  }

  // Check if the guess is correct, too high, or too low and show the appropriate message to the user below the input field and buttons (see HTML file for the messages) 
  if (guess === targetNumber) {
    // Handle correct guess case
    const guessWord = attempts === 1 ? 'guess' : 'guesses'; // use singular 'guess' if only one attempt, otherwise use plural 'guesses'
    numberOfGuessesMessage.innerHTML = `You made ${attempts} ${guessWord}`; // show the number of attempts the user made to guess the number
    numberOfGuessesMessage.style.display = ''; // show the number of guesses message
    correctMessage.style.display = ''; // show the correct message
    submitButton.disabled = true; // disable the submit button so user can't keep guessing after they already guessed correctly  
    guessInput.disabled = true; // disable the input field so user can't keep guessing after they already guessed correctly  
  } else {
    // Handle incorrect guess case
    if (guess < targetNumber) {
      tooLowMessage.style.display = ''; // show the too low message if the guess is less than the target number  
    } else {
      tooHighMessage.style.display = ''; // show the too high message if the guess is greater than the target number
    }

    // Step 4: Fix the remaining attempts calculation and Step 6: Add singular/plural handling
    const remainingAttempts = maxNumberOfAttempts - attempts; // calculate the number of remaining attempts the user has left  
    const attemptWord = remainingAttempts === 1 ? 'attempt' : 'attempts'; // singular vs plural
    numberOfGuessesMessage.innerHTML = `You guessed ${guess}. <br> ${remainingAttempts} ${attemptWord} remaining`; // show the current guess and remaining attempts
    numberOfGuessesMessage.style.display = ''; // show the number of guesses message  
  }

  guessInput.value = ''; // Clear the input field for the next guess 

  resetButton.style.display = ''; // show the reset button so user can start a new game after they guessed correctly or reached max number of attempts 
}

 // Hides all the messages by setting their display style to 'none' 
function hideAllMessages() {
  for (let elementIndex = 0; elementIndex < messages.length; elementIndex++) { // BUG 4 - the loop was going one too far and causing an error because it was trying to access an index that doesn't exist in the messages array (change <= to <)
    messages[elementIndex].style.display = 'none'; // hide each message element 
  }
}

// BUG 5 - function is misspelled
function setup() {
  // Get random number
  targetNumber = getRandomNumber(1, 100);
  console.log(`target number: ${targetNumber}`); // Log the target number to the console for debugging purposes  

  // Reset number of attempts
  attempts = 0; // BUG 6 - this should be attempts = 0 not maxNumberOfAttempts = 0 because maxNumberOfAttempts is const and already set to 5 at the top line 13

  // Enable the input and submit button
  submitButton.disabled = false; // BUG 7 - disabled is misspelled was disabeld should be disabled
  guessInput.disabled = false; // Enable the input field so user can start guessing again  

  hideAllMessages(); // Hide all messages 
  resetButton.style.display = 'none'; // Hide the reset button until the user guesses correctly or reaches max number of attempts  
}

submitButton.addEventListener('click', checkGuess); // When the user clicks the submit button, call the `checkGuess` function to check their guess  
resetButton.addEventListener('click', setup); // When the user clicks the reset button, call the `setup` function to start a new game 

setup(); // Call the `setup` function to initialize the game when the page loads  