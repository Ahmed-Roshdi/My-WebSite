// Enhanced Theme Management System
(function() {
    'use strict';
    
    // Theme Management
    let currentTheme = localStorage.getItem('theme') || 'light';
    let themeToggle = null;

    // Initialize theme on page load
    function initializeTheme() {
        document.documentElement.setAttribute('data-theme', currentTheme);
        updateThemeIcon();
    }

    // Update theme icon based on current theme
    function updateThemeIcon() {
        if (!themeToggle) return;
        
        const sunIcon = themeToggle.querySelector('.fa-sun');
        const moonIcon = themeToggle.querySelector('.fa-moon');
        
        if (currentTheme === 'dark') {
            if (sunIcon) sunIcon.style.display = 'inline-block';
            if (moonIcon) moonIcon.style.display = 'none';
        } else {
            if (sunIcon) sunIcon.style.display = 'none';
            if (moonIcon) moonIcon.style.display = 'inline-block';
        }
    }

    // Theme Toggle Functionality
    function toggleTheme() {
        currentTheme = currentTheme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', currentTheme);
        localStorage.setItem('theme', currentTheme);
        
        // Update theme icon
        updateThemeIcon();
        
        // Add smooth transition effect
        document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
        setTimeout(() => {
            document.body.style.transition = '';
        }, 300);
        
        console.log('Theme switched to:', currentTheme);
    }

    // Initialize everything when DOM is loaded
    function initializeApp() {
        // Initialize theme
        initializeTheme();
        
        // Setup theme toggle
        themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', toggleTheme);
            console.log('Theme toggle button initialized');
        } else {
            console.error('Theme toggle button not found');
        }

        // Mobile Navigation Toggle
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');

        if (hamburger && navMenu) {
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
            });

            // Close mobile menu when clicking on a link
            document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }));
        }

        // Smooth scrolling for navigation links
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

        // Navbar background change on scroll
        function updateNavbarBackground() {
            const navbar = document.querySelector('.navbar');
            if (!navbar) return;
            
            const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
            
            if (window.scrollY > 100) {
                if (isDark) {
                    navbar.style.background = 'rgba(18, 18, 18, 0.98)';
                    navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
                } else {
                    navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                    navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
                }
            } else {
                if (isDark) {
                    navbar.style.background = 'rgba(18, 18, 18, 0.95)';
                    navbar.style.boxShadow = 'none';
                } else {
                    navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                    navbar.style.boxShadow = 'none';
                }
            }
        }

        window.addEventListener('scroll', updateNavbarBackground);

        // Active navigation link highlighting
        window.addEventListener('scroll', () => {
            const sections = document.querySelectorAll('section[id]');
            const navLinks = document.querySelectorAll('.nav-link');
            
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                if (window.scrollY >= (sectionTop - 200)) {
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

        // Contact form handling with EmailJS
        const contactForm = document.querySelector('#contact-form');
        if (contactForm) {
            // Initialize EmailJS with demo credentials (user needs to replace with their own)
            emailjs.init("demo_public_key"); // يجب استبدالها بالمفتاح الحقيقي
            
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Get form elements
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const btnText = submitBtn.querySelector('.btn-text');
                const btnLoading = submitBtn.querySelector('.btn-loading');
                
                // Show loading state
                btnText.style.display = 'none';
                btnLoading.style.display = 'inline-block';
                submitBtn.disabled = true;
                
                // Get form data
                const formData = new FormData(this);
                const templateParams = {
                    from_name: formData.get('from_name'),
                    from_email: formData.get('from_email'),
                    subject: formData.get('subject'),
                    message: formData.get('message'),
                    to_name: 'Ahmed Roshdi'
                };
                
                // Simple validation
                if (!templateParams.from_name || !templateParams.from_email || !templateParams.subject || !templateParams.message) {
                    showNotification('Please fill in all fields', 'error');
                    resetSubmitButton();
                    return;
                }
                
                if (!isValidEmail(templateParams.from_email)) {
                    showNotification('Please enter a valid email address', 'error');
                    resetSubmitButton();
                    return;
                }
                
                // For demo purposes, show success message
                // In production, replace with actual EmailJS service
                setTimeout(() => {
                    showNotification('Demo: Message would be sent successfully! Replace with your EmailJS credentials.', 'success');
                    contactForm.reset();
                    resetSubmitButton();
                }, 2000);
                
                // Uncomment and configure for production:
                /*
                emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
                    .then(function(response) {
                        console.log('Email sent successfully:', response);
                        showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
                        contactForm.reset();
                    })
                    .catch(function(error) {
                        console.error('Email sending failed:', error);
                        showNotification('Failed to send message. Please try again or contact me directly.', 'error');
                    })
                    .finally(function() {
                        resetSubmitButton();
                    });
                */
                
                function resetSubmitButton() {
                    btnText.style.display = 'inline-block';
                    btnLoading.style.display = 'none';
                    submitBtn.disabled = false;
                }
            });
        }

        // Scroll to top button
        const scrollToTopBtn = document.createElement('button');
        scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
        scrollToTopBtn.className = 'scroll-to-top';
        scrollToTopBtn.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 50px;
            height: 50px;
            background: var(--primary-color);
            color: white;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 1000;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.2rem;
            box-shadow: 0 5px 15px rgba(52, 152, 219, 0.3);
        `;
        
        document.body.appendChild(scrollToTopBtn);

        // Show/hide scroll to top button
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollToTopBtn.style.opacity = '1';
                scrollToTopBtn.style.visibility = 'visible';
            } else {
                scrollToTopBtn.style.opacity = '0';
                scrollToTopBtn.style.visibility = 'hidden';
            }
        });

        // Scroll to top functionality
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Add hover effects
        scrollToTopBtn.addEventListener('mouseenter', () => {
            scrollToTopBtn.style.transform = 'translateY(-3px)';
            scrollToTopBtn.style.boxShadow = '0 8px 25px rgba(52, 152, 219, 0.4)';
        });

        scrollToTopBtn.addEventListener('mouseleave', () => {
            scrollToTopBtn.style.transform = 'translateY(0)';
            scrollToTopBtn.style.boxShadow = '0 5px 15px rgba(52, 152, 219, 0.3)';
        });

        console.log('App initialized successfully');
    }

    // Email validation function
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeApp);
    } else {
        initializeApp();
    }

    // Also initialize on window load as backup
    window.addEventListener('load', () => {
        if (!themeToggle) {
            console.log('Reinitializing theme toggle...');
            themeToggle = document.getElementById('themeToggle');
            if (themeToggle) {
                themeToggle.addEventListener('click', toggleTheme);
                updateThemeIcon();
            }
        }
    });

})();



    // Notification system for user feedback
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#27ae60' : type === 'error' ? '#e74c3c' : '#3498db'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 350px;
            font-family: 'Poppins', sans-serif;
            font-size: 14px;
            line-height: 1.4;
        `;
        
        // Style the close button
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.style.cssText = `
            background: none;
            border: none;
            color: white;
            font-size: 18px;
            cursor: pointer;
            padding: 0;
            margin-left: 10px;
            float: right;
        `;
        
        // Add to page
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Close button functionality
        closeBtn.addEventListener('click', () => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        });
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.transform = 'translateX(100%)';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
    }

