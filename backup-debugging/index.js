/**
 * Guessing Game - Refactored and Bug-Fixed Version
 * Players have 5 attempts to guess a random number between 1 and 99
 */

// DOM element references
const guessInput = document.getElementById('guess');
const submitButton = document.getElementById('submit');
const resetButton = document.getElementById('reset');
const messages = document.getElementsByClassName('message');
const tooHighMessage = document.getElementById('too-high');
const tooLowMessage = document.getElementById('too-low');
const maxGuessesMessage = document.getElementById('max-guesses');
const numberOfGuessesMessage = document.getElementById('number-of-guesses');
const correctMessage = document.getElementById('correct');

// Game state variables
let targetNumber;
let attempts = 0;
const maxNumberOfAttempts = 5;

/**
 * Returns a random number from min (inclusive) to max (exclusive)
 * @param {number} min - Minimum value (inclusive)
 * @param {number} max - Maximum value (exclusive)
 * @returns {number} Random number in range
 * @example
 * getRandomNumber(1, 50) // returns 32
 * getRandomNumber(1, 50) // returns 11
 */
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

/**
 * Validates user input and checks guess against target number
 * Handles win/loss conditions and updates UI accordingly
 */
function checkGuess() {
  const guess = parseInt(guessInput.value, 10);
  
  // Validate input range
  if (guess < 1 || guess > 99) {
    alert('Please enter a number between 1 and 99');
    return;
  }

  attempts++;
  hideAllMessages();

  // Check if guess is correct
  if (guess === targetNumber) {
    const guessText = attempts === 1 ? 'guess' : 'guesses';
    numberOfGuessesMessage.style.display = '';
    numberOfGuessesMessage.innerHTML = `You made ${attempts} ${guessText}`;

    correctMessage.style.display = '';

    submitButton.disabled = true;
    guessInput.disabled = true;
    resetButton.style.display = '';
    return;
  }

  // Guess is incorrect - show appropriate message
  if (guess < targetNumber) {
    tooLowMessage.style.display = '';
  } else {
    tooHighMessage.style.display = ''; // Fixed: was showing tooLowMessage for high guesses
  }

  const remainingAttempts = maxNumberOfAttempts - attempts;
  const guessText = remainingAttempts === 1 ? 'guess' : 'guesses';

  numberOfGuessesMessage.style.display = '';
  numberOfGuessesMessage.innerHTML = `You guessed ${guess}. <br> ${remainingAttempts} ${guessText} remaining`;

  // Check if max attempts reached
  if (attempts === maxNumberOfAttempts) { // Fixed: was ==== (syntax error)
    maxGuessesMessage.style.display = '';
    submitButton.disabled = true;
    guessInput.disabled = true;
  }

  guessInput.value = '';
  resetButton.style.display = '';
}

/**
 * Hides all message elements in the UI
 */
function hideAllMessages() {
  for (let elementIndex = 0; elementIndex < messages.length; elementIndex++) { // Fixed: was <= causing array bounds error
    messages[elementIndex].style.display = 'none';
  }
}

/**
 * Initializes/resets the game to starting state
 * Generates new target number and resets all game variables
 */
function setup() { // Fixed: was 'funtion' (typo)
  // Get random number between 1 and 99
  targetNumber = getRandomNumber(1, 100);
  console.log(`target number: ${targetNumber}`);

  // Reset number of attempts
  attempts = 0; // Fixed: was resetting maxNumberOfAttempts instead of attempts

  // Enable the input and submit button
  submitButton.disabled = false; // Fixed: was 'disabeld' (typo)
  guessInput.disabled = false;

  hideAllMessages();
  resetButton.style.display = 'none';
}

/**
 * Handles Enter key press to submit guess
 */
function handleKeyPress(event) {
  if (event.key === 'Enter' && !submitButton.disabled) {
    checkGuess();
  }
}

/**
 * Validates input in real-time to prevent invalid characters
 */
function validateInput(event) {
  const value = event.target.value;
  // Remove any non-numeric characters
  event.target.value = value.replace(/[^0-9]/g, '');
  
  // Limit to 2 digits (max 99)
  if (event.target.value.length > 2) {
    event.target.value = event.target.value.slice(0, 2);
  }
}

// Event listeners
submitButton.addEventListener('click', checkGuess);
resetButton.addEventListener('click', setup);
guessInput.addEventListener('keypress', handleKeyPress);
guessInput.addEventListener('input', validateInput);

// Initialize game on page load
setup();
