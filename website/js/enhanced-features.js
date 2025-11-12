// Enhanced Features - Glassmorphism, Magnetic Buttons, Animations, etc.
(function() {
    'use strict';
    
    // ===== LOADING SCREEN =====
    function initLoadingScreen() {
        const loader = document.createElement('div');
        loader.className = 'loading-screen';
        loader.innerHTML = `
            <div class="loader-content">
                <div class="loader-logo">SG</div>
                <div class="loader-bar">
                    <div class="loader-progress"></div>
                </div>
                <div class="loader-text">Loading Portfolio...</div>
            </div>
        `;
        document.body.appendChild(loader);
        
        let progress = 0;
        const progressBar = loader.querySelector('.loader-progress');
        
        const interval = setInterval(() => {
            progress += Math.random() * 15;
            if (progress > 100) progress = 100;
            progressBar.style.width = progress + '%';
            
            if (progress >= 100) {
                clearInterval(interval);
                setTimeout(() => {
                    loader.classList.add('fade-out');
                    setTimeout(() => loader.remove(), 500);
                }, 300);
            }
        }, 100);
    }
    
    // ===== MAGNETIC BUTTONS =====
    function initMagneticButtons() {
        const magneticButtons = document.querySelectorAll('.btn, .social-link, .project-link');
        
        magneticButtons.forEach(button => {
            button.addEventListener('mousemove', (e) => {
                const rect = button.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                button.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
            });
            
            button.addEventListener('mouseleave', () => {
                button.style.transform = 'translate(0, 0)';
            });
        });
    }
    
    // ===== 3D TILT EFFECT FOR CARDS =====
    function init3DTilt() {
        const cards = document.querySelectorAll('.project-card, .skill-category, .stat');
        
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            });
        });
    }
    
    // ===== NUMBER COUNTING ANIMATION =====
    function initNumberCounter() {
        const stats = document.querySelectorAll('.stat h4');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                    const target = entry.target;
                    const text = target.textContent;
                    const number = parseInt(text.match(/\d+/)[0]);
                    const suffix = text.replace(/\d+/, '');
                    
                    target.classList.add('counted');
                    animateNumber(target, 0, number, 2000, suffix);
                }
            });
        }, { threshold: 0.5 });
        
        stats.forEach(stat => observer.observe(stat));
    }
    
    function animateNumber(element, start, end, duration, suffix) {
        const range = end - start;
        const increment = range / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= end) {
                current = end;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current) + suffix;
        }, 16);
    }
    
    // ===== SKILL PROGRESS BARS =====
    function initSkillProgress() {
        const skillItems = document.querySelectorAll('.skill-item');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.setProperty('--skill-progress', '1');
                }
            });
        }, { threshold: 0.5 });
        
        skillItems.forEach(item => observer.observe(item));
    }
    
    // ===== FLOATING ELEMENTS =====
    function initFloatingElements() {
        const floatingElements = document.querySelectorAll('.hero-img-container, .skill-item i');
        
        floatingElements.forEach((el, index) => {
            const delay = index * 0.1;
            const duration = 3 + Math.random() * 2;
            
            el.style.animation = `float ${duration}s ease-in-out ${delay}s infinite`;
        });
    }
    
    // ===== PARALLAX SCROLL EFFECT =====
    function initParallax() {
        const parallaxElements = document.querySelectorAll('.hero-image, .about-image');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            
            parallaxElements.forEach(el => {
                const speed = 0.5;
                el.style.transform = `translateY(${scrolled * speed}px)`;
            });
        });
    }
    
    // ===== TEXT REVEAL ANIMATION =====
    function initTextReveal() {
        const textElements = document.querySelectorAll('h1, h2, h3');
        
        textElements.forEach(el => {
            const text = el.textContent;
            el.innerHTML = '';
            
            text.split('').forEach((char, index) => {
                const span = document.createElement('span');
                span.textContent = char === ' ' ? '\u00A0' : char;
                span.style.animationDelay = `${index * 0.05}s`;
                span.className = 'char-reveal';
                el.appendChild(span);
            });
        });
    }
    
    // ===== GRADIENT ANIMATION =====
    function initGradientAnimation() {
        const gradientElements = document.querySelectorAll('.text-gradient, .btn-primary');
        
        gradientElements.forEach(el => {
            el.style.backgroundSize = '200% 200%';
            el.style.animation = 'gradient-shift 3s ease infinite';
        });
    }
    
    // ===== SCROLL PROGRESS BAR =====
    function initScrollProgress() {
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        document.body.appendChild(progressBar);
        
        window.addEventListener('scroll', () => {
            const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (window.pageYOffset / windowHeight) * 100;
            progressBar.style.width = scrolled + '%';
        });
    }
    
    // ===== SOUND EFFECTS (Optional) =====
    function initSoundEffects() {
        // Create audio context for subtle hover sounds
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        let soundEnabled = localStorage.getItem('soundEnabled') === 'true';
        
        function playSound(frequency, duration) {
            if (!soundEnabled) return;
            
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.value = frequency;
            oscillator.type = 'sine';
            
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + duration);
        }
        
        // Add subtle sounds to interactions
        document.querySelectorAll('.btn, .nav-link').forEach(el => {
            el.addEventListener('mouseenter', () => playSound(800, 0.1));
            el.addEventListener('click', () => playSound(1000, 0.15));
        });
    }
    
    // ===== CURSOR TRAIL EFFECT =====
    function initCursorTrail() {
        const trail = [];
        const trailLength = 10;
        
        document.addEventListener('mousemove', (e) => {
            trail.push({ x: e.clientX, y: e.clientY, time: Date.now() });
            
            if (trail.length > trailLength) {
                trail.shift();
            }
        });
    }
    
    // ===== ADD ALL STYLES =====
    function addStyles() {
        const styles = `
            /* Loading Screen */
            .loading-screen {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: var(--background-dark);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                transition: opacity 0.5s ease;
            }
            
            .loading-screen.fade-out {
                opacity: 0;
            }
            
            .loader-content {
                text-align: center;
            }
            
            .loader-logo {
                font-size: 4rem;
                font-weight: bold;
                background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
                margin-bottom: 2rem;
                animation: pulse 1.5s ease-in-out infinite;
            }
            
            .loader-bar {
                width: 200px;
                height: 4px;
                background: var(--border-light);
                border-radius: 2px;
                overflow: hidden;
                margin: 0 auto 1rem;
            }
            
            .loader-progress {
                height: 100%;
                background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
                width: 0%;
                transition: width 0.3s ease;
            }
            
            .loader-text {
                color: var(--text-light);
                font-size: 0.9rem;
            }
            
            /* Glassmorphism */
            .navbar,
            .skill-category,
            .project-card,
            .contact-form,
            .contact-item {
                backdrop-filter: blur(10px);
                -webkit-backdrop-filter: blur(10px);
            }
            
            /* 3D Card Effect */
            .project-card,
            .skill-category,
            .stat {
                transition: transform 0.1s ease;
                transform-style: preserve-3d;
            }
            
            /* Scroll Progress Bar */
            .scroll-progress {
                position: fixed;
                top: 0;
                left: 0;
                height: 3px;
                background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
                z-index: 9999;
                transition: width 0.1s ease;
            }
            
            /* Floating Animation */
            @keyframes float {
                0%, 100% { transform: translateY(0px); }
                50% { transform: translateY(-20px); }
            }
            
            /* Gradient Shift Animation */
            @keyframes gradient-shift {
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
            }
            
            /* Pulse Animation */
            @keyframes pulse {
                0%, 100% { transform: scale(1); opacity: 1; }
                50% { transform: scale(1.05); opacity: 0.8; }
            }
            
            /* Character Reveal */
            .char-reveal {
                display: inline-block;
                opacity: 0;
                animation: char-fade-in 0.5s ease forwards;
            }
            
            @keyframes char-fade-in {
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
                from {
                    opacity: 0;
                    transform: translateY(20px);
                }
            }
            
            /* Skill Progress Effect */
            .skill-item {
                --skill-progress: 0;
                position: relative;
                overflow: hidden;
            }
            
            .skill-item::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: linear-gradient(90deg, transparent, var(--primary-color), transparent);
                transform: translateX(-100%);
                animation: skill-shimmer 2s ease-in-out infinite;
                opacity: calc(var(--skill-progress) * 0.3);
            }
            
            @keyframes skill-shimmer {
                to { transform: translateX(100%); }
            }
            
            /* Enhanced Hover Effects */
            .btn,
            .social-link,
            .project-link {
                transition: transform 0.1s ease;
            }
            
            /* Smooth Transitions */
            .project-card,
            .skill-category,
            .contact-item,
            .stat {
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            }
            
            /* Glow Effect on Hover */
            .btn-primary:hover {
                box-shadow: 0 0 30px rgba(99, 102, 241, 0.6);
            }
            
            .social-link:hover {
                box-shadow: 0 0 20px rgba(99, 102, 241, 0.4);
            }
            
            /* Advanced Card Shadows */
            .project-card:hover {
                box-shadow: 0 30px 60px rgba(0, 0, 0, 0.4);
            }
            
            /* Ripple Effect */
            .btn::before {
                content: '';
                position: absolute;
                top: 50%;
                left: 50%;
                width: 0;
                height: 0;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.3);
                transform: translate(-50%, -50%);
                transition: width 0.6s, height 0.6s;
            }
            
            .btn:active::before {
                width: 300px;
                height: 300px;
            }
        `;
        
        if (!document.querySelector('#enhanced-features-styles')) {
            const styleSheet = document.createElement('style');
            styleSheet.id = 'enhanced-features-styles';
            styleSheet.textContent = styles;
            document.head.appendChild(styleSheet);
        }
    }
    
    // ===== INITIALIZE ALL FEATURES =====
    document.addEventListener('DOMContentLoaded', () => {
        addStyles();
        initLoadingScreen();
        
        // Initialize features after loading
        setTimeout(() => {
            initMagneticButtons();
            init3DTilt();
            initNumberCounter();
            initSkillProgress();
            initFloatingElements();
            initParallax();
            initGradientAnimation();
            initScrollProgress();
            // initSoundEffects(); // Uncomment to enable sound
            initCursorTrail();
        }, 100);
    });
})();
