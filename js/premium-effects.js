// ============================================
// PREMIUM EFFECTS
// 1. Magnetic Buttons
// 2. 3D Card Tilt
// 3. Number Counter Animation
// 4. Active Nav Section Observer
// 5. Scroll Reveals
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    initMagneticButtons();
    initCardTilt();
    initCounters();
    initActiveNav();
    initScrollReveals();
});

// ---- 1. Magnetic Buttons ----
function initMagneticButtons() {
    const buttons = document.querySelectorAll('.btn');

    buttons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const centerX = rect.left + rect.width  / 2;
            const centerY = rect.top  + rect.height / 2;
            const deltaX = (e.clientX - centerX) * 0.35;
            const deltaY = (e.clientY - centerY) * 0.35;
            // Use inline style directly — bypass CSS hover transforms
            btn.style.setProperty('transform', `translate(${deltaX}px, ${deltaY}px)`, 'important');
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.setProperty('transform', 'translate(0, 0)', 'important');
        });
    });
}

// ---- 2. 3D Card Tilt ----
function initCardTilt() {
    const cards = document.querySelectorAll('.project-card, .skill-category');
    const MAX_TILT = 10;

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const cx = rect.width  / 2;
            const cy = rect.height / 2;

            const rotateX = ((y - cy) / cy) * -MAX_TILT;
            const rotateY = ((x - cx) / cx) *  MAX_TILT;

            card.style.setProperty(
                'transform',
                `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale(1.02)`,
                'important'
            );
            card.style.transition = 'transform 0.08s ease-out';
        });

        card.addEventListener('mouseleave', () => {
            card.style.setProperty(
                'transform',
                'perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0px) scale(1)',
                'important'
            );
            card.style.transition = 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)';
        });
    });
}

// ---- 3. Number Counter ----
function initCounters() {
    const counters = document.querySelectorAll('[data-count]');
    if (!counters.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const el = entry.target;
            const target = parseInt(el.getAttribute('data-count'), 10);
            const suffix = el.getAttribute('data-suffix') || '';

            observer.unobserve(el);

            // Delay 400ms so scroll-reveal opacity transition finishes first
            setTimeout(() => {
                const totalSteps = 40;
                const stepDelay  = 1000 / totalSteps; // ~25ms each → 1s total
                let step = 0;

                el.textContent = '0' + suffix;

                const interval = setInterval(() => {
                    step++;
                    const progress = step / totalSteps;
                    // Ease-out quad: fast start, slow finish
                    const eased = 1 - Math.pow(1 - progress, 2);
                    const value = Math.round(eased * target);
                    el.textContent = value + suffix;

                    if (step >= totalSteps) {
                        el.textContent = target + suffix; // guarantee exact value
                        clearInterval(interval);
                    }
                }, stepDelay);
            }, 400);
        });
    }, { threshold: 0.15 }); // low threshold — fire as soon as partially visible

    counters.forEach(el => observer.observe(el));
}

// ---- 4. Active Nav Highlight ----
function initActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, { threshold: 0.4, rootMargin: '-80px 0px -40% 0px' });

    sections.forEach(s => observer.observe(s));
}

// ---- 5. Scroll Reveals ----
function initScrollReveals() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

    document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
        observer.observe(el);
    });
}
