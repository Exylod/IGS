let font;
let cam;
let camX = -500;
let camY = 0;
let camZ = -1000;
let moveSpeed = 10;
let yaw = 0;
let pitch = 0;

CameraMovement();

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  colorMode(HSB, 360, 100, 100, 255);
  cam = createCamera();
  perspective(PI / 2.5, width / height, 3.8, 5000);
  move();
  // cam.setPosition(-100, -100, -1400);
  // cam.lookAt(0, 0, 0);
  // cam.setPosition(camX, camY, camZ);
  // cam.lookAt(-250, 0, 0);
  // console.log("Camera Position:", cam.eyeX, cam.eyeY, cam.eyeZ);
  cam.setPosition(camX, camY, camZ);
  cam.lookAt(
    camX + cos(yaw) * cos(pitch),
    camY + sin(pitch),
    camZ + sin(yaw) * cos(pitch)
  textFont(font);
  textSize(32);
}

function draw() {
  background(200, 50, 80);

  ambientLight(50);
  pointLight(255, 50, 150, 0, -300, 200);
  directionalLight(200, 200, 100, -1, -1, -1);

  orbitControl();

  drawFloor();

  // Draw buildings (x, y, z, w, d, h)
  drawBuilding(-400, 199, -410, 80, 120, 70, [360, 96, 88]); // Mensa
  drawBuilding(-420, 199, -410, 80, 120, 40, [360, 96, 88]); // Mensa low
  drawBuilding(-440, 199, -280, 120, 180, 80); // Jahrgang 5-7 Mittag
  drawBuilding(-510, 199, -280, 120, 180, 70); // Jahrgang 5-7 Mittag low
  drawBuilding(-390, 199, -205, 140, 200, 70); // Jahrgang 5-7
  drawBuilding(-420, 199, 0, 120, 160, 70); // Fachräume
  drawBuilding(-200, 199, 70, 170, 170, 70); // Jahrgang 8-10
  drawBuilding(-65, 199, 20, 100, 75, 50); // Jahrgang 8-10 Eingang
  drawBuilding(-100, 199, 180, 170, 250, 70, null); // Jahrgang 8-10 Drogen
  drawBuilding(-60, 199, 440, 300, 200, 100);   // Oberstufe
  drawBuilding(200, 199, 0, 250, 150, 80);  // Sporthalle
  // drawBuilding(-450, 199, 0, 100, 100, 20); // Schulgarten

  // draw3DText("IGS3D Project", 200, -100, 100, [0, 255, 0]);
}

function drawFloor() {
  push();
  fill(120, 40, 70);
  noStroke();
  translate(0, 200, 0);
  rotateX(HALF_PI);
  plane(1500, 1200);
  pop();
}

function drawBuilding(x, y, z, w, d, h, color) {
  if (!Array.isArray(color) || color.length !== 3) {
    color = [165, 1, 43];
  }
  push();
  fill(color[0], color[1], color[2]);
  noStroke();
  translate(x, y - h / 2, z);
  box(w, h, d);
  pop();
}

function preload() {
  font = loadFont('https://cdnjs.cloudflare.com/ajax/libs/topcoat/0.8.0/font/SourceCodePro-Bold.otf');
}

function draw3DText(txt, x, y, z, color) {
  push();
  fill(color[0], color[1], color[2]);
  translate(x, y, z);
  rotateY(PI / 4);
  text(txt, 0, 0);
  pop();
}

// function CameraMovement() {
// if (keyIsPressed === true) {
//     // Move horizontally.
//     if (keyCode === LEFT_ARROW) {
//       cam.move(-1, 0, 0);
//     }
//     if (keyCode === RIGHT_ARROW) {
//       cam.move(1, 0, 0);
//     }
//
//     // Move vertically.
//     if (keyCode === UP_ARROW) {
//       cam.move(0, -1, 0);
//     }
//     if (keyCode === DOWN_ARROW) {
//       cam.move(0, 1, 0);
//     }
//
//     // Move in/out of the screen.
//     if (key === 'i') {
//       cam.move(0, 0, -1);
//     }
//     if (key === 'o') {
//       cam.move(0, 0, 1);
//     }
//     }
// }


function move() {
  let forward = createVector(cos(yaw), 0, sin(yaw));
  let right = createVector(-sin(yaw), 0, cos(yaw));
  
  // W and S move forward and backward
  if (keyIsDown(87)) { // W key
    camX += forward.x * moveSpeed;
    camZ += forward.z * moveSpeed;
  }
  if (keyIsDown(83)) { // S key
    camX -= forward.x * moveSpeed;
    camZ -= forward.z * moveSpeed;
  }
  // A and D strafe left and right
  if (keyIsDown(65)) { // A key
    camX -= right.x * moveSpeed;
    camZ -= right.z * moveSpeed;
  }
  if (keyIsDown(68)) { // D key
    camX += right.x * moveSpeed;
    camZ += right.z * moveSpeed;
  }
  // Space and Shift for up/down movement
  if (keyIsDown(32)) { // Space key
    camY -= moveSpeed;
  }
  if (keyIsDown(16)) { // Shift key
    camY += moveSpeed;
  }
  
  // P key to log position
  if (keyIsDown(80)) { // P key
    console.log("Camera position:", camX, camY, camZ);
    console.log("Camera rotation:", yaw, pitch);
  }
}

function updateRotation(e) {
  if (document.pointerLockElement) {
    yaw += e.movementX * 0.002;
    pitch -= e.movementY * 0.002;
    pitch = constrain(pitch, -PI/2, PI/2);
  }
}
