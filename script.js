let startStopBtn = document.getElementById('startStop');
let resetBtn = document.getElementById('reset');
let lapBtn = document.getElementById('lap');
let display = document.getElementById('display');
let laps = document.getElementById('laps');

let timer;
let running = false;
let startTime;
let elapsedTime = 0;

function formatTime(ms) {
    let totalSeconds = Math.floor(ms / 1000);
    let hours = Math.floor(totalSeconds / 3600);
    let minutes = Math.floor((totalSeconds % 3600) / 60);
    let seconds = totalSeconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function updateDisplay() {
    display.textContent = formatTime(elapsedTime);
}

function startStop() {
    if (running) {
        clearInterval(timer);
        elapsedTime += Date.now() - startTime;
        startStopBtn.textContent = 'Start';
    } else {
        startTime = Date.now();
        timer = setInterval(() => {
            display.textContent = formatTime(elapsedTime + (Date.now() - startTime));
        }, 100);
        startStopBtn.textContent = 'Stop';
    }
    running = !running;
}

function reset() {
    clearInterval(timer);
    running = false;
    startTime = null;
    elapsedTime = 0;
    updateDisplay();
    startStopBtn.textContent = 'Start';
    laps.innerHTML = '';
}

function lap() {
    if (running) {
        let lapTime = formatTime(elapsedTime + (Date.now() - startTime));
        let lapItem = document.createElement('li');
        lapItem.textContent = lapTime;
        laps.appendChild(lapItem);
    }
}

startStopBtn.addEventListener('click', startStop);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', lap);

updateDisplay();
