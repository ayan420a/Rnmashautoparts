// =============================================
// NAVIGATION TOGGLE (Mobile)
// =============================================
const navToggle = document.getElementById('nav-toggle');
const navMenu   = document.getElementById('nav-menu');

navToggle.addEventListener('click', () => {
  navMenu.classList.toggle('open');
  const spans = navToggle.querySelectorAll('span');
  navMenu.classList.contains('open')
    ? (spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)',
       spans[1].style.opacity = '0',
       spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)')
    : (spans[0].style.transform = '',
       spans[1].style.opacity = '',
       spans[2].style.transform = '');
});

// Close menu when a link is clicked
navMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
    const spans = navToggle.querySelectorAll('span');
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  });
});

// =============================================
// ACTIVE NAV LINK (Scroll-based)
// =============================================
const sections  = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-link:not(.inquiry-btn)');

const observerOptions = { threshold: 0.3 };
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => link.classList.remove('active'));
      const activeLink = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
      if (activeLink) activeLink.classList.add('active');
    }
  });
}, observerOptions);

sections.forEach(sec => sectionObserver.observe(sec));

// =============================================
// HERO CAROUSEL
// =============================================
const slides    = document.querySelectorAll('.carousel-slide');
const dots      = document.querySelectorAll('.dot');
const prevBtn   = document.getElementById('prev-btn');
const nextBtn   = document.getElementById('next-btn');
let current     = 0;
let autoplay;

function goToSlide(index) {
  slides[current].classList.remove('active');
  dots[current].classList.remove('active');
  current = (index + slides.length) % slides.length;
  slides[current].classList.add('active');
  dots[current].classList.add('active');

  // Re-trigger animation
  const content = slides[current].querySelector('.slide-content');
  content.style.animation = 'none';
  content.offsetHeight; // reflow
  content.style.animation = '';
}

function startAutoplay() {
  autoplay = setInterval(() => goToSlide(current + 1), 5000);
}

function stopAutoplay() {
  clearInterval(autoplay);
}

prevBtn.addEventListener('click', () => { stopAutoplay(); goToSlide(current - 1); startAutoplay(); });
nextBtn.addEventListener('click', () => { stopAutoplay(); goToSlide(current + 1); startAutoplay(); });

dots.forEach(dot => {
  dot.addEventListener('click', () => {
    stopAutoplay();
    goToSlide(parseInt(dot.dataset.index));
    startAutoplay();
  });
});

// Touch/swipe support
let touchStartX = 0;
const carousel = document.getElementById('carousel');

carousel.addEventListener('touchstart', e => { touchStartX = e.changedTouches[0].clientX; }, { passive: true });
carousel.addEventListener('touchend', e => {
  const diff = touchStartX - e.changedTouches[0].clientX;
  if (Math.abs(diff) > 50) {
    stopAutoplay();
    diff > 0 ? goToSlide(current + 1) : goToSlide(current - 1);
    startAutoplay();
  }
});

startAutoplay();

// =============================================
// INQUIRY FORM SUBMISSION
// =============================================
function handleSubmit(e) {
  e.preventDefault();
  const btn     = document.getElementById('submit-btn');
  const success = document.getElementById('form-success');

  const name    = document.getElementById('name').value.trim();
  const email   = document.getElementById('email').value.trim();
  const phone   = document.getElementById('phone').value.trim();
  const product = document.getElementById('product');
  const productLabel = product.options[product.selectedIndex].text;
  const message = document.getElementById('message').value.trim();

  const waText =
    `Hello RN MASH INTERNATIONAL,%0A%0A` +
    `I would like to send an enquiry:%0A%0A` +
    `👤 *Name:* ${encodeURIComponent(name)}%0A` +
    `📧 *Email:* ${encodeURIComponent(email)}%0A` +
    `📞 *Phone:* ${encodeURIComponent(phone || 'Not provided')}%0A` +
    `🔩 *Product:* ${encodeURIComponent(productLabel === '-- Select a product category --' ? 'Not specified' : productLabel)}%0A%0A` +
    `💬 *Message:*%0A${encodeURIComponent(message)}%0A%0A` +
    `Thank you.`;

  btn.disabled = true;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Opening WhatsApp...';

  setTimeout(() => {
    window.open(`https://wa.me/919358626868?text=${waText}`, '_blank');

    btn.innerHTML = '<i class="fas fa-check"></i> Sent via WhatsApp!';
    btn.style.background = '#25d366';
    success.classList.add('show');
    e.target.reset();

    setTimeout(() => {
      btn.disabled = false;
      btn.innerHTML = '<i class="fas fa-paper-plane"></i> Submit Inquiry';
      btn.style.background = '';
      success.classList.remove('show');
    }, 4000);
  }, 800);
}

// =============================================
// BACK TO TOP BUTTON
// =============================================
const backToTop = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
  if (window.scrollY > 400) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
}, { passive: true });

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// =============================================
// HEADER SCROLL SHADOW
// =============================================
const header = document.getElementById('site-header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.style.boxShadow = '0 4px 30px rgba(0,0,0,0.2)';
  } else {
    header.style.boxShadow = '';
  }
}, { passive: true });

// =============================================
// ANIMATE ELEMENTS ON SCROLL (Intersection Observer)
// =============================================
const animatables = document.querySelectorAll(
  '.product-card, .stat-card, .mv-card, .info-card, .media-card'
);

animatables.forEach(el => {
  el.style.opacity    = '0';
  el.style.transform  = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
});

const animObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity   = '1';
        entry.target.style.transform = 'translateY(0)';
      }, 80 * (Array.from(animatables).indexOf(entry.target) % 4));
      animObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

animatables.forEach(el => animObserver.observe(el));

// =============================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// =============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const headerH = document.getElementById('site-header').offsetHeight;
      const top = target.getBoundingClientRect().top + window.scrollY - headerH;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});
