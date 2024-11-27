// General State
const hostPassword = "quizmaster123"; // Host password
let quizStartTime = null; // Stores the quiz start time
let isQuizRunning = false; // Indicates if the quiz is active

// DOM Elements
const startQuizButton = document.getElementById("startQuizButton");
const nextQuestionButton = document.getElementById("nextQuestionButton");
const resultTable = document.getElementById("resultTable");
const resultTableBody = document.querySelector("#resultTable tbody");
const pressButton = document.getElementById("pressButton");
const registerButton = document.getElementById("registerButton");
const participantNameInput = document.getElementById("participantName");
const nameInputSection = document.getElementById("nameInputSection");
const quizButtonSection = document.getElementById("quizButtonSection");
const welcomeMessage = document.getElementById("welcomeMessage");

// Utility Functions
function updateResultsTable() {
  const results = JSON.parse(localStorage.getItem("results")) || [];
  if (resultTableBody) {
    resultTableBody.innerHTML = results
      .map(
        (result, index) =>
          `<tr><td>${index + 1}</td><td>${result.name}</td><td>${result.time}</td></tr>`
      )
      .join("");
  }
}

function resetQuiz() {
  quizStartTime = null;
  isQuizRunning = false;
  localStorage.setItem("quizRunning", false);
  localStorage.setItem("quizStartTime", null);
  localStorage.setItem("results", JSON.stringify([]));
  updateResultsTable();
  if (pressButton) pressButton.disabled = true;
}

// Host Logic
if (startQuizButton && nextQuestionButton) {
  // Start the quiz
  startQuizButton.addEventListener("click", () => {
    const enteredPassword = document.getElementById("hostPassword").value;
    if (enteredPassword === hostPassword) {
      alert("Quiz Started!");
      quizStartTime = new Date();
      localStorage.setItem("quizStartTime", quizStartTime);
      localStorage.setItem("quizRunning", true);
      isQuizRunning = true;
      document.getElementById("passwordSection").style.display = "none";
      nextQuestionButton.style.display = "block";
      resultTable.style.display = "block";
    } else {
      alert("Incorrect Password!");
    }
  });

  // Start the next question
  nextQuestionButton.addEventListener("click", () => {
    alert("Next Question Started!");
    resetQuiz();
    quizStartTime = new Date();
    localStorage.setItem("quizStartTime", quizStartTime);
    localStorage.setItem("quizRunning", true);
    isQuizRunning = true;
  });

  // Update the results table when the localStorage changes
  window.addEventListener("storage", updateResultsTable);
}

// Participant Logic
if (registerButton && pressButton) {
  // Register the participant
  registerButton.addEventListener("click", () => {
    const participantName = participantNameInput.value.trim();
    if (!participantName) {
      alert("Please enter your name.");
      return;
    }

    let registeredNames = JSON.parse(localStorage.getItem("registeredNames")) || [];
    if (!registeredNames.includes(participantName)) {
      registeredNames.push(participantName);
      localStorage.setItem("registeredNames", JSON.stringify(registeredNames));
    }

    alert(`Welcome, ${participantName}!`);
    nameInputSection.style.display = "none";
    quizButtonSection.style.display = "block";
    welcomeMessage.innerText = `Hello, ${participantName}!`;
  });

  // Handle button press during the quiz
  pressButton.addEventListener("click", () => {
    const quizStartTime = new Date(localStorage.getItem("quizStartTime"));
    const currentTime = new Date();
    const elapsedTime = ((currentTime - quizStartTime) / 1000).toFixed(2);
    const participantName = participantNameInput.value.trim();

    let results = JSON.parse(localStorage.getItem("results")) || [];
    results.push({ name: participantName, time: elapsedTime });
    localStorage.setItem("results", JSON.stringify(results));
    pressButton.disabled = true; // Disable button after pressing
  });

  // Enable the button if the quiz is running and the participant is registered
  window.addEventListener("storage", () => {
    const quizRunning = localStorage.getItem("quizRunning") === "true";
    const registeredNames = JSON.parse(localStorage.getItem("registeredNames")) || [];
    const participantName = participantNameInput.value.trim();

    if (quizRunning && registeredNames.includes(participantName)) {
      pressButton.disabled = false;
    }
  });
}

// Initial Setup
window.addEventListener("DOMContentLoaded", () => {
  const results = JSON.parse(localStorage.getItem("results")) || [];
  if (resultTableBody) updateResultsTable();

  // Check if the quiz is running
  const quizRunning = localStorage.getItem("quizRunning") === "true";
  if (quizRunning) {
    quizStartTime = new Date(localStorage.getItem("quizStartTime"));
    isQuizRunning = true;

    if (pressButton && registerButton) {
      const participantName = participantNameInput.value.trim();
      const registeredNames = JSON.parse(localStorage.getItem("registeredNames")) || [];
      if (registeredNames.includes(participantName)) {
        pressButton.disabled = false;
      }
    }
  }
});
