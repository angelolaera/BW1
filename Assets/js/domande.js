//CIAO  GIANNI

/*
        QUIZ GAME!

        REGOLE:
        / L'utente dovrà indovinare un certo numero di domandeThe player must guess correctly a certain amount of questions
        / Ogni risposta corretta gli darà 1 punto
        / Le domande possono avere risposte multiple o singole (true/false)
        / Al termine del quiz l'utente dovrà poter vedere il suo punteggio

        DOMANDE:
        / Le domande possono essere ottenute da questo URL ( http://bit.ly/strive_QUIZZ ) o puoi scriverne di tue
        / Possono essere composte di boolean multipli (true / false)

        TIPS:
        / Usa una variabile globale per registrare il punteggio dell'utente
        / Crea una variabile "questionNumber" per tenere traccia del numero (o posizione) della domanda presentata all'utente
        / Quando "questionNumber" è maggiore delle domande disponibili, a quel punto l'applicazione dovrà mostrare il punteggio
        / Comincia salvando le domande in una variabile (o reperiscile dall'URL fornito usando AJAX e fetch)
        / Parti con l'implementazione semplice, poi passa agli extra e ad abbellire l'interfaccia 
        / Fai test completi: controlla la console periodicamente per verificare che non ci siano errori e che il flusso di dati sia quello che ti aspetti

        EXTRA:
        / Dai un feedback sulla risposta al momento del click (corretta o sbagliata)
        / Visualizza una domanda alla volta in sequenza piuttosto che tutte assieme in forma di lista
        / Permetti all'utente di selezionare la difficoltà del quiz prima di iniziare e il numero di domande che desidera ricevere.
        ( Se hai implementato l'applicazione usando l'URL fornito, puoi ottenere i dati che ti servono in modo semplice, 
        usando query parameters in questo modo: https://opentdb.com/api.php?amount=10&category=18&difficulty=easy e modificarne il numero di domande e difficoltà )
    
        /* NON DIMENTICARE...
          di fare commit & push del codice regolarmente sulla tua repository GitHub e di condividerla con i tuoi colleghi
        */

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

// SE MOSTRI UNA DOMANDA ALLA VOLTA:
// Mostra la prima domanda con il testo e i radio button.
// Quando l'utente seleziona una risposta, passa alla domanda successiva dell'array e sostituisci quella precedentemente visualizzata con quella corrente,
// salvando le risposte dell'utente in una variabile

// Come calcolare il risultato? Hai due strade:
// Se stai mostrando tutte le domande nello stesso momento, controlla semplicemente se i radio button selezionati sono === correct_answer
// Se stai mostrando una domanda alla volta, aggiungi semplicemente un punto alla variabile del punteggio che hai precedentemente creato SE la risposta selezionata è === correct_answer

// BUON LAVORO 💪🚀

// 1. Filtrare e salvare le domande giuste e quelle sbagliate in maniera da poter  eseguire un controllo più semplice
// - Unire le proprietà answer così da creare un unico  array da pushare a video
// - Quando l'utente clicca la sua risposta, confrontare il click con sia le domande corrette sia quelle sbagliate in maniera tale da poter capire se la risposta è vera oppure falsa
// - Sposarsi sulla domanda successiva

let currentQuestionIndex = 0;
let correctAnswers = 0;
let incorrectAnswers = 0;
const totalQuestions = questions.length;

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
  const quizContainer = document.getElementById("container");
  quizContainer.innerHTML = `<h2>Quiz finished! Your score is: ${correctAnswers}/${totalQuestions}</h2>`; /* da modificare, che vada alla pagina successiva, ovvero result */

  // Calcola le percentuali
  const correctPercentage = (correctAnswers / totalQuestions) * 100;
  const incorrectPercentage = (incorrectAnswers / totalQuestions) * 100;

  // Crea un array con le percentuali
  const results = [correctPercentage, incorrectPercentage];

  // Salva i risultati nel localStorage per l'uso nella pagina successiva
  localStorage.setItem("quizResults", JSON.stringify(results));
}

// Iniziare il quiz con la prima domanda
showQuestion(questions[currentQuestionIndex]);

/* TIMER SVG */

let duration = 60; // Durata del countdown in secondi
let startTime = Date.now();

const timerText = document.getElementById("timerText");
const donutSegment = document.querySelector(".donut-segment");

donutSegment.classList.add("donut-start");

function updateDonutTimer() {
  let elapsed = (Date.now() - startTime) / 1000;
  let remainingTime = duration - elapsed;

  if (remainingTime < 0) {
    remainingTime = 0;
  }

  const percentage = (remainingTime / duration) * 100;
  const circumference = 2 * Math.PI * 15.91549430918954;

  donutSegment.style.strokeDasharray = `${circumference} ${circumference}`;
  // Calcolo dell offset
  donutSegment.style.strokeDashoffset = (percentage * circumference) / 100;

  timerText.textContent = Math.ceil(remainingTime).toString();

  if (remainingTime > 0) {
    requestAnimationFrame(updateDonutTimer);
  } else {
    timerText.textContent = "0";
  }
}

updateDonutTimer();
