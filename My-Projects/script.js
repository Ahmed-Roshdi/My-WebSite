// Theme Management
let currentTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', currentTheme);

// Theme Toggle Functionality
const themeToggle = document.getElementById('themeToggle');

function toggleTheme() {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    localStorage.setItem('theme', currentTheme);
    
    // Update navbar background for new theme
    updateNavbarBackground();
    
    // Add animation effect
    document.body.style.transition = 'all 0.3s ease';
    setTimeout(() => {
        document.body.style.transition = '';
    }, 300);
}

themeToggle.addEventListener('click', toggleTheme);

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

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
        const sectionHeight = section.clientHeight;
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

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.skill-category, .project-card, .stat, .about-content, .contact-content');
    animateElements.forEach(el => observer.observe(el));
});

// Contact form handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Simple validation
        if (!name || !email || !subject || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Simulate form submission
        showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
        this.reset();
    });
}

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
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
        max-width: 300px;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
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

// Typing animation for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing animation when page loads
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 50);
        }, 1000);
    }
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Skills progress animation
function animateSkills() {
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-20px)';
            item.style.transition = 'all 0.5s ease';
            
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }, 100);
        }, index * 100);
    });
}

// Trigger skills animation when skills section is visible
const skillsSection = document.querySelector('.skills');
if (skillsSection) {
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkills();
                skillsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    skillsObserver.observe(skillsSection);
}

// Counter animation for stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat h3');
    counters.forEach(counter => {
        const target = parseInt(counter.textContent);
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current) + (counter.textContent.includes('+') ? '+' : '') + (counter.textContent.includes('%') ? '%' : '');
                setTimeout(updateCounter, 20);
            } else {
                counter.textContent = target + (counter.textContent.includes('+') ? '+' : '') + (counter.textContent.includes('%') ? '%' : '');
            }
        };
        
        updateCounter();
    });
}

// Trigger counter animation when about section is visible
const aboutSection = document.querySelector('.about');
if (aboutSection) {
    const aboutObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                aboutObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    aboutObserver.observe(aboutSection);
}

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Add CSS for loading state
const loadingStyle = document.createElement('style');
loadingStyle.textContent = `
    body:not(.loaded) {
        overflow: hidden;
    }
    
    body:not(.loaded)::before {
        content: '';
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    body:not(.loaded)::after {
        content: 'Loading...';
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: white;
        font-size: 1.5rem;
        font-weight: 600;
        z-index: 10000;
    }
`;
document.head.appendChild(loadingStyle);

// Add active class to current navigation link
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        if (link.getAttribute('href') === '#home') {
            link.classList.add('active');
        }
    });
});

