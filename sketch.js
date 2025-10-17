let w = 1;
let sp = 0.02;
let sp2 = 0.03;
let color1, color2;

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");
  colorMode(HSB, 255);
  color1 = color(random(255), 200, 200);
  color2 = color(random(255), 200, 200);
  color3 = color(random(255), random(255),200);
}

function bg() {
  background(220);
  for (let x = 0; x < width; x += w) {
    noStroke();
    let h = map(sin(frameCount * 0.05), -1, 1, 200, 220);
    fill(h, 150, 50);
    rect(x, 0, w, height);
  }

  for (let i = 0; i < width; i += 50) {
    for (let j = 0; j < height; j += 50) {
      if (noise(i * j) < 0.5) {
        noFill();
        let op = map(sin(frameCount * 0.4 + j * i), -1, 1, 0, 255);
        stroke(255, op);
        rect(i, j, 1);
      }
    }
  }
}

function planets() {
  noStroke();
  fill(40,255,255);
  circle(width / 2, height / 2, 100);

  //Planet 1
  let px1 = width / 2 + 100 * cos(frameCount * 0.005);
  let py1 = height / 2 + 100 * sin(frameCount * 0.01);
  fill(color1);
  let size = map(sin(frameCount * 0.15), -1, 1, 10, 50);
  circle(px1, py1, size);

  //Planet 2
  sp = lerp(sp, map(mouseX, 0, width, 0.02, 0.03), 0.1);
  sp2 = lerp(sp2, map(mouseX, 0, width, 0.01, 0.05), 0.3);

  let px2 = width / 2 + 200 * cos(frameCount * sp);
  let py2 = height / 2 + 100 * sin(frameCount * sp);
  fill(color2);
  circle(px2, py2, 50);

  //Moon
  push();
  fill(255);
  translate(px2, py2);
  circle(50 * cos(frameCount * sp), 50 * sin(frameCount * sp), 10);
  pop();

  // --- Planet 3 ---
  let px3 = width / 2 + 300 * cos(frameCount * sp2);
  let py3 = height / 2 + 200 * sin(frameCount * sp2);
  fill(color3);
  circle(px3, py3, 50);
  
  for(let i=0; i<5; i++){
    let angle = map(i,0,5,0,2*PI);
    let a = px3 + (50)*cos(angle + frameCount*0.05);
    let b = py3 + (50)*sin(angle + frameCount*0.05);
    noFill();
    stroke(color2);
    let smallsize = map(sin(frameCount*0.1),-1,1,3,30);
    circle(a,b,smallsize);
  }
}

// detect mouse movement → assign new random colors
function mouseMoved() {
  color1 = color(random(255), 200, 200);
  color2 = color(random(255), 200, 200);
  color3 = color(random(250),random(250),200);
}

function draw() {
  bg();
  planets();
}