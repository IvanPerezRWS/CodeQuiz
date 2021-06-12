
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
        const correct = doucment.getElementById("correct");
        const incorrect = document.getElementById("incorrect");
    // end quiz variables
        const end_section = document.getElementById("end");
        const end_title = document.getElementById("end-title");
        const score = document.getElementById("score");
        const initials = document.getElementById("initials");
        const submit_score = docuemnt.getElementById("submit-score");
        const error_message = document.getElementById("error-message");
  // Question Generation
  question {
      constructor(question, choices, indexOfCorrectChoice) {
          this.question = question;
          this.choices = choices;
          this.indexOfCorrectChoice = indexOfCorrectChoice;
      }
  }
  const question1 = new Question("A very useful tool used during development and debugging for printing content to the debugger is:",
    ["JavaScript", "Terminal/Bash", "For loops", "console.log"], 3);
  const question2 = new Question("String values must be enclosed within _____ when being assinged to variables.",
    ["Commas", "Curly brackets", "Quotes", "Parenthesis"] 2);
  const question3 = new Question("Arrays in JavaScript can be used to store_____.",
    ["Numbers and strings", "Other arrays", "Booleans", "All of the above"] 3);
  const quesiton4 = new Question("The condition in an if / else statement is enclosed within______.",
    ["Quotes", "Curly brackets", "Parenthesis", "Square brackets"] 2);
  const quesiton5 = new Question("Commonly used datatypes DO NOT include: ",
    ["Strings", "Booleans", "Alerts", "Numbers"] 2);

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


