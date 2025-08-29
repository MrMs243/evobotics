// Evobotics Landing Page Interactive Effects
class EvoroboticsLanding {
    constructor() {
        this.init();
    }

    init() {
        this.setupLoadingScreen();
        this.createParticleSystem();
        this.setupInteractiveElements();
        this.initializeAnimations();
        this.setupResponsiveHandlers();
    }

    // Loading Screen Management
    setupLoadingScreen() {
        const loadingOverlay = document.querySelector('.loading-overlay');
        const loadingText = document.querySelector('.loading-text');
        
        const loadingMessages = [
            'Initializing Evobotics...',
            'Loading systems...'
        ];

        let messageIndex = 0;
        const             messageInterval = setInterval(() => {
            if (messageIndex < loadingMessages.length - 1) {
                messageIndex++;
                loadingText.textContent = loadingMessages[messageIndex];
            } else {
                clearInterval(messageInterval);
            }
        }, 400);

        // Hide loading screen after animations
        setTimeout(() => {
            loadingOverlay.classList.add('hidden');
            this.startMainAnimations();
        }, 1200);
    }

    // Dynamic Particle System
    createParticleSystem() {
        const particleContainer = document.createElement('div');
        particleContainer.className = 'dynamic-particles';
        particleContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 0;
        `;
        document.body.appendChild(particleContainer);

        // Create minimal floating particles
        for (let i = 0; i < 8; i++) {
            this.createParticle(particleContainer);
        }
    }

    createParticle(container) {
        const particle = document.createElement('div');
        const size = Math.random() * 2 + 1;
        const color = '#00ffff';
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: ${color};
            border-radius: 50%;
            box-shadow: 0 0 10px ${color}, 0 0 20px ${color};
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: particleFloat ${4 + Math.random() * 2}s ease-in-out infinite;
            animation-delay: ${Math.random() * 1}s;
            opacity: 0.4;
        `;

        container.appendChild(particle);

        // Add random movement
        this.animateParticle(particle);
    }

    animateParticle(particle) {
        const duration = 6000 + Math.random() * 3000;
        const startX = parseFloat(particle.style.left);
        const startY = parseFloat(particle.style.top);
        const endX = Math.random() * 100;
        const endY = Math.random() * 100;

        const animation = particle.animate([
            { left: startX + '%', top: startY + '%' },
            { left: endX + '%', top: endY + '%' }
        ], {
            duration: duration,
            easing: 'ease-in-out',
            fill: 'forwards'
        });

        animation.onfinish = () => {
            particle.style.left = endX + '%';
            particle.style.top = endY + '%';
            this.animateParticle(particle);
        };
    }



    // Interactive Elements
    setupInteractiveElements() {
        // Robot interaction
        const robot = document.querySelector('.robot');
        if (robot) {
            robot.addEventListener('mouseenter', this.activateRobot.bind(this));
            robot.addEventListener('mouseleave', this.deactivateRobot.bind(this));
            robot.addEventListener('click', this.robotClickEffect.bind(this));
        }

        // Feature cards hover effects
        const featureCards = document.querySelectorAll('.feature-card');
        featureCards.forEach(card => {
            card.addEventListener('mouseenter', this.cardHoverEffect.bind(this));
            card.addEventListener('mouseleave', this.cardLeaveEffect.bind(this));
        });

        // Logo interaction
        const logo = document.querySelector('.logo-text');
        if (logo) {
            logo.addEventListener('click', this.logoClickEffect.bind(this));
        }

        // Scroll-triggered animations
        this.setupScrollAnimations();
    }

    activateRobot(event) {
        const robot = event.currentTarget;
        robot.style.opacity = '1';
        robot.style.transform = 'scale(1.05)';
        robot.style.transition = 'all 0.3s ease';
        
        // Activate robot eyes
        const eyes = robot.querySelectorAll('.robot-eye');
        eyes.forEach(eye => {
            eye.style.boxShadow = '0 0 10px #00ffff';
        });
    }

    deactivateRobot(event) {
        const robot = event.currentTarget;
        robot.style.opacity = '0.8';
        robot.style.transform = 'scale(1)';
        
        const eyes = robot.querySelectorAll('.robot-eye');
        eyes.forEach(eye => {
            eye.style.boxShadow = '0 0 5px #00ffff';
        });
    }

    robotClickEffect(event) {
        const robot = event.currentTarget;
        
        // Simple scale effect
        robot.style.transform = 'scale(1.1)';
        setTimeout(() => {
            robot.style.transform = 'scale(1)';
        }, 200);
    }

    cardHoverEffect(event) {
        const card = event.currentTarget;
        const icon = card.querySelector('.feature-icon');
        
        if (icon) {
            icon.style.transform = 'scale(1.2) rotate(10deg)';
            icon.style.transition = 'transform 0.3s ease';
        }

        // Create ripple effect
        this.createRippleEffect(card, event);
    }

