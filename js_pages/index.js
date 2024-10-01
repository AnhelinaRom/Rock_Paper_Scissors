document.addEventListener('DOMContentLoaded', () => {
    const rock = document.getElementById("rock");
    const paper = document.getElementById("paper");
    const scissors = document.getElementById("scissors");
    const resultDisplay = document.getElementById('resultDisplay');
    const gameSection = document.getElementById('gameSection');
    const playWithRobotButton = document.getElementById('play_with_robot');
    const playWithPersonButton = document.getElementById('play_with_person');
    const popup = document.getElementById('resultSection');
    const overlay = document.getElementById('overlay');
    const closePopupButton = document.getElementById('closePopup');

    let currentMode;
    const playerChoices = { player1: '', player2: '' }; // Initialize player choices

    // Get computer choice
    function getComputerChoice() {
        const choices = ['Rock', 'Paper', 'Scissors'];
        const randomIndex = Math.floor(Math.random() * choices.length);
        return choices[randomIndex];
    }

    // Show and hide popup
    function showPopup(choices, result) {
        document.getElementById('choiceDisplay').textContent = choices;
        document.getElementById('winnerDisplay').textContent = result;
        popup.style.display = 'block';
        overlay.style.display = 'block';
    }
    
    function hidePopup() {
        popup.style.display = 'none';
        overlay.style.display = 'none';
        resetGame(); // Reset game state on close
    }

    // Update the game mode display
    function updateGameModeDisplay() {
        const gameModeText = currentMode === 'robot' ? 'Playing against the computer' : 'Playing against another player';
        document.getElementById('currentGame').textContent = gameModeText;
    }

    // Reset game state
    function resetGame() {
        playerChoices.player1 = '';
        playerChoices.player2 = '';
        rock.disabled = false;
        paper.disabled = false;
        scissors.disabled = false;
        resultDisplay.textContent = '';
    }

    // Event Listeners for Game Mode
    playWithRobotButton.addEventListener('click', () => {
        currentMode = 'robot';
        gameSection.style.display = 'block';
        updateGameModeDisplay();
        resetGame(); // Reset game on mode change
    });

    playWithPersonButton.addEventListener('click', () => {
        currentMode = 'person';
        gameSection.style.display = 'block';
        updateGameModeDisplay();
        resetGame(); // Reset game on mode change
    });

    // Compare choices and determine the winner
    function determineWinner(playerChoice, opponentChoice) {
        let resultMessage;
        if (playerChoice === opponentChoice) {
            resultMessage = "It's a tie!";
        } else if (
            (playerChoice === 'Rock' && opponentChoice === 'Paper') ||
            (playerChoice === 'Paper' && opponentChoice === 'Scissors') ||
            (playerChoice === 'Scissors' && opponentChoice === 'Rock')
        ) {
            resultMessage = `The winner is ${currentMode === 'robot' ? 'Computer' : 'Player 2'}`;
        } else {
            resultMessage = "The winner is Player 1";
        }
        
        return {
            choices: `Player 1 chose ${playerChoice}. ${currentMode === 'robot' ? 'Computer' : 'Player 2'} chose ${opponentChoice}.`,
            result: resultMessage
        };
    }

    // Event Listeners for Player Choices
    const handleChoice = (choice) => {
        if (currentMode === 'robot') {
            const computerChoice = getComputerChoice();
            const { choices, result } = determineWinner(choice, computerChoice);
            showPopup(choices, result);
        } else if (currentMode === 'person') {
            if (!playerChoices.player1) {
                playerChoices.player1 = choice;
                resultDisplay.textContent = `Player 1 chose ${choice}. Waiting for Player 2 to choose.`;
                rock.disabled = true;
                paper.disabled = true;
                scissors.disabled = true;
            } else {
                playerChoices.player2 = choice;
                const { choices, result } = determineWinner(playerChoices.player1, playerChoices.player2);
                showPopup(choices, result);
                resetGame(); // Reset choices after showing result
            }
        }
    };

    rock.addEventListener('click', () => handleChoice('Rock'));
    paper.addEventListener('click', () => handleChoice('Paper'));
    scissors.addEventListener('click', () => handleChoice('Scissors'));

    // Close popup event listener
    closePopupButton.addEventListener('click', hidePopup);
    overlay.addEventListener('click', hidePopup);
});
