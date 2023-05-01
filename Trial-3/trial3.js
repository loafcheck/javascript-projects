const koreanList = document.getElementById("koreanWordList");
const englishList = document.getElementById("englishWordList");
const btn1 = document.getElementById('button1');
const number = 10;
let kVocabArr =[];
let eVocabArr =[];
let wordItems = [];

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
  if (NoneEmpty(kVocabArr) && NoneEmpty(eVocabArr) == true){
    createItemsArray(kVocabArr, eVocabArr);
    return 1;
  } 
}

function NoneEmpty(array) {
  for(var i=0; i<number; i++) {
    if(array[i] === "") {
      alert("fill in the blank");
      return false
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
  console.log (wordItems);
  return wordItems;
}

btn1.addEventListener('click', vocabulary);
