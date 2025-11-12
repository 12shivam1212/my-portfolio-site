// Typing Effect for Hero Subtitle
(function() {
    const subtitle = document.querySelector('.hero-subtitle');
    if (!subtitle) return;
    
    const roles = [
        'Full Stack Developer & Problem Solver',
        'UI/UX Enthusiast',
        'Creative Coder',
        'Tech Innovator',
        'Digital Creator'
    ];
    
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function type() {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            subtitle.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            subtitle.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }
        
        // Add blinking cursor
        subtitle.textContent += '|';
        
        // Check if word is complete
        if (!isDeleting && charIndex === currentRole.length) {
            // Pause at end
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingSpeed = 500;
        }
        
        setTimeout(type, typingSpeed);
    }
    
    // Start typing effect after a short delay
    setTimeout(() => {
        subtitle.textContent = '';
        type();
    }, 1000);
    
    // Add cursor blink animation
    const styles = `
        .hero-subtitle {
            min-height: 2rem;
        }
    `;
    
    if (!document.querySelector('#typing-styles')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'typing-styles';
        styleSheet.textContent = styles;
        document.head.appendChild(styleSheet);
    }
})();
