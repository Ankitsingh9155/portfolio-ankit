// ============================================
// STICKER PORTFOLIO - INTERACTIVE ANIMATIONS
// ============================================

// ============================================
// NAVIGATION
// ============================================

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle mobile menu
hamburger ? .addEventListener('click', () => {
    navMenu.classList.toggle('active');

    // Animate hamburger
    const spans = hamburger.querySelectorAll('span');
    spans[0].style.transform = navMenu.classList.contains('active') ? 'rotate(45deg) translate(5px, 5px)' : '';
    spans[1].style.opacity = navMenu.classList.contains('active') ? '0' : '1';
    spans[2].style.transform = navMenu.classList.contains('active') ? 'rotate(-45deg) translate(7px, -6px)' : '';
});

// Close menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = '';
        spans[1].style.opacity = '1';
        spans[2].style.transform = '';
    });
});

// Change navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(15, 15, 30, 0.98)';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(15, 15, 30, 0.95)';
        navbar.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.15)';
    }
});

// ============================================
// PARTICLE SYSTEM
// ============================================

const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');

// Set canvas size
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Particle class
class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        this.color = this.getRandomColor();
        this.opacity = Math.random() * 0.5 + 0.2;
    }

    getRandomColor() {
        const colors = [
            'rgba(255, 107, 157, ', // primary
            'rgba(254, 194, 96, ', // secondary
            'rgba(108, 92, 231, ', // accent
            'rgba(78, 205, 196, ', // info
            'rgba(0, 217, 163, ' // success
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Wrap around screen
        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
    }

    draw() {
        ctx.fillStyle = this.color + this.opacity + ')';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Create particles
const particlesArray = [];
const particleCount = 80;

for (let i = 0; i < particleCount; i++) {
    particlesArray.push(new Particle());
}

// Animate particles
function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();

        // Draw lines between close particles
        for (let j = i; j < particlesArray.length; j++) {
            const dx = particlesArray[i].x - particlesArray[j].x;
            const dy = particlesArray[i].y - particlesArray[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
                ctx.strokeStyle = `rgba(255, 107, 157, ${0.2 * (1 - distance / 100)})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
                ctx.stroke();
            }
        }
    }

    requestAnimationFrame(animateParticles);
}

animateParticles();

// ============================================
// FLOATING STICKERS BACKGROUND
// ============================================

const floatingStickersContainer = document.getElementById('floatingStickers');
const stickerEmojis = ['✨', '🎯', '⚡', '🔥', '🌟', '💡', '🎨', '🚀', '💻', '🤖', '☕', '📱', '🎮', '🎪', '🎭'];

// Create floating background stickers
for (let i = 0; i < 15; i++) {
    const sticker = document.createElement('div');
    sticker.style.position = 'absolute';
    sticker.style.fontSize = `${Math.random() * 40 + 30}px`;
    sticker.style.left = `${Math.random() * 100}%`;
    sticker.style.top = `${Math.random() * 100}%`;
    sticker.style.opacity = Math.random() * 0.3 + 0.1;
    sticker.textContent = stickerEmojis[Math.floor(Math.random() * stickerEmojis.length)];
    sticker.style.animation = `floatRandom ${Math.random() * 20 + 15}s ease-in-out infinite`;
    sticker.style.animationDelay = `${Math.random() * 5}s`;
    sticker.style.pointerEvents = 'none';
    floatingStickersContainer.appendChild(sticker);
}

// ============================================
// MOUSE FOLLOWER STICKER
// ============================================

const followerSticker = document.createElement('div');
followerSticker.style.position = 'fixed';
followerSticker.style.fontSize = '30px';
followerSticker.style.pointerEvents = 'none';
followerSticker.style.zIndex = '9999';
followerSticker.style.transition = 'transform 0.1s ease';
followerSticker.textContent = '✨';
followerSticker.style.opacity = '0';
document.body.appendChild(followerSticker);

let mouseX = 0;
let mouseY = 0;
let followerX = 0;
let followerY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    followerSticker.style.opacity = '0.6';
});

function animateFollower() {
    followerX += (mouseX - followerX) * 0.1;
    followerY += (mouseY - followerY) * 0.1;

    followerSticker.style.left = `${followerX}px`;
    followerSticker.style.top = `${followerY}px`;

    requestAnimationFrame(animateFollower);
}
animateFollower();

// ============================================
// SCROLL ANIMATIONS
// ============================================

const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sticker cards
document.querySelectorAll('.sticker-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(50px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// ============================================
// STICKER CLICK EFFECTS
// ============================================

// Create sticker burst on click
document.addEventListener('click', (e) => {
    // Don't create burst on links and buttons
    if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || e.target.closest('a') || e.target.closest('button')) {
        return;
    }

    createStickerBurst(e.clientX, e.clientY);
});

function createStickerBurst(x, y) {
    const burstEmojis = ['✨', '⭐', '💫', '🌟', '✦', '◆', '◇'];
    const particleCount = 8;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.textContent = burstEmojis[Math.floor(Math.random() * burstEmojis.length)];
        particle.style.position = 'fixed';
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        particle.style.fontSize = '20px';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '10000';
        particle.style.transition = 'all 0.8s ease-out';

        document.body.appendChild(particle);

        // Animate particle
        setTimeout(() => {
            const angle = (Math.PI * 2 * i) / particleCount;
            const distance = 100;
            const offsetX = Math.cos(angle) * distance;
            const offsetY = Math.sin(angle) * distance;

            particle.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(0) rotate(${Math.random() * 360}deg)`;
            particle.style.opacity = '0';
        }, 10);

        // Remove particle
        setTimeout(() => {
            particle.remove();
        }, 900);
    }
}

