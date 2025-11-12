// Pyramid Loader Preloader
window.addEventListener('load', function() {
    const preloader = document.getElementById('preloader');
    
    // Wait minimum 2.5 seconds to show the animation
    setTimeout(function() {
        preloader.classList.add('fade-out');
        
        // Remove from DOM after fade animation
        setTimeout(function() {
            preloader.style.display = 'none';
        }, 800);
    }, 2500);
});
