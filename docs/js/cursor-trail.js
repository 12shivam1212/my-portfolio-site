// Cursor Trail Effect
class CursorTrail {
    constructor() {
        this.colors = ['#6366f1', '#8b5cf6', '#06b6d4'];
        this.init();
    }

    init() {
        // Only enable on desktop devices
        if (window.innerWidth > 768) {
            document.addEventListener('mousemove', (e) => this.createTrail(e));
        }
    }

    createTrail(e) {
        const trail = document.createElement('div');
        trail.className = 'cursor-trail';
        
        // Random color from theme
        const color = this.colors[Math.floor(Math.random() * this.colors.length)];
        trail.style.background = `radial-gradient(circle, ${color}, transparent)`;
        
        // Use clientX/Y for viewport position instead of pageX/Y
        trail.style.left = e.clientX - 10 + 'px';
        trail.style.top = e.clientY - 10 + 'px';
        
        document.body.appendChild(trail);
        
        // Remove after animation
        setTimeout(() => {
            trail.remove();
        }, 1000);
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    new CursorTrail();
});
