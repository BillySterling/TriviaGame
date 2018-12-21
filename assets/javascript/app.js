$(document).ready(function () {

  function initializeGame() {
      startScreen = 
          "<p class='text-center button-position'>" + 
          "<a class='btn btn-warning btn-lg btn-block start-button' href='#' role='button'>BEGIN</a></p>";
      $(".gameScreen").html(startScreen);
  }

  initializeGame();

  $("body").on("click", ".start-button", function(event){
      generateHTML();
      timeKeeper();
  });
  
  $("body").on("click", ".answer", function(event){
      gameAnswer = $(this).text();
      if (gameAnswer === correctAnswer[questionNum]) {
          clearInterval(timeClock);
          gameWin();
      }
      else {
          clearInterval(timeClock);
          gameLose();
      }
  });
  
  $("body").on("click", ".reset-button", function(event){
      resetGame();
  });
  
});

var questionsArray = [
  "What is Captain Kirk's middle name?",
  "What is the name of the ship in the show?",
  "Which warring and Vulcan-like people is the Federation separated from by a neutral zone?",
  "What is Ensign Chekov's first name?",
  "What furry creatures nearly overwhelmed the Enterprise?",
  "Which cast member was born in Toccoa Georgia?",
  "What actress played Spock's mother?",
  "The main enery weapons were called?",
  "What is Chief Engineer Scott's first name?"
];

var answersArray = [
  ["Jonathan", "Tiberius", "Kelley", "Montgomery"],
  ["Excelsior", "Yorktown", "Yamoto", "Enterprise"],
  ["Romulans", "Ferengi", "Cylons", "Daveks"],
  ["Pavel", "Vladimir", "Rasputin", "Leo"],
  ["Ewoks", "Furbys", "Tribbles", "Urchins"],
  ["DeForest Kelley","Nichelle Nichols","Jimmie Doohan","George Takei"],
  ["Christine Lahti","Betty White","Jane Mansfield","Jane Wyatt"],
  ["Lasers","Phasers","Ion Cannons","Disruptors"],
  ["Montgomery","Gentry","George","Christopher"]
];

var correctAnswer = [
  "B. Tiberius",
  "D. Enterprise",
  "A. Romulans",
  "A. Pavel",
  "C. Tribbles",
  "A. DeForest Kelley",
  "D. Jane Wyatt",
  "B. Phasers",
  "A. Montgomery"
];

var kudoArray = ["Good job!","Awesome!","You rock!","A true Trekkie!","Perfect!"];

var startScreen;
var gameHTML;
var seconds = 15;
var questionNum = 0;
var selecterAnswer;
var timeClock;
var correctCount = 0;
var incorrectCount = 0;
var unansweredCount = 0;

function timeKeeper() {

  timeClock = setInterval(gameTimer, 1000);

  function gameTimer() {

      if (seconds === 0) {
          clearInterval(timeClock);
          outtaTime();
      } else if (seconds > 0) {
          seconds--;
      }
      $(".timer").html(seconds);
  }
}

function outtaTime() {
  unansweredCount++;
  var dispImg = "<img src='assets/images/ST" + questionNum + ".jpg' class='rounded mx-auto d-block gamePhoto'>";

  gameHTML = 
      "<p class='text-center'>Time's up! The correct answer is:  " + correctAnswer[questionNum] + "</p>" + dispImg;
  
  $(".gameScreen").html(gameHTML);
  setTimeout(pauseGame, 4000); 
}

function gameWin() {
  correctCount++;
  var dispImg = "<img src='assets/images/ST" + questionNum + ".jpg' class='rounded mx-auto d-block gamePhoto'>";
  kudoRsp = kudoArray[Math.floor(Math.random() * kudoArray.length)];

  gameHTML = 
      "<p class='text-center'>" + correctAnswer[questionNum] + " is correct! " + kudoRsp + "</p>" + 
      dispImg; 

    $(".gameScreen").html(gameHTML);
    setTimeout(pauseGame, 4000);
}

function gameLose() {
  incorrectCount++;
  var dispImg = "<img src='assets/images/ST" + questionNum + ".jpg' class='rounded mx-auto d-block gamePhoto'>";

  gameHTML = 
      "<p class='text-center'>Sorry, the correct answer is: " + correctAnswer[questionNum] + "</p>" + 
      dispImg;
  
  $(".gameScreen").html(gameHTML);
  setTimeout(pauseGame, 4000);
}

function pauseGame() {
  if (questionNum < questionsArray.length-1) {
      questionNum++;
      generateHTML();
      seconds = 15;
      timeKeeper();
  }
  else {
      gameHTML = 
      "<p class='text-center'>SCORE:" + "</p>" + 
      "<p class='text-center'>Correct Answers:  " + correctCount + "</p>" + 
      "<p class='text-center'>Incorrect Answers:  " + incorrectCount + "</p>" + 
      "<p class='text-center'>Unanswered:  " + unansweredCount + "</p>" + 
      "<p class='text-center button-position'><a class='btn btn-warning btn-lg btn-block reset-button' href='#' role='button'>Try Again</a></p>";
      $(".gameScreen").html(gameHTML);
  }
}

function generateHTML() {

  gameHTML = 
      "<p class='text-center timer-disp'>Time Remaining: <span class='timer'>15</span></p><p class='text-center'>" + "Question " + (questionNum + 1) + ": " + questionsArray[questionNum] + "</p>" +
      "<p class='answer'>A. " + answersArray[questionNum][0] + "</p>" +
      "<p class='answer'>B. " + answersArray[questionNum][1] + "</p>" +
      "<p class='answer'>C. " + answersArray[questionNum][2] + "</p>" +
      "<p class='answer'>D. " + answersArray[questionNum][3] + "</p>";

  $(".gameScreen").html(gameHTML);

}

function resetGame() {
seconds = 15;
questionNum = 0;
correctCount = 0;
incorrectCount = 0;
unansweredCount = 0;
generateHTML();
timeKeeper();
}