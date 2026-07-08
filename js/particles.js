// Full-Page Floating Bubbles Background
class BubbleBackground {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.bubbles = [];
        this.bubbleCount = window.innerWidth < 768 ? 30 : 55;
        this.animFrame = null;

        this.init();
    }

    init() {
        this.canvas.id = 'bubble-canvas';
        this.canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 1;
            pointer-events: none;
        `;
        document.body.insertBefore(this.canvas, document.body.firstChild);

        this.resize();
        this.createBubbles();
        this.animate();

        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        this.canvas.width  = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    randomRedColor() {
        const type = Math.random();
        if (type < 0.45) {
            // Deep crimson / blood red
            return {
                r: 180 + Math.floor(Math.random() * 60),
                g: Math.floor(Math.random() * 20),
                b: Math.floor(Math.random() * 25)
            };
        } else if (type < 0.75) {
            // Bright red / scarlet
            return {
                r: 220 + Math.floor(Math.random() * 35),
                g: 20 + Math.floor(Math.random() * 40),
                b: Math.floor(Math.random() * 15)
            };
        } else {
            // Ember orange-red
            return {
                r: 230 + Math.floor(Math.random() * 25),
                g: 60 + Math.floor(Math.random() * 80),
                b: 0
            };
        }
    }

    createBubbles() {
        for (let i = 0; i < this.bubbleCount; i++) {
            const c = this.randomRedColor();
            this.bubbles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                radius: Math.random() * 4 + 1.5,
                vx: (Math.random() - 0.5) * 0.45,
                vy: (Math.random() - 0.5) * 0.45 - 0.08, // slight upward drift
                r: c.r, g: c.g, b: c.b,
                opacity: Math.random() * 0.38 + 0.12,
                pulsePhase: Math.random() * Math.PI * 2,
                pulseSpeed: Math.random() * 0.02 + 0.005
            });
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.bubbles.forEach((b, i) => {
            // Update
            b.x += b.vx;
            b.y += b.vy;
            b.pulsePhase += b.pulseSpeed;

            // Wrap around screen
            if (b.x < -b.radius * 2)   b.x = this.canvas.width  + b.radius;
            if (b.x > this.canvas.width  + b.radius * 2) b.x = -b.radius;
            if (b.y < -b.radius * 2)   b.y = this.canvas.height + b.radius;
            if (b.y > this.canvas.height + b.radius * 2) b.y = -b.radius;

            const pulseOpacity = b.opacity + Math.sin(b.pulsePhase) * 0.06;
            const pulseRadius  = b.radius  + Math.sin(b.pulsePhase * 1.3) * 0.5;

            // Draw glowing bubble
            const grad = this.ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, pulseRadius * 2.5);
            grad.addColorStop(0,   `rgba(${b.r}, ${b.g}, ${b.b}, ${pulseOpacity})`);
            grad.addColorStop(0.5, `rgba(${b.r}, ${b.g}, ${b.b}, ${pulseOpacity * 0.4})`);
            grad.addColorStop(1,   `rgba(${b.r}, ${b.g}, ${b.b}, 0)`);

            this.ctx.beginPath();
            this.ctx.arc(b.x, b.y, pulseRadius * 2.5, 0, Math.PI * 2);
            this.ctx.fillStyle = grad;
            this.ctx.fill();

            // Inner bright core
            this.ctx.beginPath();
            this.ctx.arc(b.x, b.y, pulseRadius, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(${b.r}, ${b.g}, ${b.b}, ${Math.min(pulseOpacity * 1.5, 0.7)})`;
            this.ctx.fill();

            // Draw connections between nearby bubbles
            this.bubbles.slice(i + 1).forEach(ob => {
                const dx = b.x - ob.x;
                const dy = b.y - ob.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 130) {
                    const alpha = (1 - dist / 130) * 0.18;
                    this.ctx.beginPath();
                    this.ctx.strokeStyle = `rgba(${b.r}, ${b.g}, ${b.b}, ${alpha})`;
                    this.ctx.lineWidth = 0.8;
                    this.ctx.moveTo(b.x, b.y);
                    this.ctx.lineTo(ob.x, ob.y);
                    this.ctx.stroke();
                }
            });
        });

        this.ctx.globalAlpha = 1;
        this.animFrame = requestAnimationFrame(() => this.animate());
    }
}

// Initialize bubble background
document.addEventListener('DOMContentLoaded', () => {
    new BubbleBackground();
});
