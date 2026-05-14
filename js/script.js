// ==================== WAIT FOR DOM TO LOAD ====================
document.addEventListener('DOMContentLoaded', function () {
    // Initialize all features
    initMobileMenu();
    initSmoothScroll();
    initNavbarScroll();
    initActiveNavLink();
    initSkillsAnimation();
    initContactForm();
    initScrollEffects();
    initHeroAnimation();
});

// ==================== MOBILE MENU TOGGLE ====================
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    const navItems = document.querySelectorAll('.nav-link');

    if (!hamburger || !navLinks) return;

    // Toggle menu on hamburger click
    hamburger.addEventListener('click', function (e) {
        e.stopPropagation();
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');

        // Prevent body scroll when menu is open
        if (navLinks.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    });

    // Close menu when clicking on a nav link
    navItems.forEach(item => {
        item.addEventListener('click', function () {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function (e) {
        if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
}

// ==================== NAVBAR SCROLL EFFECT ====================
function initNavbarScroll() {
    const navbar = document.getElementById('navbar');

    if (!navbar) return;

    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// ==================== ACTIVE NAV LINK HIGHLIGHT ====================
function initActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', function () {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (window.scrollY >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// ==================== SMOOTH SCROLLING ====================
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70;

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ==================== SKILLS ANIMATION ====================
function initSkillsAnimation() {
    const skillsSection = document.getElementById('skills');
    const skillBars = document.querySelectorAll('.skill-progress');

    if (!skillsSection || skillBars.length === 0) return;

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                skillBars.forEach(bar => {
                    const progress = bar.getAttribute('data-progress');
                    setTimeout(() => {
                        bar.style.width = progress + '%';
                    }, 300);
                });

                observer.unobserve(skillsSection);
            }
        });
    }, {
        threshold: 0.5
    });

    observer.observe(skillsSection);
}

// ==================== CONTACT FORM HANDLING ====================
function initContactForm() {
    const form = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    if (!form) return;

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };

        if (validateForm(formData)) {
            submitForm(formData, formMessage, form);
        } else {
            showFormMessage(formMessage, 'Please fill in all fields correctly.', 'error');
        }
    });
}

function validateForm(data) {
    if (!data.name || !data.email || !data.subject || !data.message) {
        return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        return false;
    }

    return true;
}

function submitForm(data, messageElement, form) {
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    setTimeout(() => {
        console.log('Form Data:', data);

        showFormMessage(messageElement, 'Message sent successfully! I\'ll get back to you soon.', 'success');

        form.reset();

        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 1500);
}

function showFormMessage(element, message, type) {
    element.textContent = message;
    element.className = `form-message ${type}`;

    setTimeout(() => {
        element.className = 'form-message';
    }, 5000);
}

// ==================== SCROLL EFFECTS ====================
function initScrollEffects() {
    const navbar = document.querySelector('.navbar');

    if (!navbar) return;

    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    });

    const animateOnScrollElements = document.querySelectorAll('.project-card, .skill-category');

    if (animateOnScrollElements.length === 0) return;

    const scrollObserver = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
                scrollObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    animateOnScrollElements.forEach(element => {
        element.style.opacity = '0';
        scrollObserver.observe(element);
    });
}

// ==================== HERO ANIMATION ====================
function initHeroAnimation() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    // Create canvas for particles
    const canvas = document.createElement('canvas');
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '0';

    hero.style.position = 'relative';
    hero.insertBefore(canvas, hero.firstChild);

    const ctx = canvas.getContext('2d');

    // Set canvas size
    function resizeCanvas() {
        canvas.width = hero.offsetWidth;
        canvas.height = hero.offsetHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle class
    class Particle {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 0.5 - 0.25;
            this.opacity = Math.random() * 0.5 + 0.2;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            // Wrap around edges
            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
        }

        draw() {
            ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    // Create particles
    const particleCount = 50;
    const particles = [];
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });

        // Draw connections between nearby particles
        particles.forEach((p1, i) => {
            particles.slice(i + 1).forEach(p2 => {
                const dx = p1.x - p2.x;
                const dy = p1.y - p2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 100) {
                    ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 * (1 - distance / 100)})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                }
            });
        });

        requestAnimationFrame(animate);
    }

    animate();
}
