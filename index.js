/** @type {HTMLImageElement} */
const pic = document.getElementById('pic');
const boundsMinus10 = document.getElementsByTagName("main").item(0);
const maxTilt = 23;

document.body.addEventListener("mousemove", (ev) => {
  const x = ev.clientX;
  const y = ev.clientY;

  /** @type {DOMRect} */
  const boundsMinus10Rect = boundsMinus10.getBoundingClientRect();
  const targetX = boundsMinus10Rect.x + boundsMinus10Rect.width / 2;
  const targetY = boundsMinus10Rect.y + boundsMinus10Rect.height / 2;

  const percentX = clamp((x - targetX) / (boundsMinus10Rect.width / 2), -1, 1);
  const percentY = clamp((y - targetY) / (boundsMinus10Rect.height / 2), -1, 1);

  const rotateY = percentX * maxTilt;
  const rotateX = -percentY * maxTilt;

  pic.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateX(${percentX}rem) translateY(${percentY}rem)`;
});

function clamp(val, min, max) {
  if (val < min) return min;
  if (val > max) return max;

  return val;
}
