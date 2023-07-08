const refs = {
    startButton: document.querySelector('[data-start]'),
    stopButton: document.querySelector('[data-stop]')
};

refs.stopButton.disabled = true;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
};

function changeDisableButton() {
    if (refs.stopButton.disabled === true) {
        refs.stopButton.disabled = false;
        refs.startButton.disabled = true;
    } else {
        refs.stopButton.disabled = true;
        refs.startButton.disabled = false;
    }
};

refs.startButton.addEventListener('click', onStart);
refs.stopButton.addEventListener('click', onStop);

let intervalId;

function onStart() {
    intervalId = setInterval(changeColor, 1000);

    function changeColor() {
        document.body.style.backgroundColor = getRandomHexColor();
    };

    changeDisableButton();
};

function onStop() {
    clearInterval(intervalId);
    changeDisableButton();
};