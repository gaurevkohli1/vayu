/**
 * VAYU — Built to Flow
 * Motion system: Lenis smooth scroll + GSAP ScrollTrigger.
 * Sections: preloader, hero intro, editorial text reveals,
 * pinned horizontal collection, lookbook parallax, magnetic
 * buttons, waitlist form.
 */
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ASSETS } from './assets.js';

gsap.registerPlugin(ScrollTrigger);

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isDesktop = window.matchMedia('(min-width: 768px)').matches;
const hasFinePointer = window.matchMedia('(pointer: fine)').matches;

/* ---------------------------------------------------------- */
/* Smooth scroll                                              */
/* ---------------------------------------------------------- */
let lenis = null;

function initLenis() {
  if (prefersReducedMotion) return;

  lenis = new Lenis({
    duration: 1.15,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  });

  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
}

/* Anchor links scroll through Lenis so easing stays consistent */
function initAnchors() {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      closeMobileMenu();
      if (lenis) {
        lenis.scrollTo(target, { offset: 0, duration: 1.4 });
      } else {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

/* ---------------------------------------------------------- */
/* Preloader → hero intro                                     */
/* ---------------------------------------------------------- */
function initPreloader() {
  const preloader = document.getElementById('preloader');
  if (!preloader) return;

  if (prefersReducedMotion) {
    preloader.remove();
    return;
  }

  const tl = gsap.timeline();

  tl.to('.preloader__letter', {
    opacity: 1,
    y: 0,
    duration: 0.7,
    stagger: 0.09,
    ease: 'power3.out',
  })
    .to('.preloader__tag', { opacity: 1, duration: 0.5 }, '-=0.3')
    .to(preloader, {
      yPercent: -100,
      duration: 0.9,
      ease: 'power4.inOut',
      delay: 0.35,
      onComplete: () => preloader.remove(),
    })
    .add(heroIntro(), '-=0.45');
}

function heroIntro() {
  const tl = gsap.timeline();
  tl.to('.hero__word > span', {
    y: 0,
    duration: 1.1,
    stagger: 0.12,
    ease: 'power4.out',
  })
    .to('.hero__eyebrow > span, .hero__sub > span', {
      y: 0,
      duration: 0.9,
      stagger: 0.1,
      ease: 'power3.out',
    }, '-=0.7')
    .to('.hero__ctas', {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out',
    }, '-=0.5');
  return tl;
}

/* ---------------------------------------------------------- */
/* Editorial text reveals                                     */
/* ---------------------------------------------------------- */

/** Split a headline into per-line masked spans for reveal. */
function splitLines(el) {
  const words = el.textContent.trim().split(/\s+/);
  el.textContent = '';
  const probe = document.createElement('span');
  el.appendChild(probe);
  words.forEach((word, i) => {
    probe.insertAdjacentText('beforeend', (i ? ' ' : '') + word);
  });

  // Measure line breaks by wrapping words and comparing offsetTop.
  probe.remove();
  el.innerHTML = words
    .map((w) => `<span class="sr-word" style="display:inline-block">${w}</span>`)
    .join(' ');

  const lines = [];
  let currentTop = null;
  let current = [];
  el.querySelectorAll('.sr-word').forEach((wordEl) => {
    const top = wordEl.offsetTop;
    if (currentTop === null || Math.abs(top - currentTop) < 4) {
      current.push(wordEl.textContent);
      currentTop = currentTop === null ? top : currentTop;
    } else {
      lines.push(current.join(' '));
      current = [wordEl.textContent];
      currentTop = top;
    }
  });
  if (current.length) lines.push(current.join(' '));

  el.innerHTML = lines
    .map((line) => `<span class="sr-line"><span class="sr-inner">${line}</span></span>`)
    .join('');
}

function initTextReveals() {
  if (prefersReducedMotion) return;

  document.querySelectorAll('.split-reveal').forEach((el) => {
    splitLines(el);
    gsap.to(el.querySelectorAll('.sr-inner'), {
      y: 0,
      duration: 1.1,
      stagger: 0.1,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        once: true,
      },
    });
  });

  document.querySelectorAll('.reveal-line').forEach((el) => {
    if (el.closest('.hero')) return; // hero handled by intro timeline
    gsap.to(el.querySelector(':scope > span'), {
      y: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        once: true,
      },
    });
  });
}

