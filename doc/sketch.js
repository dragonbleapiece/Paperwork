var slider;
var checkboxCarre;
var checkboxRond;
var checkboxTriangle;
var w;
var columns;
var rows;
var variable = 1;


function setup() {
  let canvas = createCanvas(600, 600);
  canvas.position(800, 50);

  tailleGrille(40);
  columns = floor(width/w);
  rows = floor(height/w);

  //MARKOV REPARTITION
  let textMarkovRepartition = createDiv('REPARTITION MARKOVIENNE DES RAYURES :');
  textMarkovRepartition.position(20,170);

  let textProbaHorizontales = createDiv('Horizontales');
  textProbaHorizontales.position(135,205);

  let textProbaVerticales = createDiv('Verticales');
  textProbaVerticales.position(295,205);

  let textProbaObliques = createDiv('Obliques Gauches');
  textProbaObliques.position(420, 205);

  let textProbaObliquesD = createDiv('Obliques Droites');
  textProbaObliquesD.position(570, 205);

    //HORIZONTALES
  let textMarkovHorizontales = createDiv('Horizontales : ');
  textMarkovHorizontales.position(20,230);

  sliderMarkovRepartitionHorizontales = createSlider(0, 100, 50, 10);
  sliderMarkovRepartitionHorizontales.position(120, 230);
  sliderMarkovRepartitionHorizontales.style('width', '100px');

  sliderMarkovRepartitionHorizontales2 = createSlider(00, 100, 50, 10);
  sliderMarkovRepartitionHorizontales2.position(270, 230);
  sliderMarkovRepartitionHorizontales2.style('width', '100px');
  
  sliderMarkovRepartitionHorizontales3 = createSlider(00, 100, 50, 10);
  sliderMarkovRepartitionHorizontales3.position(420, 230);
  sliderMarkovRepartitionHorizontales3.style('width', '100px');

  sliderMarkovRepartitionHorizontales4 = createSlider(00, 100, 50, 10);
  sliderMarkovRepartitionHorizontales4.position(570, 230);
  sliderMarkovRepartitionHorizontales4.style('width', '100px');

    //VERTICALES
  let textMarkovVerticales = createDiv('Verticales : ');
  textMarkovVerticales.position(20,280);

  sliderMarkovRepartitionVerticales = createSlider(0, 100, 50, 10);
  sliderMarkovRepartitionVerticales.position(120, 280);
  sliderMarkovRepartitionVerticales.style('width', '100px');

  sliderMarkovRepartitionVerticales2 = createSlider(00, 100, 50, 10);
  sliderMarkovRepartitionVerticales2.position(270, 280);
  sliderMarkovRepartitionVerticales2.style('width', '100px');

  sliderMarkovRepartitionVerticales3 = createSlider(00, 100, 50, 10);
  sliderMarkovRepartitionVerticales3.position(420, 280);
  sliderMarkovRepartitionVerticales3.style('width', '100px');

  sliderMarkovRepartitionVerticales4 = createSlider(00, 100, 50, 10);
  sliderMarkovRepartitionVerticales4.position(570, 280);
  sliderMarkovRepartitionVerticales4.style('width', '100px');

    //OBLIQUES GAUCHES
  let textMarkovObliques = createDiv('Obliques ');
  textMarkovObliques.position(20,315);

  let textMarkovGauche = createDiv('Gauches : ');
  textMarkovGauche.position(20,335);

  sliderMarkovRepartitionObliquesGauches = createSlider(0, 100, 50, 10);
  sliderMarkovRepartitionObliquesGauches.position(120, 330);
  sliderMarkovRepartitionObliquesGauches.style('width', '100px');

  sliderMarkovRepartitionObliquesGauches2 = createSlider(00, 100, 50, 10);
  sliderMarkovRepartitionObliquesGauches2.position(270, 330);
  sliderMarkovRepartitionObliquesGauches2.style('width', '100px');

  sliderMarkovRepartitionObliquesGauches3 = createSlider(00, 100, 50, 10);
  sliderMarkovRepartitionObliquesGauches3.position(420, 330);
  sliderMarkovRepartitionObliquesGauches3.style('width', '100px');

  sliderMarkovRepartitionObliquesGauches4 = createSlider(00, 100, 50, 10);
  sliderMarkovRepartitionObliquesGauches4.position(570, 330);
  sliderMarkovRepartitionObliquesGauches4.style('width', '100px');

    //OBLIQUES DROITES
  let textMarkovObliques2 = createDiv('Obliques ');
  textMarkovObliques2.position(20,365);

  let textMarkovDroite = createDiv('Droites : ');
  textMarkovDroite.position(20,385);

  sliderMarkovRepartitionObliquesDroites = createSlider(0, 100, 50, 10);
  sliderMarkovRepartitionObliquesDroites.position(120, 380);
  sliderMarkovRepartitionObliquesDroites.style('width', '100px');

  sliderMarkovRepartitionObliquesDroites2 = createSlider(00, 100, 50, 10);
  sliderMarkovRepartitionObliquesDroites2.position(270, 380);
  sliderMarkovRepartitionObliquesDroites2.style('width', '100px');

  sliderMarkovRepartitionObliquesDroites3 = createSlider(00, 100, 50, 10);
  sliderMarkovRepartitionObliquesDroites3.position(420, 380);
  sliderMarkovRepartitionObliquesDroites3.style('width', '100px');

  sliderMarkovRepartitionObliquesDroites4 = createSlider(00, 100, 50, 10);
  sliderMarkovRepartitionObliquesDroites4.position(570, 380);
  sliderMarkovRepartitionObliquesDroites4.style('width', '100px');

  //GRILLE
  let textGrille = createDiv('TAILLE DE LA GRILLE : ');
  textGrille.position(20, 450);

  sliderGrille = createSlider(20, 120, 40, 20);
  sliderGrille.position(180, 450);
  sliderGrille.style('width', '100px');
  
  //BACKGROUND
  let textBackground = createDiv('BACKGROUND :');
  textBackground.position(20, 500);

  sliderBackground = createSlider(0, 255, 0, 255);
  sliderBackground.position(135, 500);
  sliderBackground.style('width', '100px');

  //DENSITE
  let textCouleur = createDiv('DENSITE :');
  textCouleur.position(20, 550);

  sliderCouleur = createSlider(0, 100, 100, 0);
  sliderCouleur.position(100, 550);
  sliderCouleur.style('width', '100px');

  //VITESSE
  let textVitesse = createDiv('VITESSE :');
  textVitesse.position(20, 600);

  sliderVitesse = createSlider(0.1, 3, 1, 0);
  sliderVitesse.position(100, 600);
  sliderVitesse.style('width', '100px');  
}


