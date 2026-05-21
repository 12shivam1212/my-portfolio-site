// Testimonials Carousel
class TestimonialsCarousel {
    constructor() {
        this.currentIndex = 0;
        this.testimonials = [
            {
                name: 'Education',
                role: 'NIT Kurukshetra',
                text: 'Pursuing B.Tech in Sustainable Energy Technology under the Electrical Engineering department.',
                avatar: '🎓'
            },
            {
                name: 'Other Works & Interests',
                role: 'Renewable Energy',
                text: 'Focused on Solar PV Systems, Energy Analytics, MPPT Algorithms, and intelligent smart energy solutions.',
                avatar: '☀️'
            },
            {
                name: 'Software Skills',
                role: 'Full-Stack & Data',
                text: 'Experience with Python, JavaScript, React.js, Node.js, and integrating REST APIs with databases like MySQL and Supabase.',
                avatar: '💻'
            },
            {
                name: 'Design & Tools',
                role: 'UI/UX & Prototyping',
                text: 'Proficient in Figma, UI/UX Design, MATLAB/Simulink for simulations, and strong team collaboration skills.',
                avatar: '🎨'
            }
        ];
        
        this.init();
    }

    init() {
        this.createCarousel();
        this.startAutoPlay();
    }

    createCarousel() {
        const contactSection = document.querySelector('#contact');
        console.log('Contact section found:', contactSection);
        if (!contactSection) {
            console.error('Contact section not found!');
            return;
        }

        const carouselContainer = document.createElement('div');
        carouselContainer.className = 'testimonials-section';
        carouselContainer.innerHTML = `
            <h3 class="section-title" style="text-align: center; margin-bottom: 3rem; font-size: 2rem;">About Shivam</h3>
            <div class="testimonials-carousel">
                <button class="carousel-btn prev-btn" aria-label="Previous testimonial">
                    <i class="fas fa-chevron-left"></i>
                </button>
                <div class="testimonials-container">
                    ${this.testimonials.map((testimonial, index) => `
                        <div class="testimonial-card ${index === 0 ? 'active' : ''}" data-index="${index}">
                            <div class="testimonial-avatar">${testimonial.avatar}</div>
                            <p class="testimonial-text">"${testimonial.text}"</p>
                            <h4 class="testimonial-name">${testimonial.name}</h4>
                            <p class="testimonial-role">${testimonial.role}</p>
                        </div>
                    `).join('')}
                </div>
                <button class="carousel-btn next-btn" aria-label="Next testimonial">
                    <i class="fas fa-chevron-right"></i>
                </button>
            </div>
            <div class="carousel-dots">
                ${this.testimonials.map((_, index) => `
                    <span class="dot ${index === 0 ? 'active' : ''}" data-index="${index}"></span>
                `).join('')}
            </div>
        `;

        // Insert before contact section
        contactSection.parentElement.insertBefore(carouselContainer, contactSection);

        // Add event listeners
        this.addEventListeners();
    }

    addEventListeners() {
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');
        const dots = document.querySelectorAll('.dot');

        prevBtn?.addEventListener('click', () => this.prevSlide());
        nextBtn?.addEventListener('click', () => this.nextSlide());

        dots.forEach(dot => {
            dot.addEventListener('click', () => {
                const index = parseInt(dot.getAttribute('data-index'));
                this.goToSlide(index);
            });
        });
    }

    goToSlide(index) {
        const cards = document.querySelectorAll('.testimonial-card');
        const dots = document.querySelectorAll('.dot');

        cards.forEach(card => card.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        cards[index]?.classList.add('active');
        dots[index]?.classList.add('active');

        this.currentIndex = index;
    }

    nextSlide() {
        this.currentIndex = (this.currentIndex + 1) % this.testimonials.length;
        this.goToSlide(this.currentIndex);
    }

    prevSlide() {
        this.currentIndex = (this.currentIndex - 1 + this.testimonials.length) % this.testimonials.length;
        this.goToSlide(this.currentIndex);
    }

    startAutoPlay() {
        setInterval(() => {
            this.nextSlide();
        }, 5000); // Auto-advance every 5 seconds
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded - Initializing TestimonialsCarousel');
    new TestimonialsCarousel();
});