/* ---------------------------------------------------------- */
/* Pinned horizontal collection scroll (desktop)              */
/* ---------------------------------------------------------- */
function initCollectionScroll() {
  const track = document.getElementById('collectionTrack');
  const section = document.querySelector('.collection');
  if (!track || !section) return;
  if (prefersReducedMotion || !isDesktop) return; // mobile uses native swipe

  const getDistance = () => Math.max(0, track.scrollWidth - window.innerWidth);

  gsap.to(track, {
    x: () => -getDistance(),
    ease: 'none',
    scrollTrigger: {
      trigger: section,
      start: 'top top',
      end: () => `+=${getDistance()}`,
      pin: true,
      scrub: 1,
      invalidateOnRefresh: true,
      anticipatePin: 1,
    },
  });

  gsap.utils.toArray('.pcard').forEach((card) => {
    gsap.from(card, {
      opacity: 0,
      y: 40,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: card,
        containerAnimation: undefined,
        start: 'top 95%',
        once: true,
      },
    });
  });
}

/* ---------------------------------------------------------- */
/* Lookbook parallax                                          */
/* ---------------------------------------------------------- */
function initLookbookParallax() {
  if (prefersReducedMotion || !isDesktop) return;

  gsap.utils.toArray('.look').forEach((item) => {
    const speed = parseFloat(item.dataset.speed || '1');
    const shift = (1 - speed) * 160;
    gsap.fromTo(
      item,
      { y: -shift },
      {
        y: shift,
        ease: 'none',
        scrollTrigger: {
          trigger: item,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.6,
        },
      }
    );
  });
}

/* ---------------------------------------------------------- */
/* Ambient section motion                                     */
/* ---------------------------------------------------------- */
function initAmbient() {
  if (prefersReducedMotion) return;

  // Air streaks drift across the Desire section as you scroll.
  gsap.utils.toArray('.desire__streak').forEach((streak, i) => {
    gsap.fromTo(
      streak,
      { xPercent: -40, opacity: 0 },
      {
        xPercent: 60,
        opacity: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: '.desire',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1 + i * 0.4,
        },
      }
    );
  });

  // Hero media eases back as you scroll away (depth cue).
  gsap.to('.hero__media', {
    yPercent: 18,
    opacity: 0.4,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true,
    },
  });
}

/* ---------------------------------------------------------- */
/* Magnetic buttons                                           */
/* ---------------------------------------------------------- */
function initMagnetic() {
  if (prefersReducedMotion || !hasFinePointer) return;

  document.querySelectorAll('[data-magnetic]').forEach((el) => {
    const strength = 22;
    const xTo = gsap.quickTo(el, 'x', { duration: 0.4, ease: 'power3.out' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.4, ease: 'power3.out' });

    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const relX = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
      const relY = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
      xTo(relX * strength);
      yTo(relY * strength * 0.7);
    });
    el.addEventListener('mouseleave', () => {
      xTo(0);
      yTo(0);
    });
  });
}

