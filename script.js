// ===== Карусель портретов =====
const profileCarousel = document.querySelector('.profile-carousel');
const profileTrack = profileCarousel.querySelector('.profile-track');
const profileSlides = [...profileCarousel.querySelectorAll('.profile-slide')];
const archiveItems = [...profileCarousel.querySelectorAll('.archive-item')];
const profilePosition = profileCarousel.querySelector('.profile-position');
let activeProfile = 0;

function showProfile(index) {
  activeProfile = (index + profileSlides.length) % profileSlides.length;
  profileTrack.style.transform = `translateX(-${activeProfile * 100}%)`;
  profileSlides.forEach((slide, i) => slide.setAttribute('aria-hidden', String(i !== activeProfile)));
  archiveItems.forEach((item, i) => item.setAttribute('aria-current', String(i === activeProfile)));
  profilePosition.textContent = `${activeProfile + 1} / ${profileSlides.length}`;
}

profileCarousel.querySelector('[data-profile-direction="prev"]').addEventListener('click', () => showProfile(activeProfile - 1));
profileCarousel.querySelector('[data-profile-direction="next"]').addEventListener('click', () => showProfile(activeProfile + 1));
archiveItems.forEach((item, i) => item.addEventListener('click', () => showProfile(i)));

profileCarousel.addEventListener('keydown', event => {
  if (event.key === 'ArrowLeft') { event.preventDefault(); showProfile(activeProfile - 1); }
  if (event.key === 'ArrowRight') { event.preventDefault(); showProfile(activeProfile + 1); }
});

let profileTouchStartX = 0;
const profileWindow = profileCarousel.querySelector('.profile-window');
profileWindow.addEventListener('touchstart', event => {
  profileTouchStartX = event.changedTouches[0].screenX;
}, { passive: true });
profileWindow.addEventListener('touchend', event => {
  const delta = event.changedTouches[0].screenX - profileTouchStartX;
  if (Math.abs(delta) > 45) showProfile(activeProfile + (delta < 0 ? 1 : -1));
}, { passive: true });


// ===== Финальная карусель =====
const carousel = document.querySelector('.carousel');
const track = carousel.querySelector('.carousel-track');
const slides = [...carousel.querySelectorAll('.carousel-slide')];
const dots = [...carousel.querySelectorAll('.carousel-dot')];
let activeSlide = 0;

function showSlide(index) {
  activeSlide = (index + slides.length) % slides.length;
  track.style.transform = `translateX(-${activeSlide * 100}%)`;
  slides.forEach((slide, i) => slide.setAttribute('aria-hidden', String(i !== activeSlide)));
  dots.forEach((dot, i) => dot.setAttribute('aria-current', String(i === activeSlide)));
}

carousel.querySelector('[data-direction="prev"]').addEventListener('click', () => showSlide(activeSlide - 1));
carousel.querySelector('[data-direction="next"]').addEventListener('click', () => showSlide(activeSlide + 1));
dots.forEach((dot, i) => dot.addEventListener('click', () => showSlide(i)));

carousel.addEventListener('keydown', event => {
  if (event.key === 'ArrowLeft') { event.preventDefault(); showSlide(activeSlide - 1); }
  if (event.key === 'ArrowRight') { event.preventDefault(); showSlide(activeSlide + 1); }
});

let touchStartX = 0;
const carouselWindow = carousel.querySelector('.carousel-window');
carouselWindow.addEventListener('touchstart', event => {
  touchStartX = event.changedTouches[0].screenX;
}, { passive: true });
carouselWindow.addEventListener('touchend', event => {
  const delta = event.changedTouches[0].screenX - touchStartX;
  if (Math.abs(delta) > 45) showSlide(activeSlide + (delta < 0 ? 1 : -1));
}, { passive: true });