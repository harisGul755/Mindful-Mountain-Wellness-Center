gsap.registerPlugin(ScrollTrigger);
const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
const header = document.querySelector('header');
const burger = document.querySelector('.burger');
const $ = s => document.querySelector(s), $$ = s => gsap.utils.toArray(s);

burger?.addEventListener('click', () => { const open = header.classList.toggle('open'); burger.setAttribute('aria-expanded', open); });
$$('.nav a').forEach(a => a.addEventListener('click', () => { header.classList.remove('open'); burger?.setAttribute('aria-expanded', false); }));
addEventListener('scroll', () => header.classList.toggle('solid', scrollY > 60), { passive: true });

if (!still) {
  const keep = { clearProps: 'opacity,transform' };           // leave no inline styles behind, so nothing stays faded
  const rise = (el, v = {}) => gsap.from(el, { y: 40, opacity: 0, duration: .9, ease: 'power3.out', ...keep,
    scrollTrigger: { trigger: el, start: 'top 94%', once: true }, ...v });

  if ($('.hero h1')) {
    gsap.from('.hero h1, .hero p, .hero .btn', { y: 40, opacity: 0, duration: 1.1, stagger: .15, ease: 'power3.out', ...keep });
    gsap.from('.hero-art .frame, .badge', { scale: .92, opacity: 0, duration: 1.2, stagger: .2, delay: .3, ease: 'power3.out', ...keep });
    gsap.to('.hero-bg', { yPercent: 14, ease: 'none', scrollTrigger: { trigger: '.hero', scrub: true, start: 'top top', end: 'bottom top' } });
    gsap.to('.hero-art .small', { y: -50, ease: 'none', scrollTrigger: { trigger: '.hero', scrub: true, start: 'top top', end: 'bottom top' } });
  }
  if ($('.ph .bg')) gsap.to('.ph .bg', { yPercent: 12, ease: 'none', scrollTrigger: { trigger: '.ph', scrub: true, start: 'top top', end: 'bottom top' } });
  if ($('.cta .bg')) gsap.to('.cta .bg', { yPercent: 12, ease: 'none', scrollTrigger: { trigger: '.cta', scrub: true } });

  // every element gets its own trigger, so a missing section can never leave others hidden
  $$('.reveal, .card, .stack .frame, .boxes .glass, .steps .glass, .people .pro').forEach(el => rise(el));
  $$('.dark .grid > .frame').forEach(el => rise(el, { y: 0, scale: .88, duration: 1.2 }));

  ScrollTrigger.matchMedia({
    '(min-width: 861px)': () => {
      const rail = $('.rail');
      if (!rail) return;
      gsap.to(rail, { x: () => -(rail.scrollWidth - innerWidth + 80), ease: 'none',
        scrollTrigger: { trigger: '.pin', pin: true, scrub: 1, end: () => '+=' + (rail.scrollWidth - innerWidth), invalidateOnRefresh: true } });
    }
  });
  addEventListener('load', () => ScrollTrigger.refresh());
}
