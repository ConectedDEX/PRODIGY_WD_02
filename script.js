let startTime, elapsedTime = 0;
let timerInterval;
let running = false;

const display = document.getElementById("time-display");
const startPauseBtn = document.getElementById("start-pause-btn");
const restartBtn = document.getElementById("restart-btn");
const flagBtn = document.getElementById("flag-btn");
const laps = document.getElementById("laps");

function formatTime(ms) {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  const milliseconds = Math.floor((ms % 1000) / 10);
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(milliseconds).padStart(2, '0')}`;
}

function updateTime() {
  const time = Date.now() - startTime + elapsedTime;
  display.textContent = formatTime(time);
}

startPauseBtn.onclick = () => {
  if (!running) {
    startTime = Date.now();
    timerInterval = setInterval(updateTime, 10);
    running = true;
    startPauseBtn.textContent = "⏸️";
    restartBtn.classList.remove("hidden");
    flagBtn.classList.remove("hidden");
  } else {
    clearInterval(timerInterval);
    elapsedTime += Date.now() - startTime;
    running = false;
    startPauseBtn.textContent = "▶️";
  }
};

restartBtn.onclick = () => {
  clearInterval(timerInterval);
  elapsedTime = 0;
  running = false;
  display.textContent = "00:00:00";
  startPauseBtn.textContent = "▶️";
  restartBtn.classList.add("hidden");
  flagBtn.classList.add("hidden");
  laps.innerHTML = "";
};

flagBtn.onclick = () => {
  if (running) {
    const li = document.createElement("li");
    li.textContent = display.textContent;
    laps.appendChild(li);

    // Auto-scroll to bottom
    laps.scrollTop = laps.scrollHeight;
  }
};
