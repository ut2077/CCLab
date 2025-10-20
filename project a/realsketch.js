let w = 1;
let sp = 0.002;
let sp2 = 0.003;
let color1, color2, color3;
let targetColor1, targetColor2, targetColor3;

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");
  colorMode(HSB, 255);
  color1 = color(random(255), 200, 200);
  color2 = color(random(255), 200, 200);
  color3 = color(random(255), random(255), 200);
  targetColor1 = color1;
  targetColor2 = color2;
  targetColor3 = color3;
}

function draw() {
  bg();
  planets();
  if (mouseIsPressed) {
    glowWaves();
  }
  color1 = lerpColor(color1, targetColor1, 0.15);
  color2 = lerpColor(color2, targetColor2, 0.15);
  color3 = lerpColor(color3, targetColor3, 0.15);
}

function bg() {
  let baseHue = map(sin(frameCount * 0.01), -1, 1, 180, 240);
  background(baseHue, 150, 80);
  for (let x = 0; x < width; x += w) {
    noStroke();
    let h = map(sin(frameCount * 0.05), -1, 1, 200, 220);
    fill(h, 150, 50);
    rect(x, 0, w, height);
  }

  for (let i = 0; i < width; i += 25) {
    for (let j = 0; j < height; j += 25) {
      let nx = noise(i * 0.01, j * 0.01, frameCount * 0.005);
      let ny = noise(i * 0.01 + 50, j * 0.01 + 50, frameCount * 0.005);
      let x = i + map(nx, 0, 1, -5, 5);
      let y = j + map(ny, 0, 1, -5, 5);

      let twinkle = noise(i * 0.02, j * 0.02, frameCount * 0.1);
      if (twinkle > 0.5) {
        stroke(255, map(twinkle, 0.5, 1, 200, 255));
        strokeWeight(map(twinkle, 0.5, 1, 1, 2));
        point(x, y)
      }
      // if (noise(i * j) < 0.5) {
      //   noFill();
      //   let op = map(sin(frameCount * 0.4 + j * i), -1, 1, 0, 255);
      //   stroke(255, op);
      //   rect(i, j, 1);
      // }
    }
  }
  noStroke();
  for (let i = 0; i < width; i += 10) {
    let n = noise(i * 0.01, frameCount * 0.01);
    let h = map(n, 0, 1, 200, 255);
    fill(h, 100, 100, 10);
    rect(i, 0, 10, height);
  }
}

function glowWaves() {
  push();
  translate(width / 2, height / 2);
  noFill();
  stroke(0, 0, 255, 150);
  strokeWeight(2);
  for (let r = 0; r < 300; r += 20) {
    let offset = sin(frameCount * 0.15 + r * 0.2) * 30;
    circle(0, 0, r + offset);
  }
  pop();
}

function drawPlanet(px, py, col, size){
  fill(col);
  noStroke();
  if(mouseX < width/3){
    circle(px, py, size);
  }else if(mouseX < 2*width/3){
    rectMode(CENTER);
    rect(px, py, size, size);
  }else{
    triangle(px-size/2, py+size/2, px, py-size/2, px+size/2, py+size/2);
  }
}

