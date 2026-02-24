const canvas = document.getElementById('rain');
const ctx = canvas.getContext('2d');

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

class Drop {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.length = Math.random() * 20 + 10;
    this.speed = Math.random() * 4 + 4;
  }

  update() {
    this.y += this.speed;

    if (this.y > canvas.height) {
      this.reset();
      this.y = -20;
    }
  }

  draw() {
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x, this.y + this.length);
    ctx.strokeStyle = '#213052';
    ctx.lineWidth = 2;
    ctx.stroke();
  }
}

let drops = [];
const dropCount = 200;
for (let i = 0; i < dropCount; i++) {
  drops.push(new Drop());
}

function animateRain() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let drop of drops) {
    drop.update();
    drop.draw();
  }

  requestAnimationFrame(animateRain);
}

animateRain();
