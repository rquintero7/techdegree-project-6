// Get elements from document
const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const resetBtn = document.querySelector('.btn__reset');
const overlay = document.getElementById('overlay');
const ul = document.querySelector('#phrase ul');

// Establish and set game resources

let missed = 0;
const phrases = [
    'Aint No Sunshine',
    'Lovely Day',
    'Just The Two Of Us',
    'Lean On Me',
    'Grandmas Hands'
];

// Configure start game
resetBtn.addEventListener('click', () => {
    overlay.style.display = 'none';
});

// Return random phrases and get them to display
const getRandomPhraseAsArray = (arr) => {
    let ranNum = Math.floor(Math.random() * arr.length);
    let ranPhrase = arr[ranNum].split("");
    return ranPhrase;
}

getRandomPhraseAsArray(phrases);

const addPhraseToDisplay = arr => {
    for (i = 0; i < arr.length; i++) {
        const li = document.createElement('li');
        li.textContent = arr[i];
        ul.appendChild(li);
        if (arr[i] !== ' ') {
            li.classList.add('letter');
        } else {
            li.classList.add('space');
        }
    }
}

const phraseArray = getRandomPhraseAsArray(phrases);
addPhraseToDisplay(phraseArray);

// Check if letter is clicked = match to phrase, if not return null

// define function with paramater of button
const checkLetter = button => {
    // select all elements with class of letter
    let phraseListItems = ul.children;
    let correct = null;
    // loop over letters on the display
    for (i = 0; i < phraseListItems.length; i++) {
        const letter = phraseListItems[i].textContent.toLowerCase();
        // IF letters match button passed in
        if (button.textContent === letter) {
            //add class named show to the letters element
            phraseListItems[i].classList.add("show");
            correct = true;
        }
    }
    return correct;
}

checkLetter(qwerty);

// Onscreen keyboard click addEventListener
qwerty.addEventListener('click', e => {
    // If click on button is a click off the buttons or already has the chosen class, clear them out
    if (e.target.tagName === 'BUTTON') {
        // Add the “chosen” class to the button that was pressed.
        e.target.classList.add('chosen');
        e.target.setAttribute('disabled', true);
        // Call the checkLetter function and store the results in a variable.
        const match = checkLetter(e.target);
        // If the checkLetter function does not find a letter, remove one of the heart images and increment the missed counter
        if (!match) {
            const tries = document.querySelectorAll('.tries');
            tries[missed].style.display = 'none';
            missed++;
        }
        if (e.target) {
            return checkWin(e.target);
        }
    }
});

// Check win function
const checkWin = (e) => {
    // Create a variable to store the li elements that have the class name “letter”
    let storeLetter = ul.getElementsByClassName('letter');
    // Create a variable to store the li elements that have the class name “show”
    let showPhrase = ul.getElementsByClassName('show');
    // Check if the length of the 2 variables are the same. If they are, display the win overlay
    if (storeLetter.length === showPhrase.length) {
        // Create the win overlay by adding the “win” class to the start overlay.
        overlay.classList.add('win');
        // Change the headline text of the start overlay to show a person won.
        overlay.querySelector('h2').textContent = "Congratulations! You've won!";
        // Change the display property of the overlay to “flex”
        overlay.style.display = 'flex';
        overlay.querySelector('a').textContent = 'Play Again!';
        resetGame();
    }
    // Check if the missed counter is greater than 4. If they are, display the lose overlay
    if (missed > 4) {
        // Create the lose overlay by adding the “lose” class to the start overlay.
        overlay.classList.add('lose');
        // Change the headline text of the start overlay to show a person lost.
        overlay.querySelector('h2').textContent = "Sorry, You've lost :(";
        // Change the display property of the overlay to “flex”
        overlay.style.display = 'flex';
        // reset button should appear after checkWin
        overlay.querySelector('a').textContent = 'Play Again?';
        resetGame();
    }
}

function resetGame() {
    // reset on screen keyboard and clear previously selected letters
    let keyboardButton = document.querySelectorAll('.keyrow button');
    // loop through keyboard as an empty string to reset
    for (let i = 0; i < keyboardButton.length; i++) {
        keyboardButton[i].className = '';
        keyboardButton[i].disabled = false;
    }
    ul.innerHTML = '';
    // call a random phrase on reset
    addPhraseToDisplay(getRandomPhraseAsArray(phrases));
    // reset hearts
    const liveHeart = document.getElementsByTagName('img');
    for (let i = 0; i < liveHeart.length; i++) {
        let tries = document.querySelectorAll('.tries');
        tries[i].style.display = 'inline';
    }
    // reset missed
    missed = 0;
}