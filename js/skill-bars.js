// Skill Progress Bars Animation
class SkillBars {
    constructor() {
        this.skills = [
            { name: 'Java', level: 85 },
            { name: 'C', level: 80 },
            { name: 'Python', level: 90 },
            { name: 'MySQL', level: 75 },
            { name: 'AI/ML', level: 88 },
            { name: 'Design (Canva, Figma)', level: 82 },
            { name: 'Management & Leadership', level: 85 },
            { name: 'Problem Solving', level: 92 },
            { name: 'Communication', level: 87 }
        ];
        
        this.init();
    }

    init() {
        this.addProgressBars();
        this.setupObserver();
    }

    addProgressBars() {
        const skillItems = document.querySelectorAll('.skill-item');
        
        skillItems.forEach((item, index) => {
            if (index < this.skills.length) {
                const skillData = this.skills[index];
                
                // Create progress container
                const progressContainer = document.createElement('div');
                progressContainer.className = 'skill-progress-container';
                
                // Create progress bar
                const progressBar = document.createElement('div');
                progressBar.className = 'skill-progress-bar';
                progressBar.setAttribute('data-progress', skillData.level);
                
                progressContainer.appendChild(progressBar);
                item.appendChild(progressContainer);
            }
        });
    }

    setupObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progressBar = entry.target.querySelector('.skill-progress-bar');
                    if (progressBar && !progressBar.classList.contains('animated')) {
                        const progress = progressBar.getAttribute('data-progress');
                        setTimeout(() => {
                            progressBar.style.width = progress + '%';
                            progressBar.classList.add('animated');
                        }, 200);
                    }
                }
            });
        }, { threshold: 0.5 });

        document.querySelectorAll('.skill-item').forEach(item => {
            observer.observe(item);
        });
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    new SkillBars();
});
