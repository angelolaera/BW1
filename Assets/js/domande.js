/* DOMANDE QUIZ */
const questions = [
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "What does CPU stand for?",
    correct_answer: "Central Processing Unit",
    incorrect_answers: [
      "Central Process Unit",
      "Computer Personal Unit",
      "Central Processor Unit",
    ],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "In the programming language Java, which of these keywords would you put on a variable to make sure it doesn't get modified?",
    correct_answer: "Final",
    incorrect_answers: ["Static", "Private", "Public"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question: "The logo for Snapchat is a Bell.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question:
      "Pointers were not used in the original C programming language; they were added later on in C++.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "What is the most preferred image format used for logos in the Wikimedia database?",
    correct_answer: ".svg",
    incorrect_answers: [".png", ".jpeg", ".gif"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "In web design, what does CSS stand for?",
    correct_answer: "Cascading Style Sheet",
    incorrect_answers: [
      "Counter Strike: Source",
      "Corrective Style Sheet",
      "Computer Style Sheet",
    ],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "What is the code name for the mobile operating system Android 7.0?",
    correct_answer: "Nougat",
    incorrect_answers: ["Ice Cream Sandwich", "Jelly Bean", "Marshmallow"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "On Twitter, what is the character limit for a Tweet?",
    correct_answer: "140",
    incorrect_answers: ["120", "160", "100"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question: "Linux was first created as an alternative to Windows XP.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "Which programming language shares its name with an island in Indonesia?",
    correct_answer: "Java",
    incorrect_answers: ["Python", "C", "Jakarta"],
  },
];

/* FUNZIONE QUIZ + TIMER */
let currentQuestionIndex = 0;
let correctAnswers = 0;
let incorrectAnswers = 0;
const totalQuestions = questions.length;

const duration = 60; // Durata del countdown in secondi
let startTime;
let timerInterval;

const timerText = document.getElementById("timerText");
const donutSegment = document.querySelector(".donut-segment");

donutSegment.classList.add("donut-start");

function showQuestion(question) {
  const questionElement = document.getElementById("question");
  const answersElement = document.getElementById("answers");

  questionElement.textContent = question.question;
  answersElement.innerHTML = ""; // Pulisce le risposte precedenti

  const answers = [...question.incorrect_answers, question.correct_answer];
  answers.sort(() => Math.random() - 0.5); // Mischia le risposte

  answers.forEach((answer) => {
    const button = document.createElement("button");
    button.textContent = answer;
    button.classList.add("answer-button");
    button.addEventListener("click", () => {
      checkAnswer(button, answer, question.correct_answer);
    });
    answersElement.appendChild(button);
  });

  resetTimer(); // Reset del timer quando viene mostrata una nuova domanda
}

function checkAnswer(button, selectedAnswer, correctAnswer) {
  if (selectedAnswer === correctAnswer) {
    correctAnswers++;
    button.style.backgroundColor = "green";
  } else {
    incorrectAnswers++;
    button.style.backgroundColor = "red";
  }
  // Disabilita tutti i bottoni delle risposte
  document
    .querySelectorAll(".answer-button")
    .forEach((btn) => (btn.disabled = true));

  setTimeout(() => {
    nextQuestion();
  }, 1000); // Attende 1 secondo prima di passare alla prossima domanda
}

function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion(questions[currentQuestionIndex]);
    document.getElementById("question-number").textContent =
      currentQuestionIndex + 1;
  } else {
    endQuiz();
  }
}

function endQuiz() {
  window.location.href = "IndexResults.html";

  // Calcola le percentuali
  const correctPercentage = (correctAnswers / totalQuestions) * 100;
  const incorrectPercentage = (incorrectAnswers / totalQuestions) * 100;

  // Crea un array con le percentuali
  const results = [correctPercentage, incorrectPercentage];

  // Salva i risultati nel localStorage per l'uso nella pagina successiva
  localStorage.setItem("quizResults", JSON.stringify(results)); //percentuale
  localStorage.setItem("correctA", JSON.stringify(correctAnswers)); //numero domande correct
  localStorage.setItem("incorrectA", JSON.stringify(incorrectAnswers)); //num dom incorrect
}

function updateDonutTimer() {
  let elapsed = (Date.now() - startTime) / 1000;
  let remainingTime = duration - elapsed;

  if (remainingTime < 0) {
    remainingTime = 0;
  }

  const percentage = (remainingTime / duration) * 100;
  const circumference = 2 * Math.PI * 15.91549430918954;

  donutSegment.style.strokeDasharray = `${circumference} ${circumference}`;
  donutSegment.style.strokeDashoffset = (percentage * circumference) / 100;

  timerText.textContent = Math.ceil(remainingTime).toString();

  if (remainingTime <= 0) {
    nextQuestion();
  } else {
    timerInterval = requestAnimationFrame(updateDonutTimer);
  }
}

function resetTimer() {
  startTime = Date.now();
  if (timerInterval) {
    cancelAnimationFrame(timerInterval);
  }
  updateDonutTimer();
}

// Iniziare il quiz con la prima domanda della lista domande.
showQuestion(questions[currentQuestionIndex]);