function draw() {

  var probaHorizontales1 = sliderMarkovRepartitionHorizontales.value();
  var probaHorizontales2 = sliderMarkovRepartitionHorizontales2.value();
  var probaHorizontales3 = sliderMarkovRepartitionHorizontales3.value();
  var probaHorizontales4 = sliderMarkovRepartitionHorizontales4.value();

  var proba1 = probaHorizontales1/(probaHorizontales1 + probaHorizontales2 + probaHorizontales3 + probaHorizontales4);
  var proba2 = probaHorizontales2/(probaHorizontales1 + probaHorizontales2 + probaHorizontales3 + probaHorizontales4);
  var proba3 = probaHorizontales3/(probaHorizontales1 + probaHorizontales2 + probaHorizontales3 + probaHorizontales4);
  var proba4 = probaHorizontales4/(probaHorizontales1 + probaHorizontales2 + probaHorizontales3 + probaHorizontales4);


  var probaVerticales1 = sliderMarkovRepartitionVerticales.value();
  var probaVerticales2 = sliderMarkovRepartitionVerticales2.value();
  var probaVerticales3 = sliderMarkovRepartitionVerticales3.value();
  var probaVerticales4 = sliderMarkovRepartitionVerticales4.value();

  var proba5 = probaVerticales1/(probaVerticales1 + probaVerticales2 + probaVerticales3 + probaVerticales4);
  var proba6 = probaVerticales2/(probaVerticales1 + probaVerticales2 + probaVerticales3 + probaVerticales4);
  var proba7 = probaVerticales3/(probaVerticales1 + probaVerticales2 + probaVerticales3 + probaVerticales4);
  var proba8 = probaVerticales4/(probaVerticales1 + probaVerticales2 + probaVerticales3 + probaVerticales4);


  var probaObliquesG1 = sliderMarkovRepartitionObliquesGauches.value();
  var probaObliquesG2 = sliderMarkovRepartitionObliquesGauches2.value();
  var probaObliquesG3 = sliderMarkovRepartitionObliquesGauches3.value();
  var probaObliquesG4 = sliderMarkovRepartitionObliquesGauches4.value();

  var proba9 =  probaObliquesG1/(probaObliquesG1 + probaObliquesG2 + probaObliquesG3 + probaObliquesG4);
  var proba10 = probaObliquesG2/(probaObliquesG1 + probaObliquesG2 + probaObliquesG3 + probaObliquesG4);
  var proba11 = probaObliquesG3/(probaObliquesG1 + probaObliquesG2 + probaObliquesG3 + probaObliquesG4);
  var proba12 = probaObliquesG4/(probaObliquesG1 + probaObliquesG2 + probaObliquesG3 + probaObliquesG4);

  var probaObliquesD1 = sliderMarkovRepartitionObliquesDroites.value();
  var probaObliquesD2 = sliderMarkovRepartitionObliquesDroites2.value();
  var probaObliquesD3 = sliderMarkovRepartitionObliquesDroites3.value();
  var probaObliquesD4 = sliderMarkovRepartitionObliquesDroites4.value();

  var proba13 = probaObliquesD1/(probaObliquesD1 + probaObliquesD2 + probaObliquesD3 + probaObliquesD4);
  var proba14 = probaObliquesD2/(probaObliquesD1 + probaObliquesD2 + probaObliquesD3 + probaObliquesD4);
  var proba15 = probaObliquesD3/(probaObliquesD1 + probaObliquesD2 + probaObliquesD3 + probaObliquesD4);
  var proba16 = probaObliquesD4/(probaObliquesD1 + probaObliquesD2 + probaObliquesD3 + probaObliquesD4);

  var total = [proba1, proba2, proba3, proba4, proba5, proba6, proba7, proba8, proba9, proba10, proba11, proba12, proba13, proba14, proba15, proba16];

  var val = sliderGrille.value();
  tailleGrille(val);

  var test = sliderBackground.value();
  background(test);

  var slidercouleur = sliderCouleur.value();

  var vitesse = sliderVitesse.value();

  frameRate(vitesse);

  columns = floor(width/w);
  rows = floor(height/w);

  /*for ( var i = 0; i < width; i+=w) {
    for (var j = 0; j < height ; j+=w){
      //fill(couleur(slidercouleur));
      //line(i, 0, i, height);
      //line(0, j, width, j);
      //lignesObliquesGauches(w, 80, 80, 10);
      //lignesObliquesDroites(w, 160, 80, 10);
      //lignesVerticales(w, 160, 160, 10);
      //lignesHorizontales(w, 80, 160, 10);
      stroke(couleur(slidercouleur));
      markovLignes(variable, i, j, w, 10, total);
    }
  }*/

  //MODE DE REPARTITION 1 OK
  /*for (var j = 0; j < height ; j+=w){
    for (var i = 0; i < width; i+=w) {
      stroke(couleur(slidercouleur));
      markovLignes(variable, i, j, w, 10, total);
    }
  }*/

  //MODE DE REPARTITION 2 OK
  /*for (var i = 0; i < width; i+=w) {
    for (var j = 0; j < height ; j+=w){
      stroke(couleur(slidercouleur));
      markovLignes(variable, i, j, w, 10, total);
    }
  }*/

  //MODE DE REPARTITION 3 OK
  /*for (var compteur = 0; compteur < columns; compteur++){
    for (var i = 0; i <= compteur; i++) {
      stroke(couleur(slidercouleur));
      markovLignes(variable, i*val, (compteur-i)*val, w, 10, total);
    }
  }
  for (var compteur = columns-1; compteur > 0; compteur--){
    var i = columns-compteur;
    var j = height-val;
    while (i < columns) {
      stroke(couleur(slidercouleur));
      markovLignes(variable, i*val, j, w, 10, total);
      i+=1;
      j-=val;
    }
  }*/

  //MODE DE REPARTITION 4 OK
  /*for (var compteur = 0; compteur < columns; compteur++){
    var i = width-val;
    var j = compteur*val;
    while(j >= 0){
      stroke(couleur(slidercouleur));
      markovLignes(variable, i, j, w, 10, total);
      i-=val;
      j-=val;
    }
  }

  for (var compteur = columns-1; compteur > 0; compteur--){
    var i = compteur*val-val;
    j = height-val;
    while (i >= 0) {
      stroke(couleur(slidercouleur));
      markovLignes(variable, i, j, w, 10, total);
      i-=val;
      j-=val;
    }
  }*/

  //MODE DE REPARTITION 5 OK
  /*for (var compteur = 0; compteur <= columns; compteur++){
    for (var i = 0; i <= compteur*val; i+=val){
      stroke(couleur(slidercouleur));
      markovLignes(variable, i, compteur*val, w, 10, total);
    }
    for (var j = compteur*val-val; j >= 0; j-=val){
      stroke(couleur(slidercouleur));
      markovLignes(variable, compteur*val, j, w, 10, total);
    }
  }*/


 //MODE DE REPARTITION 6 OK
  var a = columns/2*val;
  var b = rows/2*val-1;
  var side = 0;
  var move = val;
  //fill(couleur(slidercouleur));
  //markovFormes(variable, a, b, w, taille, total);
  stroke(couleur(slidercouleur));
  markovLignes(variable, a, b, w, 10, total);

    
  while (side <= width/2) { 
    move = -1 * move;
    for (i = 0; i<side; i++) {
      a += move;
      //fill(couleur(slidercouleur));
      //markovFormes(variable, a, b, w, taille, total);
      stroke(couleur(slidercouleur));
      markovLignes(variable, a, b, w, 10, total);
    }
    for (i = 0; i<side; i++) {
      b += move;
      //fill(couleur(slidercouleur));
      //markovFormes(variable, a, b, w, taille, total);
      stroke(couleur(slidercouleur));
      markovLignes(variable, a, b, w, 10, total);
    }
    side = side + 1;
  }

}

