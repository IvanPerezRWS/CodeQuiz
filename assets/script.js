

// HIghscores section

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
    (highscores_table.removeChild(highscores_table.lastChild);
    }
}


/*
  // Question variables
    //Sections lists
        const quiz_sections = document.getElementById(".quiz-section");
    //Start function variables
        const start = document.getElementById("start");
    //Quiz question variables
        const quiz_section = document.getElementById("quiz-questions");
        const question = document.getElementById("question");
        const choices = document.getElementById("choices");
        const choice_status = document.getElementById("choice-status");
        const correct = document.getElementById("correct");
        const incorrect = document.getElementById("incorrect");
    // end quiz variables
        const end_section = document.getElementById("end");
        const end_title = document.getElementById("end-title");
        const score = document.getElementById("score");
        const initials = document.getElementById("initials");
        const submit_score = document.getElementById("submit-score");
        const error_message = document.getElementById("error-message");
  // Question Generation
  class Question {
      constructor(question, choices, indexOfCorrectChoice) {
          this.question = question;
          this.choices = choices;
          this.indexOfCorrectChoice = indexOfCorrectChoice;
      }
  }
  const question1 = new Question("A very useful tool used during development and debugging for printing content to the debugger is:",
    ["JavaScript", "Terminal/Bash", "For loops", "console.log"], 3);
  const question2 = new Question("String values must be enclosed within _____ when being assinged to variables.",
    ["Commas", "Curly brackets", "Quotes", "Parenthesis"], 2);
  const question3 = new Question("Arrays in JavaScript can be used to store_____.",
    ["Numbers and strings", "Other arrays", "Booleans", "All of the above"], 3);
  const quesiton4 = new Question("The condition in an if / else statement is enclosed within______.",
    ["Quotes", "Curly brackets", "Parenthesis", "Square brackets"], 2);
  const quesiton5 = new Question("Commonly used datatypes DO NOT include: ",
    ["Strings", "Booleans", "Alerts", "Numbers"], 2);

  const question_list = [question1, question2, question3, quesiton4, quesiton5];
  let currentquesiton=0;

//------------Start Game---------
startBtn.addEventListener('click', startGame);
choices.addEventListener('click', choiceProcessing);
submit_score.addEventListener('submit', choiceProcessing);

function startGame() {
    showElement(quiz_sections, quiz_section);
    countdown();
    displayQuesiton();

    startTimer();
}

// --------------- Show and hide elements---------


function showElement(siblinglist, showElement) {
    for (element of siblinglist) {
        hideElement(element);
    }
}

function hideElement(element) {
    if (!element.classList.contains("hidden")) {
        element.classList.add("hidden");
    }
}

//------------- Time ------------------------
//---------------- Timer Function -------------------
var timerEl = document.getElementById('countdown');
var mainEl = document.getElementById('main');
var startBtn = document.getElementById('start');

var message = 
'Time is up! You did a good job!'
var words = message.split(' ');

    //Timer counts down...
    function countdown() {
        var timeLeft = 61;

        // call function setInterval()
        var timeInterval = setInterval(function() {
    
            if ( timeLeft > 1) {
              timeLeft = timeLeft -1;
              timerEl.textContent = timeLeft + ' seconds remaining'
       
            } else if (timeLeft === 1) {
              timeLeft --;
              timerEl.textContent = timeLeft + ' second remaining'
            } else {
              timerEl.textContent = ' ';
              clearInterval(timeInterval);
              displayMessage();
       
            }
       
        }, 1000)
      
    }
    // Displays the message one word at a time
function displayMessage() {
    var wordCount = 0;
   
    // Uses the `setInterval()` method to call a function to be executed every 300 milliseconds
    var msgInterval = setInterval(function() {
      if (words[wordCount] === undefined) {
        clearInterval(msgInterval);
      } else {
        mainEl.textContent = words[wordCount];
        wordCount++;
      }
    }, 300);
  }
   
  startBtn.onclick = countdown;

  //-------------Questions-----------------
  function displayQuestions() {
      question.textContent = question_list[currentquesiton].question;
      displayChoiceList();
  }

  function displayChoiceList() {
      choices.innerHTML = "";

      question_list[currentquesiton].choices.forEach(function(answer,index) {
          const li = document.createElement("li");
          li.dataset.index = index;
          const button = document.createElement("button");
          button.textContent = (index + 1) + ". " + answer;
          li.appendChild(button);
          choices.appendChild(li);
      });
  }
  //answering quesitons
  function choiceProcessing(event) {
      const userChoice = parseInt(event.target.parentElement.dataset.index);

      resetChoice(userChoice);
      getNextQuestion();
  }
  // choice status
  function resetChoiceStatusEffect() {
      clearTimeout(choiceStatusTimeout);
      styleTimeRemainingDefault();
  }


  function checkChoice(userChoice) {
      if (ChoiceCorrect(userChoice)) {
          disaplayCorrectChoiceEffect();
      } else {
          diaplyWrongChoiceEffect
      }
  }

  // correct choice functionality
  function isChoiceCorrect(choice) {
      return choice === question_list[currentQuestion].indexOfCorrectChoice;
  }
  // incorrect choice functionality
  function displayIncorrectChoiceEffect() {
      showElement(choice_status, incorrect);

      choiceStatusTimeout = setTimeout(function() {
          hideElement(incorrect);
          styleTimeRemainingDefault();
      }, 1000);
  }
  function displayCorrectChoiceEffect() {
      showElement(choice, correct);
      //
  }

  // Go to next question
  function getNextQuestion() {
      currentQuestion++;
      if (currentQuestion >= question_list.length) {
          endGame();
      } else {
          diaplayQuestions();
      }
  }

  // ------------- End Game -----------
  function endGame() {
      clearInterval(totalTimeInterval);

      showElement(quiz_section, end_section);
      displayScore();
      endHeading();
  }

  function displayScore() {
      score.textContent = totalTime;
  }

  function endHeading() {
      if (totalTime === 0) {
          end_title.textContent = "You have run out of time!";
      } else {
          end_title.textContent = "Good job! You have finished all questions before the timer ran out! I am so proud of you!"
      }
  }
  
  //----------- Submit Initials -----------------
  function initialInput(event) {
      event.preventDefault();

      const intials = initials_input.value.toUpperCase();

      if (inputValid(initials)) {
          const score  =totalTime;
          const highScoreEntry = getNewHighScore(initials, score);
          saveHighScore(highScoreEntry);
          window.location.href="./scores.html";

      }
  }

  // setting new highscores
  function getNewHighScore(initials, score) {
      const entry = {
          initials: intials, 
          score: score,
      }
      return entry;
  }
  
  function inputValid(initials) {
      let errorMessage = "";
      if (initials === "") {
          errorMessage = "You cannot submit empty initials.";
          displayFormError(errorMessage);
          return false;
      } else if (initials.match(/[^a-z]/ig)) {
          errorMessage = "Initials should only consist of letters."
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

  function saveHighScore(highScoreEntry) {
      const currentScore = getScoreList();
      placeEntryInHighScore(highScoreEntry, currentScore);
      localStorage.setItem("scoreList", JSON.stringify(currentScores));
  }

  // get score list
  function getScoreList() {
      const currentScore = localStorage.getItem("scoreList");
      if (currentScores) {
          return JSON.parse(currentScores);
      } else {
          return [];
      }
  }

  function placeEntryInHighScore(newEntry, scoreList) {
      const newScoreIndex = getNewHighScoreIndex(newEntry, scoreList);
      scoreList.splce(newScoreIndex, 0, newEntry);
  }

  function getNewHighScoreIndex(newEntry, scoreList) {
      if (scoreList.length > 0) {
          for (let i = 0; i < scoreList.length; i++) {
              if (scorelist[i].score <= newEntry.score) {
                  return i;
              }
          }
      }
  return scoreList.length;
  }

*/
