var buttonColors = ["red", "blue", "green", "yellow"]

var gamePattern = []

var userClickPattern = []

// way to keep track of whether if the game has started or not, so you only call nextSequence() on the first keypress.
var started = false

//Create a new variable called level and start at level 0.
var level = 0

//Use jQuery to detect when a keyboard key has been pressed, when that happens for the first time, call nextSequence().
$(document).keypress(function () {
    if (!started) {
        $('#level-title').text('Level ' + level)//when the game has started, change this to say "Level 0".
        nextSequence()
        started = true
    }
})

//Use jQuery to detect when any of the buttons are clicked and trigger a handler function.
$('.btn').click(function () {
    var userChoseColor = $(this).attr('id')// variable to store the id of the button that got clicked
    userClickPattern.push(userChoseColor)//Add the contents of the variable userChosenColour to the end of this new userClickedPattern
    playSound(userChoseColor)
    animatePress(userChoseColor)
    //Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
    checkAnswer(userClickPattern.length - 1)
})

function checkAnswer(currentLevel) {
    // check if the most recent user answer is the same as the game pattern. 
    if (gamePattern[currentLevel] === userClickPattern[currentLevel]) {
        //console.log('success')
        if (userClickPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence()
            }, 1000)
        }
    }
    else {
        //console.log('wrong')
        playSound('wrong')
        //In the styles.css file, there is a class called "game-over", apply this class to the body of the website when the user gets one of the answers wrong and then remove it after 200 milliseconds.
        $('body').addClass('game-over')
        $('#level-title').text('Game Over,Press Any Key to Restart')
        setTimeout(function () {
            $('body').removeClass('game-over')
        }, 200)

        //Call startOver() if the user gets the sequence wrong.
        startOver();
    }
}

function nextSequence() {
    //Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
    userClickPattern = []
    //increase the level by 1 every time nextSequence() is called.
    level++

    $('#level-title').text('Level ' + level)//update the h1 with this change in the value of level.

    var randomNumber = Math.floor(Math.random * 4)
    var randomChosenColour = buttonColors[randomNumber];
    gamePattern.push(randomChosenColour)

    //animate a flash to the button selected
    $('#' + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100)

    //play sound for the button color selected
    playSound(randomChosenColour)
}

function playSound(name) {
    var audio = new Audio('sounds/' + name + '.mp3')
    audio.play()
}

function animatePress(currentColor) {
    $('#' + currentColor).addClass('pressed')//add this 'pressed' class to the button that gets clicked inside animatePress().
    setTimeout(function () {
        $('#' + currentColor).removeClass('pressed')//remove the 'pressed' class after a 100 milliseconds.
    }, 100)
}

function startOver() {
    level = 0
    gamePattern = []
    started = false
}