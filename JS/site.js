// Mobile menu toggle
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
if (menuBtn && mobileMenu) {
  menuBtn.addEventListener('click', () => mobileMenu.classList.toggle('open'));
}

// Quote calculator (quote.html only): 20% new customer discount
const calcService = document.getElementById('calc-service');
if (calcService) {
  const calcSize = document.getElementById('calc-size');
  const addons = ['addon-carpet', 'addon-oven', 'addon-balcony'].map(id => document.getElementById(id));
  const original = document.getElementById('original-price');
  const discounted = document.getElementById('discounted-price');

  function calculate() {
    let subtotal = (parseFloat(calcService.value) || 0) * (parseFloat(calcSize.value) || 1);
    addons.forEach(a => { if (a.checked) subtotal += parseFloat(a.value); });
    original.textContent = '£' + Math.round(subtotal);
    discounted.textContent = '£' + Math.round(subtotal * 0.8);
  }
  [calcService, calcSize, ...addons].forEach(el => el.addEventListener('change', calculate));
  calculate();
}

// Contact form feedback (contact.html only)
const form = document.getElementById('contact-form');
if (form) {
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    if (btn) btn.disabled = true;

    try {
      const res = await fetch('https://formspree.io/f/YOURFORMID', {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: new FormData(form)
      });

      if (res.ok) {
        alert('Thank you! Your quote request with 20% new customer discount has been received. Our team will contact you shortly.');
        form.reset();
      } else {
        alert('Sorry, something went wrong. Please try again or message us on WhatsApp.');
      }
    } catch (err) {
      alert('Network error. Please try again or message us on WhatsApp.');
    }

    if (btn) btn.disabled = false;
  });
}

// Gallery filter (gallery.html only)
document.querySelectorAll('.filter').forEach(btn => btn.addEventListener('click', () => {
  document.querySelectorAll('.filter').forEach(b => b.classList.toggle('active', b === btn));
  const f = btn.dataset.filter;
  document.querySelectorAll('.g-item').forEach(it => it.classList.toggle('hide', f !== 'all' && it.dataset.cat !== f));
}));

// Review form (testimonials.html only)
const reviewForm = document.getElementById('review-form');
if (reviewForm) reviewForm.addEventListener('submit', e => {
  e.preventDefault();
  alert('Thank you for your review!');
  reviewForm.reset();
});
