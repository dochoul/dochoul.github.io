(function () {
  var toc = document.getElementById('post-toc');
  var headings = document.querySelectorAll('.post > h2');
  if (!toc || !headings.length) return;

  var list = document.createElement('ul');
  list.className = 'post-toc-list';

  var entries = [];
  var blockScrollUntil = 0;

  headings.forEach(function (heading) {
    var link = document.createElement('a');
    link.href = '#' + heading.id;
    link.textContent = heading.textContent;
    link.className = 'post-toc-link';

    var item = document.createElement('li');
    item.appendChild(link);
    list.appendChild(item);

    entries.push({ link: link, heading: heading });
  });

  // 클릭 시 즉시 활성화, 스크롤 핸들러 600ms 차단
  entries.forEach(function (entry) {
    entry.link.addEventListener('click', function () {
      entries.forEach(function (e) { e.link.classList.remove('is-active'); });
      entry.link.classList.add('is-active');
      blockScrollUntil = Date.now() + 600;
    });
  });

  toc.appendChild(list);

  var ticking = false;

  function updateActive() {
    ticking = false;

    if (Date.now() < blockScrollUntil) return;

    var threshold = 80;
    var scrollY = window.scrollY;
    var maxScroll = document.documentElement.scrollHeight - window.innerHeight;

    var current = null;
    var firstBelow = null;

    for (var i = 0; i < entries.length; i++) {
      var top = entries[i].heading.getBoundingClientRect().top;
      if (top <= threshold) {
        current = entries[i];
      } else {
        firstBelow = entries[i];
        break;
      }
    }

    // threshold 안으로 스크롤할 여유가 없는 헤딩은 활성화 처리
    if (firstBelow) {
      var scrollNeeded = firstBelow.heading.getBoundingClientRect().top - threshold;
      var scrollRemaining = maxScroll - scrollY;
      if (scrollNeeded > 0 && scrollNeeded > scrollRemaining) {
        current = firstBelow;
      }
    }

    entries.forEach(function (entry) { entry.link.classList.remove('is-active'); });
    if (current) current.link.classList.add('is-active');
  }

  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(updateActive);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  updateActive();
})();
