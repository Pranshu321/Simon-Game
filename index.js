var colors = ["red", "blue", "green", "yellow"];

var colourBlink = [];
var userClickedPattern = [];

var gameStart = false;
var level = 0;

// The spacebar key to start the game.
$(document).keypress(function () {
	if (!gameStart) {
		$("#level-title").text("Level " + level);
		nextSequence();
		gameStart = true;
	}
});

// Button or we say the button for both pattern showing and clicking by user
$(".btn").click(function () {
	var userChosenColour = $(this).attr("id");
	userClickedPattern.push(userChosenColour);

	playSound(userChosenColour);
	animatePress(userChosenColour);

	check(userClickedPattern.length - 1);
});

// The level check
function check(currentLevel) {
	if (colourBlink[currentLevel] === userClickedPattern[currentLevel]) {
		console.log("success");

		if (userClickedPattern.length === colourBlink.length) {
			setTimeout(function () {
				nextSequence();
			}, 1000);
		}
	} else {
		console.log("wrong");

		playSound("wrong");

		$("body").addClass("game-over");
		setTimeout(function () {
			$("body").removeClass("game-over");
		}, 200);

		$("#level-title").text("Game Over, Press R Key to Restart");

		// Call startOver() if the user gets the sequence wrong and restart game.
		startOver();
	}
}

function nextSequence() {
	userClickedPattern = [];
	level++;
	$("#level-title").text("Level " + level);

	var randomNumber = Math.floor(Math.random() * 4);
	var randomChosenColour = colors[randomNumber];
	colourBlink.push(randomChosenColour);

	$("#" + randomChosenColour)
		.fadeIn(100)
		.fadeOut(100)
		.fadeIn(100);
	playSound(randomChosenColour);
}

function playSound(name) {
	var audio = new Audio("sounds/" + name + ".mp3");
	audio.play();
}

// animatePress to show the diffrent effects to show pattern to be clicked.
function animatePress(currentColor) {
	$("#" + currentColor).addClass("pressed");
	setTimeout(function () {
		$("#" + currentColor).removeClass("pressed");
	}, 100);
}

// Create a new function called startOver().
function startOver() {
	//Inside this function, you'll need to reset the values of level, colourBlink and gameStart variables.
	level = 0;
	colourBlink = [];
	gameStart = false;
}