/* ---------------------------------------------------------- */
/* Nav behaviour                                              */
/* ---------------------------------------------------------- */
function initNav() {
  const nav = document.getElementById('nav');
  const burger = document.getElementById('navBurger');
  const menu = document.getElementById('mobileMenu');
  if (!nav) return;

  let lastY = 0;
  const onScroll = () => {
    const y = window.scrollY;
    nav.classList.toggle('is-scrolled', y > 40);
    // Hide on scroll down, show on scroll up (after the hero).
    if (y > window.innerHeight && y > lastY + 6) {
      nav.classList.add('is-hidden');
    } else if (y < lastY - 6 || y < 80) {
      nav.classList.remove('is-hidden');
    }
    lastY = y;
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (burger && menu) {
    burger.addEventListener('click', () => {
      const open = menu.classList.toggle('is-open');
      burger.setAttribute('aria-expanded', String(open));
      burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      menu.setAttribute('aria-hidden', String(!open));
      if (lenis) (open ? lenis.stop() : lenis.start());
    });
  }
}

function closeMobileMenu() {
  const burger = document.getElementById('navBurger');
  const menu = document.getElementById('mobileMenu');
  if (menu && menu.classList.contains('is-open')) {
    menu.classList.remove('is-open');
    menu.setAttribute('aria-hidden', 'true');
    if (burger) {
      burger.setAttribute('aria-expanded', 'false');
      burger.setAttribute('aria-label', 'Open menu');
    }
    if (lenis) lenis.start();
  }
}

/* ---------------------------------------------------------- */
/* Campaign media (Higgsfield-generated stills + clips)       */
/* ---------------------------------------------------------- */
function initCampaignMedia() {
  const videos = document.querySelectorAll('video[data-media]');

  videos.forEach((video) => {
    const src = ASSETS[video.dataset.media];
    if (!src) return;

    const posterKey = video.dataset.poster;
    if (posterKey && ASSETS[posterKey]) {
      video.poster = ASSETS[posterKey].preview || ASSETS[posterKey];
    }

    // Reduced motion: show the poster frame only, never autoplay film.
    if (prefersReducedMotion) {
      if (!video.poster) {
        const frame = video.closest('figure');
        (frame || video).remove();
      }
      return;
    }

    video.src = src;
    video.addEventListener('canplay', () => video.classList.add('is-ready'), { once: true });
    // If the CDN is unreachable, drop the element so the gradient
    // placeholder underneath carries the section (framed panels hide whole).
    video.addEventListener(
      'error',
      () => {
        const frame = video.closest('figure');
        (frame || video).remove();
        ScrollTrigger.refresh();
      },
      { once: true }
    );
  });

  if (prefersReducedMotion || !('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const video = entry.target;
        if (!video.src) return;
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      });
    },
    { rootMargin: '100px 0px' }
  );
  videos.forEach((video) => observer.observe(video));
}

/* ---------------------------------------------------------- */
/* Waitlist form                                              */
/* ---------------------------------------------------------- */
function initWaitlistForm() {
  const form = document.getElementById('waitlistForm');
  const success = document.getElementById('wformSuccess');
  const errorEl = document.getElementById('wformError');
  if (!form || !success) return;

  const emailOk = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(form).entries());
    const nameInput = form.querySelector('#wf-name');
    const emailInput = form.querySelector('#wf-email');

    nameInput.classList.remove('is-invalid');
    emailInput.classList.remove('is-invalid');

    const nameValid = String(data.name || '').trim().length > 1;
    const emailValid = emailOk(String(data.email || '').trim());

    if (!nameValid || !emailValid) {
      if (!nameValid) nameInput.classList.add('is-invalid');
      if (!emailValid) emailInput.classList.add('is-invalid');
      if (errorEl) errorEl.hidden = false;
      (!nameValid ? nameInput : emailInput).focus();
      return;
    }
    if (errorEl) errorEl.hidden = true;

    // No backend yet: persist leads locally so a future integration
    // (or manual export from devtools) can pick them up.
    try {
      const leads = JSON.parse(localStorage.getItem('vayu_waitlist') || '[]');
      leads.push({ ...data, ts: new Date().toISOString() });
      localStorage.setItem('vayu_waitlist', JSON.stringify(leads));
    } catch {
      /* storage unavailable (private mode) — still show success */
    }

    if (prefersReducedMotion) {
      form.hidden = true;
      success.hidden = false;
    } else {
      gsap.to(form, {
        opacity: 0,
        y: -16,
        duration: 0.45,
        ease: 'power2.in',
        onComplete: () => {
          form.hidden = true;
          success.hidden = false;
          gsap.from(success, { opacity: 0, y: 24, duration: 0.7, ease: 'power3.out' });
          ScrollTrigger.refresh();
        },
      });
    }
  });
}

/* ---------------------------------------------------------- */
/* Boot                                                       */
/* ---------------------------------------------------------- */
document.getElementById('year').textContent = String(new Date().getFullYear());

initLenis();
initNav();
initAnchors();
initPreloader();
initTextReveals();
initCollectionScroll();
initLookbookParallax();
initAmbient();
initMagnetic();
initCampaignMedia();
initWaitlistForm();

// Recalculate pinned distances after fonts settle.
if (document.fonts && document.fonts.ready) {
  document.fonts.ready.then(() => ScrollTrigger.refresh());
}
window.addEventListener('load', () => ScrollTrigger.refresh());
