/** @type {HTMLImageElement} */
const pic = document.getElementById('pic');
const boundsMinus10 = document.getElementsByTagName("main").item(0);
const maxTilt = 16;

function card3d(x, y) {
  /** @type {DOMRect} */
  const boundsMinus10Rect = boundsMinus10.getBoundingClientRect();
  const targetX = boundsMinus10Rect.x + boundsMinus10Rect.width / 2;
  const targetY = boundsMinus10Rect.y + boundsMinus10Rect.height / 2;

  const percentX = clamp((x - targetX) / (boundsMinus10Rect.width / 2), -1, 1);
  const percentY = clamp((y - targetY) / (boundsMinus10Rect.height / 2), -1, 1);

  const rotateY = percentX * maxTilt;
  const rotateX = -percentY * maxTilt;

  pic.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateX(${percentX}rem) translateY(${percentY}rem)`;

  const brightness = 125 - percentY * 75;
  const blur = (Math.abs(percentX) + Math.abs(percentY));
  pic.style.filter = `brightness(${brightness}%) blur(${blur}px)`;

  const shadowX = -percentX * 25;
  const shadowY = -percentY * 25;
  const shadowBlur = 10 + (Math.abs(percentX) + Math.abs(percentY)) * 40;

  pic.style.boxShadow = `
    ${shadowX}px ${shadowY}px ${shadowBlur}px rgba(0,0,0,1)
  `;
}

function text3d() {

}

{
  // init
  const rect = boundsMinus10.getBoundingClientRect();
  card3d(rect.left + rect.width / 2, rect.top + rect.height / 2);
}

document.body.addEventListener("mousemove", (ev) => {
  const x = ev.clientX;
  const y = ev.clientY;
  card3d(x, y);
});

function clamp(val, min, max) {
  if (val < min) return min;
  if (val > max) return max;

  return val;
}
