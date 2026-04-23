// =============================================
// MOBILE NAV TOGGLE
// =============================================
const navToggle = document.getElementById('nav-toggle');
const navMenu   = document.getElementById('nav-menu');

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('open');
    const spans = navToggle.querySelectorAll('span');
    if (navMenu.classList.contains('open')) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity   = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity   = '';
      spans[2].style.transform = '';
    }
  });

  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      const spans = navToggle.querySelectorAll('span');
      spans[0].style.transform = '';
      spans[1].style.opacity   = '';
      spans[2].style.transform = '';
    });
  });
}

// =============================================
// SCROLL-IN ANIMATION FOR CARDS
// =============================================
const cards = document.querySelectorAll('.product-listing-card');

const cardObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, idx) => {
    if (entry.isIntersecting) {
      const col = Array.from(cards).indexOf(entry.target) % 4;
      setTimeout(() => {
        entry.target.classList.add('animate-in');
        entry.target.style.transition = `opacity 0.5s ease ${col * 80}ms, transform 0.5s ease ${col * 80}ms, box-shadow 0.3s ease, border-color 0.3s ease, transform 0.3s ease`;
      }, 0);
      cardObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

cards.forEach(card => cardObserver.observe(card));

// =============================================
// SEARCH / FILTER
// =============================================
function filterProducts() {
  const query     = document.getElementById('search-input').value.trim().toLowerCase();
  const container = document.getElementById('products-container');
  const noResults = document.getElementById('no-results');
  const allCards  = container.querySelectorAll('.product-listing-card');
  let   visible   = 0;

  allCards.forEach(card => {
    const name = (card.dataset.name || '').toLowerCase();
    if (!query || name.includes(query)) {
      card.classList.remove('hidden');
      visible++;
    } else {
      card.classList.add('hidden');
    }
  });

  noResults.style.display = visible === 0 ? 'block' : 'none';
}

// =============================================
// LIGHTBOX
// =============================================
const lightbox      = document.getElementById('lightbox');
const lightboxImg   = document.getElementById('lightbox-img');
const lightboxTitle = document.getElementById('lightbox-title');

function openLightbox(btn) {
  const src   = btn.dataset.src;
  const title = btn.dataset.title;
  lightboxImg.src         = src;
  lightboxImg.alt         = title;
  lightboxTitle.textContent = title;
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox(event) {
  if (!event || event.target === lightbox || event.currentTarget.classList.contains('lightbox-close')) {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
    setTimeout(() => { lightboxImg.src = ''; }, 300);
  }
}

// Close on Escape key
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeLightbox();
});

// =============================================
// BACK TO TOP
// =============================================
const backToTop = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
  if (backToTop) {
    backToTop.classList.toggle('visible', window.scrollY > 400);
  }
}, { passive: true });

if (backToTop) {
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// =============================================
// HEADER SHADOW ON SCROLL
// =============================================
const header = document.getElementById('site-header');
window.addEventListener('scroll', () => {
  if (header) {
    header.style.boxShadow = window.scrollY > 50
      ? '0 4px 30px rgba(0,0,0,0.25)'
      : '';
  }
}, { passive: true });
