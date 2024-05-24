//recupera i risultati percentuali salvati
const storedResults = localStorage.getItem("quizResults");
const correctAns = localStorage.getItem("correctA");
const incorrectAns = localStorage.getItem("incorrectA");

console.log(correctAns);
console.log(incorrectAns);

//Converte JSON in oggetto
const results = JSON.parse(storedResults); //percentuali risp

const corrects = results[0];
const wrongs = results[1];

//Converte numero risp

//numero risp

console.log("numero risposte c/w");

//per controllare i risultati salvati nella pagina
console.log("corrette:", corrects);
console.log("sbagliate:", wrongs);

//crea nodi
const correctBox = document.getElementById("correct");
const wrongBox = document.getElementById("wrong");
correctBox.innerHTML = `<h2>Correct</h2><h2><span>${corrects}%</span><h2><p>${correctAns}/10 questions</p>`;
wrongBox.innerHTML = `<h2>Wrong</h2><h2><span>${wrongs}%</span><h2><p>${incorrectAns}/10 questions</p>`;

console.log(correctBox);
console.log(wrongBox);

//nodi testo nel chart

const charText = document.getElementById("chart-text");
if (corrects >= 60) {
  charText.innerHTML = `<p>Congratulations!</p> 
  <p id="coloredText1">You passed the EXAM!</p>
  <p id="coloredText2">
    We'll send you the certificate in few minutes <br />
    Check your email(includig promotions/span folder)
  </p>`;
} else {
  charText.innerHTML = `<p>I'm sorry!</p> 
  <p id="coloredText1"> You FAILED the EXAM!  </p>
  <p id="coloredText2">
    We'll send you the certificate in few minutes <br />
    Check your email(includig promotions/spam folder)
  </p>`;
}

//renderizzazione risultati

// JS PER IL GRAFICO

const chartData = {
  labels: ["Correct", "Wrong"],
  data: [corrects, wrongs],
};

const myChart = document.querySelector(".my-chart");
const ul = document.querySelector(".programming-stats .details ul");

myChart.width = 400; // Larghezza desiderata del grafico
myChart.height = 400;

new Chart(myChart, {
  type: "doughnut",
  data: {
    labels: chartData.labels,
    datasets: [
      {
        label: "Percetuale",
        data: chartData.data,
        backgroundColor: ["#00ffff", "rgb(175, 16, 127)"],
        borderColor: ["#00ffff", "rgb(175, 16, 127)"],
        rotation: 180,
      },
    ],
  },
  options: {
    cutout: "80%", // Definiamo lo spessore delle barre interne
    responsive: true,
    //borderWidth: 5,
    borderRadius: 0,
    hoverBorderWidth: 0,
    plugins: {
      legend: {
        display: false,
      },
    },
  },
});
