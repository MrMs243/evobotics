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
        this.createMatrixRain();
    }

    // Loading Screen Management
    setupLoadingScreen() {
        const loadingOverlay = document.querySelector('.loading-overlay');
        const loadingText = document.querySelector('.loading-text');
        
        const loadingMessages = [
            'Initializing Evobotics...',
            'Loading quantum processors...',
            'Calibrating robot systems...',
            'Preparing the future...'
        ];

        let messageIndex = 0;
        const messageInterval = setInterval(() => {
            if (messageIndex < loadingMessages.length - 1) {
                messageIndex++;
                loadingText.textContent = loadingMessages[messageIndex];
            } else {
                clearInterval(messageInterval);
            }
        }, 800);

        // Hide loading screen after animations
        setTimeout(() => {
            loadingOverlay.classList.add('hidden');
            this.startMainAnimations();
        }, 3500);
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

        // Create floating particles
        for (let i = 0; i < 20; i++) {
            this.createParticle(particleContainer);
        }

        // Create circuit-like connections
        this.createCircuitLines(particleContainer);
    }

    createParticle(container) {
        const particle = document.createElement('div');
        const size = Math.random() * 4 + 2;
        const colors = ['#00ffff', '#39ff14', '#ffd700', '#8a2be2'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: ${color};
            border-radius: 50%;
            box-shadow: 0 0 10px ${color}, 0 0 20px ${color};
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: particleFloat ${8 + Math.random() * 4}s ease-in-out infinite;
            animation-delay: ${Math.random() * 2}s;
        `;

        container.appendChild(particle);

        // Add random movement
        this.animateParticle(particle);
    }

    animateParticle(particle) {
        const duration = 10000 + Math.random() * 5000;
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

    createCircuitLines(container) {
        for (let i = 0; i < 5; i++) {
            const line = document.createElement('div');
            const isHorizontal = Math.random() > 0.5;
            
            line.style.cssText = `
                position: absolute;
                background: linear-gradient(90deg, transparent, #00ffff, transparent);
                ${isHorizontal ? 
                    `width: ${200 + Math.random() * 300}px; height: 1px; top: ${Math.random() * 100}%; left: ${Math.random() * 50}%;` :
                    `width: 1px; height: ${200 + Math.random() * 300}px; left: ${Math.random() * 100}%; top: ${Math.random() * 50}%;`
                }
                opacity: 0.3;
                animation: circuitPulse ${3 + Math.random() * 2}s ease-in-out infinite;
                animation-delay: ${Math.random() * 2}s;
            `;
            
            container.appendChild(line);
        }
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
        robot.style.animation = 'robot-hover 0.5s ease-in-out infinite, robot-activate 0.3s ease-out forwards';
        
        // Activate robot eyes
        const eyes = robot.querySelectorAll('.robot-eye');
        eyes.forEach(eye => {
            eye.style.boxShadow = '0 0 20px #39ff14, 0 0 40px #39ff14, 0 0 60px #39ff14';
            eye.style.animation = 'eye-blink 0.5s infinite';
        });

        // Activate antenna
        const antenna = robot.querySelector('.robot-antenna');
        if (antenna) {
            antenna.style.animation = 'antenna-pulse 0.3s ease-in-out infinite';
        }
    }

    deactivateRobot(event) {
        const robot = event.currentTarget;
        robot.style.animation = 'robot-hover 3s ease-in-out infinite';
        
        const eyes = robot.querySelectorAll('.robot-eye');
        eyes.forEach(eye => {
            eye.style.boxShadow = '0 0 10px #39ff14, 0 0 20px #39ff14';
            eye.style.animation = 'eye-blink 3s infinite';
        });
    }

    robotClickEffect(event) {
        const robot = event.currentTarget;
        
        // Create energy burst effect
        const burst = document.createElement('div');
        burst.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            width: 100px;
            height: 100px;
            border: 2px solid #00ffff;
            border-radius: 50%;
            transform: translate(-50%, -50%) scale(0);
            animation: energyBurst 0.6s ease-out forwards;
            pointer-events: none;
            z-index: 10;
        `;
        
        robot.appendChild(burst);
        
        // Remove burst after animation
        setTimeout(() => {
            if (burst.parentNode) {
                burst.parentNode.removeChild(burst);
            }
        }, 600);

        // Temporary robot excitement
        robot.style.animation = 'robot-hover 0.2s ease-in-out infinite, robot-excitement 0.6s ease-out';
        setTimeout(() => {
            robot.style.animation = 'robot-hover 3s ease-in-out infinite';
        }, 600);
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
        
        // Create holographic effect
        logo.style.animation = 'gradient-shift 0.5s ease-in-out, logo-hologram 0.8s ease-out';
        
        // Reset animation
        setTimeout(() => {
            logo.style.animation = 'gradient-shift 3s ease-in-out infinite';
        }, 800);

        // Create text particles
        this.createTextParticles(logo);
    }

    createTextParticles(element) {
        const rect = element.getBoundingClientRect();
        const particleCount = 10;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.textContent = '✦';
            particle.style.cssText = `
                position: fixed;
                left: ${rect.left + Math.random() * rect.width}px;
                top: ${rect.top + Math.random() * rect.height}px;
                color: #00ffff;
                font-size: ${Math.random() * 10 + 10}px;
                pointer-events: none;
                z-index: 1000;
                animation: textParticle 1s ease-out forwards;
            `;
            
            document.body.appendChild(particle);
            
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }, 1000);
        }
    }

    // Matrix Rain Effect
    createMatrixRain() {
        const matrix = document.createElement('canvas');
        matrix.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
            opacity: 0.1;
        `;
        document.body.appendChild(matrix);

        const ctx = matrix.getContext('2d');
        matrix.width = window.innerWidth;
        matrix.height = window.innerHeight;

        const columns = matrix.width / 20;
        const drops = Array(Math.floor(columns)).fill(1);
        const chars = '01EVOBOTICS'.split('');

        const draw = () => {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, matrix.width, matrix.height);

            ctx.fillStyle = '#00ffff';
            ctx.font = '12px monospace';

            for (let i = 0; i < drops.length; i++) {
                const text = chars[Math.floor(Math.random() * chars.length)];
                ctx.fillText(text, i * 20, drops[i] * 20);

                if (drops[i] * 20 > matrix.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        };

        setInterval(draw, 50);

        // Resize handler
        window.addEventListener('resize', () => {
            matrix.width = window.innerWidth;
            matrix.height = window.innerHeight;
        });
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

        // Start robot animations
        const robot = document.querySelector('.robot');
        if (robot) {
            robot.style.animation = 'robot-hover 3s ease-in-out infinite';
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
                if (index > 10) {
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
