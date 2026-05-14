import PhotoSwipeLightbox from '/js/photoswipe-lightbox.esm.min.js';
import PhotoSwipe from '/js/photoswipe.esm.min.js';

const post = document.querySelector('.post');
if (!post) throw new Error('no post');

function init() {
  post.querySelectorAll('img').forEach(img => {
    if (img.closest('a[data-pswp-width]')) return;
    const a = document.createElement('a');
    a.href = img.src;
    a.setAttribute('data-pswp-width', img.naturalWidth || img.offsetWidth);
    a.setAttribute('data-pswp-height', img.naturalHeight || img.offsetHeight);
    img.parentNode.insertBefore(a, img);
    a.appendChild(img);
  });

  const lightbox = new PhotoSwipeLightbox({
    gallery: '.post',
    children: 'a[data-pswp-width]',
    pswpModule: PhotoSwipe,
  });
  lightbox.init();
}

if (document.readyState === 'complete') {
  init();
} else {
  window.addEventListener('load', init);
}
