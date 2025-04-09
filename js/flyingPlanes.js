<script>
  const canvas = document.getElementById("planeCanvas");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });

  const planeSVGs = {
    red: "data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjZGMxYjFiIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMiAxMS41bDE4LjY1LTEwLjMzYy4zNi0uMi44Mi4xLjgzLjU0bC4wMSAxOC41MWMwIC40Mi0uNDYgLjctLjg2LjU1TDE0IDE2bC0xLjc5IDYuMTZhLjY2LjY2IDAgMDEtMS4yNi4wMkw5IDE2bC02LjI4LjM0Yy0uNDIuMDItLjcxLS40My0uNTItLjgzTDIgMTEuNXoiLz48L3N2Zz4=",
    grey: "data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjY2NjY2NjIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMiAxMS41bDE4LjY1LTEwLjMzYy4zNi0uMi44Mi4xLjgzLjU0bC4wMSAxOC41MWMwIC40Mi0uNDYgLjctLjg2LjU1TDE0IDE2bC0xLjc5IDYuMTZhLjY2LjY2IDAgMDEtMS4yNi4wMkw5IDE2bC02LjI4LjM0Yy0uNDIuMDItLjcxLS40My0uNTItLjgzTDIgMTEuNXoiLz48L3N2Zz4=",
    green: "data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjNGE5ZWI0IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMiAxMS41bDE4LjY1LTEwLjMzYy4zNi0uMi44Mi4xLjgzLjU0bC4wMSAxOC41MWMwIC40Mi0uNDYgLjctLjg2LjU1TDE0IDE2bC0xLjc5IDYuMTZhLjY2LjY2IDAgMDEtMS4yNi4wMkw5IDE2bC02LjI4LjM0Yy0uNDIuMDItLjcxLS40My0uNTItLjgzTDIgMTEuNXoiLz48L3N2Zz4="
  };

  const planeImages = {};
  let loaded = 0;
  const totalToLoad = Object.keys(planeSVGs).length;

  for (const [color, src] of Object.entries(planeSVGs)) {
    const img = new Image();
    img.onload = () => {
      loaded++;
      if (loaded === totalToLoad) startAnimation();
    };
    img.src = src;
    planeImages[color] = img;
  }

  let planes = [];
  const mouse = { x: canvas.width / 2, y: canvas.height / 2 };
  let isMouseIdle = false;
  let lastMouseMove = Date.now();
  const idleThreshold = 3000;

  // Spawn initial planes
  for (let i = 0; i < 30; i++) {
    const colors = Object.keys(planeImages);
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    planes.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: 20 + Math.random() * 10,
      speed: 1 + Math.random() * 2,
      angle: Math.random() * Math.PI * 2,
      idleDir: Math.random() * Math.PI * 2,
      color: randomColor
    });
  }

  document.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    lastMouseMove = Date.now();
    isMouseIdle = false;
  });

  document.addEventListener("click", () => {
    for (let i = 0; i < 5; i++) { // Click to spawn 5 new planes
      const colors = Object.keys(planeImages);
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      planes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: 20 + Math.random() * 10,
        speed: 1 + Math.random() * 2,
        angle: Math.random() * Math.PI * 2,
        idleDir: Math.random() * Math.PI * 2,
        color: randomColor
      });
    }
  });

  setInterval(() => {
    isMouseIdle = Date.now() - lastMouseMove > idleThreshold;
  }, 500);

  function startAnimation() {
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      planes.forEach((plane) => {
        let angle;

        if (isMouseIdle) {
          plane.idleDir += (Math.random() - 0.5) * 0.1;
          angle = plane.idleDir;
        } else {
          const dx = mouse.x - plane.x;
          const dy = mouse.y - plane.y;
          angle = Math.atan2(dy, dx);
          plane.idleDir = angle;
        }

        // Change color randomly mid-air
        if (Math.random() < 0.01) { // Change color with 1% chance
          const colors = Object.keys(planeImages);
          plane.color = colors[Math.floor(Math.random() * colors.length)];
        }

        plane.angle = angle;
        plane.x += Math.cos(angle) * plane.speed * 1.5;
        plane.y += Math.sin(angle) * plane.speed * 1.5;

        if (plane.x < 0) plane.x = canvas.width;
        if (plane.x > canvas.width) plane.x = 0;
        if (plane.y < 0) plane.y = canvas.height;
        if (plane.y > canvas.height) plane.y = 0;

        ctx.save();
        ctx.translate(plane.x, plane.y);
        ctx.rotate(plane.angle);
        ctx.globalAlpha = 0.8;
        const image = planeImages[plane.color];
        ctx.drawImage(image, -plane.size / 2, -plane.size / 2, plane.size, plane.size);
        ctx.restore();
      });

      requestAnimationFrame(animate);
    }

    animate();
  }
</script>