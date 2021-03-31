var currentQuestionIndex = 0;
// var time = questions.length * 15;

var startBtn = document.querySelector("#start");
var questionsElement = document.querySelector("#questions");
var timerElement = document.querySelector("#time");
var questionChoices = document.querySelector("#choices");
var count = 75;
var correctAnswer = 0;
var timer;

// starts the game, moves from the start screen and enters the quiz
function startQuiz() {
  setTime();
  var startScreen = document.querySelector("#start-screen");
  startScreen.setAttribute("class", "hide");
  questionsElement.removeAttribute("class");

  getCurrentQuestion();

  timer = setInterval(setTime, 1000);
}

function getCurrentQuestion() {
  var currentQuestion = questions[currentQuestionIndex];
  var titleElement = document.querySelector("#question-title");
  titleElement.textContent = currentQuestion.title;
  console.log(currentQuestion);
  questionChoices.innerHTML = "";
  for (var i = 0; i < currentQuestion.choice.length; i++) {
    var userChoice = document.createElement("button");
    userChoice.setAttribute("class", "choices");
    userChoice.setAttribute("value", currentQuestion.choice[i]);
    userChoice.textContent = i + 1 + "." + currentQuestion.choice[i];

    userChoice.onclick = choiceClick;

    questionChoices.appendChild(userChoice);
  }
}

function choiceClick() {
  console.log(this);
  // if the answer that was clicked is correct, notify the user "correct!"
  var answerElement = document.getElementById("showAnswer")
  if (this.value === questions[currentQuestionIndex].answer) {
    answerElement.innerHTML = "Correct!"
    correctAnswer = correctAnswer + 1;
  } else {
    answerElement.innerHTML = "Wrong!"
    count = count -10;
  }

  currentQuestionIndex++;
  if (currentQuestionIndex === questions.length-0) {
    gameOver();
  } else {
    getCurrentQuestion();
  }
}

function setTime() {
  timerElement.textContent = count;
  if (count <=0) {
    stopTimer();
  } else {
    count--
  }
}

function stopTimer () {
  clearInterval(timer);
}


function gameOver () {
  stopTimer();
  var pointElement = document.getElementById("showPoints")
  var endscreen = document.querySelector("#end-screen");
  endscreen.setAttribute("class", "choice");
  questionsElement.setAttribute("class", "hide");
  pointElement.innerHTML = "Your total points are" + " " + correctAnswer;
}

startBtn.onclick = startQuiz;




//  if (timeLeft == 0 || questions[currentQuestionIndex] == undefined) {
//         alert("Time has expired, game over")
// }
// else
// reduce 10 seconds
// get the next question
//if we reach the last question then run "game over" function else run/get current question
//clear timer
//hide questions div and unhide the end screen div
