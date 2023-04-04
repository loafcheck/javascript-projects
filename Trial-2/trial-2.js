const koreanWordList = document.getElementsByClassName('koreanWordList');
const englishWordList = document.getElementsByClassName('englishWordList');
const btn1 = document.getElementById('button1');
let kVocabArr =[];
let eVocabArr =[];
let number = 10;

function vocabulary () {
  kVocabArr = [];

  for ( let i = 0 ; i < number ; i ++) {
    kVocabArr.push(koreanWordList[i].value);
    eVocabArr.push(englishWordList[i].value);
  }
  console.log("kVocabArr is :"+kVocabArr.length);
  console.log("eVocabArr is :"+eVocabArr.length);


  if (NoneEmpty(kVocabArr)&&NoneEmpty(kVocabArr) == true){
    console.log('kVocabArr is: '+ kVocabArr);
    console.log('eVocabArr is: '+ eVocabArr);
    return (kVocabArr)
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


btn1.addEventListener('click', vocabulary);
