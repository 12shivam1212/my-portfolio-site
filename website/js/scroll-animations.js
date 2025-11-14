// Scroll-Triggered Animations
class ScrollAnimations {
    constructor() {
        this.observerOptions = {
            threshold: 0.15,
            rootMargin: '0px 0px -100px 0px'
        };
        
        this.init();
    }
    
    init() {
        // Add animation classes to elements
        const elementsToAnimate = document.querySelectorAll(`
            .section-header,
            .about-text,
            .about-image,
            .stat,
            .skill-category,
            .project-card,
            .contact-item,
            .contact-form
        `);
        
        elementsToAnimate.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(50px)';
            el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            el.setAttribute('data-scroll-animation', 'true');
            el.style.transitionDelay = `${(index % 3) * 0.1}s`;
        });
        
        // Create observer
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, this.observerOptions);
        
        // Observe all elements
        elementsToAnimate.forEach(el => observer.observe(el));
    }
}

// Initialize scroll animations
document.addEventListener('DOMContentLoaded', () => {
    new ScrollAnimations();
});
