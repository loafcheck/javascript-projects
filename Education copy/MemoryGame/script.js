/*
단어카드가 총체적으로 섞이기 원함
10번의 기회가 있다.

Array(10)
const items = [
  {Vocab: 1, English: 'one', Korean: '일'},
  {Vocab: 2, English: 'two', Korean: '이'},
  {Vocab: 3, English: 'three', Korean: '삼'},
  {Vocab: 4, English: 'four', Korean: '사'},
  {Vocab: 5, English: 'five', Korean: '오'},
  {Vocab: 6, English: 'six', Korean: '육'},
  {Vocab: 7, English: 'seven', Korean: '칠'},
  {Vocab: 8, English: 'eight', Korean: '팔'},
  {Vocab: 9, English: 'nine', Korean: '구'},
  {Vocab: 10, English: 'ten', Korean: '십'},
]


*/

const moves = document.getElementById("moves-count");
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

const koreanList = document.getElementById("koreanWordList");
const englishList = document.getElementById("englishWordList");
const done = document.getElementById('done');

const wrapperBox = document.getElementById("wrapperBox");


const wordListWrapper = document.querySelector(".wordListWrapper")

const number = 10;
let kVocabArr =[];
let eVocabArr =[];
let wordItems = [];
let items = [];


for (let i = 1; i <= number; i++) {
    const koreanInput = document.createElement("input");
    koreanInput.type = "text";
    koreanInput.placeholder = `${i} Korean vocabulary`;
    koreanInput.classList.add("koreanWordList");
  
    const englishInput = document.createElement("input");
    englishInput.type = "text";
    englishInput.placeholder = `${i} English vocabulary`;
    englishInput.classList.add("englishWordList");
  
    const koreanDiv = document.createElement("div");
    koreanDiv.id = "kword";
    koreanDiv.appendChild(koreanInput);
  
    const englishDiv = document.createElement("div");
    englishDiv.id = "eword";
    englishDiv.appendChild(englishInput);
  
    koreanList.appendChild(koreanDiv);
    englishList.appendChild(englishDiv);
  }
  
  function vocabulary () {
    kVocabArr = [];
    eVocabArr = [];
  
    const koreanWords = koreanList.querySelectorAll(".koreanWordList");
    const englishWords = englishList.querySelectorAll(".englishWordList");
  
    for ( let i = 0 ; i < number ; i ++) {
      kVocabArr.push(koreanWords[i].value);
      eVocabArr.push(englishWords[i].value); 
    }
    if (NoneEmpty(kVocabArr,eVocabArr) == true){
      createItemsArray(kVocabArr, eVocabArr);
      return 1;
    } 
  }

  function NoneEmpty(koreanArray, englishArray) {
    for(var i=0; i<number; i++) {
      if (koreanArray[i] === "" || englishArray[i] === "") {
        alert("fill in the blank");
        koreanArray[i].focus(); 
        englishArray[i].focus(); 
        return false;
      };
    }
    return true;
  }


  function createItemsArray(kVocabArr, eVocabArr) {
    for (let i = 0; i < kVocabArr.length; i++) {
      wordItems.push({
        Vocab: i + 1,
        English: eVocabArr[i],
        Korean: kVocabArr[i]
      });
    }
    console.log ("wordItems are : "+ wordItems);
    //Items array
    items = [...wordItems];
    console.log ("items are : "+ wordItems);
    return wordItems;
  }
  


//Initial Time
let seconds = 0;
let minutes = 0;
//Initial moves and win count
let movesCount = 0;
let winCount = 0;

//For timer
const timeGenerator = () => {
  seconds += 1;
  //minutes logic
  if (seconds >= 60) {
    minutes += 1;
    seconds = 0;
  }
  //format time before displaying
  let secondsValue = seconds < 10 ? `0${seconds}` : seconds;
  let minutesValue = minutes < 10 ? `0${minutes}` : minutes;
  timeValue.innerHTML = `<span>Time:</span>${minutesValue}:${secondsValue}`;
};

//For calculating moves
const movesCounter = () => {
  movesCount += 1;
  moves.innerHTML = `<span>Moves:</span>${movesCount}`;
};

//Pick random objects from the items array
const generateRandom = (size = 4) => {
  //temporary array
  let tempArray = [...items];
  //initializes cardValues array
  let cardValues = [];
  //size should be double (4*4 matrix)/2 since pairs of objects would exist
  size = (size * size) / 2;
  //Random object selection
  for (let i = 0; i < size; i++) {
    const randomIndex = Math.floor(Math.random() * tempArray.length);
    cardValues.push(tempArray[randomIndex]);
    //once selected remove the object from temp array
    tempArray.splice(randomIndex, 1);
  }
  return cardValues;
};


const matrixGenerator = (cardValues, size = 4) => {
  gameContainer.innerHTML = "";
  cardValues = [...cardValues, ...cardValues];
  //shuffle
  cardValues.sort(()=> Math.random()-0.5);

  //16개의 카드에 shuffle된 카드 데이터를 넣기. 
  for (let i = 0; i < size * size; i++) {
    let cardIndex = i % size; 
    let cardValue = (i % 2 === 0) ? cardValues[i].Korean : cardValues[i].English;

    gameContainer.innerHTML += `
      <div class="card-container" data-card-value="${cardValues[i].Vocab}">
        <div class="card-before">?</div>
        <div class="card-after"><span>${cardValue}</span></div>
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


startButton.addEventListener("click", function() {
    // Hide the wrapper div
    wrapperBox.classList.add("hide");
    // Show the word list wrapper div
    wordListWrapper.classList.remove("hide");
  });


//Start -> WordVocab
startButton.addEventListener("click", () => {
  controls.classList.add("hide");
  stopButton.classList.remove("hide");
  startButton.classList.add("hide");
 
});


//Start game

done.addEventListener('click', ()=>{
  vocabulary();

  movesCount = 0;
  seconds = 0;
  minutes = 0;
  //controls amd buttons visibility
 
  wordListWrapper.classList.add("hide");
  wrapperBox.classList.remove("hide");
  

  //Start timer
  interval = setInterval(timeGenerator, 1000);
  //initial moves
  moves.innerHTML = `<span>Moves:</span> ${movesCount}`;
  initializer();
  }
);

//Stop game
stopButton.addEventListener(
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
  let cardValues = generateRandom();
  matrixGenerator(cardValues);
};