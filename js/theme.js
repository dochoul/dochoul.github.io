(function () {
  var btn = document.getElementById('theme-toggle');
  if (!btn) return;

  function currentTheme() {
    var attr = document.documentElement.getAttribute('data-theme');
    if (attr === 'dark' || attr === 'light') return attr;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  }

  btn.addEventListener('click', function () {
    var next = currentTheme() === 'dark' ? 'light' : 'dark';

    // 버튼 중심 좌표를 CSS 변수로 전달 (circle 애니메이션 기준점)
    var rect = btn.getBoundingClientRect();
    var x = Math.round(rect.left + rect.width / 2);
    var y = Math.round(rect.top + rect.height / 2);
    document.documentElement.style.setProperty('--theme-toggle-x', x + 'px');
    document.documentElement.style.setProperty('--theme-toggle-y', y + 'px');

    // View Transition API 지원 여부 확인
    if (!document.startViewTransition) {
      document.documentElement.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) {}
      return;
    }

    document.startViewTransition(function () {
      document.documentElement.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) {}
    });
  });
})();
