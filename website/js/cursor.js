// Custom Cursor Effect
(function() {
    // Create cursor elements
    const cursor = document.createElement('div');
    const cursorFollower = document.createElement('div');
    
    cursor.className = 'custom-cursor';
    cursorFollower.className = 'custom-cursor-follower';
    
    document.body.appendChild(cursor);
    document.body.appendChild(cursorFollower);
    
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;
    
    // Track mouse position
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
    });
    
    // Smooth follower animation
    function animateFollower() {
        const speed = 0.15;
        
        followerX += (mouseX - followerX) * speed;
        followerY += (mouseY - followerY) * speed;
        
        cursorFollower.style.left = followerX + 'px';
        cursorFollower.style.top = followerY + 'px';
        
        requestAnimationFrame(animateFollower);
    }
    animateFollower();
    
    // Add hover effects for clickable elements
    const clickableElements = document.querySelectorAll('a, button, .btn, .nav-link, .social-link, input, textarea');
    
    clickableElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('cursor-hover');
            cursorFollower.classList.add('cursor-hover');
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('cursor-hover');
            cursorFollower.classList.remove('cursor-hover');
        });
    });
    
    // Add click effect
    document.addEventListener('mousedown', () => {
        cursor.classList.add('cursor-click');
        cursorFollower.classList.add('cursor-click');
    });
    
    document.addEventListener('mouseup', () => {
        cursor.classList.remove('cursor-click');
        cursorFollower.classList.remove('cursor-click');
    });
    
    // Add styles
    const styles = `
        .custom-cursor,
        .custom-cursor-follower {
            position: fixed;
            pointer-events: none;
            z-index: 9999;
            border-radius: 50%;
            transform: translate(-50%, -50%);
            transition: all 0.1s ease;
        }
        
        .custom-cursor {
            width: 8px;
            height: 8px;
            background: var(--primary-color);
            box-shadow: 0 0 10px var(--primary-color);
        }
        
        .custom-cursor-follower {
            width: 30px;
            height: 30px;
            border: 2px solid var(--primary-color);
            opacity: 0.5;
        }
        
        .custom-cursor.cursor-hover {
            transform: translate(-50%, -50%) scale(1.5);
            background: var(--secondary-color);
            box-shadow: 0 0 15px var(--secondary-color);
        }
        
        .custom-cursor-follower.cursor-hover {
            transform: translate(-50%, -50%) scale(1.5);
            border-color: var(--secondary-color);
            opacity: 0.8;
        }
        
        .custom-cursor.cursor-click,
        .custom-cursor-follower.cursor-click {
            transform: translate(-50%, -50%) scale(0.8);
        }
        
        * {
            cursor: none !important;
        }
        
        /* Hide custom cursor on mobile */
        @media (max-width: 768px) {
            .custom-cursor,
            .custom-cursor-follower {
                display: none;
            }
            
            * {
                cursor: auto !important;
            }
        }
    `;
    
    if (!document.querySelector('#cursor-styles')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'cursor-styles';
        styleSheet.textContent = styles;
        document.head.appendChild(styleSheet);
    }
})();
