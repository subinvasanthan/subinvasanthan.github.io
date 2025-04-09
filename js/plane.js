<script>
const canvas = document.getElementById("planeCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

const paperPlaneSrc = "data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjNGI5MGUyIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMiAxMS41bDE4LjY1LTEwLjMzYy4zNi0uMi44Mi4xLjgzLjU0bC4wMSAxOC41MWMwIC40Mi0uNDYgLjctLjg2LjU1TDE0IDE2bC0xLjc5IDYuMTZhLjY2LjY2IDAgMDEtMS4yNi4wMkw5IDE2bC02LjI4LjM0Yy0uNDIuMDItLjcxLS40My0uNTItLjgzTDIgMTEuNXoiLz48L3N2Zz4=";
const planeImage = new Image();
planeImage.src = paperPlaneSrc;

let mouse = { x: canvas.width / 2, y: canvas.height / 2 };
let isMouseIdle = false;
let lastMouseMove = Date.now();
let idleThreshold = 3000; // 3 seconds

let planes = [];

for (let i = 0; i < 20; i++) {
  planes.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: 20 + Math.random() * 10,
    speed: 1 + Math.random() * 2,
    angle: Math.random() * Math.PI * 2,
    idleDir: Math.random() * Math.PI * 2,
  });
}

// Track mouse activity
document.addEventListener("mousemove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
  lastMouseMove = Date.now();
  isMouseIdle = false;
});

// Periodically check for idle
setInterval(() => {
  isMouseIdle = Date.now() - lastMouseMove > idleThreshold;
}, 500);

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  planes.forEach((plane) => {
    let angle;

    if (isMouseIdle) {
      // Float in a random-ish direction
      plane.idleDir += (Math.random() - 0.5) * 0.1; // add wiggle
      angle = plane.idleDir;
    } else {
      // Move toward mouse
      const dx = mouse.x - plane.x;
      const dy = mouse.y - plane.y;
      angle = Math.atan2(dy, dx);
      plane.idleDir = angle; // update idle direction to match current flight path
    }

    plane.angle = angle;
    plane.x += Math.cos(angle) * plane.speed * 1.5;
    plane.y += Math.sin(angle) * plane.speed * 1.5;

    // Wrap around screen edges
    if (plane.x < 0) plane.x = canvas.width;
    if (plane.x > canvas.width) plane.x = 0;
    if (plane.y < 0) plane.y = canvas.height;
    if (plane.y > canvas.height) plane.y = 0;

    // Draw the plane
    ctx.save();
    ctx.translate(plane.x, plane.y);
    ctx.rotate(angle);
    ctx.drawImage(planeImage, -plane.size / 2, -plane.size / 2, plane.size, plane.size);
    ctx.restore();
  });

  requestAnimationFrame(animate);
}

planeImage.onload = () => {
  animate();
};
</script>