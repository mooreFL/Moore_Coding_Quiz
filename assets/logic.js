var currentQuestionIndex = 0;

var startButton = document.querySelector("#start");
var questionsElement = document.querySelector("#questions");
var timerElement = document.querySelector("#time");
var questionChoices = document.querySelector("#choices");
var count = 75;
var correctAnswer = 0;
var timer;
var answerElement = document.getElementById("showAnswer");
var inputElement = document.getElementById("initials");
var submitButton = document.getElementById("submit")
 
// starts the game, moves from the start screen and enters the quiz, starts the settime function
function startQuiz() {
  setTime();
  var startScreen = document.querySelector("#start-screen");
  startScreen.setAttribute("class", "hide");
  questionsElement.removeAttribute("class");

  getCurrentQuestion();

  timer = setInterval(setTime, 1000);
}
// gets the current question including title runs the for loop 
function getCurrentQuestion() {
  var currentQuestion = questions[currentQuestionIndex];
  var titleElement = document.querySelector("#question-title");
  titleElement.textContent = currentQuestion.title;
  console.log(currentQuestion);
  questionChoices.innerHTML = "";
  answerElement.innerHTML = "";
  for (var i = 0; i < currentQuestion.choice.length; i++) {
    var userChoice = document.createElement("button");
    userChoice.setAttribute("class", "choices");
    userChoice.setAttribute("value", currentQuestion.choice[i]);
    userChoice.textContent = i + 1 + "." + currentQuestion.choice[i];

    userChoice.onclick = choiceClick;

    questionChoices.appendChild(userChoice);
  }
}
// the users choice function, decides if the user choice was right or wrong
// if questions reach zero calls for gaemover function
function choiceClick() {
  console.log(this);
  // if the answer that was clicked is correct, notify the user "correct!"
  if (this.value === questions[currentQuestionIndex].answer) {
    answerElement.textContent = "Correct!"
    correctAnswer = correctAnswer + 1;
  } else {
    answerElement.textContent = "Wrong!"
    count = count -10;
    if (count <=0){
      count=0
    }
  }

  currentQuestionIndex++;
  if (currentQuestionIndex === questions.length-0) {
    gameOver();
  } else {
    getCurrentQuestion();
  }
}
// sets time properties 
function setTime() {
  count--
  timerElement.textContent = count;
  if (count <=0) {
    gameOver();
}
}

// ends the game, calls the endscreen to show by removing the "hide" class
function gameOver () {
  clearInterval(timer);
  var pointElement = document.getElementById("showPoints")
  var endscreen = document.querySelector("#end-screen");
  endscreen.removeAttribute("class");
  questionsElement.setAttribute("class", "hide");
  pointElement.innerHTML = "Total correct answers:" + " " + correctAnswer;
}


// gets the value of the users score and logs them along with the initials
function submitScore() {
  var scoresUrl="./scores.html"
  window.location = scoresUrl;
  var initials=inputElement.value;
  console.log(initials);
  var scores=JSON.parse(localStorage.getItem("scores")) || [];
  var newScore={
    initials:initials,
    score:count
  }


//pushes the score to local storage in a string
scores.push(newScore);
localStorage.setItem("scores", JSON.stringify(scores));
}


submitButton.onclick= submitScore;
startButton.onclick = startQuiz;

