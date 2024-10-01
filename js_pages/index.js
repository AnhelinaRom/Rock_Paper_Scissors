document.addEventListener('DOMContentLoaded', () => {
    const rock = document.getElementById("rock");
    const paper = document.getElementById("paper");
    const scissors = document.getElementById("scissors");
    const resultDisplay = document.getElementById('resultDisplay');
    // Game type
    const gameSection = document.getElementById('gameSection');
    const playWithRobotButton = document.getElementById('play_with_robot');
    const playWithPersonButton = document.getElementById('play_with_person');
    // Pop up
    const popup = document.getElementById('resultSection');
    const overlay = document.getElementById('overlay');
    const closePopupButton = document.getElementById('closePopup');

    let currentMode;

    // Functions
    function getComputerChoice() {
        const choices = ['Rock', 'Paper', 'Scissors'];
        const randomIndex = Math.floor(Math.random() * choices.length);
        return choices[randomIndex];
    }

    function determineWinner(playerChoice, opponentChoice) {
        if (playerChoice === opponentChoice) {
            return `Both chose ${playerChoice}. It's a tie!`;
        } else if (
            (playerChoice === 'Rock' && opponentChoice === 'Paper') ||
            (playerChoice === 'Paper' && opponentChoice === 'Scissors') ||
            (playerChoice === 'Scissors' && opponentChoice === 'Rock')
        ) {
            return `Opponent chose ${opponentChoice}. You lose!`;
        } else {
            return `Opponent chose ${opponentChoice}. You win!`;
        }
    }

    function showPopup(result) {
        resultDisplay.textContent = result;
        popup.style.display = 'block';
        overlay.style.display = 'block';
    }

    function hidePopup() {
        popup.style.display = 'none';
        overlay.style.display = 'none';
    }

    // Event Listeners for Game Mode
    playWithRobotButton.addEventListener('click', () => {
        currentMode = 'robot';
        gameSection.style.display = 'block';
    });

    playWithPersonButton.addEventListener('click', () => {
        currentMode = 'person';
        gameSection.style.display = 'block';
    });

    // Event Listeners for Player Choices
    const playerChoices = { player1: '', player2: '' };

    const handleChoice = (choice) => {
        if (currentMode === 'robot') {
            const computerChoice = getComputerChoice();
            const result = determineWinner(choice, computerChoice);
            showPopup(result); // Show result in popup
        } else if (currentMode === 'person') {
            if (!playerChoices.player1) {
                playerChoices.player1 = choice; // First player chooses
                resultDisplay.textContent = `Player 1 chose. Waiting for Player 2 to choose.`;
            } else {
                playerChoices.player2 = choice; // Second player chooses
                const result = determineWinner(playerChoices.player1, playerChoices.player2);
                showPopup(result); // Show result in popup
                playerChoices.player1 = ''; // Reset for next game
                playerChoices.player2 = ''; // Reset for next game
            }
        }
    };

    rock.addEventListener('click', () => handleChoice('Rock'));
    paper.addEventListener('click', () => handleChoice('Paper'));
    scissors.addEventListener('click', () => handleChoice('Scissors'));

    // Close popup event listener
    closePopupButton.addEventListener('click', hidePopup);
    overlay.addEventListener('click', hidePopup); // Close when clicking overlay
});
