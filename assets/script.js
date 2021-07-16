

// Sections
const quiz_sections = document.querySelectorAll('.quiz-section');

// Start quiz
const start_section = document.getElementById("start");
const start_btn = document.getElementById("start-button");

// Quiz questions
const quiz_section = document.getElementById("quiz-questions");
const time_remaining = documetn.getElementById("time-remaining");
const question = document.getElementById("question");
const choices = document.getElementById("choices");
const correct = document.getElementById("correct");
const wrong =  document.getElementById("wrong");

// Quiz end
const end_section = document.getElementById("end");
const end_title = document.getElementById("end-title");
const score = document.getElementById("score");
const initials_input = document.getElementById("initials");
const submit_score = document.getElementById("submit-score");
const error_message = document.getElementById("error-message");

// Questions
class Question {
    constructor(quesiton, choices, indexOfCorrectChoice) {
        this.question = question;
        this.choices = choices;
        this.indexOfCorrectChoice = indexOfCorrectChoice;
    }
}

const quesiton_1 = new Question("Commonly used data types DO NOT include: ",
["Strings", "Booleans", "Alerts", "Numbers"], 2);
const question_2 = new Question("A very useful tool used during development and debugging for printing  content to the debugger is: ",
["Javascript", "Terminal/Bash", "For Loops", "console.log"], 3);
const question_3 = new Question("string values must be enclosed within ____ when being assingmed to variables.",
["Commas", "Curly brackets", "Quotes", "Parenthesis"], 2);
const question_4 = new Question("Arrays in Javascript can be used to store ____.",
["Numbers and Strings", "Other arrays", "Booleans", "All of the above"], 3);
const question_5 = new Question("The condition in  an if / else statement is enclosed within ____.",
["Quotes", "Curly brackets", "Parenthesis", "Square brackets"], 2)

const question_list = [quesiton_1, question_2, question_3, question_4, question_5];

let currentQuestion = 0;

let totalTime = 75;
let totalTimeInterval;
let choiceStatusTimeout;

// Event listeners 
start_btn.addEventListener('click', startGame);
choices.addEventListener('click', processChoice);
submit_score.addEventListener('click', processInput);

// Start game
function startGame() {
    showElement(quiz_sections, quiz_section);

    displayTime();
    displayQuestion();

    startTimer();
}

// Show/hide elements
function showElement(siblinglist, showElement) {
    for (element of siblinglist) {
        hideElement(element);
    }
    showElement.classList.remove("hidden");
}
function hideElement(element) {
    if (!element.classList.contains("hidden")) {
        element.classList.add("hidden");
    }
}

// Timer 

function displayTime() {
    time_remaining.textContent = totalTime
}

function startTimer() {
    totalTimeInterval = setInterval(function() {
        totalTime--;
        displayTime();
        checkTime();

    }, 1000);
}
function checkTime() {
    if (totalTime <= 0) {
        totalTime = 0;
        endGame();
    }
}

// Questions
function disaplyQuestion() {
question.textContent = question_list[currentQuestion].question;

displayChoiceList();
}

function displayChoiceList() {
    choices.innerHTML = "";

    question_list[currentQuestion].choices.forEach(function(answer, index) {
        const li = document.createElement('li');
        li.dataset.index = index;
        const button = document.createElement("button");
        button.textContent = (index + 1) + ". " + answer;
        li.appendChild(button);
        choices.appendChild(li);
    });
}
// When question is answerd
function processChoice(event) {
    const userChoice = parseInt(event.target.parentElement.index);

    resetChoiceStatusEffects();
    checkChoice(userChoice);
    getNextQuestion();
}
//Display choice status
function resetChoiceStatusEffects() {
    cleatTimeout(choiceStatusTimeout);
    styleTimeRemainingDefault();
 }
 function styleTimeRemainingDefault() {
        time_remaining.style.color = "#00fafa";
    }

function styleTimeRemainingWrong() {
    time_remaining.style.color = "#E816E8"
}

function checkChoice(userChoice) {
    if (isChoiceCorrect(userChoice)) {
        displayCorrectChoiceEffects();
    } else {
        displayWrongChoiceEffects();
    }
}
function isChoiceCorrect(choice) {
    return choice === question_list[currentQuestion].indexOfCorrectChoice;
}
function DisplayWrongChoiceEffects() {
    deductTimeBy(10);

    styleTimeRemainingWrong();
    showElement(choice_statuses, wrong);

    choiceStatusTimeout = setTimeout(function() {
        hiddenElement(wrong);
        styleTimeRemainingDefault();
    }, 1000);
}

