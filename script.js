/* ============================================
   PORTFOLIO INTERACTIVITY — script.js
   ============================================ */

(function () {
    'use strict';

    // ---- Intersection Observer for scroll animations ----
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const animObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Don't unobserve so re-entry still works, but for counters we do
            }
        });
    }, observerOptions);

    document.querySelectorAll('.anim-fade-up').forEach(el => {
        animObserver.observe(el);
    });

    // ---- Animated Counters ----
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('[data-target]').forEach(el => {
        counterObserver.observe(el);
    });

    function animateCounter(el) {
        const target = parseInt(el.getAttribute('data-target'));
        const suffix = el.getAttribute('data-suffix') || '';
        const duration = 2000;
        const start = performance.now();

        // Format large numbers
        function formatNumber(n) {
            if (target >= 100000) {
                return (n / 100000).toFixed(1) + 'L';
            }
            return Math.floor(n).toLocaleString();
        }

        function update(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = eased * target;

            el.textContent = formatNumber(current) + suffix;

            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }

        requestAnimationFrame(update);
    }

    // ---- Navigation scroll behavior ----
    const nav = document.getElementById('nav');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 80) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    }, { passive: true });

    // ---- Active nav link highlighting ----
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function highlightNav() {
        const scrollY = window.scrollY + 120;

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollY >= top && scrollY < top + height) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightNav, { passive: true });

    // ---- Mobile menu toggle ----
    const navToggle = document.getElementById('navToggle');
    const navLinksContainer = document.getElementById('navLinks');
    const hamburger = navToggle.querySelector('.hamburger');

    navToggle.addEventListener('click', () => {
        navLinksContainer.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close mobile menu on link click
    navLinksContainer.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navLinksContainer.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // ---- Typing Effect ----
    const typingEl = document.getElementById('typingText');
    const phrases = [
    'Engineering Intelligent Systems.',
    'Turning Data into Intelligence.',
    'Building AI-Powered Solutions.',
    'Designing Scalable Cloud Systems.',
    'Making Data Work Smarter.',
    'Automating the Future with AI.',
    'From Algorithms to Applications.',
    'Transforming Ideas into Technology.'
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 60;

    function typeEffect() {
        const current = phrases[phraseIndex];

        if (isDeleting) {
            typingEl.textContent = current.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 30;
        } else {
            typingEl.textContent = current.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 60;
        }

        if (!isDeleting && charIndex === current.length) {
            typeSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeSpeed = 400; // Pause before next phrase
        }

        setTimeout(typeEffect, typeSpeed);
    }

    // Start typing after a short delay
    setTimeout(typeEffect, 1000);

    // ---- Smooth scroll for anchor links ----
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 80;
                const position = target.offsetTop - offset;
                window.scrollTo({
                    top: position,
                    behavior: 'smooth'
                });
            }
        });
    });

})();
