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

// FUNZIONE QUIZ + TIMER
// Creo variabili dispensabili per la funzione

let currentQuestionIndex = 0; // Indice della domanda corrente
let correctAnswers = 0; // Contatore delle risposte corrette
let incorrectAnswers = 0; // Contatore delle risposte sbagliate
const totalQuestions = questions.length; // Numero totale di domande

const duration = 60; // Durata del countdown in secondi
let startTime; // Tempo di inizio del timer
let timerInterval; // Variabile per gestire l'intervallo del timer

const timerText = document.getElementById("timerText"); // Elemento per visualizzare il tempo rimanente
const donutSegment = document.querySelector(".donut-segment"); // Elemento grafico del timer

donutSegment.classList.add("donut-start"); // Aggiunge una classe per l'inizio del timer

function showQuestion(question) {
  // Funzione che mostra le domande, prendendole dall'array
  const questionElement = document.getElementById("question"); // Elemento DOM per la domanda
  const answersElement = document.getElementById("answers"); // Elemento DOM per le risposte

  questionElement.textContent = question.question; // Visualizza la domanda
  answersElement.innerHTML = ""; // Pulisce le risposte precedenti

  const answers = [...question.incorrect_answers, question.correct_answer]; // Combina risposte corrette e sbagliate
  answers.sort(() => Math.random() - 0.5); // Mischia le risposte

  answers.forEach((answer) => {
    const button = document.createElement("button"); // Crea un bottone per ogni risposta
    button.textContent = answer; // Testo del bottone
    button.classList.add("answer-button"); // Aggiunge una classe al bottone
    button.addEventListener("click", () => {
      checkAnswer(button, answer, question.correct_answer); // Aggiunge un event listener al bottone al click
    });
    answersElement.appendChild(button); // Aggiunge il bottone alle risposte
  });

  resetTimer(); // Reset del timer quando viene mostrata una nuova domanda
}

function checkAnswer(button, selectedAnswer, correctAnswer) {
  // Funzione che controlla le domande sui bottoni
  if (selectedAnswer === correctAnswer) {
    correctAnswers++; // Incrementa il contatore delle risposte corrette
    button.style.backgroundColor = "green"; // Colora il bottone di verde per indicare la risposta corretta
  } else {
    incorrectAnswers++; // Incrementa il contatore delle risposte sbagliate
    button.style.backgroundColor = "red"; // Colora il bottone di rosso per indicare la risposta sbagliata
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
  // Funzione per andare alla prossima domanda
  currentQuestionIndex++; // Incrementa l'indice della domanda corrente
  if (currentQuestionIndex < questions.length) {
    showQuestion(questions[currentQuestionIndex]); // Mostra la prossima domanda
    document.getElementById("question-number").textContent =
      currentQuestionIndex + 1; // Aggiorna il numero della domanda corrente, andando alla prossi,a domada
  } else {
    endQuiz(); // Se non ci sono più domande, termina il quiz
  }
}

function endQuiz() {
  //Funzione che imposta un azione alla fine del Quiz
  window.location.href = "IndexResults.html"; // Reindirizza alla pagina dei risultati

  // Calcola le percentuali di risposte sbagliate o corrette

  const correctPercentage = (correctAnswers / totalQuestions) * 100;
  const incorrectPercentage = (incorrectAnswers / totalQuestions) * 100;

  // Crea un array con le percentuali
  const results = [correctPercentage, incorrectPercentage];

  // Salva i risultati nel localStorage per l'uso nella pagina successiva
  localStorage.setItem("quizResults", JSON.stringify(results)); //percentuale
  localStorage.setItem("correctA", JSON.stringify(correctAnswers)); //numero domande correct
  localStorage.setItem("incorrectA", JSON.stringify(incorrectAnswers)); //num domande incorrect
}

function updateDonutTimer() {
  //Funzione che gestisce la creazione, reset e animazione del grafico.
  let elapsed = (Date.now() - startTime) / 1000; // Calcola il tempo trascorso in secondi
  let remainingTime = duration - elapsed; // Calcola il tempo rimanente

  if (remainingTime < 0) {
    remainingTime = 0; // Se il tempo è esaurito, imposta a 0
  }

  const percentage = (remainingTime / duration) * 100; // Calcola la percentuale del tempo rimanente
  const circumference = 2 * Math.PI * 15.91549430918954; // Circonferenza del cerchio del timer

  donutSegment.style.strokeDasharray = `${circumference} ${circumference}`; // Imposta la circonferenza del cerchio del timer
  donutSegment.style.strokeDashoffset = (percentage * circumference) / 100; // Aggiorna la parte colorata del timer

  timerText.textContent = Math.ceil(remainingTime).toString(); // Visualizza il tempo rimanente

  if (remainingTime <= 0) {
    nextQuestion(); //Se il tempo è esaurito, passa alla prossima domanda
  } else {
    timerInterval = requestAnimationFrame(updateDonutTimer); // Aggiorna il timer ogni frame
  }
}

function resetTimer() {
  startTime = Date.now(); // Imposta il tempo di inizio del timer
  if (timerInterval) {
    cancelAnimationFrame(timerInterval); // Cancella l'aggiornamento del timer se presente
  }
  updateDonutTimer(); //Avvia l'aggiornamento del timer
}

showQuestion(questions[currentQuestionIndex]); // Mostra la prima domanda all'inizio del quiz
