let gamePattern = [];
let userClickedPattern = [];
let started = false;
let level = 0;
let buttonColours = ["red", "blue", "green", "yellow"];

let gameCounter = 0;
let userCounter = 0;

function playSound(colorId) {
    
    let soundPath = "sounds/" + colorId + ".mp3";
    let sound = new Audio(soundPath);
    sound.play();

}

// detect all the keypresses
$(document).on("keypress", function (event) {
    if (!started) {
        started = true;

        nextSequence();
    }
})

function nextSequence() {

    level++;
  $("#level-title").text("level " + level);  
  let randomNumber = Math.floor(Math.random() * 4);

  let randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
    
    // play the sound of the chosen color
    playSound(randomChosenColour);
}

function gameOver() {
    $("#level-title").text("Game Over, Press Any Key to Restart");
    level = 0;
    userCounter = 0;
    gamePattern = [];
    userClickedPattern = [];
    started = false;

    let sound = new Audio("sounds/wrong.mp3");
    sound.play();
    $("body").addClass("game-over");
    setTimeout(function () {
        $("body").removeClass("game-over");
    }, 200);
}

$(".btn").on("click", function () {
    let userChosenColour = $(this).attr('id');
    
    //PLAY THE SOUND OF THE CLICKED COLOR
    playSound(userChosenColour);
    
    //make animation on the clicked button
    animatePress(userChosenColour);
    
    if (started) {
        
        userClickedPattern.push(userChosenColour);

        if (userCounter == level - 1)
        {
            if (userClickedPattern[userCounter] == gamePattern[userCounter]) {
                setTimeout(function () { 
                    
                    nextSequence();
                    userCounter = 0;
                    userClickedPattern = [];

                }, 1000);
            }
            else {
                gameOver();
            }
                
        }
        else {
            if (userClickedPattern[userCounter] == gamePattern[userCounter]) {
                userCounter++;
            }
            else {
                gameOver();
            }
        }
        
    }
    else {
        gameOver();
    }
});

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function () {
      $("#" + currentColour).removeClass("pressed");
    }, 100);
}

