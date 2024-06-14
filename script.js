let startTime;
let updatedTime;
let difference;
let tInterval;
let running = false;
let lapCounter = 1;
let savedTime = 0;

const display = document.getElementById('display');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const laps = document.getElementById('laps');

function startTimer() {
    if (!running) {
        startTime = new Date().getTime() - savedTime;
        tInterval = setInterval(updateTime, 1);
        running = true;
        startBtn.innerHTML = "Running...";
        startBtn.disabled = true;
        pauseBtn.disabled = false;
        resetBtn.disabled = false;
        lapBtn.disabled = false;
    }
}

function pauseTimer() {
    if (running) {
        clearInterval(tInterval);
        savedTime = new Date().getTime() - startTime;
        running = false;
        startBtn.innerHTML = "Start";
        startBtn.disabled = false;
    }
}

function resetTimer() {
    clearInterval(tInterval);
    running = false;
    savedTime = 0;
    display.innerHTML = "00:00:00";
    startBtn.innerHTML = "Start";
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    resetBtn.disabled = true;
    lapBtn.disabled = true;
    laps.innerHTML = '';
    lapCounter = 1;
}

function recordLap() {
    if (running) {
        const lapTime = display.innerHTML;
        const lapItem = document.createElement('li');
        lapItem.innerHTML = `Lap ${lapCounter}: ${lapTime}`;
        laps.appendChild(lapItem);
        lapCounter++;
    }
}

function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    display.innerHTML = 
        (hours < 10 ? "0" + hours : hours) + ":" + 
        (minutes < 10 ? "0" + minutes : minutes) + ":" + 
        (seconds < 10 ? "0" + seconds : seconds);
}

startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);
lapBtn.addEventListener('click', recordLap);
