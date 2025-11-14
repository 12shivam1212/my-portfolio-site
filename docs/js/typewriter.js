// Typewriter Effect for Hero Name
class TypewriterEffect {
    constructor() {
        this.init();
    }

    init() {
        const heroTitle = document.querySelector('.hero h1');
        if (!heroTitle) return;

        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        heroTitle.classList.add('typewriter-text');
        
        let charIndex = 0;
        
        const typeChar = () => {
            if (charIndex < text.length) {
                heroTitle.textContent += text.charAt(charIndex);
                charIndex++;
                setTimeout(typeChar, 100); // 100ms per character
            } else {
                // Keep cursor blinking after typing completes
                setTimeout(() => {
                    heroTitle.style.borderRight = '3px solid #6366f1';
                }, 500);
            }
        };

        // Start typing after page load
        setTimeout(typeChar, 500);
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    new TypewriterEffect();
});
