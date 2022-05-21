const wordElement = document.querySelector('#word');
const messageElement = document.querySelector('#message');
const inputElement = document.querySelector('#input');
let currentWord;

prepareWord();

function prepareWord() {
    const index = randomIntFromInterval(0, wordsEN.length - 1);
    const word = wordsEN[index];

    wordElement.innerText = word;
}

function textInput() {
    
}