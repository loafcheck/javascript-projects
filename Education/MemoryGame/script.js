const moves = document.getElementById("moves-count");
const timeValue = document.getElementById("time");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const gameContainer = document.querySelector(".game-container");
const result = document.getElementById("result");
const controls = document.querySelector(".controls-container")
let cards;
let interval;
let firstCard = false;
let secondCard = false;

//Items array 
const items = [
    {English:"bee", Korean:"벌"},
    {English:"crocodile", Korean:"악어"},
    {English:"tiger", Korean:"호랑이"},
    {English:"gorilla", Korean:"고릴라"},
    {English:"lion", Korean:"사자"},
    {English:"monkey", Korean:"원숭이"},
    {English:"sheep", Korean:"양"},
    {English:"mouse", Korean:"쥐"},
    {English:"chicken", Korean:"닭"},
    {English:"Pig", Korean:"돼지"},
    {English:"cow", Korean:"소"},
    {English:"camel", Korean:"낙타"},
]

//Initial Time
let seconds = 0;
let minutes = 0;

//Initial moves and win cound
let movesCount = 0;
let winCount = 0;

//For Timer
const timeGenerator = function () {
    seconds += 1;
    //minutes logic
    if (seconds >= 60) {
        minutes += 1;
        seconds =0 ;
    }
    //format time before displaying
    let secondsValue = seconds < 10 ? `${seconds}` : seconds;
    let minutesValues = minutes < 10 ? `${minutes}` : minutes;
    timeValue.innerHTML = `<span>Time:</span>${minutesValue}:${secondsValue}`;
};

//For calculating moves
const movesCounter = function () {
    movesCount += 1;
    moves.innerHTML = `<span>Moves:</span>${movesCount}`; 
};

//Pick random objects from the items array
const generateRandom = function (size=4){
    //temporary array
    let tempArray = [...items];
    //initializes cardValues array
    let cardValues = [];
    //size should be double (4*4 matrix)/2 since paris of objecs would exist
    size = (size*size) /2;
    for (let i = 0; i < size ; i++) {
        const randomIndex = Math.floor(Math.random()*tempArray.length);
        cardValues.push(tempArray[randomIndex]);
        //once selected remove the object from temp array
        tempArray.splice(randomIndex,1);        
    }
    return cardValues;
};

const matrixGenerator = (cardValues, size = 4) => {
    gameContainer.innerHTML = "";
    cardValues = [...cardValues, ...cardValues];
    //simple shuffle
    cardValues.sort(() => Math.random() - 0.5);
    for (let i = 0; i < size * size; i++) {
      /*
          Create Cards
          before => front side (contains question mark)
          after => back side (contains actual image);
          data-card-values is a custom attribute which stores the names of the cards to match later
        */
      gameContainer.innerHTML += `
       <div class="card-container" data-card-value="${cardValues[i].English}">
          <div class="card-before">?</div>
          <div class="card-after"><span>${cardValues[i].korean}</span></div>
       </div>
       `;
    }

    //Grid
    gameContainer.style.gridTemplateColumns = `repeat(${size},auto)`;

    //cards
    cards = document.querySelectorAll('.card-container');
    cards.forEach((card)=>{
        card.addEventListener('click', ()=>{
            //If selected card is not matched yet then only run
            if (!card.classList.contains("matched")) {
                //flip the clicked card
                card.classList.add("flipped");
                //if it is the firstcard
                if(!firstCard){
                    //so current card will become firstCard
                    firstCard = card;
                    firstCardValue = card.getAttribute("data-card-value");
                } else {
                    movesCounter();
                    secondCard = card;
                    let secondCardValue = card.getAttribute("data-card-value");
                    if (firstCardValue == secondCardValue) {
                        firstCard.classList.add("matched");
                        secondCard.classList.add("matched");
                        firstCard = false;
                        winCount += 1;

                        if (winCount == Math.floor(cardValues.length / 2)) {
                            result.innerHTML = `<h2>You Won</h2>
                            <h4> Moves : ${movesCount}</h4>`;
                            stopGame();
                        }
                    } else {
                        let [tempFirst, tempSecond] = [firstCard, secondCard];
                        firstCard = false;
                        secondCard = false;
                        let delay = setTimeout(()=>{
                            tempFirst.classList.remove("flipped");
                            tempSecond.classList.remove("flipped");

                        },900);
                    }
                }
            }
        });
    });
}

//Start game
startButton.addEventListener("click", () => {
    movesCount = 0;
    seconds = 0;
    minutes = 0;
    //controls amd buttons visibility
    controls.classList.add("hide");
    stopButton.classList.remove("hide");
    startButton.classList.add("hide");
    //Start timer
    interval = setInterval(timeGenerator, 1000);
    //initial moves
    moves.innerHTML = `<span>Moves:</span> ${movesCount}`;
    initializer();
  });
  

stopButton.addEventListener (
    "click",
    (stopGame = () => {
        controls.classList.remove("hide");
        stopButton.classList.add("hide");
        startButton.classList.remove("hide");
        clearInterval(interval);
    })
);

const initializer = () => {
    result.innerText = "";
    winCound = 0;
    let cardValues = generateRandom ();
    console.log(cardValues);
    matrixGenerator(cardValues);
};
