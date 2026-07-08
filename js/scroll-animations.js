// ============================================
// SCROLL-DRIVEN ANIMATIONS — Staggered reveals
// ============================================
class ScrollAnimations {
    constructor() {
        this.observer = new IntersectionObserver(
            this._onIntersect.bind(this),
            { threshold: 0.12, rootMargin: '0px 0px -80px 0px' }
        );
        this._prepare();
    }

    _prepare() {
        // Apply stagger to grouped children inside each section
        const groups = [
            { parent: '.skills-grid',    children: '.skill-category' },
            { parent: '.projects-grid',  children: '.project-card'   },
            { parent: '.about-stats',    children: '.stat'           },
            { parent: '.contact-content',children: '.contact-item, .contact-form' },
        ];

        groups.forEach(({ parent, children }) => {
            document.querySelectorAll(parent).forEach(container => {
                container.querySelectorAll(children).forEach((el, i) => {
                    el.style.opacity = '0';
                    el.style.transform = 'translateY(40px)';
                    el.style.transition = `opacity 0.7s ease ${i * 0.12}s, transform 0.7s cubic-bezier(0.4,0,0.2,1) ${i * 0.12}s`;
                    el.setAttribute('data-scroll-animation', 'true');
                    this.observer.observe(el);
                });
            });
        });

        // Standalone elements
        document.querySelectorAll(`
            .section-header,
            .about-text,
            .about-image,
            .timeline-item
        `).forEach((el, i) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(32px)';
            el.style.transition = `opacity 0.7s ease ${(i % 4) * 0.08}s, transform 0.7s cubic-bezier(0.4,0,0.2,1) ${(i % 4) * 0.08}s`;
            el.setAttribute('data-scroll-animation', 'true');
            this.observer.observe(el);
        });
    }

    _onIntersect(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                this.observer.unobserve(entry.target);
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', () => new ScrollAnimations());
