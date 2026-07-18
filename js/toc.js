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

  var observer = new IntersectionObserver(function (intersections) {
    intersections.forEach(function (intersection) {
      if (!intersection.isIntersecting) return;
      var active = entries.find(function (entry) { return entry.heading === intersection.target; });
      if (!active) return;
      entries.forEach(function (entry) { entry.link.classList.remove('is-active'); });
      active.link.classList.add('is-active');
    });
  }, { rootMargin: '0px 0px -70% 0px', threshold: 0 });

  headings.forEach(function (heading) { observer.observe(heading); });

  // 마지막 섹션이 짧으면 스크롤이 끝까지 가도 관찰 영역에 안 걸릴 수 있어 보정
  window.addEventListener('scroll', function () {
    var atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
    if (!atBottom) return;
    entries.forEach(function (entry) { entry.link.classList.remove('is-active'); });
    entries[entries.length - 1].link.classList.add('is-active');
  }, { passive: true });
})();
