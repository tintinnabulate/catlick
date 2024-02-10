document.addEventListener('DOMContentLoaded', () => {
    const words = ["MARBLE", "PAROLE", "POO", "PHOEBE", "PIPER", "KIRA", "TOPAZ", "COMMUNISM", "DOSTOEVSKY", "SPANAKOPITA", "PLAYSTATION", "THICCBUTTER", "DRUGGABLE", "HEPARIN"];
    let usedWords = []; // Track used words to avoid repetition
    let selectedWord = '';
    let guesses = [];
    let mistakes = 0;
    const maxMistakes = 8;

    const wordDisplay = document.getElementById('wordDisplay');
    const hangmanImg = document.getElementById('hangmanImg');
	const guessesRemaining = document.getElementById('guessesRemaining'); // New element
    const message = document.getElementById('message');
    const keyboard = document.getElementById('keyboard');

    function initGame() {
        // Select a word that hasn't been used yet
        if (usedWords.length === words.length) {
            usedWords = []; // Reset if all words have been used
        }
        let newWords = words.filter(word => !usedWords.includes(word));
        selectedWord = newWords[Math.floor(Math.random() * newWords.length)];
        usedWords.push(selectedWord);

        guesses = [];
        mistakes = 0;
        hangmanImg.src = "1.png";
        message.textContent = '';
        updateWordDisplay();
		updateGuessesRemaining();
        resetKeyboard();
    }

    // Initialize keyboard
    function createKeyboard() {
        for (let i = 65; i < 91; i++) { // ASCII values for A-Z
            let button = document.createElement('button');
            button.textContent = String.fromCharCode(i);
            button.addEventListener('click', () => handleGuess(button.textContent));
            keyboard.appendChild(button);
        }

        // Add restart button
        let restartButton = document.createElement('button');
        restartButton.textContent = 'Restart';
        restartButton.addEventListener('click', initGame);
        document.body.appendChild(restartButton);
    }

    function updateWordDisplay() {
        let displayWord = selectedWord.split('').map(letter => (guesses.includes(letter) ? letter : "_")).join(' ');
        wordDisplay.textContent = displayWord;
    }

    function updateHangmanPicture() {
        hangmanImg.src = `${mistakes + 1}.png`;
    }

    function checkGameOver() {
        if (mistakes >= maxMistakes) {
            message.textContent = "BOOOO";
            message.style.color = 'red';
            disableKeyboard(true); // Disable all buttons
        } else if (selectedWord.split('').every(letter => guesses.includes(letter))) {
            message.textContent = "YAYAYAYAY!";
            message.style.color = 'green';
            disableKeyboard(true); // Disable all buttons
        }
    }

    function handleGuess(letter) {
        if (!guesses.includes(letter)) {
            guesses.push(letter);
            document.querySelectorAll('button').forEach(button => {
                if (button.textContent === letter) {
                    button.disabled = true;
                    button.style.color = 'red';
                }
            });
            if (!selectedWord.includes(letter)) {
                mistakes++;
                updateHangmanPicture();
            }
            updateWordDisplay();
            checkGameOver();
			updateGuessesRemaining();
        }
    }

    function resetKeyboard() {
        document.querySelectorAll('button').forEach(button => {
            if (button.textContent.length === 1) { // Letter buttons
                button.disabled = false;
                button.style.color = 'black';
            }
        });
    }

    function disableKeyboard(disable) {
        document.querySelectorAll('button').forEach(button => {
            if (button.textContent.length === 1) { // Letter buttons
                button.disabled = disable;
            }
        });
    }
	
	function updateGuessesRemaining() {
        let remaining = maxMistakes - mistakes;
        guessesRemaining.textContent = `Guesses remaining: ${remaining}`;
    }

    createKeyboard();
    initGame(); // Initialize game for the first time
});