import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

function productItem(beschreibung, preis, bild) {
  this.beschreibung = beschreibung;
  this.preis = preis;
  this.bild = bild;
}
window.product1 = new productItem(
  "neue verstellbare Baseballkappe mit Motiv beagles perfekt look -perfekt Cap Einheitsgröße·Sehr gut \n Einheitsgröße·Sehr gut",
  "12.99",
  "Bild1",
);
window.product2 = new productItem(
  "Adidas 80er 80s Vintage Sweater Small Logo bestickt Blau M \n M·Sehr gut·adidas",
  "35.00",
  "Bild2",
);
window.product3 = new productItem(
  "Dior B22\n" + "40·Sehr gut·Dior",
  "550.00",
  "Bild3",
);
window.product4 = new productItem(
  "Dicker strickcardigan\n" + "S / 36 / 8·Sehr gut·H&M",
  "3.00",
  "Bild4",
);
window.product5 = new productItem(
  "Bierkönig T-Shirt\n" + "XL·Sehr gut·Bierkönig",
  "4.00",
  "Bild5",
);
window.product6 = new productItem(
  "Black denim jacket\n" + "L·Sehr gut·H&M",
  "6.00",
  "Bild6",
);

window.productArr = [
  product1,
  product2,
  product3,
  product4,
  product5,
  product6,
];
window.productsUsed = [];

window.currentProduct = 0;
window.currentScore = 0.0;
window.roundCount = 1;
window.gameOver = false;
window.scoreForCurrentProduct = 0;

document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("preiseingabe");

    input.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            const preisPopup = document.getElementById("popupPreis").classList.contains("hidden");
            const highScorePopup = document.getElementById("popup").classList.contains("hidden");
            if(preisPopup && highScorePopup) {
            event.preventDefault();
            guess();}
            else if(preisPopup && !highScorePopup) {
                event.preventDefault();
                submitName();
            }else{
                event.preventDefault();
                closePopup();
            }
        }
    });
});

const SUPABASE_URL = "https://qgvyyrdiyfxowxdeiezj.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFndnl5cmRpeWZ4b3d4ZGVpZXpqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU1Mjk4NTgsImV4cCI6MjA3MTEwNTg1OH0.QTTpUMRXXXHnATuLFEQKFsrkMR_eY5dN1wL9s30Jnko";
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

function guess() {
  calculateScore();
}

function closePopup() {
  console.log("HILFEEEEEEEEEEEEE");
  console.log("closePopup" + currentScore.toFixed(2));
  document.getElementById("popupPreis").classList.add("hidden");
  setRound();
  setScore();
  if (!gameOver) {
    loadNextItem();
  }
  if (gameOver) {
    highScorePopup();
  }
}

window.closePopup = closePopup;

function priceReveal() {
  document.getElementById("popupPreis").classList.remove("hidden");
  document.getElementById("preisanzeige").innerHTML =
    "<p>Der Preis dieses Produktes Beträgt: <b>" +
    productArr[currentProduct].preis +
    "€ </b></p><p>Du erhälst <b>" +
    scoreForCurrentProduct.toFixed(2) +
    "</b> Punkte</p>";
}

function pictureString(productItems) {
  console.log("pictureString" + currentScore.toFixed(2));
  return (
    "<img src='Ressourcen/" +
    productItems.bild +
    ".webp'" +
    " height='500vh' style='margin: auto; padding-bottom: 10px; padding-top: 10px' />"
  );
}

window.addEventListener("load", initGame);
function initGame() {
  console.log("initGame" + currentScore);
  getHighscores();
  loadNextItem();
  reset();
}

