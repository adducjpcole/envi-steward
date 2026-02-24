/** @type {HTMLImageElement} */
const pic = document.getElementById('pic');
const text = document.getElementById('text');
const maxTilt = 11.25;

function pic3d(x, y, bounds) {
  /** @type {DOMRect} */
  const boundsRect = bounds.getBoundingClientRect();
  const targetX = boundsRect.x + boundsRect.width / 2;
  const targetY = boundsRect.y + boundsRect.height / 2;

  const percentX = clamp((x - targetX) / (boundsRect.width / 2), -1, 1);
  const percentY = clamp((y - targetY) / (boundsRect.height / 2), -1, 1);

  const rotateY = percentX * maxTilt;
  const rotateX = -percentY * maxTilt;

  pic.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateX(${percentX}rem) translateY(${percentY}rem)`;

  const brightness = -(percentY / 2 - 1) * 100;
  const blur = (Math.abs(percentX) + Math.abs(percentY)) * 0.8;
  pic.style.filter = `brightness(${brightness}%) blur(${blur}px)`;

  const shadowX = -percentX * 25;
  const shadowY = -percentY * 25;
  const shadowBlur = 10 + (Math.abs(percentX) + Math.abs(percentY)) * 40;

  pic.style.boxShadow = `
    ${shadowX}px ${shadowY}px ${shadowBlur}px rgba(0, 0, 0, 0.5)
  `;
}

function text3d(x, y, bounds) {
  const boundsRect = bounds.getBoundingClientRect();
  const targetX = boundsRect.x + boundsRect.width / 2;
  const targetY = boundsRect.y + boundsRect.height / 2;

  const percentX = clamp((x - targetX) / (boundsRect.width / 2), -1, 1);
  const percentY = clamp((y - targetY) / (boundsRect.height / 2), -1, 1);

  text.style.transform = `translateX(${percentX}rem) translateY(${percentY}rem)`;
}

function clamp(val, min, max) {
  if (val < min) return min;
  if (val > max) return max;

  return val;
}

{
  // init
  const bounds = document.getElementsByTagName('main').item(0);
  const boundsRect = bounds.getBoundingClientRect();
  let x = boundsRect.left + boundsRect.width / 2;
  let y = boundsRect.top + boundsRect.height / 2;
  pic3d(x, y, bounds);
  text3d(x, y, bounds);

  if (hasTouchScreen()) {
    let targetX = x;
    let targetY = y;
    let vx = (Math.round(Math.random()) - 0.5) * 4;
    let vy = (Math.round(Math.random()) - 0.5) * 4;

    const smoothFactor = 0.008; // smaller = smoother

    function animateFloatyBounciness() {
      targetX += vx;
      targetY += vy;

      if (targetX < boundsRect.left || targetX > boundsRect.right) vx *= -1;
      if (targetY < boundsRect.top || targetY > boundsRect.bottom) vy *= -1;

      x += (targetX - x) * smoothFactor;
      y += (targetY - y) * smoothFactor;
      pic3d(x, y, bounds);
      text3d(x, y, bounds);

      requestAnimationFrame(animateFloatyBounciness);
    }

    animateFloatyBounciness();
  } else {
    document.body.addEventListener('mousemove', (ev) => {
      const x = ev.clientX;
      const y = ev.clientY;
      pic3d(x, y, bounds);
      text3d(x, y, bounds);
    });
  }
}

function hasTouchScreen() {
  return navigator.maxTouchPoints > 0;
}
