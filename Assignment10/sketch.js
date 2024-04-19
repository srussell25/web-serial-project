
// let serial; // variable for the serial object
// let latestData = "waiting for data"; // variable to hold the data
// let buttonPressed;
// function setup() {
//   createCanvas(800, 800);
//   background('white');
//   // serial constructor
//   port = createSerial();
//   square(400,400);
//   fill('black')
// }
// connectButton = createButton("Connect");
// connectButton.mousePressed(connect);

// function connect(){
//   if(!port.opened()){
//     port.open(shawnArduino);
//   }
//   else{
//     port.close(shawnArduino);
//   }
// }

// // list the ports
// function gotList(thelist) {
//   console.log("List of Serial Ports:");

//   for (let i = 0; i < thelist.length; i++) {
//     console.log(i + " " + thelist[i]);
//   }
// }

// function changeToSquare(){
// switch(buttonState){
//   case HIGH:
//     drawSquare(); //have a function called drawSquare in Arduino
//   case LOW:
//     drawCircle(); //have a function called drawCircle in Arduino
//   break;
//   default:
//     console.log("Something went wrong, try again.");
// }

// }

// function gotOpen() {
//   console.log("Serial Port is Open");
// }

// function gotClose() {
//   console.log("Serial Port is Closed");
//   latestData = "Serial Port is Closed";
// }

// function gotError(theerror) {
//   console.log(theerror);
// }

// // when data is received in the serial buffer

// function gotData() {
//   let currentString = serial.readLine(); // store the data in a variable
//   trim(currentString); // get rid of whitespace
//   if (!currentString) return; // if there's nothing in there, ignore it
//   console.log(currentString); // print it out
//   latestData = currentString; // save it to the global variable
// }

// function draw() {
//   background(255, 255, 255);
//   fill(0, 0, 0);
//   text(latestData, 10, 10); // print the data to the sketch
  
//   if (latestData == 0) {
//     ellipse(width / 2, height / 2, 100, 100);
//   } else { // if it is pressed, we get a 1
//     rectMode(CENTER);
//     rect(width / 2, height / 2, 100, 100);
//   }
// }
let shapeType = 'square'; // Initial shape is a square
let ledState = false; // LED state
let connectButton;
let port;
let drawCircle = false;

function connect(){
    if(!port.opened()){
      port.open("Arduino", 9600);
    }
    else{
      port.close();
    }
  }
function setup() {
  createCanvas(800, 800);
  background(255);
  fill(0); // Black
  noStroke(); // Remove shape outline
  
  //Communication line with arduino
  port = createSerial();
  connectButton = createButton("Connect");
  connectButton.position(100,400);
  connectButton.mousePressed(connect);
  
  
  

  // When the canvas is clicked, toggle LED state and send data to Arduino
  mousePressed(port);
}

function draw() {
  background(255);
  // Draw the shape based on shapeType
  if(port.opened()){
    
    let str = port.readUntil("\n"); 
    console.log("Message received " + str);
    if(str === '0\r\n'){
      drawCircle = true;
    }
    else if(str === '1\r\n'){
      drawCircle = false;
    }
  }
  if(drawCircle) console.log(drawCircle);
  if (!drawCircle){
    rect(150, 150, 100, 100); // Draw black square
  } else{
    ellipse(200, 200, 100, 100); // Draw black circle
  }
}

function mousePressed() {
  // When the canvas is clicked, toggle LED state and send data to Arduino
  ledState = !ledState;
  if (ledState) {
    port.write("1\n");
    console.log("1");
  } else {
    port.write("0\n");
    console.log("0");
  }
}
