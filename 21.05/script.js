const wordElement = document.querySelector('#word');
const messageElement = document.querySelector('#message');
const inputElement = document.querySelector('#input');
let currentWord;

prepareWord();

function prepareWord() {
    const index = randomIntFromInterval(0, wordsEN.length - 1);
    const word = wordsEN[index];

    wordElement.innerText = word;
    currentWord = word;
}

function textInput() {
    const currentInput = inputElement.value;
    const inputLength = currentInput.length;
    const substring = currentWord.substring(0, inputLength);

    if (currentInput == substring) {
        if (inputLength == currentWord.length) {
            setTimeout(() => {
                inputElement.value = '';
                document.body.style.backgroundColor = 'black'
                prepareWord();
            } , 500)
        }
        else {
            messageElement.innerText = 'Great!';

            document.body.style.backgroundColor
                = greenColor(inputLength, currentWord.length);
        }
    }
    else {
        messageElement.innerText = 'Wrong!';
        document.body.style.backgroundColor = 'coral'
    }
}

function greenColor(current, final) {
    const lightness = 36 * current / final;
    return 'hsl(120, 70%, ' + lightness + '%)'
}