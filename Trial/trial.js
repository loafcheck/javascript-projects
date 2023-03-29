const korean = [];
const english = [];
let number = 10;
for (let i = 0; i < number ; i++) {
    korean.push(prompt("Write a Korean Vocab"));
    english.push(prompt("Write a english Vocab"));
}
const items = [];

let vocabObj = {
    Vocab:1,
    Korean:korean[0],
    English:english[0]
}

for (let i = 0 ; i <number ; i++) {
    for (let j = 0 ; j < 1 ; j++) {
        items[items.length] ={Vocab:i+1 , Korean:korean[i] ,English: english[i]}
        }
    }
