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

    // 각 헤딩이 활성화되는 스크롤 위치
    var positions = entries.map(function (entry) {
      return entry.heading.getBoundingClientRect().top + scrollY - threshold;
    });

    // threshold까지 스크롤할 수 없는 끝부분 헤딩들은
    // 남은 스크롤 구간을 나눠 차례로 활성화되도록 위치 재배치
    var firstUnreachable = -1;
    for (var i = 0; i < positions.length; i++) {
      if (positions[i] > maxScroll) {
        firstUnreachable = i;
        break;
      }
    }
    if (firstUnreachable !== -1) {
      var start = firstUnreachable > 0 ? Math.max(positions[firstUnreachable - 1], 0) : 0;
      var count = positions.length - firstUnreachable;
      var span = maxScroll - start;
      for (var j = firstUnreachable; j < positions.length; j++) {
        positions[j] = start + span * (j - firstUnreachable + 1) / count;
      }
    }

    var current = null;
    for (var k = 0; k < positions.length; k++) {
      if (positions[k] <= scrollY + 1) {
        current = entries[k];
      } else {
        break;
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
