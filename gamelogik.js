//import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

function productItem(beschreibung, preis, bild) {
   this.beschreibung = beschreibung;
   this.preis = preis;
   this.bild = bild;
}
window.product1 = new productItem("neue verstellbare Baseballkappe mit Motiv beagles perfekt look -perfekt Cap Einheitsgröße·Sehr gut \n Einheitsgröße·Sehr gut", "12.99", "Bild1");
window.product2 = new productItem("Adidas 80er 80s Vintage Sweater Small Logo bestickt Blau M \n M·Sehr gut·adidas", "35.00", "Bild2");
window.product3 = new productItem("Dior B22\n" + "40·Sehr gut·Dior", "550.00", "Bild3" );
window.product4 = new productItem("Dicker strickcardigan\n" + "S / 36 / 8·Sehr gut·H&M", "3.00", "Bild4");
window.product5 = new productItem("Bierkönig T-Shirt\n" + "XL·Sehr gut·Bierkönig", "4.00", "Bild5");
window.product6 = new productItem("Black denim jacket\n" + "L·Sehr gut·H&M", "6.00", "Bild6");

window.productArr = [product1, product2, product3, product4, product5, product6];
window.productsUsed = [];

window.currentProduct = 0;
window.currentScore = 0.0;
window.roundCount = 1;
window.gameOver = false;


/*const SUPABASE_URL = "https://qgvyyrdiyfxowxdeiezj.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFndnl5cmRpeWZ4b3d4ZGVpZXpqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU1Mjk4NTgsImV4cCI6MjA3MTEwNTg1OH0.QTTpUMRXXXHnATuLFEQKFsrkMR_eY5dN1wL9s30Jnko";
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
*/
function guess (){
 //   let guess = document.form.preiseingabe.value;
    calculateScore();
    setRound();
    if(!gameOver){
    loadNextItem();}
    if(gameOver){
        highScorePopup();

    }
}

function pictureString (productItems) {
    return "<img src='Ressourcen/" + productItems.bild + ".webp'" +  " height='500vh' style='margin: auto; padding-bottom: 10px; padding-top: 10px' />";
}

function loadNextItem (){
    let unused = true;
    while (unused) {
        unused = false;
        window.currentProduct = Math.floor(Math.random() * productArr.length);
        for (let i = 0; i < productsUsed.length; i++) {
            if (currentProduct === productsUsed[i]) {
                unused = true;
            }
        }
    }
    document.getElementById("productImgDiv").innerHTML = pictureString(productArr[currentProduct]);

    productsUsed.push(currentProduct);

    document.getElementById("productDescriptionDiv").innerHTML = productArr[currentProduct].beschreibung;
}

function calculateScore() {
    const input = parseFloat(document.form.preiseingabe.value);
    const price = Number(productArr[currentProduct].preis);
    if (isNaN(input)) {
        alert("Du kannst nur eine Zahl eingeben. Für Kommazahlen benutzt man einen Punkt statt Komma. (Bsp.: 9.99)");
    }else{
        if(price === input) {
            window.currentScore += 100;
        }else{
            if(price*2 <= input) {
                window.currentScore += 0;
            }else{
                window.currentScore += input % price / price * 100;
            }
        }
    }
    document.form.Scoreanzeige.value = "Score: " + currentScore.toFixed(2);
}

function setRound(){
    document.form.Rundenazeige.value = "Runde: " + roundCount + "/5";
    roundCount++;
    if (roundCount > 5){
        window.gameOver = true;
    }
}

function highScorePopup(){
    document.getElementById("newHighScoreDisplay").innerHTML = "Neuer Highscore: " + currentScore.toFixed(2) + "!";
    document.getElementById("popup").classList.remove("hidden");
}

function submitName() {
   if (name) {
        saveHighScore(name);
        document.getElementById("popup").classList.add("hidden");
    }else {
        alert("Gib einen Namen ein mit dem du auf dem Leaderboard erscheinen möchtest.")
        setTimeout(submitName, 30000);
        submitName();
    }
}

window.loadNextItem = loadNextItem;
window.guess = guess;
window.submitName = submitName;
window.setRound = setRound;
window.submitName = submitName;
window.calculateScore = calculateScore;

/*
async function saveHighScore(name, place) {
    const { error } = await supabase
        .from("Highscores")
        .insertRow(place [{ name, currentScore }]);
    if (error) console.error("Fehler beim Speichern:", error);
    else console.log("Score gespeichert!");
    await getHighscores();
}

async function getHighscores(){
    const { data, error } = await supabase
        .from("scores")
        .select("*")
        .order("score", { ascending: false })
        .range(0, 9);

    data.forEach((row, index) => {
        document.getElementById("namePlatz" + '$index').innerHTML = `${index}.${row.name}`;
    })
}

 */