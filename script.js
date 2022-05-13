const wordElement = document.querySelector('#word');
const inputElement = document.querySelector('#input');
const messageElement = document.querySelector('#message');

let currentWord = '';

let currentLanguage = 'pl';
let words = wordsPL;

let messages = {
    pl: {
        good: 'Dobrze!',
        wrong: 'Źle!'
    },
    en: {
        good: 'Great!',
        wrong: 'Incorrect!'
    },
    ua: {
        good: 'Добре!',
        wrong: 'Погано!'
    }
}

prepareWord();

function prepareWord() {
    const index = randomIntFromInterval(0, words.length - 1);
    const word = words[index];
    currentWord = word;
    wordElement.innerText = word;
    inputElement.value = '';
    document.body.style.backgroundColor = 'black';
    messageElement.style.opacity = 0;
}

function textInput() {
    const currentInput = inputElement.value;
    const substring = currentWord.substring(0, currentInput.length);

    if (currentInput == substring) {
        if (currentInput.length == currentWord.length) {
            correctWord();
        }
        else {
            document.body.style.backgroundColor = greenColor(currentInput.length, currentWord.length);
            messageElement.style.opacity = 0;
        }
    }
    else {
        wrongWord();
    }
}

function correctWord() {
    messageElement.innerText = messages[currentLanguage].good;
    messageElement.style.opacity = 1;


    setTimeout(() => {
        messageElement.style.opacity = 0;
        prepareWord();
    }, 300);
}

function wrongWord() {
    document.body.style.backgroundColor = '#d23232';
    messageElement.innerText = messages[currentLanguage].wrong;
    messageElement.style.opacity = 1;
}

function greenColor(current, final) {
    let lightness = current * 36 / final;
    return 'hsl(120, 70%, ' + lightness + '%)';
}

function setLanguage(newLanguage) {
    document.querySelector('#lang-' + currentLanguage).classList.toggle('selected');
    document.querySelector('#lang-' + newLanguage).classList.toggle('selected');
    currentLanguage = newLanguage;

    if (newLanguage == 'pl') {
        words = wordsPL;
    }
    else if (newLanguage == 'en') {
        words = wordsEN;
    }
    else if (newLanguage == 'ua') {
        words = wordsUA;
    }

    prepareWord();
}