    cardLeaveEffect(event) {
        const card = event.currentTarget;
        const icon = card.querySelector('.feature-icon');
        
        if (icon) {
            icon.style.transform = 'scale(1) rotate(0deg)';
        }
    }

    createRippleEffect(element, event) {
        const ripple = document.createElement('div');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: radial-gradient(circle, rgba(0, 255, 255, 0.3) 0%, transparent 70%);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out forwards;
            pointer-events: none;
        `;
        
        element.appendChild(ripple);
        
        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.parentNode.removeChild(ripple);
            }
        }, 600);
    }

    logoClickEffect(event) {
        const logo = event.currentTarget;
        
        // Simple glow effect
        logo.style.filter = 'brightness(1.3)';
        logo.style.transition = 'filter 0.3s ease';
        
        setTimeout(() => {
            logo.style.filter = 'brightness(1)';
        }, 300);
    }





    // Scroll Animations
    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = entry.target.dataset.animation || 'fade-in-up 0.8s ease-out forwards';
                }
            });
        }, observerOptions);

        // Observe elements for scroll animations
        const animatedElements = document.querySelectorAll('.feature-card, .footer');
        animatedElements.forEach(el => {
            observer.observe(el);
        });
    }

    // Main Animations Trigger
    startMainAnimations() {
        // Trigger word reveals with stagger
        const words = document.querySelectorAll('.word');
        words.forEach((word, index) => {
            setTimeout(() => {
                word.style.animation = 'word-reveal 1s ease-out forwards';
            }, index * 200);
        });

        // Initialize robot
        const robot = document.querySelector('.robot');
        if (robot) {
            robot.style.opacity = '0.8';
        }
    }

    // Responsive Handlers
    setupResponsiveHandlers() {
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this.handleResize();
            }, 250);
        });
    }

    handleResize() {
        // Adjust particle system for screen size
        const particles = document.querySelectorAll('.dynamic-particles div');
        if (window.innerWidth < 768) {
            particles.forEach((particle, index) => {
                if (index > 4) {
                    particle.style.display = 'none';
                }
            });
        } else {
            particles.forEach(particle => {
                particle.style.display = 'block';
            });
        }
    }
}

// Additional CSS animations added via JavaScript
const additionalStyles = document.createElement('style');
additionalStyles.textContent = `
    @keyframes particleFloat {
        0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.7; }
        50% { transform: translateY(-30px) rotate(180deg); opacity: 1; }
    }

    @keyframes circuitPulse {
        0%, 100% { opacity: 0.2; }
        50% { opacity: 0.8; }
    }

    @keyframes robot-activate {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1.02); }
    }

    @keyframes robot-excitement {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        25% { transform: translateY(-5px) rotate(-2deg); }
        75% { transform: translateY(-5px) rotate(2deg); }
    }

    @keyframes energyBurst {
        0% { 
            transform: translate(-50%, -50%) scale(0);
            opacity: 1;
        }
        100% { 
            transform: translate(-50%, -50%) scale(3);
            opacity: 0;
        }
    }

    @keyframes ripple {
        0% { 
            transform: scale(0);
            opacity: 1;
        }
        100% { 
            transform: scale(2);
            opacity: 0;
        }
    }

    @keyframes logo-hologram {
        0%, 100% { filter: none; }
        25% { filter: hue-rotate(90deg) brightness(1.2); }
        50% { filter: hue-rotate(180deg) brightness(1.5); }
        75% { filter: hue-rotate(270deg) brightness(1.2); }
    }

    @keyframes textParticle {
        0% { 
            transform: translateY(0px) scale(1);
            opacity: 1;
        }
        100% { 
            transform: translateY(-50px) scale(0);
            opacity: 0;
        }
    }

    /* Enhanced mobile optimizations */
    @media (max-width: 768px) {
        .dynamic-particles {
            opacity: 0.5;
        }
        
        .robot {
            transform: scale(0.8);
        }
    }

    /* Accessibility improvements */
    @media (prefers-reduced-motion: reduce) {
        .dynamic-particles,
        .bg-animation {
            display: none;
        }
    }
`;
document.head.appendChild(additionalStyles);

// Performance monitoring
const performanceMonitor = {
    fps: 0,
    lastTime: performance.now(),
    
    monitor() {
        const now = performance.now();
        this.fps = 1000 / (now - this.lastTime);
        this.lastTime = now;
        
        // Reduce effects if performance is poor
        if (this.fps < 30) {
            document.body.classList.add('low-performance');
        }
        
        requestAnimationFrame(() => this.monitor());
    }
};

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new EvoroboticsLanding();
        performanceMonitor.monitor();
    });
} else {
    new EvoroboticsLanding();
    performanceMonitor.monitor();
}

// Add low performance styles
const lowPerfStyles = document.createElement('style');
lowPerfStyles.textContent = `
    .low-performance .dynamic-particles,
    .low-performance .bg-animation::before,
    .low-performance canvas {
        display: none !important;
    }
    
    .low-performance * {
        animation-duration: 0.1s !important;
    }
`;
document.head.appendChild(lowPerfStyles);
