var buttonColors = ["red", "blue", "green", "yellow"];
var lcheck = 0;
var level = 0;
var gamePattern = [];
var userClickedPattern = [];

$(document).keydown(function(event) {
  level = 0;
  lcheck = 0;
  gamePattern = [];
  userClickedPattern = [];
  //$("h1").text("Level " + level);
  setTimeout(function(){
    nextSequence();
  },500);
});
//nextSequence();
$('.btn').click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  console.log(userClickedPattern);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(level);
});

function nextSequence() {
  var randomNumber = Math.floor((Math.random() * 4));
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  console.log(gamePattern);
  $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
  level++;
  $("h1").text("Level " + level);
}

function playSound(name) {
  var newAud = new Audio("sounds/" + name + ".mp3");
  newAud.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  },100);
}

function checkAnswer(maxout) {
  if (userClickedPattern[lcheck] === gamePattern[lcheck]) {
    lcheck++;
    if (lcheck === maxout) {
      userClickedPattern = [];
      lcheck = 0;
      setTimeout(function(){
        nextSequence();
      },300);
    }
  }
  else {
    $("h1").text("Wrong!! Press a key to restart.");
    var aud = new Audio("wrong.mp3");
    aud.play();
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
  }
}
