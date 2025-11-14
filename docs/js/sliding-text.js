// Sliding Text Effect for Hero Subtitle
(function() {
    const subtitle = document.querySelector('.hero-subtitle');
    if (!subtitle) return;
    
    const roles = [
        'AIML Enthusiast',
        'Machine Learning Explorer',
        'AI Innovation Seeker',
        'Data Science Enthusiast',
        'Tech Problem Solver'
    ];
    
    let currentIndex = 0;
    
    // Set initial text
    subtitle.textContent = roles[0];
    subtitle.style.opacity = '1';
    
    // Add sliding animation with enhanced transitions
    function slideText() {
        // Add slide-out and fade-out effect
        subtitle.style.transform = 'translateY(-20px)';
        subtitle.style.opacity = '0';
        
        setTimeout(() => {
            // Change text
            currentIndex = (currentIndex + 1) % roles.length;
            subtitle.textContent = roles[currentIndex];
            
            // Reset position for slide-in
            subtitle.style.transform = 'translateY(20px)';
            
            // Small delay before slide-in
            setTimeout(() => {
                subtitle.style.transform = 'translateY(0)';
                subtitle.style.opacity = '1';
            }, 50);
        }, 600);
    }
    
    // Change text every 3 seconds
    setInterval(slideText, 3000);
})();