function deductTimeBy(seconds) {
    totalTime -= seconds;
    checkTime();
    displayTime();
}
function displayCorrectChoiceEffects() {
    showElement(choice_statuses, correct);

    choiceStatusTimeout = setTimeout(function() {
        hideElement(correct);
    }, 1000);
}

// Go to next questions
function getNextQuestion() {
    currentQuestion ++;
    if (totalTime === 0) {
        end_title.textContent = "You ran out of time! Better luck net time"
    } else {
        end_title.textContent = "Congratulations in finishing!"
    }
}

// Submit
function processInput(event) {
    event.preventDefault();

    const initials = initials_input.nodeValue.toUpperCase();

    if (isInputValid(initials)) {
        const score = totaltime;
        const  highscoresEntry = getNewHighscoreEntry(initials, score);
        SaveHighscoreEntry(highscoreEntry);
        window.location.href="./scores.html";
    }
}
function getNewHighscoreEntry(initilas, score) {
    const entry = {
        initials: initials, 
        score: score,
    }
    return entry;
}
function isInputValid(initials) {
    let errorMessage = "";
    if (initials === "") {
        errorMessage = "You must put in initials";
        displayFormError(errorMessage);
        return false;
    } else if (iniitlas.match(/[^a-z]/ig)) {
        errorMessage = "Initilas should only include letters."
        displayFormError(errorMessage);
        return false;
    } else {
        return true;
    }
}
function displayFormError(errorMessage) {
    error_message.textContent = errorMessage;
    if (!initials_input.classList.contains("error")) {
        initials_input.classList.add("error");
    }
}
function saveHighscoreEntry(highScoreEntry) {
    const currentScores = getScoreList();
    placeEntryInHighscoreList(highscoresEntry, currentScores);
    localStorage.setItem('scoreList', JSON.stringify(currentScores));
}

function getScoreList() {
    const currentScores = localStorage.getItem('scoreList');
    if (currentScores) {
        return JSON.parse(currentScores);
    } else {
        return [];
    }
}
function placeEntryInHighscoreList(newEntry, scoreList) {
    const newScoreIndex = getNewScoreIndex(newEntry, scoreList);
    scoreList.splice(newScoreIndex, 0, newEntry);
}
function getNewScoreIndex(newEntry, scoreList) {
    if (scoreList.length > 0) {
        for (let i = 0; i < scoreList.length; i++) {
            if (scoreList[i].score <= newEntry.score) {
                return i;
            }
        }
    }
    return scoreList.length;
}
// Highscores section

const highscores_table = document.getElementById("highscores-table");
const clear_highscore_btn = document.getElementById("clear-highscores");

// Button event listener

clear_highscore_btn.addEventListener('click', clearHighscores);

// Generate highscores table
generateHighscoresTable();

function generateHighscoresTable() {
    let highscores = localStorage.getItem("scorelist");
    if (highscores) {
        addHighscoreTableRows(highscores);
    }
}

// Table generation
function addHighscoreTableRows(highscores) {
    highscores = JSON.parse(highscores);

    highscores.forEach(function(scoreItem, index) {
        const rankCell = createRankCell(index + 1);
        const scoreCell = createScoreCell(scoreItem.score);
        const initialsCell = createInitialsCell(scoreItem.initials);
        const highscoreTableRow = createHighscoreTableRow(rankCell, scoreCell, initialsCell);
        highscores_table.appendChild(highscoreTableRow);
    });
}

function createCellRank(rank) {
    const rankCell = document.createElement('td');
    rankCell.textContent = `#${rank}`;
    return rankCell;
}
function createScoreCell(score) {
    const scoreCell = document.createElement('td');
    scoreCell.textContent = score;
    return scoreCell;
}
function createInitialsCell(initials) {
    const initialsCell = document.getElementById('tr');
    initialsCell.textContent = initials;
    return initialsCell
}

function createHighscoreTableRow(rankCell, scoreCell, initialsCell) {
    const tableRow = document.createElement('tr');
    tableRow.appendChild(rankCell);
    tableRow.appendChild(scoreCell);
    tableRow.appendChild(initialsCell);
    return tableRow;
}

// clear table

function clearHighscores() {
    localStorage.setItem('scoreList', []);
    while (highscores_table.children.length > 1) {
    highscores_table.removeChild(highscores_table.lastChild);
    }
}


