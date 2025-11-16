// Parallax Scrolling Effect
class ParallaxEffect {
    constructor() {
        this.init();
    }

    init() {
        // Add parallax background to sections
        this.addParallaxBackgrounds();
        
        // Listen to scroll events
        window.addEventListener('scroll', () => this.handleScroll(), { passive: true });
    }

    addParallaxBackgrounds() {
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            if (!section.classList.contains('hero')) {
                section.classList.add('parallax-section');
                
                const parallaxBg = document.createElement('div');
                parallaxBg.className = 'parallax-bg';
                section.insertBefore(parallaxBg, section.firstChild);
            }
        });
    }

    handleScroll() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.parallax-bg');
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.3 + (index * 0.1); // Different speeds for different sections
            const yPos = -(scrolled * speed);
            element.style.transform = `translate3d(0, ${yPos}px, 0)`;
        });

        // Parallax for hero section elements
        const hero = document.querySelector('.hero');
        if (hero && scrolled < window.innerHeight) {
            const heroContent = hero.querySelector('.hero-content');
            if (heroContent) {
                heroContent.style.transform = `translate3d(0, ${scrolled * 0.4}px, 0)`;
                heroContent.style.opacity = 1 - (scrolled / window.innerHeight);
            }
        }
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    new ParallaxEffect();
});
