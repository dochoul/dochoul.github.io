(function () {
  var toc = document.getElementById('post-toc');
  var headings = document.querySelectorAll('.post > h2');
  if (!toc || !headings.length) return;

  var list = document.createElement('ul');
  list.className = 'post-toc-list';

  var entries = [];
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

  toc.appendChild(list);

  // 매 스크롤마다 각 헤딩의 실제 위치를 다시 계산해서 활성 항목을 정한다.
  // (IntersectionObserver 누적 상태 방식은 TOC 클릭으로 점프할 때 이벤트가 씹히면
  //  예전 활성 항목이 그대로 남는 문제가 있어 제거했다.)
  var ticking = false;

  function updateActive() {
    ticking = false;

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
    // (마지막 섹션뿐 아니라 짧은 섹션 전체에 적용)
    if (firstBelow) {
      var headingTop = firstBelow.heading.getBoundingClientRect().top;
      var scrollNeeded = headingTop - threshold;
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
