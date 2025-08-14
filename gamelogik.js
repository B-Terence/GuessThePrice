function productItems(beschreibung, preis, bild) {
   this.beschreibung = beschreibung;
   this.preis = preis;
   this.bild = bild;
}
var product1 = new productItems("neue verstellbare Baseballkappe mit Motiv beagles perfekt look -perfekt Cap Einheitsgröße·Sehr gut \n Einheitsgröße·Sehr gut", "12,99€", "Bild1");
var product2 = new productItems("Adidas 80er 80s Vintage Sweater Small Logo bestickt Blau M \n M·Sehr gut·adidas", "35,00€", "Bild2");
var product3 = new productItems("Dior B22\n" +
    "40·Sehr gut·Dior", "550,00€", "Bild3" );

const productArr = [product1, product2, product3];
const productsUsed = [];

var currentProduct = 0;

function guess (){
    var guess = document.form.preiseingabe.value;
    loadNextItem();
}

function pictureString (productItems) {
    return "<img src='Ressourcen/" + productItems.bild + ".webp'" +  " width='30%' style='margin: auto; padding-bottom: 10px; padding-top: 10px' />";
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
    document.getElementById("productImg").innerHTML = pictureString(productArr[currentProduct]);

    productsUsed.push(currentProduct);
}