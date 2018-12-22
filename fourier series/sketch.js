var angleSlider, nSlider;

var numOfTimes = 15;
var yValues = [];
var yMains = [];

var colors = [];

function setup() {
  createCanvas(900, 400);
  frameRate(60);
  angleSlider = createSlider(0, 100, 8);
  angleSlider.position(20, 20);
  nSlider = createSlider(0, 40, 2);
}

var y = 0;
var angle = 0;

function draw() {//loop infinito per disegnare
  background(0);

  var i = -1;

  numOfTimes = nSlider.value();

  translate(190, 180);
  var wholeSumX = 0;
  var wholeSumY = 0;

  var creaSerie = function(rPrec, xPrec, yPrec, nMax){
    i++;
    var color = 155;
    //var disp = i+1;
    //var newR = 90 * (2 / (-disp * PI));
    //per formula 4sin*(2i+1)*(angolo)/(2i+1)*PI:
    var disp = 2 * i + 1;
    var newR = 50 * (4 / (disp * PI));
    var newX = newR * cos(disp * angle);
    var newY = newR * sin(disp * angle);
    noFill();
    stroke(color);
    if (i == numOfTimes){
      stroke(0,color,0);
   }
    ellipse(wholeSumX, wholeSumY, newR * 2);

    if (i == numOfTimes){
      yValues.unshift(wholeSumY+newY);
    }else if (i == 0){
      yMains.unshift(wholeSumY+newY);
    }
    fill(color);
    ellipse(wholeSumX+newX, wholeSumY+newY, 4/((i+1)));
    line(wholeSumX+newX, wholeSumY+newY, wholeSumX, wholeSumY);
    if (i == 0 || i == numOfTimes){
      fill(color);
      stroke(color);
      if (i == numOfTimes){
      fill(0,color,0);
      stroke(0,color,0);}
      ellipse(190, wholeSumY+newY, 5);
      line(wholeSumX+newX, wholeSumY+newY, 190, wholeSumY+newY);
    }

    //creo le linee::
    noFill()
    beginShape();
    stroke(0,color,0);
    var limit = width + 1100;
    var maxForLoop = yValues.length;
    if (yValues.length > limit){
      maxForLoop = limit;
    }

    for (let n = 0; n <= maxForLoop; n++) {
        vertex(190 + n, yValues[n]);
    }
    endShape();

  //per main
    noFill()
    beginShape();
    stroke(255);
    ///////
    for (let n = 0; n <= maxForLoop; n++) {
        vertex(190 + n, yMains[n]);
    }
    endShape();

    wholeSumX += newX
    wholeSumY += newY

    if (i >= numOfTimes){
      return;
    }else{
      creaSerie(newR, newX, newY, numOfTimes);
    }
  }

  creaSerie(0, 0, 0, numOfTimes);

  angle -= angleSlider.value()/1000;

  text("frequenza (incremento angolare): " + ((angleSlider.value()/1000)*57.3)*60 + " gradi al secondo", -113, -130);
  //point(150,0);
  //noLoop();
}

/*
noFill()
beginShape();
stroke(color);
var limit = width + 1100 * 4
var maxForLoop = yValues.length;
if (yValues.length > limit){
  maxForLoop = limit;
}
///////
var xAD = 0;
for (let n = 0; n <= maxForLoop; n++) {
  if (n % ((numOfTimes)) == 0){
    xAD ++;
    vertex(150 + xAD, yValues[n]);
  }
}
endShape();
*/