function lignesObliquesDroites(taille, posi, posj, densite){
  i = posi + taille;
  j = posj + taille;
  while(j >=posj){
    line(posi, j, i, posj);
    i -= densite;
    j -= densite;
  }

  i2 = posi;
  j2 = posj;
  while(j2 <= posj + taille){
    line(i2, posj+taille, posi + taille, j2);
    i2 += densite;
    j2 += densite;
  }
}


function lignesObliquesGauches(taille, posi, posj, densite){
  i = posi;
  j = posj + taille;
  while(i <= posi + taille){
    line(i, posj, posi+taille, j);
    i += densite;
    j -= densite;
  }

  i2 = posi + taille;
  j2 = posj;
  while(j2 <= posj + taille){
    line(posi, j2, i2, posj+taille);
    i2 -= densite;
    j2 += densite;
  }
}

function lignesVerticales(taille, posi, posj, densite){
  for ( var i = posi; i <= posi+taille; i+=densite/2) {
    for (var j = posj; j <= posj+taille ; j+=densite/2){
      line(i, posj, i, posj + taille);
    }
  }
}

function lignesHorizontales(taille, posi, posj, densite){
  for ( var i = posi; i <= posi+taille; i+=densite/2) {
    for (var j = posj; j <= posj+taille ; j+=densite/2){
      line(posi, j, posi + taille, j);
    }
  }
}


