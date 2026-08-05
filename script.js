const images = document.querySelectorAll('.portfolio-screen img');
const lightbox = document.querySelector('.lightbox');
const lightboxImage = lightbox.querySelector('img');
const closeButton = document.querySelector('.lightbox-close');
const toTop = document.querySelector('.to-top');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { rootMargin: '120px 0px', threshold: 0.04 });

images.forEach((image) => {
  revealObserver.observe(image);

  image.addEventListener('click', () => {
    lightboxImage.src = image.currentSrc || image.src;
    lightboxImage.alt = image.alt;
    lightbox.showModal();
  });
});

function closeLightbox() {
  lightbox.close();
  lightboxImage.src = '';
}

closeButton.addEventListener('click', closeLightbox);

lightbox.addEventListener('click', (event) => {
  if (event.target === lightbox) closeLightbox();
});

window.addEventListener('scroll', () => {
  toTop.classList.toggle('is-visible', window.scrollY > window.innerHeight);
}, { passive: true });

toTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
