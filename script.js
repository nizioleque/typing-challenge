const wordElement = document.querySelector('#word');
const inputElement = document.querySelector('#input');
const messageElement = document.querySelector('#message');

const countWords = document.querySelector('#count-words');
const countTime = document.querySelector('#count-time');
const countWpm = document.querySelector('#count-wpm');

let currentWord = '';

let gameStarted = false;
let timer;
let correctWords;
let timerInterval;

let currentLanguage = 'pl';
let words = wordsPL;

let messages = {
    pl: {
        good: 'Dobrze!',
        wrong: 'Źle!',
        words: 'Słowa',
        time: 'Czas',
        wpm: 'Słowa/min'
    },
    en: {
        good: 'Great!',
        wrong: 'Incorrect!',
        words: 'Words',
        time: 'Time',
        wpm: 'Words/min'
    },
    ua: {
        good: 'Добре!',
        wrong: 'Погано!',
        words: 'Слова',
        time: 'Час',
        wpm: 'Слова/хв'
    }
}

prepareWord();
setLanguage(currentLanguage)

function prepareWord() {
    const index = randomIntFromInterval(0, words.length - 1);
    const word = words[index];
    currentWord = word;
    wordElement.innerText = word;
    inputElement.value = '';
}

function resetStyle() {
    document.body.style.backgroundColor = 'black';
    messageElement.style.opacity = 0;
}

function startGame() {
    timer = 0;
    correctWords = 0;

    timerInterval = setInterval(() => {
        timer++;
        updateStats();
    }, 1000)

    gameStarted = true;
}

function stopGame() {
    clearInterval(timerInterval);
    gameStarted = false;
    timer = 0;
    correctWords = 0;
    updateStats();
}

function textInput() {
    if (gameStarted === false) startGame();

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

function updateStats() {
    const minutes = Math.floor(timer / 60);
    let seconds = timer - minutes * 60;
    if (seconds < 10) seconds = '0' + seconds;

    let wpm = 0;
    if (timer > 0) wpm = correctWords / timer * 60;
    wpm = wpm.toFixed(2);

    countTime.innerText = minutes + ':' + seconds;
    countWpm.innerText = wpm;
    countWords.innerText = correctWords;
}

function correctWord() {
    messageElement.innerText = messages[currentLanguage].good;
    messageElement.style.opacity = 1;

    correctWords++;
    updateStats();

    prepareWord();

    setTimeout(() => {
        resetStyle();
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
    stopGame();

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

    document.querySelector('#msg-words').innerText = messages[newLanguage].words;
    document.querySelector('#msg-time').innerText = messages[newLanguage].time;
    document.querySelector('#msg-wpm').innerText = messages[newLanguage].wpm;


    prepareWord();
}