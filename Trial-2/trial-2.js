const koreanWordList = document.getElementsByClassName('koreanWordList');
const englishWordList = document.getElementsByClassName('englishWordList');
const btn1 = document.getElementById('button1');
let kVocabArr =[];
let eVocabArr =[];
let items = [];
let number = 3;

function vocabulary () {
  kVocabArr = [];
  eVocabArr = [];

  for ( let i = 0 ; i < number ; i ++) {
    kVocabArr.push(koreanWordList[i].value);
    eVocabArr.push(englishWordList[i].value);
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
    items.push({
      Vocab: i + 1,
      English: eVocabArr[i],
      Korean: kVocabArr[i]
    });
  }
  console.log (items);
  return items;
}



btn1.addEventListener('click', vocabulary);
