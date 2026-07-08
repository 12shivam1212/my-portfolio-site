// ============================================
// TYPEWRITER EFFECT — cycles through roles
// ============================================
class TypewriterEffect {
    constructor(el, roles, options = {}) {
        this.el       = el;
        this.roles    = roles;
        this.typeSpeed  = options.typeSpeed  || 80;
        this.deleteSpeed = options.deleteSpeed || 45;
        this.pauseEnd   = options.pauseEnd   || 1800;
        this.pauseStart = options.pauseStart || 300;
        this.roleIndex  = 0;
        this.charIndex  = 0;
        this.isDeleting = false;
        this._run();
    }

    _run() {
        const current = this.roles[this.roleIndex];
        const displayed = current.slice(0, this.charIndex);
        this.el.textContent = displayed;

        let delay;

        if (!this.isDeleting) {
            // Typing forward
            if (this.charIndex < current.length) {
                this.charIndex++;
                delay = this.typeSpeed + Math.random() * 30;
            } else {
                // Finished word — pause then start deleting
                this.isDeleting = true;
                delay = this.pauseEnd;
            }
        } else {
            // Deleting
            if (this.charIndex > 0) {
                this.charIndex--;
                delay = this.deleteSpeed;
            } else {
                // Finished deleting — move to next role
                this.isDeleting = false;
                this.roleIndex = (this.roleIndex + 1) % this.roles.length;
                delay = this.pauseStart;
            }
        }

        setTimeout(() => this._run(), delay);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Find the span/element where we want the typewriter
    // Insert a span inside hero-description or create one under the title
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) return;

    // Create the role line below the name
    let roleEl = document.getElementById('typewriter-role');
    if (!roleEl) {
        roleEl = document.createElement('p');
        roleEl.id = 'typewriter-role';
        roleEl.className = 'hero-role-text';
        heroTitle.insertAdjacentElement('afterend', roleEl);
    }

    // Inject cursor blink style
    const style = document.createElement('style');
    style.textContent = `
        .hero-role-text {
            font-size: 1.25rem;
            font-weight: 500;
            color: var(--primary-color);
            margin-bottom: 1.2rem;
            min-height: 1.8em;
            letter-spacing: 0.02em;
        }
        .hero-role-text::after {
            content: '|';
            display: inline-block;
            margin-left: 2px;
            color: var(--primary-color);
            animation: tw-blink 0.75s step-end infinite;
            font-weight: 300;
        }
        @keyframes tw-blink {
            from, to { opacity: 1; }
            50%       { opacity: 0; }
        }
    `;
    document.head.appendChild(style);

    new TypewriterEffect(roleEl, [
        'AIML Enthusiast',
        'Full Stack Developer',
        'Drone Tech Explorer',
        'Problem Solver',
        'UI/UX Designer',
    ]);
});
