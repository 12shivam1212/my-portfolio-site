// Dark Mode Toggle
(function() {
    const toggle = document.getElementById('dark-mode-toggle');
    if (!toggle) return;
    
    const icon = toggle.querySelector('i');
    
    // Check for saved theme preference
    const currentTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateIcon(currentTheme);
    
    // Toggle theme
    toggle.addEventListener('click', () => {
        const theme = document.documentElement.getAttribute('data-theme');
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateIcon(newTheme);
        
        // Add transition effect
        document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
    });
    
    function updateIcon(theme) {
        if (theme === 'dark') {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    }
    
    // Add light theme styles
    const styles = `
        /* Theme Toggle Button */
        .theme-toggle {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            border: none;
            background: var(--card-bg);
            color: var(--text-dark);
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: var(--shadow);
            margin-left: auto;
            margin-right: 1rem;
        }
        
        .theme-toggle:hover {
            background: var(--primary-color);
            transform: rotate(180deg);
            color: var(--white);
        }
        
        .theme-toggle i {
            font-size: 1.1rem;
        }
        
        /* Light Theme Variables */
        [data-theme="light"] {
            --primary-color: #6366f1;
            --secondary-color: #8b5cf6;
            --accent-color: #06b6d4;
            --text-dark: #1e293b;
            --text-light: #475569;
            --background-light: #f1f5f9;
            --background-dark: #ffffff;
            --card-bg: #f8fafc;
            --border-light: #e2e8f0;
            --shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
            --shadow-lg: 0 20px 40px rgba(0, 0, 0, 0.15);
        }
        
        /* Smooth theme transitions */
        * {
            transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
        }
        
        @media (max-width: 768px) {
            .theme-toggle {
                position: absolute;
                right: 70px;
                top: 15px;
            }
        }
    `;
    
    if (!document.querySelector('#dark-mode-styles')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'dark-mode-styles';
        styleSheet.textContent = styles;
        document.head.appendChild(styleSheet);
    }
})();