// ============================================
// STICKER CARD INTERACTIONS
// ============================================

document.querySelectorAll('.sticker-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        // Create mini stickers around card
        createMiniStickers(card);
    });
});

function createMiniStickers(element) {
    const rect = element.getBoundingClientRect();
    const miniEmojis = ['✨', '⭐', '💫'];

    for (let i = 0; i < 3; i++) {
        const mini = document.createElement('div');
        mini.textContent = miniEmojis[i % miniEmojis.length];
        mini.style.position = 'fixed';
        mini.style.fontSize = '16px';
        mini.style.pointerEvents = 'none';
        mini.style.zIndex = '999';
        mini.style.opacity = '0';

        const side = i % 4;
        if (side === 0) {
            mini.style.left = `${rect.left + Math.random() * rect.width}px`;
            mini.style.top = `${rect.top}px`;
        } else if (side === 1) {
            mini.style.left = `${rect.right}px`;
            mini.style.top = `${rect.top + Math.random() * rect.height}px`;
        } else {
            mini.style.left = `${rect.left + Math.random() * rect.width}px`;
            mini.style.top = `${rect.bottom}px`;
        }

        document.body.appendChild(mini);

        setTimeout(() => {
            mini.style.transition = 'all 1s ease-out';
            mini.style.opacity = '1';
            mini.style.transform = `translateY(-40px)`;
        }, i * 100);

        setTimeout(() => {
            mini.style.opacity = '0';
        }, 700 + i * 100);

        setTimeout(() => {
            mini.remove();
        }, 1700 + i * 100);
    }
}

// ============================================
// SKILL TAG INTERACTIONS
// ============================================

document.querySelectorAll('.skill-tag').forEach(tag => {
    tag.addEventListener('click', (e) => {
        e.stopPropagation();

        // Pulse animation
        tag.style.animation = 'none';
        setTimeout(() => {
            tag.style.animation = 'skillTagPop 0.5s ease-out';
        }, 10);

        // Create sparkles
        createSparkles(e.clientX, e.clientY);
    });
});

function createSparkles(x, y) {
    const sparkleCount = 5;

    for (let i = 0; i < sparkleCount; i++) {
        const sparkle = document.createElement('div');
        sparkle.textContent = '✨';
        sparkle.style.position = 'fixed';
        sparkle.style.left = `${x}px`;
        sparkle.style.top = `${y}px`;
        sparkle.style.fontSize = '12px';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.zIndex = '10000';

        document.body.appendChild(sparkle);

        setTimeout(() => {
            sparkle.style.transition = 'all 0.8s ease-out';
            const angle = (Math.PI * 2 * i) / sparkleCount;
            const distance = 50;
            sparkle.style.transform = `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(0)`;
            sparkle.style.opacity = '0';
        }, 10);

        setTimeout(() => {
            sparkle.remove();
        }, 900);
    }
}

