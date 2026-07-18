(function () {
  // Mobile / Touch device check: Disable custom cursor trail on touch screens
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  if (isTouchDevice) return;

  // Inject CSS style to hide default browser cursor when hovering over links
  const style = document.createElement('style');
  style.innerHTML = `
    .custom-cursor-active, 
    .custom-cursor-active a, 
    .custom-cursor-active button, 
    .custom-cursor-active [role="button"],
    .custom-cursor-active input,
    .custom-cursor-active select,
    .custom-cursor-active .pagination a {
      cursor: none !important;
    }
  `;
  document.head.appendChild(style);

  const canvas = document.createElement('canvas');
  canvas.id = 'cursor-trail';
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100vw';
  canvas.style.height = '100vh';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '9999';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  
  // Points will store recorded coordinates and their timestamps
  let points = [];
  const maxAge = 350; // trail duration in ms (how long the line stays on screen)
  let mouse = { x: 0, y: 0 };
  let isSleeping = true;
  let isHovering = false;
  let hoverProgress = 0; // 0 = trail mode, 1 = circle cursor mode

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const now = Date.now();

    // Clean up points older than maxAge
    while (points.length > 0 && now - points[0].time > maxAge) {
      points.shift();
    }

    // Smooth transition of hover state
    if (isHovering) {
      hoverProgress += (1 - hoverProgress) * 0.15;
    } else {
      hoverProgress += (0 - hoverProgress) * 0.15;
    }

    // Get current key color from CSS variables
    const keyColor = getComputedStyle(document.documentElement).getPropertyValue('--color-link').trim() || '#d2330f';

    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    // 1. Draw trail (drawn exactly at historical coordinates, fades out in place)
    if (hoverProgress < 0.99 && points.length > 1) {
      for (let i = 0; i < points.length - 1; i++) {
        ctx.beginPath();
        
        // Draw smooth line segment using midpoints for quadratic curves
        const p1 = points[i];
        const p2 = points[i + 1];
        
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);

        // Calculate age ratio of this segment (0 = brand new, 1 = about to disappear)
        const age = now - p1.time;
        const ratio = Math.max(0, Math.min(1, age / maxAge));

        // Tapering width and opacity based on age (rather than index spacing)
        ctx.lineWidth = (1 - ratio) * 2.5 * (1 - hoverProgress); // elegant thin line (2.5px max)
        ctx.globalAlpha = (1 - ratio) * 0.8 * (1 - hoverProgress);
        ctx.strokeStyle = keyColor;
        ctx.stroke();
      }
    }

    // Reset globalAlpha to default for the hover circle
    ctx.globalAlpha = 1.0;

    // 2. Draw hover circle (rendered at current mouse position)
    if (hoverProgress > 0.01) {
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, hoverProgress * 20, 0, Math.PI * 2);
      ctx.fillStyle = keyColor;
      ctx.globalAlpha = hoverProgress * 0.4;
      ctx.fill();
    }

    // Put loop to sleep when no points remain, hover transition completes, and user is not hovering
    if (points.length === 0 && hoverProgress < 0.01 && !isHovering) {
      isSleeping = true;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      return;
    }

    requestAnimationFrame(animate);
  }

  function wakeUp() {
    if (isSleeping) {
      isSleeping = false;
      requestAnimationFrame(animate);
    }
  }

  window.addEventListener('mousemove', function (e) {
    const x = e.clientX;
    const y = e.clientY;

    // Prevent duplicate entries if the mouse hasn't moved much
    if (points.length > 0) {
      const lastPoint = points[points.length - 1];
      const dist = Math.hypot(x - lastPoint.x, y - lastPoint.y);
      if (dist < 2) return;
    }

    mouse.x = x;
    mouse.y = y;

    points.push({ x: x, y: y, time: Date.now() });
    wakeUp();
  });

  // Global event delegation for interactive element hover states
  document.addEventListener('mouseover', function (e) {
    const target = e.target.closest('a, button, [role="button"], .theme-toggle, .x-reply-btn');
    if (target) {
      isHovering = true;
      document.body.classList.add('custom-cursor-active');
      wakeUp();
    }
  });

  document.addEventListener('mouseout', function (e) {
    const target = e.target.closest('a, button, [role="button"], .theme-toggle, .x-reply-btn');
    if (target) {
      isHovering = false;
      document.body.classList.remove('custom-cursor-active');
      wakeUp();
    }
  });
})();
