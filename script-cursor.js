import rafEngine from "https://cdn.skypack.dev/raf-engine@0.3.0";
const engine = new rafEngine();

let cursor = null;
const amount = 8;
const sineDots = Math.floor(amount * 0.3);
const width = 10;
const idleTimeout = 150;
let lastFrame = 0;
const mousePosition = { x: 0, y: 0 };
const dots = [];
let timeoutID;
let idle = false;

class Dot {
  constructor(index = 0) {
    this.index = index;
    this.anglespeed = 0.05;
    this.x = 0;
    this.y = 0;
    this.scale = 1 - (0.05 * index);
    this.range = (width / 2) - (((width / 2) * this.scale) + 2);
    this.limit = width * 0.75 * this.scale;
    this.element = document.createElement('span');
    cursor.appendChild(this.element);
  }

  lock() {
    this.lockX = this.x;
    this.lockY = this.y;
    this.angleX = Math.PI * 2 * Math.random();
    this.angleY = Math.PI * 2 * Math.random();
  }

  draw() {
    if (!idle || this.index <= sineDots) {
      this.element.style.transform = `translateX(${this.x}px) translateY(${this.y}px) scale(${this.scale})`;
    } else {
      this.angleX += this.anglespeed;
      this.angleY += this.anglespeed;
      this.y = this.lockY + (Math.sin(this.angleY) * this.range);
      this.x = this.lockX + (Math.sin(this.angleX) * this.range);
      this.element.style.transform = `translateX(${this.x}) translateY(${this.y}) scale(${this.scale})`;
    }
  }
}

function goInactive() {
  idle = true;
  dots.forEach(dot => dot.lock());
}

function startIdleTimer() {
  timeoutID = setTimeout(goInactive, idleTimeout);
  idle = false;
}

function resetIdleTimer() {
  clearTimeout(timeoutID);
  startIdleTimer();
}

const onMouseMove = (event) => {
  mousePosition.x = event.clientX - (width / 2);
  mousePosition.y = event.clientY - (width / 2);
  resetIdleTimer();
};

function buildDots() {
  for (let i = 0; i < amount; i += 1) {
    const dot = new Dot(i);
    console.log(dot)
    dots.push(dot);
  }
}

const positionCursor = (delta) => {
  let { x } = mousePosition;
  let { y } = mousePosition;

  dots.forEach((dot, index) => {
    const nextDot = dots[index + 1] || dots[0];

    dot.x = x; // eslint-disable-line
    dot.y = y; // eslint-disable-line
    dot.draw(delta);

    if (!idle || index <= sineDots) {
      const dx = (nextDot.x - dot.x) * 0.35;
      const dy = (nextDot.y - dot.y) * 0.35;

      x += dx;
      y += dy;
    }
  });
};

const render = (timestamp) => {
  const delta = timestamp - lastFrame;
  positionCursor(delta);
  lastFrame = timestamp;
};

function init(loop) {
  cursor = document.getElementById('cursor');
  window.addEventListener('mousemove', onMouseMove);
  lastFrame += new Date();
  buildDots();
  loop.add(render);
}
engine.start();
init(engine);