// ============================================
// SOCIAL STICKER INTERACTIONS
// ============================================

document.querySelectorAll('.social-sticker').forEach(social => {
    social.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.2) rotate(10deg)';

        // Change gradient on hover
        const gradients = [
            'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
        ];
        this.style.background = gradients[Math.floor(Math.random() * gradients.length)];
    });

    social.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) rotate(0deg)';
    });
});

// ============================================
// ANIMATED COUNTER FOR STATS (if needed)
// ============================================

function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);

    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = Math.round(target);
            clearInterval(timer);
        } else {
            element.textContent = Math.round(start);
        }
    }, 16);
}

// ============================================
// DYNAMIC BACKGROUND GRADIENT
// ============================================

let gradientAngle = 0;

function animateBackgroundGradient() {
    gradientAngle += 0.5;

    document.body.style.background = `
        radial-gradient(circle at ${20 + Math.sin(gradientAngle * 0.01) * 10}% ${50 + Math.cos(gradientAngle * 0.015) * 10}%, rgba(102, 126, 234, 0.1) 0%, transparent 50%),
        radial-gradient(circle at ${80 + Math.sin(gradientAngle * 0.012) * 10}% ${80 + Math.cos(gradientAngle * 0.018) * 10}%, rgba(250, 112, 154, 0.1) 0%, transparent 50%),
        radial-gradient(circle at ${40 + Math.sin(gradientAngle * 0.014) * 10}% ${20 + Math.cos(gradientAngle * 0.016) * 10}%, rgba(78, 205, 196, 0.1) 0%, transparent 50%),
        #0F0F1E
    `;

    requestAnimationFrame(animateBackgroundGradient);
}

animateBackgroundGradient();

// ============================================
// EMOJI RAIN EFFECT (Easter Egg)
// ============================================

let emojiRainActive = false;

// Trigger emoji rain with Konami code or secret action
document.addEventListener('keydown', (e) => {
    if (e.key === 'r' && e.ctrlKey && e.shiftKey) {
        e.preventDefault();
        if (!emojiRainActive) {
            startEmojiRain();
        }
    }
});

function startEmojiRain() {
    emojiRainActive = true;
    const emojis = ['✨', '🎉', '🎊', '🎈', '🎁', '⭐', '🌟', '💫', '🔥', '🚀'];
    const duration = 5000;
    const interval = 100;

    const rainInterval = setInterval(() => {
        const emoji = document.createElement('div');
        emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        emoji.style.position = 'fixed';
        emoji.style.left = `${Math.random() * 100}%`;
        emoji.style.top = '-50px';
        emoji.style.fontSize = `${Math.random() * 30 + 20}px`;
        emoji.style.pointerEvents = 'none';
        emoji.style.zIndex = '10000';
        emoji.style.animation = 'fall 3s linear';

        document.body.appendChild(emoji);

        setTimeout(() => {
            emoji.remove();
        }, 3000);
    }, interval);

    setTimeout(() => {
        clearInterval(rainInterval);
        emojiRainActive = false;
    }, duration);
}

// Add fall animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fall {
        to {
            transform: translateY(${window.innerHeight + 100}px) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ============================================
// PROJECT CARD TILT EFFECT
// ============================================

document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px) scale(1.02)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

// ============================================
// SMOOTH SCROLL REVEAL
// ============================================

const revealElements = document.querySelectorAll('.section-title, .timeline-item, .contact-card');

revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
});

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(el => revealObserver.observe(el));

// ============================================
// LOADING ANIMATION
// ============================================

window.addEventListener('load', () => {
    document.body.style.opacity = '0';

    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);

    // Animate hero elements
    const heroElements = document.querySelectorAll('.hero-content > *');
    heroElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';

        setTimeout(() => {
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, 200 + index * 100);
    });
});

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================

// Reduce animations on low-performance devices
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('*').forEach(el => {
        el.style.animation = 'none';
        el.style.transition = 'none';
    });
}

console.log('🎨 Sticker Portfolio Loaded! ✨');
console.log('💡 Press Ctrl+Shift+R for a surprise! 🎉');