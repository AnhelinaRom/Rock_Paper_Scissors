document.addEventListener('DOMContentLoaded', () => {
    // Get elements or create to use later
    const rock = document.getElementById("rock");
    const paper = document.getElementById("paper");
    const scissors = document.getElementById("scissors");

    // All functions go here
    function getComputerChoice() {
        const choices = ['Rock', 'Paper', 'Scissors'];
        const randomIndex = Math.floor(Math.random() * choices.length);
        return choices[randomIndex];
    }
    function DeterminWinnerWithComputer(buttonText) {
        const computerChoice = getComputerChoice();
        
        console.log(`You clicked: ${buttonText}`);
        console.log(`Computer chose: ${computerChoice}`);
        
        if (buttonText === computerChoice) {
            console.log(`Both are the winners`);
        } else if (
            (buttonText === 'Rock' && computerChoice === 'Paper') ||
            (buttonText === 'Paper' && computerChoice === 'Scissors') ||
            (buttonText === 'Scissors' && computerChoice === 'Rock')
        ) {
            console.log(`Computer is a winner`);
        } else {
            console.log(`You are a winner`);
        }
    }

    // EventListeners, Output, The end result to display
    rock.addEventListener('click', () => DeterminWinnerWithComputer(rock.textContent));
    paper.addEventListener('click', () => DeterminWinnerWithComputer(paper.textContent));
    scissors.addEventListener('click', () => DeterminWinnerWithComputer(scissors.textContent));   
});