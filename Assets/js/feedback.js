const starArray = [];
const maxStars = 10;
let currentRating = -1;

const starGrid = (stars) => {
  const starRating = document.getElementById("star-rating");

  for (let index = 0; index < stars; index++) {
    const starDiv = document.createElement("div");
    starDiv.classList.add("starClass");

    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("width", "47");
    svg.setAttribute("height", "46");
    svg.setAttribute("viewBox", "0 0 47 46");
    svg.setAttribute("fill", "none");

    const path = document.createElementNS(svgNS, "path");
    path.setAttribute(
      "d",
      "M22.2044 1.55551C22.6143 0.569963 24.0104 0.569964 24.4203 1.55552L29.9874 14.9402C30.1602 15.3557 30.5509 15.6396 30.9994 15.6756L45.4494 16.834C46.5134 16.9193 46.9448 18.2471 46.1341 18.9415L35.1248 28.3722C34.7831 28.6649 34.6338 29.1242 34.7382 29.5619L38.1018 43.6626C38.3494 44.7009 37.2199 45.5215 36.309 44.9651L23.9379 37.4089C23.5538 37.1743 23.0709 37.1743 22.6868 37.4089L10.3157 44.9651C9.40478 45.5215 8.27528 44.7009 8.52295 43.6626L11.8865 29.5619C11.9909 29.1242 11.8416 28.6649 11.4999 28.3722L0.490575 18.9415C-0.320069 18.2471 0.111362 16.9193 1.17535 16.834L15.6253 15.6756C16.0738 15.6396 16.4645 15.3557 16.6374 14.9402L22.2044 1.55551Z"
    );
    path.setAttribute("fill", "lightgray");

    svg.appendChild(path);
    starDiv.appendChild(svg);
    starRating.appendChild(starDiv);
    starArray.push(starDiv);

    // Eventi di passaggio del mouse
    starDiv.addEventListener("mouseover", () => highlightStars(index));
    starDiv.addEventListener("mouseout", () => resetStars());
    starDiv.addEventListener("click", () => setRating(index));
  }
};

const highlightStars = (index) => {
  for (let i = 0; i <= index; i++) {
    const path = starArray[i].querySelector("path");
    path.setAttribute("fill", "#00ffff"); // Colore acquamarina per evidenziare
  }
};

const resetStars = () => {
  for (let i = 0; i < starArray.length; i++) {
    const path = starArray[i].querySelector("path");
    if (i > currentRating) {
      path.setAttribute("fill", "lightgray"); // Colore originale
    }
  }
};

const setRating = (index) => {
  currentRating = index;
  for (let i = 0; i < starArray.length; i++) {
    const path = starArray[i].querySelector("path");
    if (i <= index) {
      path.setAttribute("fill", "#00ffff"); // Colore acquamarina per la valutazione
    } else {
      path.setAttribute("fill", "lightgray"); // Colore originale per le stelle non selezionate
    }
  }

  const messageElement = document.getElementById("ratingMessage");
  if (index <= 4) {
    messageElement.textContent =
      "Grazie per il tuo feedback! Cercheremo di migliorare.";
  } else {
    messageElement.textContent = "Grazie per il tuo feedback positivo!";
  }

  messageElement.style.display = "none";
};

// Esegui la funzione con il numero desiderato di stelle
starGrid(maxStars);

const messaggioFinale = () => {
  if (currentRating === -1) {
    alert("Selezionare una valutazione prima di procedere");
  } else {
    const hideMain = document.getElementsByTagName("main")[0];
    hideMain.style.display = "none";
    const messaggio = document.getElementById("ratingMessage");
    messaggio.style.display = "block";
  }
};

const bottone = document.getElementById("bottone");
bottone.addEventListener("click", (evento) => {
  evento.preventDefault(); // impedisce il refresh della pagina
  messaggioFinale();
});