function planets() {
  // Mother planet
  push();
  translate(width / 2, height / 2);
  // detect if mouse is inside the main planet
  let d = dist(mouseX, mouseY, width / 2, height / 2);
  let isClicked = mouseIsPressed && d < 50; // 50 = radius of main planet
  // 6 arms
  if (isClicked) {
    rotate(frameCount * 0.2);
  } else {
    rotate(map(sin(frameCount * 0.05), -1, 1, PI / 4, -PI / 4));
  }
  let lineLength = 100;
  for (let arm = 0; arm < 6; arm++) {
    push();
    rotate((TWO_PI / 6) * arm);
    beginShape();
    noFill();
    stroke(255);
    for (let g = -lineLength; g <= lineLength; g += lineLength / 10) {
      strokeWeight(10);
      let v = 10 * sin(frameCount * 0.1 - g + arm);
      vertex(g, v);
    }
    endShape();
    pop();
  }
  //circles surrounding face
  noStroke();
  for (let angle = 0; angle < 2 * PI; angle += PI / 5) {
    push();
    rotate(angle);
    if (isClicked) {
      fill(255, 183, 206);
    } else {
      fill(40, 255, 255);
    }
    circle(100 / 2 - 8, 0, 30);
    pop();
  }
  //main body
  if (isClicked) {
    fill(255, 183, 206);
  } else {
    fill(40, 255, 255);
  }
  noStroke();
  circle(0, 0, 100);
  //eye movement
  let nudX = map(mouseX, 0, width, -5, 5);
  nudX = constrain(nudX, -5, 5);
  let nudY = map(mouseY, 0, height, -5, 5);
  nudY = constrain(nudY, -5, 5);

  //eyes
  fill(255);
  circle(-30, 0, 20);
  circle(30, 0, 20);

  //pupils
  fill(0);
  circle(-30 + nudX, nudY, 10);
  circle(30 + nudX, nudY, 10);

  //mouth
  fill(0);
  if (isClicked) {
    circle(0, 20, 15); //shock:OO
  } else {
    arc(0, 0, 30, 30, 0, PI); //smile hehee
  }
  pop();

  let orbitStretchX = map(mouseX, 0, width, 0.5, 2);
  let orbitStretchY = map(mouseY, 0, height, 0.5, 2);
  let orbitOffset = map(mouseX, 0, width, 0, TWO_PI);
  //Planet 1
  let px1 = width / 2 + 100 * orbitStretchX * cos(frameCount * 0.005 + orbitOffset);
  let py1 = height / 2 + 100 * orbitStretchY * sin(frameCount * 0.001 + orbitOffset);
  drawPlanet(px1, py1, color1, map(sin(frameCount*0.15), -1, 1, 10, 50));
  // fill(color1);
  // let size = map(sin(frameCount * 0.15), -1, 1, 10, 50);
  // circle(px1, py1, size);

  //Planet 2
  sp = lerp(sp, map(mouseX, 0, width, 0.005, 0.03), 0.01);
  sp2 = lerp(sp2, map(mouseX, 0, width, 0.005, 0.04), 0.02);

  let px2 = width / 2 + 200 * orbitStretchX * cos(frameCount * sp + orbitOffset);
  let py2 = height / 2 + 100 * orbitStretchY * sin(frameCount * sp + orbitOffset);
  drawPlanet(px2, py2, color2, 50);
  // fill(color2);
  // circle(px2, py2, 50);

  //Moon
  push();
  fill(255);
  translate(px2, py2);
  circle(50 * cos(frameCount * sp), 50 * sin(frameCount * sp), 10);
  pop();

  //Planet 3
  let px3 = width / 2 + 300 * orbitStretchX * cos(frameCount * sp2 + orbitOffset);
  let py3 = height / 2 + 200 * orbitStretchY * sin(frameCount * sp2 + orbitOffset);
  drawPlanet(px3, py3, color3, 50);
  // fill(color3);
  // circle(px3, py3, 50);

  for (let i = 0; i < 5; i++) {
    let angle = map(i, 0, 5, 0, 2 * PI);
    let a = px3 + (50) * cos(angle + frameCount * 0.05);
    let b = py3 + (50) * sin(angle + frameCount * 0.05);
    noFill();
    stroke(color2);
    let smallsize = map(sin(frameCount * 0.1), -1, 1, 3, 30);
    circle(a, b, smallsize);
  }
}

// detect mouse movement → assign new random colors
function mouseMoved() {
  targetColor1 = color(random(255), 200, 200);
  targetColor2 = color(random(255), 200, 200);
  targetColor3 = color(random(250), random(250), 200);
}