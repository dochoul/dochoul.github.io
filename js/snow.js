(function () {
  // WMO 날씨 코드 중 눈에 해당하는 것들
  var SNOW_CODES = [71, 73, 75, 77, 85, 86];

  function isDark() {
    var attr = document.documentElement.getAttribute('data-theme');
    if (attr === 'dark') return true;
    if (attr === 'light') return false;
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  function snowColor() {
    return isDark()
      ? 'rgba(255, 255, 255, 0.9)'
      : 'rgba(150, 150, 155, 0.5)';
  }

  function startSnow() {
    var canvas = document.createElement('canvas');
    canvas.style.cssText = [
      'position:fixed', 'top:0', 'left:0',
      'width:100%', 'height:100%',
      'pointer-events:none', 'z-index:999'
    ].join(';');
    document.body.appendChild(canvas);

    var ctx = canvas.getContext('2d');
    var W, H, flakes = [];
    var COUNT = 60;
    var raf;

    function resize() {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    function newFlake(randomY) {
      return {
        x: Math.random() * W,
        y: randomY ? Math.random() * H : -10,
        r: Math.random() * 2 + 0.8,
        vy: Math.random() * 1.0 + 0.3,
        amp: Math.random() * 0.6 + 0.1,
        freq: Math.random() * 0.02 + 0.01,
        phase: Math.random() * Math.PI * 2
      };
    }

    for (var i = 0; i < COUNT; i++) {
      flakes.push(newFlake(true));
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = snowColor();
      for (var i = 0; i < flakes.length; i++) {
        var f = flakes[i];
        f.phase += f.freq;
        f.x += Math.sin(f.phase) * f.amp;
        f.y += f.vy;
        if (f.y > H + 10) flakes[i] = newFlake(false);
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    }

    document.addEventListener('visibilitychange', function () {
      if (document.hidden) cancelAnimationFrame(raf);
      else draw();
    });

    draw();
  }

  function checkWeather(lat, lon) {
    fetch('https://api.open-meteo.com/v1/forecast?latitude=' + lat + '&longitude=' + lon + '&current=weather_code&timezone=auto')
      .then(function (r) { return r.json(); })
      .then(function (data) {
        var code = data.current && data.current.weather_code;
        if (SNOW_CODES.indexOf(code) !== -1) startSnow();
      })
      .catch(function () {}); // 실패 시 조용히 무시
  }

  // 위치 권한 요청
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function (pos) {
        checkWeather(pos.coords.latitude, pos.coords.longitude);
      },
      function () {} // 거부 시 조용히 무시
    );
  }
})();
