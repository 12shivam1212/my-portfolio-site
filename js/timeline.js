// Interactive Timeline
class Timeline {
    constructor() {
        this.init();
    }

    init() {
        this.createTimeline();
        this.setupAnimation();
    }

    createTimeline() {
        const aboutSection = document.querySelector('#about');
        if (!aboutSection) return;

        // Create timeline container
        const timelineContainer = document.createElement('div');
        timelineContainer.className = 'timeline-container';
        timelineContainer.innerHTML = `
            <h3 style="text-align: center; margin-bottom: 3rem; font-size: 2rem; background: linear-gradient(45deg, #6366f1, #8b5cf6); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">Experience Timeline</h3>
            <div class="timeline">
                <div class="timeline-item" data-index="0">
                    <div class="timeline-dot"></div>
                    <div class="timeline-content">
                        <div class="timeline-date">2024 - Present</div>
                        <h4>OnePlus</h4>
                        <p>AIML Enthusiast working on cutting-edge AI/ML projects</p>
                    </div>
                </div>
                <div class="timeline-item" data-index="1">
                    <div class="timeline-dot"></div>
                    <div class="timeline-content">
                        <div class="timeline-date">2023</div>
                        <h4>AI Pipeline Framework</h4>
                        <p>Developed comprehensive AI model deployment pipeline</p>
                    </div>
                </div>
                <div class="timeline-item" data-index="2">
                    <div class="timeline-dot"></div>
                    <div class="timeline-content">
                        <div class="timeline-date">2023</div>
                        <h4>SAKSHAM Platform</h4>
                        <p>Created student management system with live features</p>
                    </div>
                </div>
                <div class="timeline-item" data-index="3">
                    <div class="timeline-dot"></div>
                    <div class="timeline-content">
                        <div class="timeline-date">2022</div>
                        <h4>RP Real Estate Predictor</h4>
                        <p>Built ML model for property price prediction</p>
                    </div>
                </div>
            </div>
        `;

        // Insert after about text
        const aboutText = aboutSection.querySelector('.about-text');
        if (aboutText) {
            aboutText.parentElement.appendChild(timelineContainer);
        }
    }

    setupAnimation() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const index = entry.target.getAttribute('data-index');
                    setTimeout(() => {
                        entry.target.classList.add('timeline-item-show');
                    }, index * 200);
                }
            });
        }, { threshold: 0.3 });

        document.querySelectorAll('.timeline-item').forEach(item => {
            observer.observe(item);
        });
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    new Timeline();
});
