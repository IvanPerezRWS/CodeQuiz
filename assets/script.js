
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
  console.log();
  