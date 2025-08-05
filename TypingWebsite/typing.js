
let textInput = document.getElementById("textInput");
let startBtn = document.getElementById("startBtn");
let submitBtn = document.getElementById("submitBtn");
let result = document.getElementById("result");
let timerDisplay = document.getElementById("timer");

let originalText = document.getElementById("passage").innerText.trim();
let timeLimit = 600; // 10 minutes = 600 seconds
let timer;
let startedTyping = false;
let startTime = 0;

function startTest() {
  textInput.disabled = false;
  textInput.value = "";
  textInput.classList.remove("typing");
  textInput.focus();
  submitBtn.disabled = false;
  result.innerText = "";
  startTime = new Date().getTime();
  timeLimit = 600;
  updateTimerDisplay(timeLimit);
  timer = setInterval(() => {
    timeLimit--;
    updateTimerDisplay(timeLimit);
    if (timeLimit <= 0) {
      clearInterval(timer);
      endTest();
    }
  }, 1000);
}

function updateTimerDisplay(seconds) {
  let min = Math.floor(seconds / 60);
  let sec = seconds % 60;
  timerDisplay.innerText = `${min.toString().padStart(2, "0")}:${sec
    .toString()
    .padStart(2, "0")}`;
}

function endTest() {
  textInput.disabled = true;
  submitBtn.disabled = true;
  calculateResult();
}

function calculateResult() {
  let userInput = textInput.value.trim();
  let endTime = new Date().getTime();
  let totalTime = ((endTime - startTime) / 60000); // in minutes

  let totalWords = userInput.split(/\s+/).length;
  let wpm = Math.round(totalWords / totalTime);

  // Accuracy
  let correctChars = 0;
  for (let i = 0; i < userInput.length; i++) {
    if (userInput[i] === originalText[i]) {
      correctChars++;
    }
  }
  let accuracy = ((correctChars / originalText.length) * 100).toFixed(2);

  result.innerHTML = `
    <p>🕒 Time Taken: ${totalTime.toFixed(2)} minutes</p>
    <p>📈 WPM: ${wpm} words/minute</p>
    <p>✅ Accuracy: ${accuracy}%</p>
  `;
}

textInput.addEventListener("input", () => {
  if (!startedTyping && textInput.value.length > 0) {
    textInput.classList.add("typing");
    startedTyping = true;
  }
});

startBtn.addEventListener("click", () => {
  clearInterval(timer);
  startedTyping = false;
  startTest();
});

submitBtn.addEventListener("click", () => {
  clearInterval(timer);
  endTest();
});
