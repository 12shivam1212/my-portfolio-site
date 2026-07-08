// Red Smoke Cursor Effect
class RedSmokeCursor {
    constructor() {
        this.particles = [];
        this.mouse = { x: 0, y: 0 };
        this.isMoving = false;
        this.moveTimer = null;

        // Only enable on desktop (non-touch) devices
        if (window.innerWidth > 768 && !('ontouchstart' in window)) {
            this.init();
        }
    }

    init() {
        document.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
            this.isMoving = true;
            clearTimeout(this.moveTimer);
            this.moveTimer = setTimeout(() => { this.isMoving = false; }, 100);

            // Spawn multiple smoke puffs per move
            const count = Math.floor(Math.random() * 2) + 1;
            for (let i = 0; i < count; i++) {
                this.spawnSmoke(e.clientX, e.clientY);
            }
        });
    }

    spawnSmoke(x, y) {
        const smoke = document.createElement('div');
        smoke.className = 'red-smoke-particle';

        const size = Math.random() * 35 + 15; // 15–50px
        const offsetX = (Math.random() - 0.5) * 20;
        const offsetY = (Math.random() - 0.5) * 20;

        // Pick a red/crimson/ember shade
        const hue = Math.random() < 0.7
            ? `rgba(${220 + Math.floor(Math.random()*35)}, ${Math.floor(Math.random()*30)}, ${Math.floor(Math.random()*30)}, 0.55)`
            : `rgba(255, ${80 + Math.floor(Math.random()*80)}, 0, 0.45)`; // orange ember

        smoke.style.cssText = `
            position: fixed;
            left: ${x + offsetX - size / 2}px;
            top: ${y + offsetY - size / 2}px;
            width: ${size}px;
            height: ${size}px;
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            background: radial-gradient(circle, ${hue}, transparent 70%);
            filter: blur(${Math.random() * 4 + 3}px);
            mix-blend-mode: screen;
            animation: redSmokeRise ${Math.random() * 0.6 + 0.7}s ease-out forwards;
            transform-origin: center;
        `;

        document.body.appendChild(smoke);
        setTimeout(() => smoke.remove(), 1300);
    }
}

// Inject the keyframe animation once
(function injectSmokeStyles() {
    if (document.getElementById('red-smoke-styles')) return;
    const style = document.createElement('style');
    style.id = 'red-smoke-styles';
    style.textContent = `
        @keyframes redSmokeRise {
            0%   { opacity: 0.85; transform: scale(0.6) translateY(0px) rotate(0deg); }
            40%  { opacity: 0.55; transform: scale(1.2) translateY(-12px) rotate(15deg); }
            100% { opacity: 0;    transform: scale(1.8) translateY(-30px) rotate(30deg); }
        }
    `;
    document.head.appendChild(style);
})();

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    new RedSmokeCursor();
});
