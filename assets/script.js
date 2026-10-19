
(() => {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav-links');
  if (toggle && nav) toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  document.querySelectorAll('.nav-links a').forEach(a => a.addEventListener('click', () => {
    nav?.classList.remove('open'); toggle?.setAttribute('aria-expanded','false');
  }));
  const backTop = document.querySelector('.back-top');
  const updateTop = () => backTop?.classList.toggle('show', window.scrollY > 500);
  window.addEventListener('scroll', updateTop, {passive:true}); updateTop();
  backTop?.addEventListener('click', () => window.scrollTo({top:0,behavior:'smooth'}));
  const lightbox = document.querySelector('.lightbox');
  if (lightbox) {
    const lightboxImg = lightbox.querySelector('img');
    const close = () => { lightbox.classList.remove('open'); lightbox.setAttribute('aria-hidden','true'); document.body.style.overflow=''; };
    document.querySelectorAll('[data-lightbox]').forEach(link => link.addEventListener('click', e => {
      e.preventDefault(); lightboxImg.src = link.href; lightboxImg.alt = link.dataset.alt || 'Nisarg Family Guest House photo';
      lightbox.classList.add('open'); lightbox.setAttribute('aria-hidden','false'); document.body.style.overflow='hidden';
    }));
    lightbox.querySelector('button')?.addEventListener('click', close);
    lightbox.addEventListener('click', e => { if (e.target === lightbox) close(); });
    document.addEventListener('keydown', e => { if(e.key === 'Escape') close(); });
  }
  const tabs = document.querySelectorAll('[data-filter]');
  const cards = document.querySelectorAll('[data-category]');
  tabs.forEach(tab => tab.addEventListener('click', () => {
    tabs.forEach(t => {t.classList.remove('active'); t.setAttribute('aria-pressed','false');});
    tab.classList.add('active'); tab.setAttribute('aria-pressed','true');
    const filter = tab.dataset.filter;
    cards.forEach(card => card.hidden = !(filter === 'all' || card.dataset.category === filter));
  }));
  const form = document.querySelector('[data-enquiry-form]');
  form?.addEventListener('submit', e => {
    e.preventDefault();
    const d = new FormData(form);
    const msg = `Hello Nisarg Family Guest House, I would like to enquire about a stay.%0AName: ${encodeURIComponent(d.get('name')||'') }%0APhone: ${encodeURIComponent(d.get('phone')||'')}%0ACheck-in: ${encodeURIComponent(d.get('checkin')||'Not specified')}%0ACheck-out: ${encodeURIComponent(d.get('checkout')||'Not specified')}%0AGuests: ${encodeURIComponent(d.get('guests')||'Not specified')}%0AMessage: ${encodeURIComponent(d.get('message')||'')}`;
    window.location.href = `https://wa.me/917775935139?text=${msg}`;
  });
})();
