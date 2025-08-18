// Enhanced Cybersecurity Page JavaScript
(function() {
    'use strict';

    // Matrix Rain Effect
    function createMatrixRain() {
        const matrixContainer = document.getElementById('matrixRain');
        if (!matrixContainer) return;

        const characters = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
        const columns = Math.floor(window.innerWidth / 20);

        function createColumn() {
            const column = document.createElement('div');
            column.style.position = 'absolute';
            column.style.left = Math.random() * window.innerWidth + 'px';
            column.style.animationDuration = (Math.random() * 3 + 2) + 's';
            column.style.animationDelay = Math.random() * 2 + 's';
            
            const char = document.createElement('span');
            char.textContent = characters[Math.floor(Math.random() * characters.length)];
            char.className = 'matrix-char';
            char.style.color = `rgba(0, 255, 65, ${Math.random() * 0.8 + 0.2})`;
            
            column.appendChild(char);
            matrixContainer.appendChild(column);

            // Remove after animation
            setTimeout(() => {
                if (column.parentNode) {
                    column.parentNode.removeChild(column);
                }
            }, 5000);
        }

        // Create initial columns
        for (let i = 0; i < columns / 4; i++) {
            setTimeout(createColumn, Math.random() * 1000);
        }

        // Continue creating columns
        setInterval(createColumn, 200);
    }

    // Terminal Typing Effect
    function initTerminalTyping() {
        const typingElements = document.querySelectorAll('.typing');
        
        typingElements.forEach(element => {
            const text = element.textContent;
            element.textContent = '';
            let i = 0;
            
            function typeChar() {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                    setTimeout(typeChar, 100 + Math.random() * 100);
                } else {
                    // Restart typing after a delay
                    setTimeout(() => {
                        element.textContent = '';
                        i = 0;
                        setTimeout(typeChar, 1000);
                    }, 3000);
                }
            }
            
            setTimeout(typeChar, 2000);
        });
    }

    // Stats Counter Animation
    function animateStats() {
        const statNumbers = document.querySelectorAll('.stat-number[data-target]');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = parseInt(entry.target.getAttribute('data-target'));
                    const duration = 2000;
                    const increment = target / (duration / 16);
                    let current = 0;
                    
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            entry.target.textContent = target;
                            clearInterval(timer);
                        } else {
                            entry.target.textContent = Math.floor(current);
                        }
                    }, 16);
                    
                    observer.unobserve(entry.target);
                }
            });
        });
        
        statNumbers.forEach(stat => observer.observe(stat));
    }

    // Progress Bar Animation
    function animateProgressBars() {
        const progressBars = document.querySelectorAll('.progress-bar[data-width]');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const width = entry.target.getAttribute('data-width');
                    setTimeout(() => {
                        entry.target.style.width = width + '%';
                    }, 500);
                    observer.unobserve(entry.target);
                }
            });
        });
        
        progressBars.forEach(bar => observer.observe(bar));
    }

    // Service Card Hover Effects
    function initServiceCards() {
        const serviceCards = document.querySelectorAll('.service-card');
        
        serviceCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                const icon = card.querySelector('.service-icon');
                if (icon) {
                    icon.style.transform = 'scale(1.1) rotate(10deg)';
                }
            });
            
            card.addEventListener('mouseleave', () => {
                const icon = card.querySelector('.service-icon');
                if (icon) {
                    icon.style.transform = 'scale(1) rotate(0deg)';
                }
            });
        });
    }

    // Threat Level Animation
    function animateThreatLevel() {
        const threatFill = document.querySelector('.threat-fill');
        if (!threatFill) return;
        
        let width = 100;
        let direction = -1;
        
        setInterval(() => {
            width += direction * 2;
            if (width <= 85 || width >= 100) {
                direction *= -1;
            }
            threatFill.style.width = width + '%';
        }, 100);
    }

    // Floating Elements Animation
    function initFloatingElements() {
        const floatingElements = document.querySelectorAll('.floating-element');
        
        floatingElements.forEach((element, index) => {
            element.style.animationDelay = (index * 0.5) + 's';
            element.style.animationDuration = (4 + Math.random() * 4) + 's';
        });
    }

    // Theme Toggle Functionality
    function initThemeToggle() {
        const themeToggle = document.getElementById('themeToggle');
        const currentTheme = localStorage.getItem('theme') || 'dark';
        
        // Set initial theme
        document.documentElement.setAttribute('data-theme', currentTheme);
        
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                const newTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
                document.documentElement.setAttribute('data-theme', newTheme);
                localStorage.setItem('theme', newTheme);
            });
        }
    }

    // Mobile Menu Toggle
    function initMobileMenu() {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        
        if (hamburger && navMenu) {
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
            });
            
            // Close menu when clicking on a link
            document.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', () => {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                });
            });
        }
    }

    // Contact Form Handling
    function initContactForm() {
        const contactForm = document.getElementById('contactForm');
        if (!contactForm) return;
        
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            // Show loading state
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Sending...</span>';
            submitBtn.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                submitBtn.innerHTML = '<i class="fas fa-check"></i> <span>Message Sent!</span>';
                submitBtn.style.background = 'var(--success-color)';
                
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                    contactForm.reset();
                }, 2000);
            }, 2000);
        });
    }

    // Smooth Scrolling for Anchor Links
    function initSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // Parallax Effect for Hero Section
    function initParallax() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.floating-element');
            
            parallaxElements.forEach((element, index) => {
                const speed = 0.5 + (index * 0.1);
                element.style.transform = `translateY(${scrolled * speed}px)`;
            });
        });
    }

    // Security Status Indicator
    function initSecurityStatus() {
        const statusLight = document.querySelector('.status-light');
        if (!statusLight) return;
        
        let isSecure = true;
        
        setInterval(() => {
            if (Math.random() < 0.1) { // 10% chance to show warning
                statusLight.style.background = 'var(--warning-color)';
                statusLight.style.boxShadow = '0 0 10px var(--warning-color)';
                
                setTimeout(() => {
                    statusLight.style.background = 'var(--success-color)';
                    statusLight.style.boxShadow = '0 0 10px var(--success-color)';
                }, 1000);
            }
        }, 5000);
    }

    // Initialize all functions when DOM is loaded
    function init() {
        createMatrixRain();
        initTerminalTyping();
        animateStats();
        animateProgressBars();
        initServiceCards();
        animateThreatLevel();
        initFloatingElements();
        initThemeToggle();
        initMobileMenu();
        initContactForm();
        initSmoothScrolling();
        initParallax();
        initSecurityStatus();
        
        console.log('🔒 Cybersecurity page initialized successfully');
        console.log('🛡️ All security systems online');
        console.log('⚡ Matrix rain activated');
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Handle window resize for matrix rain
    window.addEventListener('resize', () => {
        const matrixContainer = document.getElementById('matrixRain');
        if (matrixContainer) {
            matrixContainer.innerHTML = '';
        }
    });

})();

