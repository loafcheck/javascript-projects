const koreanVocabList = document.getElementById('kword1');
const btn1 = document.getElementById('button1');
let value = [];

function fun1 () {
  value += koreanVocabList.value;
  console.log(value);
  return value;
}


btn1.addEventListener('click',fun1);