// Add hover effects for project cards
document.addEventListener('DOMContentLoaded', () => {
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Add scroll to top functionality
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollToTopBtn.className = 'scroll-to-top';
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
    background: #3498db;
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    display: none;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    transition: all 0.3s ease;
    z-index: 1000;
    box-shadow: 0 5px 15px rgba(52, 152, 219, 0.3);
`;

document.body.appendChild(scrollToTopBtn);

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollToTopBtn.style.display = 'flex';
    } else {
        scrollToTopBtn.style.display = 'none';
    }
});

scrollToTopBtn.addEventListener('mouseenter', () => {
    scrollToTopBtn.style.transform = 'translateY(-3px)';
    scrollToTopBtn.style.boxShadow = '0 8px 25px rgba(52, 152, 219, 0.4)';
});

scrollToTopBtn.addEventListener('mouseleave', () => {
    scrollToTopBtn.style.transform = 'translateY(0)';
    scrollToTopBtn.style.boxShadow = '0 5px 15px rgba(52, 152, 219, 0.3)';
});

// Customization Modal Functionality
const customizationBtn = document.getElementById('customizationBtn');
const customizationModal = document.getElementById('customizationModal');
const modalClose = document.getElementById('modalClose');
const saveCustomization = document.getElementById('saveCustomization');
const resetCustomization = document.getElementById('resetCustomization');

// Default values
const defaultValues = {
    name: 'Ahmed Roshdi',
    title: 'Full Stack Developer & Creative Problem Solver',
    about: 'I\'m a passionate developer with a love for creating meaningful digital experiences. With expertise in modern web technologies, I specialize in building responsive, user-friendly applications that solve real-world problems.\n\nWhen I\'m not coding, you can find me exploring new technologies, contributing to open-source projects, or sharing knowledge with the developer community.',
    email: 'ahmed.roshdi@email.com',
    phone: '+1 (555) 123-4567',
    location: 'Cairo, Egypt',
    exp: '3',
    projects: '50',
    satisfaction: '100',
    github: '',
    linkedin: '',
    twitter: '',
    instagram: ''
};

// Load saved values or defaults
function loadCustomizationValues() {
    const saved = JSON.parse(localStorage.getItem('customization')) || {};
    const values = { ...defaultValues, ...saved };
    
    document.getElementById('customName').value = values.name;
    document.getElementById('customTitle').value = values.title;
    document.getElementById('customAbout').value = values.about;
    document.getElementById('customEmail').value = values.email;
    document.getElementById('customPhone').value = values.phone;
    document.getElementById('customLocation').value = values.location;
    document.getElementById('customExp').value = values.exp;
    document.getElementById('customProjects').value = values.projects;
    document.getElementById('customSatisfaction').value = values.satisfaction;
    document.getElementById('customGitHub').value = values.github;
    document.getElementById('customLinkedIn').value = values.linkedin;
    document.getElementById('customTwitter').value = values.twitter;
    document.getElementById('customInstagram').value = values.instagram;
}

// Apply customization to website
function applyCustomization() {
    const values = {
        name: document.getElementById('customName').value || defaultValues.name,
        title: document.getElementById('customTitle').value || defaultValues.title,
        about: document.getElementById('customAbout').value || defaultValues.about,
        email: document.getElementById('customEmail').value || defaultValues.email,
        phone: document.getElementById('customPhone').value || defaultValues.phone,
        location: document.getElementById('customLocation').value || defaultValues.location,
        exp: document.getElementById('customExp').value || defaultValues.exp,
        projects: document.getElementById('customProjects').value || defaultValues.projects,
        satisfaction: document.getElementById('customSatisfaction').value || defaultValues.satisfaction,
        github: document.getElementById('customGitHub').value || defaultValues.github,
        linkedin: document.getElementById('customLinkedIn').value || defaultValues.linkedin,
        twitter: document.getElementById('customTwitter').value || defaultValues.twitter,
        instagram: document.getElementById('customInstagram').value || defaultValues.instagram
    };

    // Update hero section
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        heroTitle.innerHTML = `Hi, I'm <span class="highlight">${values.name}</span>`;
    }

    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        heroSubtitle.textContent = values.title;
    }

    const profileInfo = document.querySelector('.profile-info h3');
    if (profileInfo) {
        profileInfo.textContent = values.name;
    }

    // Update about section
    const aboutText = document.querySelector('.about-text p');
    if (aboutText) {
        aboutText.textContent = values.about;
    }

    // Update stats
    const stats = document.querySelectorAll('.stat h3');
    if (stats.length >= 3) {
        stats[0].textContent = values.exp + '+';
        stats[1].textContent = values.projects + '+';
        stats[2].textContent = values.satisfaction + '%';
    }

    // Update contact information
    const contactItems = document.querySelectorAll('.contact-item span');
    if (contactItems.length >= 3) {
        contactItems[0].textContent = values.email;
        contactItems[1].textContent = values.phone;
        contactItems[2].textContent = values.location;
    }

    // Update social links
    const socialLinks = document.querySelectorAll('.social-link');
    if (socialLinks.length >= 4) {
        if (values.github) socialLinks[0].href = values.github;
        if (values.linkedin) socialLinks[1].href = values.linkedin;
        if (values.twitter) socialLinks[2].href = values.twitter;
        if (values.instagram) socialLinks[3].href = values.instagram;
    }

    // Save to localStorage
    localStorage.setItem('customization', JSON.stringify(values));
    
    showNotification('Customization saved successfully!', 'success');
}

// Reset to default values
function resetToDefault() {
    if (confirm('Are you sure you want to reset all customization to default values?')) {
        localStorage.removeItem('customization');
        loadCustomizationValues();
        applyCustomization();
        showNotification('Reset to default values!', 'info');
    }
}

// Modal event listeners
customizationBtn.addEventListener('click', () => {
    customizationModal.classList.add('active');
    loadCustomizationValues();
});

modalClose.addEventListener('click', () => {
    customizationModal.classList.remove('active');
});

saveCustomization.addEventListener('click', () => {
    applyCustomization();
    customizationModal.classList.remove('active');
});

resetCustomization.addEventListener('click', resetToDefault);

// Close modal when clicking outside
customizationModal.addEventListener('click', (e) => {
    if (e.target === customizationModal) {
        customizationModal.classList.remove('active');
    }
});

// Load customization on page load
document.addEventListener('DOMContentLoaded', () => {
    loadCustomizationValues();
    applyCustomization();
    
    // Initialize navbar background
    updateNavbarBackground();
    

});


