function productItems(beschreibung, preis, bild) {
   this.beschreibung = beschreibung;
   this.preis = preis;
   this.bild = bild;
}
var product1 = new productItems("neue verstellbare Baseballkappe mit Motiv beagles perfekt look -perfekt Cap Einheitsgröße·Sehr gut \n Einheitsgröße·Sehr gut", "12.99", "Bild1");
var product2 = new productItems("Adidas 80er 80s Vintage Sweater Small Logo bestickt Blau M \n M·Sehr gut·adidas", "35.00", "Bild2");
var product3 = new productItems("Dior B22\n" +
    "40·Sehr gut·Dior", "550.00", "Bild3" );

const productArr = [product1, product2, product3];
const productsUsed = [];

var currentProduct = 0;
var currentScore = 0.0;
var roundCount = 1;
var gameOver = false;

function guess (){
    var guess = document.form.preiseingabe.value;
    calculateScore();
    setRound();
    if(!gameOver){
    loadNextItem();}
    if(gameOver){
        alert("Final Score: " + currentScore);
    }
}

function pictureString (productItems) {
    return "<img src='Ressourcen/" + productItems.bild + ".webp'" +  " height='500vh' style='margin: auto; padding-bottom: 10px; padding-top: 10px' />";
}

function loadNextItem (){
    var unused = true;
    while (unused) {
        unused = false;
        currentProduct = Math.floor( Math.random() * productArr.length);
        for (var i = 0; i < productsUsed.length; i++) {
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
        alert("Du kannst nur eine Zahl eingeben. Für Kommazahlen benutzt man einen Punkt statt Komma '.'");
    }else{
        if(price === input) {
            currentScore += 100;
        }else{
            if(price*2 <= input) {
                currentScore += 0;
            }else{
                currentScore += input % price / price * 100;
            }
        }
    }
    document.form.Scoreanzeige.value = "Score: " + currentScore.toFixed(2);
}

function setRound(){
    document.form.Rundenazeige.value = "Runde: " + roundCount + "/5";
    roundCount++;
    if (roundCount > 5){
        gameOver = true;
    }
}