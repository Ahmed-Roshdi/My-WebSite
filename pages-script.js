(function() {
    'use strict';

    // Language Translation System
    let langToggle = null;
    
    function createLanguageToggle() {
        const navControls = document.querySelector(".nav-controls");
        if (!navControls) {
            console.error("Nav controls not found");
            return;
        }
        
        langToggle = document.createElement("button");
        langToggle.className = "lang-toggle";
        langToggle.id = "langToggle";
        langToggle.innerHTML = "English <i class=\"fas fa-globe\"></i>";
        navControls.insertBefore(langToggle, navControls.firstChild);
    }

    let currentLang = localStorage.getItem("lang") || "en";

    function loadTranslations() {
        fetch("translations.js")
            .then(response => response.text())
            .then(text => {
                const translationsScript = document.createElement("script");
                translationsScript.innerHTML = text;
                document.head.appendChild(translationsScript);
                translationsScript.onload = () => {
                    applyTranslations();
                };
            })
            .catch(error => console.error("Error loading translations.js:", error));
    }

    function applyTranslations() {
        document.querySelectorAll("[data-translate]").forEach(element => {
            const key = element.getAttribute("data-translate");
            const translatedText = getTranslation(key);
            if (translatedText) {
                element.innerHTML = translatedText;
            }
        });
        updateLangToggleText();
    }

    function getTranslation(key) {
        const keys = key.split(".");
        let result = translations[currentLang];
        for (const k of keys) {
            if (result && result[k] !== undefined) {
                result = result[k];
            } else {
                console.warn(`Translation key not found: ${key} for language ${currentLang}`);
                return null;
            }
        }
        return result;
    }

    function updateLangToggleText() {
        if (!langToggle) return;
        
        if (currentLang === "en") {
            langToggle.innerHTML = "العربية <i class=\"fas fa-globe\"></i>";
            document.documentElement.setAttribute('dir', 'ltr');
        } else {
            langToggle.innerHTML = "English <i class=\"fas fa-globe\"></i>";
            document.documentElement.setAttribute('dir', 'rtl');
        }
    }

    function toggleLanguage() {
        currentLang = currentLang === "en" ? "ar" : "en";
        localStorage.setItem("lang", currentLang);
        applyTranslations();
        updateLangToggleText();
    }

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
        // Call loadTranslations on initial app load
        loadTranslations();
        
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
                const href = this.getAttribute('href');
                if (href.startsWith('#')) {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }
            });
        });

        console.log('App initialized successfully');
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

