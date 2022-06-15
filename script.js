const gameContainer = document.getElementById("game");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

let divNum = 0

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);
    newDiv.classList.add(divNum);
    divNum++;

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  console.log("you just clicked", event.target);

  /*
  This function will: 
  1. If there is a previous card that doesn't match the clicked card,
  wait one second then change it back to the base color.
  2. Flip the clicked card over (changing its actual color to to
  match its DIV class)
  3. Save the last clicked card's Color
  */

  //Step 1, unflipping on a nonmatch
  let cardCheck = 0

  if (localStorage.length > 0) {
    if (localStorage.getItem("lastCardNumber") == event.target.classList[1]) {
      console.log("You clicked on the same card twice");
    }
    else {
      if (localStorage.getItem("lastCardColor") == event.target.classList[0]) {
        console.log("We've got a match!");
        localStorage.clear();
      }
      else {
        console.log("These cards don't match.");
        setTimeout(function() {
          event.target.style.backgroundColor = "white";
          document.getElementsByClassName(localStorage.getItem("lastCardNumber"))[0].style.backgroundColor = "white";
          localStorage.clear();
        }, 1000)
      }
    }
    cardCheck = 1;
  }
  else {
    console.log("You have clicked the first card...")
  }

  //Step 2, flipping clicked card
  event.target.style.backgroundColor = event.target.classList[0];

  //Step 3, storing previous card
  if (cardCheck == 0) {
    localStorage.setItem("lastCardColor", event.target.classList[0]);
    localStorage.setItem("lastCardNumber", event.target.classList[1]);
    console.log("Local storage contains card number", localStorage.getItem("lastCardNumber"), "which is", localStorage.getItem("lastCardColor"));
  }
}

// when the DOM loads
createDivsForColors(shuffledColors);
