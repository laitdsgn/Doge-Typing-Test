
const text_display = document.getElementById("text-display");
const text_input = document.getElementById("text-input");
const finish = document.getElementById("finish");
const gameWindow = document.querySelector(".game-container");
const title= document.getElementById("title");
const timeDisplay = document.getElementById("timeDisplay");
const time = document.getElementById("time");
const mistakes = document.getElementById("mistakes");
const mistakesDisplay = document.getElementById("mistakesDisplay");
const wpm = document.getElementById("wpm");
const wpmDisplay = document.getElementById("wpmDisplay");
let bonk;

const start = document.getElementById("start");

const texts = [
"Fast typing boosts efficiency in programming, helping developers quickly write and debug code. Switching between syntax elements and using shortcuts demands both speed and accuracy. During intense coding sessions, balancing speed with careful problem-solving is key to great results.",
"She sells seashells by the seashore, but the seashells she sells aren't just any seashells-they're specially selected seashells that shimmer and shine by the sunny seashore. If she selects shimmering seashells to sell by the seashore, should she sell seashells that shimmer more or seashells that shine less?",
"In a quiet, secluded village surrounded by towering mountains, time seemed to stand still. The crisp morning air carried the faint aroma of pine, and sunlight filtered softly through the leaves. As the villagers went about their simple lives, a calm serenity filled the air.",
"On the edge of a vast desert, where golden sands stretched endlessly toward the horizon, a lone traveler paused to admire the setting sun. The sky was painted in brilliant shades of orange, pink, and purple, a masterpiece that shifted with every passing moment.",
"Beneath a canopy of ancient trees, the forest hummed with quiet life. Birds flitted between branches, their songs weaving melodies into the rustling of leaves. A narrow stream, clear as crystal, meandered through moss-covered rocks, its gentle murmur a soothing backdrop.",
"The Continent was a land of contrasts: the bustling streets of Novigrad hid treachery, while Toussaint basked in golden serenity. Kaer Morhen crumbled in the north, a relic of Witcher history, as Nilfgaard's armies marched southward.",
"A keyboard operates as a bridge between human input and computer action. Each key is connected to a circuit board beneath, where pressing it completes an electrical circuit. This signal is sent to the computer, interpreted by software, and translated into the corresponding character or command.",
"The Doge meme features a Shiba Inu dog, often surrounded by colorful Comic Sans text in broken English. Phrases like 'such wow' humorously caption the dog's expressive face. Originating in 2010, the meme exploded in popularity, becoming a symbol of internet culture."



]


let isFinished = true;
let mistakesCount = 0;



text_input.addEventListener("input", function() {
    const DisplayLetters = document.querySelectorAll('span');
    const InputLetters = text_input.value.split("");
  
    let currentMistakes = 0;
    DisplayLetters.forEach((charSpan, i) => {
      let charInput = InputLetters[i];
      if (charInput == null) {
          charSpan.classList.remove("red");
          charSpan.classList.remove("green");
      } else if (charInput === charSpan.innerText) {
          charSpan.classList.add("green");
          charSpan.classList.remove("red");
      } else {
          charSpan.classList.add("red");
          charSpan.classList.remove("green");
          currentMistakes++; // Count mistakes
      }
    });
  
    mistakesCount = currentMistakes;
    mistakes.innerText = `MISTAKES: ${mistakesCount}`;
    mistakesDisplay.innerText = `Mistakes: ${mistakesCount}`;
  
    // End game when the input length matches the displayed text
    if (InputLetters.length === DisplayLetters.length) {
      finish.style.display = "inline";
      gameWindow.style.transform = "translateY(1000px)";
      gameWindow.style.opacity = "0";
      gameWindow.style.transition = "transform 1s, opacity 0.5s";
      title.style.opacity = "0";
      title.style.transform = "translateY(-200px)";
      title.style.transition = "transform 1s, opacity 0.2s";
      stopTimer();
      bonk.play();
    }


  });


  let totalWords = 0; 
  let wpmvalue = 0; 
  

  function calculateWPM() {
      const minutesElapsed = seconds / 60;
      const typedWords = text_input.value.trim().split(/\s+/).length; 
  
      if (minutesElapsed > 0) {
          wpmvalue = Math.round(typedWords / minutesElapsed);  
      } else {
          wpmvalue = 0;
      }
  
      wpm.innerText = `WPM: ${wpmvalue}`;
      wpmDisplay.innerText = `Words Per Minute: ${wpmvalue}`;
  }
  
  setInterval(() => {
    calculateWPM(); 
  }, 100);




let seconds = 0;
let timerInterval;


function startTimer() {
    seconds = 0;

    timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
    const minutes = Math.floor(seconds / 60);
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const remainingSeconds = seconds % 60;
    const formattedSeconds = remainingSeconds.toString().padStart(2, '0');
    


    time.innerText = `TIME: ${formattedMinutes}:${formattedSeconds}`;
    timeDisplay.innerText = `TIME: ${formattedMinutes}:${formattedSeconds}`
    
    seconds++;

}



function stopTimer() {
    clearInterval(timerInterval);

}


function randomText() {

    let rand = Math.floor(Math.random() * texts.length)
    let randomText = texts[rand]

    randomText.split("").forEach(char => {
        const charSpan = document.createElement('span');
        charSpan.innerText = char;
        text_display.appendChild(charSpan);

    });
    
}


randomText()

start.addEventListener("click", function() {

    startTimer()
    start.style.display = "none";
    text_input.removeAttribute("disabled");
    text_input.innerText = "";
    text_input.classList.remove("centerTextArea")
    text_input.style.padding = "5px"
    text_input.focus();
    bonk = new Audio("res/bonk.mp3");
    bonk.play();

})
