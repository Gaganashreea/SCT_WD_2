let startTime;
let elapsedTime = 0;
let timerInterval;
let running = false;
const display = document.getElementById('display');
const startStopButton = document.getElementById('startStop');
const lapButton = document.getElementById('lap');
const resetButton = document.getElementById('reset');
const lapsContainer = document.getElementById('laps');

function formatTime(ms) {
    const milliseconds = Math.floor(ms % 1000 / 10).toString().padStart(2, '0');
    const seconds = Math.floor((ms / 1000) % 60).toString().padStart(2, '0');
    const minutes = Math.floor((ms / (1000 * 60)) % 60).toString().padStart(2, '0');
    const hours = Math.floor(ms / (1000 * 60 * 60)).toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}.${milliseconds}`;
}
function updateDisplay() {
    const currentTime = Date.now() - startTime + elapsedTime;
    display.textContent = formatTime(currentTime);
}

function startTimer() {
    startTime = Date.now();
    timerInterval = setInterval(updateDisplay, 10); 
    startStopButton.textContent = 'Pause';
}

function pauseTimer() {
    clearInterval(timerInterval);
    elapsedTime += Date.now() - startTime;
    startStopButton.textContent = 'Start';
}

function resetTimer() {
    clearInterval(timerInterval);
    elapsedTime = 0;
    display.textContent = '00:00:00.00'; 
    startStopButton.textContent = 'Start';
    lapsContainer.innerHTML = ''; 
    running = false;
}

function addLap() {
    if (running) {
        const lapTime = display.textContent;
        const lapItem = document.createElement('li');
        lapItem.textContent = lapTime;
        lapsContainer.appendChild(lapItem);
    }
}

startStopButton.addEventListener('click', function() {
    if (!running) {
        startTimer();
    } else {
        pauseTimer();
    }
    running = !running;
});

resetButton.addEventListener('click', resetTimer);

lapButton.addEventListener('click', addLap);





