//parse the data from the database as a object so we can drill into each property
var scores = JSON.parse(localStorage.getItem("scores"));
var highscoreEl = document.getElementById("pointsbox");
//for loop over array, create element for initial & score, 



for (let index = 0; index < scores.length; index++) {
    //create elements for the users scores
    var initials = document.createElement("p")
    var score = document.createElement("p")
    //add the score and initials for each element
    initials.textContent =  scores[index].initials;
    score.textContent =  scores[index].score;
    // add them to the page
    highscoreEl.append(initials);
    highscoreEl.append(score);
    //create div or ul with li

    
}

var backButtonEl = document.getElementById("retryquiz");
backButtonEl.addEventListener("click", backQuiz);

function backQuiz () {
    var homeUrl = "./index.html"
    window.location = homeUrl
}



