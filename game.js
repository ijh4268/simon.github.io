var buttonColors = ["red", "blue", "green", "yellow"];
var randomPattern = [];
var userPattern = [];

var level = 0;
var currentPhase = 0;

var started = false;


function playSound(sound) {
  var audio = new Audio("sounds/" + sound + ".mp3");
  audio.play();
}

function animatePress(color) {
  $("#" + color).addClass("pressed");
  setTimeout(function() {
    $("#" + color).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  var correct = true;
  var index = currentLevel - 1;

  if (randomPattern[index] != userPattern[index]) {
    correct = false;
	} 
	
  if (currentLevel === level || !correct) {
    if (correct) {
      correctAnswer();
    } else {
			wrongAnswer(); 
			startOver();
    }
  }
}

function correctAnswer() {
	setTimeout(function () {
		nextSequence();
	}, 1000);
	userPattern = [];
	currentPhase = 0;
}

function wrongAnswer() {
	playSound("wrong");
	$("body").addClass("game-over");
	setTimeout(function () {
		$("body").removeClass("game-over");
	}, 200);
	$("h1").text("Game Over, Press Any Key to Restart");
}

function startOver() {
	started = false;
	level = 0;
	currentPhase = 0;
	randomPattern = [];
	userPattern = [];
}

function nextSequence() {
  var rand = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[rand];

  randomPattern.push(randomChosenColor);

  $("#" + randomChosenColor)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColor);

  level++;
  $("h1").text("Level " + level);
}

$(".btn").click(function() {
  var userChosenColor = this.id;
  userPattern.push(userChosenColor);
  animatePress(userChosenColor);
  playSound(userChosenColor);
  currentPhase++;
  checkAnswer(currentPhase);
});

$(document).keydown(function() {
  if (!started) {
    started = true;
    nextSequence();
  }
});