function carreCheckEvent() {
  if (this.checked()) {
    checkboxCarre = 1;
  } else {
    checkboxCarre = 0;
  }
}


function couleur(x){
  proba = random(0,100);
  if(proba < x){
    return 255;
  }
  else {
    return 0;
  }
}

function taille(x){
  return x;
}

function tailleGrille(x){
  w = x;
}

function markovTaille(x){
  p = random();

  if(p < x){
    return w/2;
  }
  else {
    return w;
  }
}

function markovLignes(k, posi, posj, x, densite, tabProba){

  p = random();

  if(k == 1){
    if(p < tabProba[0]){
      variable = 1;
      return lignesHorizontales(x, posi, posj, densite);
    }

    if(tabProba[0] <= p && p < tabProba[0] + tabProba[1]){
      variable = 2;   
      return lignesVerticales(x, posi, posj, densite);
    }

    if(tabProba[0] + tabProba[1] <= p && p < tabProba[0] + tabProba[1] + tabProba[2]){
      variable = 3;
      return lignesObliquesGauches(x, posi, posj, densite);
    }

    if(1 - tabProba[3] <= p){
      variable = 4;
      return lignesObliquesDroites(x, posi, posj, densite);
    }
  }

  if(k == 2){
    if(p < tabProba[4]){
      variable = 1;
      return lignesHorizontales(x, posi, posj, densite);
    }

    if(tabProba[4] <= p && p < tabProba[4] + tabProba[5]){
      variable = 2;   
      return lignesVerticales(x, posi, posj, densite);
    }

    if(tabProba[4] + tabProba[5] <= p && p < tabProba[4] + tabProba[5] + tabProba[6]){
      variable = 3;
      return lignesObliquesGauches(x, posi, posj, densite);
    }

    if(1 - tabProba[7] <= p){
      variable = 4;
      return lignesObliquesDroites(x, posi, posj, densite);
    }
  }

  if(k == 3){
    if(p < tabProba[8]){
      variable = 1;
      return lignesHorizontales(x, posi, posj, densite);
    }

    if(tabProba[8] <= p && p < tabProba[8] + tabProba[9]){
      variable = 2;   
      return lignesVerticales(x, posi, posj, densite);
    }

    if(tabProba[8] + tabProba[9] <= p && p < tabProba[8] + tabProba[9] + tabProba[10]){
      variable = 3;
      return lignesObliquesGauches(x, posi, posj, densite);
    }

    if(1 - tabProba[11] <= p){
      variable = 4;
      return lignesObliquesDroites(x, posi, posj, densite);
    }
  }

  if(k == 4){
    if(p < tabProba[12]){
      variable = 1;
      return lignesHorizontales(x, posi, posj, densite);
    }

    if(tabProba[12] <= p && p < tabProba[12] + tabProba[13]){
      variable = 2;   
      return lignesVerticales(x, posi, posj, densite);
    }

    if(tabProba[12] + tabProba[13] <= p && p < tabProba[12] + tabProba[13] + tabProba[14]){
      variable = 3;
      return lignesObliquesGauches(x, posi, posj, densite);
    }

    if(1 - tabProba[15] <= p){
      variable = 4;
      return lignesObliquesDroites(x, posi, posj, densite);
    }
  }
  
}


function polygon(x, y, radius, npoints) {
  var angle = TWO_PI / npoints;
  beginShape();
  for (var a = 0; a < TWO_PI; a += angle) {
    var sx = x + cos(a) * radius;
    var sy = y + sin(a) * radius;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}