let buttonColours = ["red", "blue", "green", "yellow"];

let gamePattern = [];
let userClickedPattern = [];

let started = false;
let level = 0;

$(document).keydown(function () {
	if (!started) {
		$("#level-title").text("Level " + level);
		nextSequence();
		started = true;
	}

	// console.log(event.key)
});

$(".btn").click(function () {
	let userChosenColour = $(this).attr("id");

	userClickedPattern.push(userChosenColour);

	animatePress(userChosenColour);

	playSound(userChosenColour);

	// console.log(userClickedPattern);

	checkAnswer(userClickedPattern.length-1);
});


function nextSequence() {

    userClickedPattern = []
    level++

    $("#level-title").text("Level " + level)

	let randomNumber = Math.floor(Math.random() * 4);

	let randomChosenColour = buttonColours[randomNumber];

	gamePattern.push(randomChosenColour);
	// console.log(gamePattern);

	$("#" + randomChosenColour)
		.fadeIn(100)
		.fadeOut(100)
		.fadeIn(100);

	playSound(randomChosenColour);
}

function playSound(name) {
	let audio = new Audio("sounds/" + name + ".mp3");
	audio.play();
}

function animatePress(currentColour) {
	$("#" + currentColour).addClass("pressed");

	setTimeout(function () {
		$("#" + currentColour).removeClass("pressed");
	}, 100);
}

function checkAnswer(currentLevel) {
	if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("success")

        if(userClickedPattern.length === gamePattern.length){

            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    }
    else {
        playSound("wrong")
        $("h1").text("Game Over, Press Any Key to Restart")
        $("body").addClass("game-over")
        setTimeout(function(){
            $("body").removeClass("game-over")
        },200)

        startOver()
        console.log("wrong")
    }
	
}

function startOver(){
    level = 0;
    gamePattern = [];

    started = false;
}