function loadNextItem() {
  console.log("loadNesxtitem" + currentScore
  + "\n Products Used" +productsUsed.length);
  let used = true;
  while (used) {
    used = false;
    window.currentProduct = Math.floor(Math.random() * productArr.length);
    for (let i = 0; i < productsUsed.length; i++) {
      if (currentProduct === productsUsed[i]) {
          console.log("Product schon benutzt");
        used = true;
      }
    }
  }
  document.getElementById("productImgDiv").innerHTML = pictureString(
    productArr[currentProduct],
  );

  productsUsed.push(currentProduct);

  document.getElementById("productDescriptionDiv").innerHTML =
    productArr[currentProduct].beschreibung;
}

function calculateScore() {
  console.log("calculateScore" + currentScore);
  const input = document.form.preiseingabe.value;
  console.log("input: " + input);
  const price = Number(productArr[currentProduct].preis);
  if (isNaN(input) || input==="") {
    alert(
      "Du kannst nur Zahlen eingeben.",
    );
    return;
  } else {
    if (price === input) {
      scoreForCurrentProduct = 100;
      currentScore += 100;
    } else {
      if (price * 2 <= input || input <= 0) {
        scoreForCurrentProduct = 0;
        currentScore += 0;
      } else {
        scoreForCurrentProduct = (1 - Math.abs(input - price) / price) * 100;
        currentScore += scoreForCurrentProduct;
      }
    }
    console.log(currentScore);
    priceReveal()
  }
}
function setScore() {
  document.form.Scoreanzeige.value = "Score: " + currentScore.toFixed(2);
  console.log("setScore: " + currentScore);
}

function setRound() {
  roundCount++;
  if (roundCount > 5) {
        window.gameOver = true;
    } else {
      document.form.Rundenazeige.value = "Runde: " + roundCount + "/5";
  }

}

function highScorePopup() {
  document.getElementById("newHighScoreDisplay").innerHTML =
    "Neuer Highscore: " + currentScore.toFixed(2) + "!";
  document.getElementById("popup").classList.remove("hidden");
}

function submitName() {
  const name = document.getElementById("playerName").value.trim();
  console.log("Name wird gesucht");
  if (name) {
    saveHighScore(name);
    document.getElementById("popup").classList.add("hidden");
    console.log("Name wurde gefunden");
    reset();
  } else {
    alert(
      "Gib einen Namen ein mit dem du auf dem Leaderboard erscheinen möchtest.",
    );
    setTimeout(submitName, 10000);
  }
}

function reset() {
  window.roundCount = 0;
  window.productsUsed = [];
  window.currentScore = 0;
  setRound();
  setScore();
}

window.loadNextItem = loadNextItem;
window.guess = guess;
window.submitName = submitName;
window.setRound = setRound;
window.calculateScore = calculateScore;
window.saveHighScore = saveHighScore;
window.getHighscores = getHighscores;

async function saveHighScore(name) {
  const highscore = currentScore;
  console.log(
    "In svaeHighscoresFunction angekommen Score: " +
      currentScore +
      highscore +
      " Name: " +
      name,
  );
  const { error } = await supabase
    .from("highscores")
    .insert({ name: name, score: Number(highscore) });

  if (error) console.error("Fehler beim Speichern:", error);
  else console.log("Score gespeichert!");

  await getHighscores();
}

async function getHighscores() {
    console.log("Getting Highscores!");

    const { data, error } = await supabase
        .from("highscores")
        .select("name, score")
        .order("score", { ascending: false })
        .range(0, 9);

    if (error) {
        console.error("Fehler beim Abrufen:", error);
        return;
    }

    console.log("Highscore-Daten:", data);

    if (!data || data.length === 0) {
        console.warn("Keine Daten gefunden!");
        return;
    }

    data.forEach((row, index) => {
        const platz = index + 1;
        const nameCell = document.getElementById("namePlatz" + platz);
        const scoreCell = document.getElementById("scorePlatz" + platz);

        if (nameCell && scoreCell) {
            nameCell.innerHTML = row.name ?? "Unbekannt";
            scoreCell.innerHTML = row.score ?? "-";
        } else {
            console.warn(`Elemente für Platz ${platz} nicht gefunden`);
        }
    });



}
