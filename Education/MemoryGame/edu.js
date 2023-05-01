const moves = document.getElementById("moves-count");
const Questions = document.getElementById("prompt-questions");
const timeValue = document.getElementById("time");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const gameContainer = document.querySelector(".game-container");
const result = document.getElementById("result");
const controls = document.querySelector(".controls-container");
let cards;
let interval;
let firstCard = false;
let secondCard = false;


//Items array
const items = [
    {Vocab: 1, English:"bee", Korean:"벌"},
    {Vocab: 2, English:"crocodile", Korean:"악어"},
    {Vocab: 3, English:"tiger", Korean:"호랑이"},
    {Vocab: 4, English:"gorilla", Korean:"고릴라"},
    {Vocab: 5, English:"lion", Korean:"사자"},
    {Vocab: 6, English:"monkey", Korean:"원숭이"},  
    {Vocab: 7, English:"sheep", Korean:"양"},
    {Vocab: 8, English:"mouse", Korean:"쥐"},
    {Vocab: 9, English:"chicken", Korean:"닭"},
    {Vocab: 10, English:"Pig", Korean:"돼지"},
    {Vocab: 11, English:"cow", Korean:"소"},
    {Vocab: 12, English:"camel", Korean:"낙타"}
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
        seconds = 0 ;
    }
    //format time before displaying
    let secondsValue = seconds < 10 ? `${seconds}` : seconds;
    let minutesValue = minutes < 10 ? `${minutes}` : minutes;
    timeValue.innerHTML = `<span>Time:</span>${minutesValue}:${secondsValue}`;
};

//For calculating moves
const movesCounter = function () {
    movesCount += 1;
    moves.innerHTML = `<span>Moves:</span>${movesCount}`; 
};

//Pick random objects from the items array
const generateRandom = (size = 4) => {
    //temporary array
    let tempArray = [...items];
    //initializes cardValues array
    let cardValues = [];
    //size should be double (4*4 matrix)/2 since paris of objecs would exist
    size = (size*size) /2;
    //4*4/2 = 8 size=8
    let prevRandomIndex = 0;
    //
    while (true) {
        const randomIndex = Math.floor(Math.random()*tempArray.length);
        
        if (randomIndex != prevRandomIndex) {
            cardValues.push(tempArray[randomIndex]);
            tempArray.splice(randomIndex,1);
            } 
        if (cardValues.length == size) {
            break;
        }
    }
    
    return cardValues;

};

const matrixGenerator = (cardValues, size = 4) => {
    gameContainer.innerHTML = "";
    let cardValuesSet1 = [...cardValues];
    let cardValuesSet2 = [...cardValues];

    //shuffle
    cardValuesSet1.sort(()=> Math.random()-0.5);
    // cardValues = [...cardValues, ...cardValues];
    //cardValues = (16) [3, 4, 5, 6, 3, 2, 1, 7,     3, 4, 5, 6, 3, 2, 1, 7]
    // cardValues.sort(() => Math.random() - 0.5);
    //simple shuffle: (16) [6, 1, 7, 5, 3, 4, 2, 3, 6, 7, 2, 4, 3, 5, 1, 3]
    //cardValues.sort의 반은 after에 english 로 나머지는 korean 
    //cardValues = [6, 1, 7, 5, 3, 4, 2, 3,       6, 7, 2, 4, 3, 5, 1, 3]

    //0,1,2,3,4,5,6,7,8
    // for (let i = 0 ; i < cardValues.length/2 ; i++) {
    //     cardValuesSet1.push(cardValues[i]);
    // }
    // cardValuesSet2 = cardValues.slice(size*size/2)

    for (let i = 0; i < size *2; i++) {
        //(let i = 0; i < 8; i++)
      
      gameContainer.innerHTML += `
       <div class="card-container" data-card-value="${cardValuesSet1[i].Vocab}">
          <div class="card-before">?</div>
          <div class="card-after"><span>${cardValuesSet1[i].Korean}</span></div>
      
       </div>
       `;
       //16개의 카드에 shuffle된 카드 데이터를 넣기.
    }
    for (let i = 0; i < size *2; i++) {
        //(let i = 0; i < 16 ; i++)
      /*
          Create Cards
          before => front side (contains question mark)
          after => back side (contains actual image);
          data-card-values is a custom attribute which stores the names of the cards to match later
        */
      gameContainer.innerHTML += `
       <div class="card-container" data-card-value="${cardValuesSet2[i].Vocab}">
          <div class="card-before">?</div>
          <div class="card-after"><span>${cardValuesSet2[i].English}</span></div>
      
       </div>
       `;
       //16개의 카드에 shuffle된 카드 데이터를 넣기.
    }


    //Grid
    gameContainer.style.gridTemplateColumns = `repeat(${size},auto)`;

    //cards
    cards = document.querySelectorAll('.card-container');
    cards.forEach((card)=>{
        card.addEventListener('click', ()=>{
            //If selected card is not matched yet then only run
            if (!card.classList.contains("matched")) {
                //contain method true or false
                //flip the clicked card
                card.classList.add("flipped");
                //if it is the firstcard
                if(!firstCard){
                    //let firstCard = false;
                    //let secondCard = false;
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
                        //set firstCard to false since next card would be first now
                        firstCard = false;
                        winCount += 1;

                        if (winCount == Math.floor(cardValues.length)) {
                            //8
                            result.innerHTML = `<h2>You Won</h2>
                            <h4> Moves : ${movesCount}</h4>`;
                            stopGame();
                        }
                    } else {
                        //if the cards dont match
                        //flip the cards back to normal
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


// const moves = document.getElementById("moves-count");
// const Questions = document.getElementById("prompt-questions");
// const timeValue = document.getElementById("time");
// const startButton = document.getElementById("start");
// const stopButton = document.getElementById("stop");
// const gameContainer = document.querySelector(".game-container");
// const result = document.getElementById("result");
// const controls = document.querySelector(".controls-container");
// let cards;
// let interval;
// let firstCard = false;
// let secondCard = false;




//16개의 카드에 shuffle된 카드 데이터를 넣기.
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


//Start game 원본
// startButton.addEventListener("click", () => {
//     // Questions.classList.add("controls-container");
   

//     movesCount = 0;
//     seconds = 0;
//     minutes = 0;
//     //controls amd buttons visibility
//     controls.classList.add("hide");
//     stopButton.classList.remove("hide");
//     startButton.classList.add("hide");
//     //Start timer
//     interval = setInterval(timeGenerator, 1000);
//     //initial moves
//     moves.innerHTML = `<span>Moves:</span> ${movesCount}`;
//     initializer();
//   });
  

stopButton.addEventListener (
    "click",
    (stopGame = () => {
        controls.classList.remove("hide");
        stopButton.classList.add("hide");
        startButton.classList.remove("hide");
        clearInterval(interval);
    })
);
//Initialize values and func calls
const initializer = () => {
    result.innerText = "";
    winCount = 0;
    let cardValues = generateRandom ();
    console.log(cardValues);
    matrixGenerator(cardValues);
};
