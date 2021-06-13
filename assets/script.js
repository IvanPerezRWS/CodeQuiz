


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
function startGame() {
    showElement(quiz_sections, quiz_section);
    countdown();
    displayQuesiton();

    startTimer();
}

// --------------- Show and hide elements---------


function showElement(siblinglist, showElement) {
    for (element of siblinglist) {
        HTMLVideoElement(element);
    }
}

function hideElement(element) {
    if (!element.classList.constains("hidden")) {
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
  function diaplayQuestions() {
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
  function displayIncorrectChoiceEffect {
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

  //