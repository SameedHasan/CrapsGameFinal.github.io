var images = [
  "dice-01.svg",
  "dice-02.svg",
  "dice-03.svg",
  "dice-04.svg",
  "dice-05.svg",
  "dice-06.svg",
];
var dice = document.querySelectorAll("img");

// variables used to test the state of the game
var WON = 0;
var LOST = 1;
var CONTINUE_ROLLING = 2;

// other variables used in program
var firstRoll = true; // true if current roll is first
var sumOfDice = 0; // sum of the dice
var myPoint = 0; // point if no win/loss on first roll
var gameStatus = CONTINUE_ROLLING; // game not over yet

// process one roll of the dice
function play() {
  // get the point field on the page
  var point = document.getElementById("pointfield");

  // get the status div on the page
  var statusDiv = document.getElementById("status");
  if (firstRoll) {
    // first roll of the dice
    sumOfDice = rollDice();

    switch (sumOfDice) {
      case 7:
      case 11: // win on first roll
        gameStatus = WON;
        // clear point field
        point.value = "";
        break;
      case 2:
      case 3:
      case 12: // lose on first roll
        gameStatus = LOST;
        // clear point field
        point.value = "";
        break;
      default:
        // remember point
        gameStatus = CONTINUE_ROLLING;
        myPoint = sumOfDice;
        point.value = myPoint;
        firstRoll = false;
    } // end switch
  } // end if
  else {
    sumOfDice = rollDice();

    if (sumOfDice == myPoint)
      // win by making point
      gameStatus = WON;
    else if (sumOfDice == 7)
      // lose by rolling 7
      gameStatus = LOST;
  } // end else

  if (gameStatus == CONTINUE_ROLLING) statusDiv.innerHTML = "Roll again";
  else {
    if (gameStatus == WON)
      statusDiv.innerHTML = "Player wins. " + "Click Roll Dice to play again.";
    else
      statusDiv.innerHTML = "Player loses. " + "Click Roll Dice to play again.";

    firstRoll = true;
  } // end else
} // end function play

// roll the dice
function rollDice() {
  var die1;
  var die2;
  var workSum;

  die1 = Math.floor(1 + Math.random() * 6);
  die2 = Math.floor(1 + Math.random() * 6);
  workSum = die1 + die2;

  dice.forEach(function (die) {
    die.classList.add("shake");
  });
  setTimeout(function () {
    dice.forEach(function (die) {
      die.classList.remove("shake");
    });
    document.querySelector("#die-1").setAttribute("src", images[die1 - 1]);
    document.querySelector("#die-2").setAttribute("src", images[die2 - 1]);
    document.querySelector("#total").innerHTML =
      "Your roll is " + (dieOneValue + 1 + (dieTwoValue + 1));
  }, 1000);

  const myTimeout = setTimeout(myGreeting, 1000);

  function myGreeting() {
    document.getElementById("sumfield").value = workSum;
  }

  return workSum;
} // end function rollDice
// -->
