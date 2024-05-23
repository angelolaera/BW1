//recupera i risultati percentuali salvati
const storedResults = localStorage.getItem("quizResults");

//Converte JSON in oggetto
const results = JSON.parse(storedResults);

const corrects = results[0];
const wrongs = results[1];

//per controllare i risultati salvati nella pagina
console.log("corrette:", corrects);
console.log("sbagliate:", wrongs);

//crea nodi
const correctBox = document.getElementById("correct");
const wrongBox = document.getElementById("wrong");
correctBox.innerHTML = `<h2>Correct</h2><h2><span>${corrects}%</span><h2>`;
wrongBox.innerHTML = `<h2>Wrong</h2><h2><span>${wrongs}%</span><h2>`;

console.log(correctBox);
console.log(wrongBox);

//renderizzazione risultati
